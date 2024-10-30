const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
const corsoptions = { origin: process.env.url,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsoptions));
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'server759.iseencloud.net',
  user: 'nocash_store',
  password: 'nocash_store',
  database: 'nocash_store',
  port: 3306,
  connectTimeout: 30000 // Increase timeout to 30 seconds
});


const handleDisconnect = () => {
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    setTimeout(handleDisconnect, 2000); // Attempt to reconnect after 2 seconds
  } else {
    console.log('Connected to MySQL database...');
    connection.release();
  }
});

db.on('error', (err) => {
  console.error('MySQL error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect(); // Reconnect on connection loss
  } else {
    throw err;
  }
});
};

handleDisconnect();

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
      // Successful authentication, redirect to your desired route
      res.redirect(process.env.url+'/home');
  }
);
passport.serializeUser((user, done) => {
  done(null, user.email); // Assuming user.id is available
});

// Deserialize the user by fetching full user details from your database
passport.deserializeUser((email, done) => {
  // Replace with actual DB query to find the user by ID
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return done(err);
      done(null, results[0]); // `results[0]` should be the full user object
  });
});
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
      res.json({ success: true, user: req.user });
  } else {
      res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});


passport.use(new GoogleStrategy({
  clientID: process.env.clientid,
  clientSecret: process.env.clientsecret,
  callbackURL: 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  const profilePicture = profile.photos[0].value;
  console.log(email);
  
  // Check if the user already exists
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserSql, [email], (err, results) => {
    console.log(results);
    
      if (err) return done(err);

      if (results.length > 0) {
          // User exists
          return done(null, results[0]);
      } else {
          // New user, insert into database
          const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
          db.query(insertUserSql, [name, email, googleId], (err, result) => {
              if (err) return done(err);
              
              // Retrieve the newly created user record
              db.query(checkUserSql, [email], (err, results) => {
                  if (err) return done(err);
                  return done(null, results[0]);
              });
          });
      }
  });
}));

app.get('/', (req, res) => {
  db.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    console.log(results);
  });
  
  res.send('Hello World from Express.js!');
});
app.get('/product_list', (req, res) => {
  db.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
  
  
});

app.post('/login', (req, res) => {

  const { email, password } = req.body;
  console.log(password);
  
  db.query('SELECT * FROM users WHERE email =?', [email], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const user = results[0];
      
      if (user.PASSWORD === password) {
        res.json({ message: 'Logged in successfully' ,username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    })

});
app.post('/signup', (req, res) => {

  const { username,email, password } = req.body;

  console.log(req.body);
  
  if(!username) return res.status(401).json({ message: 'username not provided'});
  
  const checkSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkSql, [username, email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      return res.status(409).send({ message: 'Username or email already in use' });
    }});

  db.query('insert into users (username,email,password) values (?,?,?)', [username,email, password], (error, results) => {
    if (error) throw error;
    res.status(200).send({ message: 'Signup successful.' });
    })

});
app.post('/addcart', (req, res) => {
  const{email, name,price,img,quantity,description,type} = req.body;
  db.query('INSERT  into cart(user,name,description,img,type,quantity,price) values(?,?,?,?,?,?,?)', [email,name,description,img,type,quantity,price],(err, result) => {
    if(err) throw err;
    console.log(err);
    
    res.status(200).send({ message: 'Cart updated successfully.' });
  })
});
app.get('/user/cart', (req, res) => {
  const {email } = req.query;
  db.query('SELECT * FROM cart WHERE user =?', [email],(err, result) => {
    console.log(result);
    
    if(err){
      console.log(err);
      
    } 
    res.send(result);
  })
})
app.post('/payment', (req, res) => {
  const { name, email, phone, area, city, state, post_code } = req.body;

  db.query('INSERT INTO payment (name, email, phone, area, city, state, post_code) VALUES (?, ?, ?, ?, ?, ?, ?)', 
  [name, email, phone, area, city, state, post_code], (err, result) => {
      if (err) {
          console.error('Database error:', err);
          // Check if the error is a duplicate entry error
          if (err.code === 'ER_DUP_ENTRY' && err.message.includes('email')) {
              return res.status(409).json({ error: 'Request already in progress' }); // 409 Conflict for duplicate entry
          } else {
              return res.status(500).json({ error: 'Database insert failed.' });
          }
      }
      res.status(200).json({ message: 'Payment successful.' });
  });
});


app.post("/create_order", (req, res) => {
  const { email, total_price } = req.body;
  let p_id = 0;

  // First query to get the payment ID
  db.query('SELECT * FROM payment WHERE email = ?', [email], (err, result) => {
      if (err) {
          console.error("Payment data error:", err);
          return res.status(500).send({ error: "Error retrieving payment data." });
      }

      if (result.length > 0) {
          p_id = result[0].id;

          // Insert order only after retrieving payment details
          db.query('INSERT INTO orders (email, total_price, payment_details) VALUES (?, ?, ?)', [email, total_price, p_id], (err, result) => {
              if (err) {
                  console.error("Order creation error:", err);
                  return res.status(500).send({ error: "Error creating order." });
              }
              res.status(200).send({ message: 'Order created successfully.' });
          });
      } else {
          res.status(404).send({ error: "Payment record not found for this email." });
      }
  });
});

app.post('/admin/additem', (req, res) => {
  const { name, price, description,feature,feature_description,img,type } = req.body;
  console.log(req.body);
  
  db.query('INSERT  into items(name,price,description,feature,feature_description,img,type) values(?,?,?,?,?,?,?)', [name, price, description,feature,feature_description, img, type],(err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Item added successfully.' });
  }) });

  // Search route
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  // Basic check to avoid unnecessary database calls
  if (!searchTerm) {
      return res.json([]);
  }

  // SQL query to search by title or author in the books table
  const query = `
      SELECT * FROM items 
      WHERE name LIKE ? OR price LIKE ?
      LIMIT 10;  -- Limit results for efficiency
  `;
  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue, searchValue], (err, results) => {
      if (err) {
          console.error('Error executing search query:', err);
          return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results); // Send search results back as JSON
  });
});

app.listen(port, () => {
  console.log(`Express.js server running at http://localhost:${port}`);
});
