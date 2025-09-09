const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require("dotenv").config();  // load .env

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,   // from .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // true if HTTPS
}));

// MySQL pool using .env variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


//----------------------------------------------------USER TABEL------------------------------------------------

//----------------------adding a user ---------------------
const saltRounds = 10;

/*app.post('/user/addDOCuser', (req, res) => {
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
        is_active,
		user_type,
		address,
		nationality,
		grade_level,
		admission_date,
		class_section,
		course,
		GPA,
		attendance_percentage,
		academic_status,
		guardian_name,
		guardian_phone,
		guardian_email,
		relationship,
		courses_enrolled,
		credits_earned,
		semester,
		tuition_status,
		blood_type,
		medical_conditions,
		emergency_contact_name,
		emergency_contact_phone,
		disciplinary_record,
		clubs_and_activities,
		sports_participation,
		volunteer_hours,
		last_login,
		account_status
    } = req.body;

    // Hash the password before storing it
    bcrypt.hash(password_hash, saltRounds, (err, hashedPassword) => { // Use password_hash from req.body
        if (err) {
            console.error(err);
            return res.status(500).send("Error hashing password");
        }

        pool.query(
            'INSERT INTO doc_users (`created_by`,`updated_by`,`first_name`, `last_name`, `email`, `username`, `password_hash`, `phone`, `date_of_birth`, `gender`, `profile_picture`, `is_active`,`user_type`,`address`,`nationality`,`grade_level`, `admission_date`,`class_section` ,`course` ,`GPA` ,`attendance_percentage` ,`academic_status` ,`guardian_name` ,`guardian_phone` ,`guardian_email` ,`relationship`,`courses_enrolled` ,`credits_earned` ,`semester` ,`tuition_status` ,`blood_type` ,`medical_conditions` ,`emergency_contact_name` ,`emergency_contact_phone` ,`disciplinary_record` ,`clubs_and_activities` ,`sports_participation` ,`volunteer_hours` ,`last_login` ,`account_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [created_by,updated_by,first_name, last_name, email, username, hashedPassword, phone, date_of_birth, gender, profile_picture, is_active, user_type, address, nationality, grade_level, admission_date,class_section, course, GPA, attendance_percentage, academic_status, guardian_name, guardian_phone, guardian_email, relationship, courses_enrolled, credits_earned, semester, tuition_status, blood_type, medical_conditions, emergency_contact_name, emergency_contact_phone, disciplinary_record, clubs_and_activities, sports_participation, volunteer_hours, last_login, account_status], // Use hashedPassword
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
*/

// User creation with profile picture upload to S3

//const { app, pool } = require("./db"); // adjust according to your setup
const multer = require("multer");
const { uploadToS3 } = require("./s3");

const upload = multer({ storage: multer.memoryStorage() }); // store file in memory

