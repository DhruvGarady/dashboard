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

// FOR LOCAL
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin@123",
    database: "expense_tracker_local",
    port: 3306
})



//  const con = mysql.createConnection({
//     host: "exp-tracker-db.cnicycuoaqou.eu-north-1.rds.amazonaws.com",
//     user: "admin",
//     password: "admin123",
//     database: "expense_tracker_local",
//     port: 3306
// })




con.connect((err) => {
    if(err){
        console.log(err)
    }else{
        console.log("connected!!")
    }
})


//----------------------------------------------------USER TABEL------------------------------------------------

app.get('/user/data/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT * FROM user WHERE usr_id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})



app.get('/user/:id',(req,res) => {
    const id=req.params.id;


 con.query('SELECT `FIRST_NAME`, `LAST_NAME`, `EMAIL`, `USERNAME`, `PHONE_NUMBER`, `state`, `country`, `zip` FROM user WHERE usr_id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})




const saltRounds = 10;

app.post('/user/add',(req,res) => {
    //const usr_id=req.body.usr_id;
    const FIRST_NAME=req.body.FIRST_NAME;
    const LAST_NAME=req.body.LAST_NAME;
    const EMAIL=req.body.EMAIL;
    const USERNAME=req.body.USERNAME;
    const PASSWORD=req.body.PASSWORD;
	const PHONE_NUMBER=req.body.PHONE_NUMBER;
	const state=req.body.state;	
	const country=req.body.country;
	const zip=req.body.zip;
	
	// Hash the password before storing it
	bcrypt.hash(PASSWORD, saltRounds, (err, hashedPassword) => {
	    if (err) {
	        console.error(err);
	        return res.status(500).send("Error hashing password");
	    }

    con.query('INSERT INTO user (`FIRST_NAME`, `LAST_NAME`, `EMAIL`, `USERNAME`,`PASSWORD`,`PHONE_NUMBER`,`state`,`country`,`zip`) VALUES (?,?,?,?,?,?,?,?,?)',
	[FIRST_NAME,LAST_NAME,EMAIL,USERNAME,hashedPassword,state,PHONE_NUMBER,country,zip],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send("POSTED")
        }
    })
  })
})

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

//--------------------------------- USER LOGIN------------------------------------

app.post('/user/login', (req, res) => {
    const USERNAME = req.body.USERNAME;
    const PASSWORD = req.body.PASSWORD;

    con.query('SELECT USERNAME, usr_id, PASSWORD FROM user WHERE USERNAME = ?', [USERNAME], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error on the server.");
        }

        if (results.length === 0) {
            return res.status(401).send("Username or password is incorrect.");
        }

        const hashedPassword = results[0].PASSWORD;
        const userId = results[0].usr_id;  // Assuming `USER_ID` is the column for the user ID

        bcrypt.compare(PASSWORD, hashedPassword, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error while checking password.");
				//return res.json({ message: "An error occurred. Please try again later." });
			}

            if (isMatch) {
                // Set session variables
                req.session.username = USERNAME;
                req.session.userId = userId;

				res.send(JSON.stringify(userId));
            } else {
                res.status(401).send("Username or password is incorrect.");
				//res.json({ message: "Username or password is incorrect." });
			}
        });
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












//--------------------------------------------------

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
