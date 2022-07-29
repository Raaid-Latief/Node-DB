const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM orders", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req, res)=> {
const {email, 
    password, 
    full_name, 
    billing_address, 
    default_shipping_address, 
    country, 
    phone, 
    user_type
} = req.body    
try {
    con.query(
        `INSERT INTO orders (email, password, full_name, billing_address, default_shipping_address, country, phone, user_type) values ('${email}', '${password}', '${full_name}', '${billing_address}','${default_shipping_address}', '${country}', '${phone}',  '${user_type}') `, 
    (err, result) => {
        if (err) throw err;
        res.send(result);
    });
} catch (error) {
    console.log(error)
    
}
});


// delete 
// 

router.delete("/orders/:id", (req, res) => {
    try {
      let sql = "DELETE FROM orders WHERE ?";
      let user = {
        user_id: req.params.id,
      };
      con.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send("User successfully removed");
      });
    } catch (error) {
      console.log(error);
    }
  });


  const bcrypt = require('bcryptjs');

// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO orders SET ?";

    // body im requesting
    const {
      full_name,
      email,
      password,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    } = req.body;

    // The start of hashing / encryption
    // length of characters
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // database terms
    let user = {
      full_name,
      email,
      // We sending the hash value to be stored witin the table
      password: hash,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    };

    // connection to database
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});


// Login
// The Route where Decryption happens
router.post("/login", (req, res) => {
  try {
// check if email exists from db
    let sql = "SELECT * FROM orders WHERE ?";
    let user = {
      email: req.body.email,
      
    };

    // connect to db
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        // Decryption
        // Accepts the password stored in database and the password given by user (req.body)
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password does not match, exclamation means false
        if (!isMatch) {
          res.send("Password incorrect");
        }
        else {
          res.send(result)
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// creating a token

const jwt = require('jsonwebtoken');

// Login
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM orders WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // The information the should be stored inside token
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              email: result[0].email,
              user_type: result[0].user_type,
              phone: result[0].phone,
              country: result[0].country,
              billing_address: result[0].billing_address,
              default_shipping_address: result[0].default_shipping_address,
            },
          };
          // Creating a token and setting expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;