app.post('/user/addDOCuser', upload.single("profile_picture"), async (req, res) => {
  const {
    created_by,
    updated_by,
    first_name,
    last_name,
    email,
    username,
    password_hash,
    phone,
    date_of_birth,
    gender,
    is_active,
    user_type,
    address,
    nationality,
    grade_level,
    admission_date,
    class_section,
    course,
    GPA,
    attendance_percentage,
    academic_status,
    guardian_name,
    guardian_phone,
    guardian_email,
    relationship,
    courses_enrolled,
    credits_earned,
    semester,
    tuition_status,
    blood_type,
    medical_conditions,
    emergency_contact_name,
    emergency_contact_phone,
    disciplinary_record,
    clubs_and_activities,
    sports_participation,
    volunteer_hours,
    last_login,
    account_status,
    roll_num,
    country,
    state,
    pincode
  } = req.body;

  if (!password_hash) {
    return res.status(400).send("Password is required");
  }

  try {
    // upload image if provided
    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = await uploadToS3(req.file);
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const sql = `
      INSERT INTO doc_users (
        created_by, updated_by, first_name, last_name, email, username, password_hash,
        phone, date_of_birth, gender, profile_picture, is_active, user_type, address,
        nationality, grade_level, admission_date, class_section, course, GPA,
        attendance_percentage, academic_status, guardian_name, guardian_phone,
        guardian_email, relationship, courses_enrolled, credits_earned, semester,
        tuition_status, blood_type, medical_conditions, emergency_contact_name,
        emergency_contact_phone, disciplinary_record, clubs_and_activities,
        sports_participation, volunteer_hours, last_login, account_status, roll_num,
        country, state, pincode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      created_by, updated_by, first_name, last_name, email, username, hashedPassword,
      phone, date_of_birth, gender, profileImageUrl, is_active, user_type, address,
      nationality, grade_level, admission_date, class_section, course, GPA,
      attendance_percentage, academic_status, guardian_name, guardian_phone,
      guardian_email, relationship, courses_enrolled, credits_earned, semester,
      tuition_status, blood_type, medical_conditions, emergency_contact_name,
      emergency_contact_phone, disciplinary_record, clubs_and_activities,
      sports_participation, volunteer_hours, last_login, account_status,
      roll_num, country, state, pincode
    ];

    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }
      res.status(201).send({ 
        message: "User added successfully", 
        userId: result.insertId,
        profileImageUrl
      });
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});



// USER UPDATE WITH S3 UPLOAD

app.put('/user/updateDOCuser/:id', upload.single("profile_picture"), async (req, res) => {
  const userId = req.params.id;
  const {
    created_by,
    updated_by,
    first_name,
    last_name,
    email,
    username,
    password_hash,
    phone,
    date_of_birth,
    gender,
    is_active,
    user_type,
    address,
    nationality,
    grade_level,
    admission_date,
    class_section,
    course,
    GPA,
    attendance_percentage,
    academic_status,
    guardian_name,
    guardian_phone,
    guardian_email,
    relationship,
    courses_enrolled,
    credits_earned,
    semester,
    tuition_status,
    blood_type,
    medical_conditions,
    emergency_contact_name,
    emergency_contact_phone,
    disciplinary_record,
    clubs_and_activities,
    sports_participation,
    volunteer_hours,
    last_login,
    account_status,
    roll_num,
    country,
    state,
    pincode
  } = req.body;

  try {
    // upload new profile picture if provided
    let profileImageUrl = null;
    if (req.file) {
      // use userId to overwrite existing picture in S3
      profileImageUrl = await uploadToS3(req.file, userId);
    }

    // if password provided, hash it, otherwise keep old
    let hashedPassword = null;
    if (password_hash) {
      hashedPassword = await bcrypt.hash(password_hash, 10);
    }

    // Build SQL dynamically (skip fields if not provided)
    let sql = `
      UPDATE doc_users SET
        created_by = ?, updated_by = ?, first_name = ?, last_name = ?, email = ?, username = ?,
        phone = ?, date_of_birth = ?, gender = ?, is_active = ?, user_type = ?, address = ?,
        nationality = ?, grade_level = ?, admission_date = ?, class_section = ?, course = ?, GPA = ?,
        attendance_percentage = ?, academic_status = ?, guardian_name = ?, guardian_phone = ?,
        guardian_email = ?, relationship = ?, courses_enrolled = ?, credits_earned = ?, semester = ?,
        tuition_status = ?, blood_type = ?, medical_conditions = ?, emergency_contact_name = ?,
        emergency_contact_phone = ?, disciplinary_record = ?, clubs_and_activities = ?,
        sports_participation = ?, volunteer_hours = ?, last_login = ?, account_status = ?,
        roll_num = ?, country = ?, state = ?, pincode = ?
    `;

    const values = [
      created_by, updated_by, first_name, last_name, email, username,
      phone, date_of_birth, gender, is_active, user_type, address,
      nationality, grade_level, admission_date, class_section, course, GPA,
      attendance_percentage, academic_status, guardian_name, guardian_phone,
      guardian_email, relationship, courses_enrolled, credits_earned, semester,
      tuition_status, blood_type, medical_conditions, emergency_contact_name,
      emergency_contact_phone, disciplinary_record, clubs_and_activities,
      sports_participation, volunteer_hours, last_login, account_status,
      roll_num, country, state, pincode
    ];

    // Add password if updated
    if (hashedPassword) {
      sql += `, password_hash = ?`;
      values.push(hashedPassword);
    }

    // Add profile picture if updated
    if (profileImageUrl) {
      sql += `, profile_picture = ?`;
      values.push(profileImageUrl);
    }

    sql += ` WHERE id = ?`;
    values.push(userId);

    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }

      res.status(200).send({
        message: "User updated successfully",
        userId,
        profileImageUrl: profileImageUrl || "unchanged"
      });
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});






/* OLD API
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
        is_active,
        user_type,
        address,
        nationality,
        grade_level,
        admission_date,
        class_section,
        course,
        GPA,
        attendance_percentage,
        academic_status,
        guardian_name,
        guardian_phone,
        guardian_email,
        relationship,
        courses_enrolled,
        credits_earned,
        semester,
        tuition_status,
        blood_type,
        medical_conditions,
        emergency_contact_name,
        emergency_contact_phone,
        disciplinary_record,
        clubs_and_activities,
        sports_participation,
        volunteer_hours,
        last_login,
        account_status,
		roll_num,
		country,
		state,
		pincode
    } = req.body;

    // Check if required fields are provided
    if (!password_hash) {
        return res.status(400).send("Password is required");
    }

    // Hash the password before storing it
    bcrypt.hash(password_hash, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Error hashing password");
        }

        const sql = `
            INSERT INTO doc_users (
                created_by, updated_by, first_name, last_name, email, username, password_hash, 
                phone, date_of_birth, gender, profile_picture, is_active, user_type, address, 
                nationality, grade_level, admission_date, class_section, course, GPA, 
                attendance_percentage, academic_status, guardian_name, guardian_phone, 
                guardian_email, relationship, courses_enrolled, credits_earned, semester, 
                tuition_status, blood_type, medical_conditions, emergency_contact_name, 
                emergency_contact_phone, disciplinary_record, clubs_and_activities, 
                sports_participation, volunteer_hours, last_login, account_status,roll_num, country, state, pincode
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            created_by, updated_by, first_name, last_name, email, username, hashedPassword,
            phone, date_of_birth, gender, profile_picture, is_active, user_type, address,
            nationality, grade_level, admission_date, class_section, course, GPA,
            attendance_percentage, academic_status, guardian_name, guardian_phone,
            guardian_email, relationship, courses_enrolled, credits_earned, semester,
            tuition_status, blood_type, medical_conditions, emergency_contact_name,
            emergency_contact_phone, disciplinary_record, clubs_and_activities,
            sports_participation, volunteer_hours, last_login, account_status, roll_num, country, state, pincode
        ];

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Database error");
            }
            res.status(201).send({ message: "User added successfully", userId: result.insertId });
        });
    });
});*/



