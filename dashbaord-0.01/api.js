var express = require('express')
var mysql = require("mysql")
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');


var app = express()
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

 app.use(session({
     secret: 'aL0ngRand0mStr1ngTh4tIsDiff1cultToGu3ss',  // Use a secure key for production
     resave: false,
     saveUninitialized: false,
     cookie: { secure: false }  // Set to `true` if using HTTPS
 }));


/*app.use(session({
    secret: 'admin@123', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // set secure: true if you're using https
}));*/


// FOR LOCAL
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin@123",
    database: "dashboard",
    port: 3306
})



//  const con = mysql.createConnection({
//     host: "exp-tracker-db.cnicycuoaqou.eu-north-1.rds.amazonaws.com",
//     user: "admin",
//     password: "admin123",
//     database: "expense_tracker_local",
//     port: 3306
// })



//----------------------------------------------------USER TABEL------------------------------------------------

//----------------------adding a user ---------------------
const saltRounds = 10;

app.post('/user/addDOCuser', (req, res) => {
    const {
		created_by,
		updated_by,
        first_name,
        last_name,
        email,
        username,
        password_hash, // This should be hashed before storing
        phone,
        date_of_birth,
        gender,
        profile_picture,
        is_active
    } = req.body;

    // Hash the password before storing it
    bcrypt.hash(password_hash, saltRounds, (err, hashedPassword) => { // Use password_hash from req.body
        if (err) {
            console.error(err);
            return res.status(500).send("Error hashing password");
        }

        con.query(
            'INSERT INTO doc_users (`created_by`,`updated_by`,`first_name`, `last_name`, `email`, `username`, `password_hash`, `phone`, `date_of_birth`, `gender`, `profile_picture`, `is_active`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [created_by,updated_by,first_name, last_name, email, username, hashedPassword, phone, date_of_birth, gender, profile_picture, is_active], // Use hashedPassword
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Database error");
                } else {
                    res.send("POSTED");
                }
            }
        );
    });
});


//-----------------user login------------------

app.post('/user/login', (req, res) => {
    const { username, password_hash } = req.body;

    // Fetch user from the database
    con.query(
        'SELECT username, id, password_hash FROM doc_users WHERE is_active = "Y" AND username = ?', 
        [username], 
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error on the server." });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Username or password is incorrect." });
            }

            const hashedPassword = results[0].password_hash;
            const userId = results[0].id;
            const username = results[0].username; // This is the username from the database

            // Compare hashed password
            bcrypt.compare(password_hash, hashedPassword, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error while checking password." });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: "Username or password is incorrect." });
                }

                // Set session variables with the correct database username
                req.session.username = username; // Set session username to the username from the DB
                req.session.userId = userId; // Set session userId to the userId from the DB

                res.json({ user_id: userId, username: username });
            });
        }
    );
});


//--------------------get user by Id-------------------

app.get('/user/getById/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT `id`, `first_name`, `last_name`, `created_by`, `updated_by`, `email`, `username`, `phone`, `date_of_birth`, `gender`, `profile_picture`, `is_active` FROM doc_users WHERE is_active = "Y" AND id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

//--------------------get users-------------------


app.get('/user/getUsers',(req,res) => {
    const id=req.params.id;


 con.query('SELECT `id`, `first_name`, `last_name`, `created_by`, `updated_by`, `email`, `username`, `phone`, `date_of_birth`, `gender`, `profile_picture`, `is_active` FROM doc_users WHERE is_active = "Y"', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})



//---------------------delete users--------------------

app.put('/user/deleteUserById/:id', (req, res) => {
    const id = req.params.id; // Get user ID from the URL

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    con.query(
        'UPDATE doc_users SET is_active = "N" WHERE id = ?', 
        [id], 
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error updating user" });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: "User deactivated successfully" });
        }
    );
});



//-------------------------------------OLD ---------------------------------------------------------------------------------------------------------------------------------------------------------------
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const {
        FIRST_NAME,
        LAST_NAME,
        EMAIL,
        is_active,
        PHONE_NUMBER,
		country,
        state,
		city,
        zip
    } = req.body;

    if (!id || !FIRST_NAME || !LAST_NAME || !EMAIL) {
        return res.status(400).send("Missing required fields");
    }

    const sql = `UPDATE user SET 
                    FIRST_NAME = ?, 
                    LAST_NAME = ?, 
                    EMAIL = ?, 
                    PHONE_NUMBER = ?, 
                    country = ?, 
                    state = ?, 
					city = ?,
                    zip = ?, 
                    is_active = ? 
                WHERE usr_id = ?`;

    con.query(sql, [FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, country, state, city, zip, is_active, id], (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            res.status(500).send("An error occurred while updating the record.");
        } else if (result.affectedRows === 0) {
            res.status(404).send("No user found with the given ID.");
        } else {
            res.send("User updated successfully");
        }
    });
});





//----------------------------------------------------------------INCOME Table ------------------------------------------------------------------
// POST API to insert income
app.post('/income/add', (req, res) => {
    const { usr_id, month_of_receipt, income_type, amount, notes } = req.body;


    const query = `
        INSERT INTO income (usr_id, month_of_receipt, income_type, amount, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(query, [usr_id, month_of_receipt, income_type, amount, notes], (err, result) => {
        if (err) {
            console.error('Error inserting income:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ 
			message: 'Income record created',
			income_id: result.insertId,
			usr_id: usr_id 
		});
    });
});

// GET API to insert income
app.get('/income/data/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT * FROM income WHERE usr_id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

// delete API to insert income
app.delete('/income/delete/:id',(req,res) => {
    const id=req.params.id;


 con.query('DELETE FROM income WHERE usr_id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

// delete API to insert income
app.delete('/incomeid/delete/:id',(req,res) => {
    const id=req.params.id;


 con.query('DELETE FROM income WHERE income_id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

//------------------update income--------------------

app.put('/update/incomeid/:id', (req, res) => {
    const income_id = req.params.id;
    const {
        income_type,
        month_of_receipt,
        amount
    } = req.body;

    const sql = `UPDATE income SET 
                    income_type = ?, 
                    month_of_receipt = ?, 
                    amount = ?
                WHERE income_id = ?`;

    con.query(sql, [income_type, month_of_receipt, amount, income_id], (err, result) => {
		    if (err) {
		        console.error("Error updating user:", err);
		        res.status(500).send("An error occurred while updating the record.");
		    } else if (result.affectedRows === 0) {
		        res.status(404).send("No user found with the given ID.");
		    } else {
		        res.send("User updated successfully");
		    }
		});
});


//---------------------------------income types table------------------------------------
app.get('/income_types/data',(req,res) => {


 con.query('SELECT * FROM income_type',(err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

//----------------------------------------user income dashboard--------------------------------------------------

// GET API to group by month
app.get('/income/groupBy/month/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT month_of_receipt, SUM(amount) AS total_amount FROM income where usr_id=? GROUP BY month_of_receipt ORDER BY total_amount desc', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})


// GET API to grou by income type
app.get('/income/groupBy/incomeType/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT income_type, SUM(amount) AS total_amount FROM income where usr_id=? GROUP BY income_type ORDER BY total_amount desc', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})












//--------------------------- test --------------------------

app.get('/', (req, res) => {
    res.send("Server is working");
});


app.listen(3002,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("port 3002")
    }
})


con.connect((err) => {
    if(err){
        console.log(err)
    }else{
        console.log("connected!!")
    }
})
//---------------------------test End---------------------------
