CREATE database lms;

use lms;

CREATE TABLE alerts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active VARCHAR(50),
    email_id VARCHAR(100),
    user_name VARCHAR(100),
	user_id VARCHAR(50),
    -- New alert-specific fields
    alert_type VARCHAR(50),                               -- category/type of alert
    alert_message TEXT,                                   -- alert content
    alert_level ENUM('info', 'warning', 'critical') DEFAULT 'info', -- severity
    status VARCHAR(50),     -- current state
    expiry_at TIMESTAMP NULL,                             -- expiration time
    link_url VARCHAR(255),                                -- optional link for details
    meta_data JSON,                                       -- extra info in JSON
    source VARCHAR(100)                                   -- where it came from
);



CREATE TABLE doc_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_by VARCHAR(50),
    updated_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150) ,
    username VARCHAR(100) ,
    password_hash VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male','Female','Other'),
    profile_picture VARCHAR(255),
    is_active VARCHAR(50),
    user_type VARCHAR(50),
    address TEXT,
    nationality VARCHAR(100),
    grade_level VARCHAR(50),
    admission_date DATE,
    class_section VARCHAR(50),
    course VARCHAR(100),
    GPA DECIMAL(3,2),
    attendance_percentage DECIMAL(5,2),
    academic_status VARCHAR(50),
    guardian_name VARCHAR(100),
    guardian_phone VARCHAR(20),
    guardian_email VARCHAR(150),
    relationship VARCHAR(50),
    courses_enrolled TEXT,
    credits_earned INT,
    semester VARCHAR(50),
    tuition_status VARCHAR(50),
    blood_type VARCHAR(5),
    medical_conditions TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    disciplinary_record TEXT,
    clubs_and_activities TEXT,
    sports_participation TEXT,
    volunteer_hours INT,
    last_login TIMESTAMP NULL,
    account_status VARCHAR(50),
    roll_num VARCHAR(50),
    country VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20)
);




CREATE TABLE features (
 id VARCHAR(20) PRIMARY KEY,
 created_by VARCHAR(50),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_by VARCHAR(50),
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 feature_name VARCHAR(50),
 feature_description VARCHAR(50),
 feature_url VARCHAR(50),
 display_sequence  INT,
 parent_feature_id VARCHAR(20),
 icon VARCHAR(20),
 is_active VARCHAR(50)
 );




CREATE TABLE enum_values (
    id VARCHAR(20) PRIMARY KEY, 
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active VARCHAR(50),
    master_code VARCHAR(50),
    master_name VARCHAR(100) NOT NULL,
    value1 VARCHAR(100),
    value2 VARCHAR(100),
    value3 VARCHAR(100),
    value4 VARCHAR(100),
    value5 VARCHAR(100)
);