//-----------------user login------------------
/* OLD API
app.post('/user/login', (req, res) => {
    const { username, password_hash } = req.body;

    // Fetch user from the database
    pool.query(
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
                req.session.userId = userId; //e Set session userId to the userId from the DB

                res.json({ user_id: userId, username: username });
            });
        }
    );
});
*/
app.post('/user/login', (req, res) => {
    const { username, password_hash } = req.body;

    pool.query(
        'SELECT id, username, password_hash, profile_picture FROM doc_users WHERE is_active = "Y" AND username = ?', 
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
            const usernameFromDB = results[0].username;   // ✅ renamed
            const profilePicture = results[0].profile_picture || "https://us-east-virginia-s3.s3.us-east-1.amazonaws.com/default-profilepic.jpg"; 

            bcrypt.compare(password_hash, hashedPassword, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error while checking password." });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: "Username or password is incorrect." });
                }

                // Save in session
                req.session.username = usernameFromDB;
                req.session.userId = userId;
                req.session.profilePicture = profilePicture;

                // Send response
                res.json({ 
                    user_id: userId, 
                    username: usernameFromDB, 
                    profile_picture: profilePicture 
                });
            });
        }
    );
});



//--------------------get user by Id-------------------

app.get('/user/getById/:id',(req,res) => {
    const id=req.params.id;


 pool.query('SELECT * FROM doc_users WHERE is_active = "Y" AND id = ?', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

//--------------------Filter users-------------------

app.get('/user/filter', (req, res) => {
    const { user_type, class_section, semester } = req.query;

    let sql = `SELECT id, created_by, updated_by, first_name, last_name, email, phone, username, 
                   date_of_birth, gender, profile_picture, is_active, user_type, address, 
                   nationality, grade_level, admission_date, class_section, course, GPA, 
                   attendance_percentage, academic_status, guardian_name, guardian_phone, 
                   guardian_email, relationship, courses_enrolled, credits_earned, semester, 
                   tuition_status, blood_type, medical_conditions, emergency_contact_name, 
                   emergency_contact_phone, disciplinary_record, clubs_and_activities, 
                   sports_participation, volunteer_hours, last_login, account_status, roll_num 
               FROM doc_users WHERE is_active = "Y"`;

    const params = [];

    if (user_type && user_type.toUpperCase() !== "ALL") {
        sql += ` AND user_type = ?`;
        params.push(user_type);
    }

    if (class_section && class_section.toUpperCase() !== "ALL") {
        sql += ` AND class_section = ?`;
        params.push(class_section);
    }

    if (semester && semester.toUpperCase() !== "ALL") {
        sql += ` AND semester = ?`;
        params.push(semester);
    }

    pool.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(result);
        }
    });
});

/*app.get('/user/filter/:user_type?/:class_section?/:semester?', (req, res) => {
    const { user_type, class_section, semester } = req.params;

    let sql = `SELECT 	id, created_by, updated_by, first_name, last_name, email, phone, 
		               date_of_birth, gender, profile_picture, is_active, user_type, address, 
		               nationality, grade_level, admission_date, class_section, course, GPA, 
		               attendance_percentage, academic_status, guardian_name, guardian_phone, 
		               guardian_email, relationship, courses_enrolled, credits_earned, semester, 
		               tuition_status, blood_type, medical_conditions, emergency_contact_name, 
		               emergency_contact_phone, disciplinary_record, clubs_and_activities, 
		               sports_participation, volunteer_hours, last_login, account_status,roll_num 
			FROM doc_users WHERE is_active = "Y"`;
					   
    const params = [];


	if (user_type != "" && user_type != "ALL" && user_type != null && user_type != undefined) {
	    sql += ` AND user_type = ?`;
	    params.push(user_type);
	}

	if (class_section != "" && class_section != "ALL"  && class_section != null  && class_section != undefined ) {
	    sql += ` AND class_section = ?`;
	    params.push(class_section);
	}

	if (semester != "" && semester != "ALL" && semester != null && semester != undefined) {
	    sql += ` AND semester = ?`;
	    params.push(semester);
	}

	
    pool.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(result);
        }
    });
});
*/



//--------------------GET users-------------------

app.get('/user/getUsers',(req,res) => {
    const id=req.params.id;


 pool.query(	`SELECT id, created_by, updated_by, first_name, last_name, email, phone, 
	               date_of_birth, gender, profile_picture, is_active, user_type, address, 
	               nationality, grade_level, admission_date, class_section, course, GPA, 
	               attendance_percentage, academic_status, guardian_name, guardian_phone, 
	               guardian_email, relationship, courses_enrolled, credits_earned, semester, 
	               tuition_status, blood_type, medical_conditions, emergency_contact_name, 
	               emergency_contact_phone, disciplinary_record, clubs_and_activities, 
	               sports_participation, volunteer_hours, last_login, account_status,roll_num
	        FROM doc_users 
	        WHERE is_active = "Y"`, 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})



// ----------------------API for dashbord------------------------
app.get('/user/getUsersCount',(req,res) => {

 pool.query(	`SELECT COUNT(*) AS totalUsers FROM doc_users
			WHERE  is_active = "Y"`, 
(err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})



app.get('/user/getStudentsCount',(req,res) => {

 pool.query(	`SELECT COUNT(*) AS numberOfStudents FROM doc_users
	WHERE user_type = "STUDENT"
	AND  is_active = "Y"`, (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})


app.get('/user/getFacultyCount',(req,res) => {

 pool.query(	`SELECT COUNT(*) AS numberOfFaculty FROM doc_users
	WHERE user_type IN ("TEACHER","HOD","VP","PRINCIPAL")
	AND  is_active = "Y"`, (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})


app.get('/user/getStaffCount',(req,res) => {

 pool.query(	`	SELECT COUNT(*) AS numberOfStaff FROM doc_users
		WHERE user_type = "STAFF"
		AND  is_active = "Y"`, (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
});



app.get('/user/getUserTypeCount',(req,res) => {

 pool.query(	`SELECT user_type, COUNT(*) AS COUNT
	FROM doc_users
	WHERE is_active = "Y"
	GROUP BY user_type;`, (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})

app.get('/user/getStudentsPerSemCount',(req,res) => {

 pool.query(	`	select semester, COUNT(*) AS count
	from doc_users
	where is_active = "Y"
	and user_type = 'STUDENT'
	group by semester
	order by semester ASC;`, (err, result) => {
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

    pool.query(
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

//-----------------------------------------------------------------------Feature table----------------------------------------------------------------------



app.get('/feature/getFeature',(req,res) => {

 pool.query('SELECT `id`, `feature_name`, `feature_description`, `feature_url`, `display_sequence`, `parent_feature_id`, `icon` FROM features WHERE is_active = "Y"', 
(err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})


//-----------------------------------------------------------------------Feature table----------------------------------------------------------------------
app.get('/enum/getEnumValues',(req,res) => {

 pool.query(`SELECT * FROM enum_values
			WHERE  is_active = "Y"`, 
(err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})





//-----------------------------------------------------------------------Alerts table----------------------------------------------------------------------
app.post('/alerts/add', (req, res) => {
    const { 
        created_by,
        updated_by,
        is_active,
        user_name,
        user_id,
        alert_type,
        alert_message,
        alert_level,
        status,
        expiry_at,
        link_url,
        meta_data,
        source
    } = req.body;

    const query = `
        INSERT INTO alerts (
            created_by, 
            updated_by, 
            is_active, 
            user_name, 
            user_id, 
            alert_type, 
            alert_message, 
            alert_level, 
            status, 
            expiry_at, 
            link_url, 
            meta_data, 
            source
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [
        created_by,
        updated_by,
        is_active,
        user_name,
        user_id,
        alert_type,
        alert_message,
        alert_level || 'info',
        status || 'unread',
        expiry_at,
        link_url,
        meta_data ? JSON.stringify(meta_data) : null, // ensure JSON is stringified
        source
    ], 		(err, result) => {
		        if(err){
		            console.log(err)
		        }else{
					res.json(result);
		        }
		    })
});


app.get('/alerts/getAlerts',(req,res) => {

    pool.query('SELECT * FROM alerts WHERE is_active = "Y"', 
   (err, result) => {
           if(err){
               console.log(err)
           }else{
               res.json(result);
           }
       })
   })


   app.get('/alerts/getAlertsById/:id', (req, res) => {
    const id = req.params.id; // Get user ID from the URL

    pool.query(
        'SELECT * FROM alerts WHERE is_active = "Y" AND user_id = ?',
        [id],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ error: "Database error" });
            } else {
                res.json(result);
            }
        }
    );
});



app.post('/alerts/updateStatusById/:id', (req, res) => {
    const id = req.params.id; // Alert ID from URL
    const { status, updated_by  } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    const sql = `
        UPDATE alerts 
        SET status = ?,
            updated_by = ? 
        WHERE is_active = "Y" AND id = ?
    `;

    pool.query(sql, [status, updated_by, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Database error" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "Alert not found or inactive" });
        } else {
            res.json({ success: true, message: "Status updated successfully" });
        }
    });
});








app.post('/alerts/deleteById/:id', (req, res) => {
    const id = req.params.id; // Alert ID from URL
    const { updated_by } = req.body;

    if (!updated_by) {
        return res.status(400).json({ error: "updated_by is required" });
    }

    const sql = `
        UPDATE alerts 
        SET is_active = "N",
            updated_by = ?
        WHERE id = ?
    `;

    pool.query(sql, [updated_by, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Database error" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "Alert not found or already inactive" });
        } else {
            res.json({ success: true, message: "Alert deleted successfully" });
        }
    });
});





   app.get('/alerts/filter', (req, res) => {
    const { user_id, alert_type, status } = req.query;

    let sql = `SELECT * FROM alerts WHERE is_active = "Y"`;

    const params = [];

    if (user_id !== "" && user_id !== null && user_id !== undefined) {
        sql += ` AND user_id = ?`;
        params.push(user_id);
    }

    if (alert_type && alert_type.toUpperCase() !== "ALL") {
        sql += ` AND alert_type = ?`;
        params.push(alert_type);
    }

    if (status && status.toUpperCase() !== "ALL") {
        sql += ` AND status = ?`;
        params.push(status);
    }

    pool.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(result);
        }
    });
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

    pool.query(sql, [FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, country, state, city, zip, is_active, id], (err, result) => {
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

    pool.query(query, [usr_id, month_of_receipt, income_type, amount, notes], (err, result) => {
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


 pool.query('SELECT * FROM income WHERE usr_id = ?', 
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


 pool.query('DELETE FROM income WHERE usr_id = ?', 
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


 pool.query('DELETE FROM income WHERE income_id = ?', 
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

    pool.query(sql, [income_type, month_of_receipt, amount, income_id], (err, result) => {
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


 pool.query('SELECT * FROM income_type',(err, result) => {
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


 pool.query('SELECT month_of_receipt, SUM(amount) AS total_amount FROM income where usr_id=? GROUP BY month_of_receipt ORDER BY total_amount desc', 
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


 pool.query('SELECT income_type, SUM(amount) AS total_amount FROM income where usr_id=? GROUP BY income_type ORDER BY total_amount desc', 
 [id], (err, result) => {
        if(err){
            console.log(err)
        }else{
			res.json(result);
        }
    })
})












//--------------------------- test --------------------------

/*app.get('/', (req, res) => {
    res.send("Server is working");
});


app.listen(3002,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log("port 3002")
    }
})


pool.connect((err) => {
    if(err){
        console.log(err)
    }else{
        console.log("connected!!")
    }
})*/

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.listen(3002, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running on port 3002");
    }
});

//---------------------------test End---------------------------
