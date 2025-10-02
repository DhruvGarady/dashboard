-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: database-1.cbcoe0sq80tl.ap-south-1.rds.amazonaws.com    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `alerts`
--

DROP TABLE IF EXISTS `alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` varchar(50) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `alert_type` varchar(50) DEFAULT NULL,
  `alert_message` text,
  `alert_level` enum('info','warning','critical') DEFAULT 'info',
  `status` varchar(50) DEFAULT NULL,
  `expiry_at` timestamp NULL DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `meta_data` json DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerts`
--

LOCK TABLES `alerts` WRITE;
/*!40000 ALTER TABLE `alerts` DISABLE KEYS */;
INSERT INTO `alerts` VALUES (1,'admin','2025-10-02 10:54:23','admin','2025-10-02 10:54:26','Y',NULL,'Prasad Doe','1','PAYMENT','asdasd','critical','RESOLVED','0000-00-00 00:00:00',NULL,NULL,'security-system');
/*!40000 ALTER TABLE `alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_users`
--

DROP TABLE IF EXISTS `doc_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_active` varchar(50) DEFAULT NULL,
  `user_type` varchar(50) DEFAULT NULL,
  `address` text,
  `nationality` varchar(100) DEFAULT NULL,
  `grade_level` varchar(50) DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `class_section` varchar(50) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `GPA` decimal(3,2) DEFAULT NULL,
  `attendance_percentage` decimal(5,2) DEFAULT NULL,
  `academic_status` varchar(50) DEFAULT NULL,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_phone` varchar(20) DEFAULT NULL,
  `guardian_email` varchar(150) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  `courses_enrolled` text,
  `credits_earned` int DEFAULT NULL,
  `semester` varchar(50) DEFAULT NULL,
  `tuition_status` varchar(50) DEFAULT NULL,
  `blood_type` varchar(5) DEFAULT NULL,
  `medical_conditions` text,
  `emergency_contact_name` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(20) DEFAULT NULL,
  `disciplinary_record` text,
  `clubs_and_activities` text,
  `sports_participation` text,
  `volunteer_hours` int DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `account_status` varchar(50) DEFAULT NULL,
  `roll_num` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_users`
--

LOCK TABLES `doc_users` WRITE;
/*!40000 ALTER TABLE `doc_users` DISABLE KEYS */;
INSERT INTO `doc_users` VALUES (1,'admin','admin','2025-10-02 09:46:47','2025-10-02 09:46:47','Prasad','Doe','johndoe@example.com','admin','$2b$10$/QwC5NTefXKa5YoH53ZPzeK.qoasProE1u9LbBzGBDT.6dPNueyga','+1234567890','2000-05-15','Male',NULL,'Y','student','123 Main St, City, Country','American','10th Grade','2018-09-01','A1','Science',3.80,95.50,'Good Standing','Jane Doe','+1234567891','janedoe@example.com','Mother','First warning: Late submissions\nSecond warning: Missed assignments',24,'8','Paid','O+','First warning: Late submissions\nSecond warning: Missed assignments','Michael Doe','+1234567892','First warning: Late submissions\nSecond warning: Missed assignments','First warning: Late submissions\nSecond warning: Missed assignments','First warning: Late submissions\nSecond warning: Missed assignments',15,'2025-03-29 00:00:00','Active',NULL,NULL,NULL,NULL),(2,'admin','admin','2025-10-02 11:09:20','2025-10-02 11:09:20','Dhruv','asd','','admin@test','$2b$10$L5jNDWPVMS5bqVepjordfur3C8r482ghXXmHSnLRstFWsei/IMZBS','','0000-00-00','',NULL,'Y','STUDENT','','','','0000-00-00','','',0.00,0.00,'','','','','','',0,'','Paid','','','','','','','',0,'0000-00-00 00:00:00','Active','','','',''),(3,'admin','admin','2025-10-02 11:39:25','2025-10-02 11:40:02','asd','asd','','asd','$2b$10$iTmB/INr5P5vveEtgHc4.OvISivTaNtYCnmguOyUSqXBFpLrFKBFK','','0000-00-00','','https://lms-imgs.s3.ap-south-1.amazonaws.com/profile_pics/user_undefined.jpg','N','STUDENT','','','','0000-00-00','','',0.00,0.00,'','','','','','',0,'','Paid','','','','','','','',0,'0000-00-00 00:00:00','Active','','','','');
/*!40000 ALTER TABLE `doc_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_values`
--

DROP TABLE IF EXISTS `enum_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_values` (
  `id` varchar(20) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` varchar(50) DEFAULT NULL,
  `master_code` varchar(50) DEFAULT NULL,
  `master_name` varchar(100) NOT NULL,
  `value1` varchar(100) DEFAULT NULL,
  `value2` varchar(100) DEFAULT NULL,
  `value3` varchar(100) DEFAULT NULL,
  `value4` varchar(100) DEFAULT NULL,
  `value5` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_values`
--

LOCK TABLES `enum_values` WRITE;
/*!40000 ALTER TABLE `enum_values` DISABLE KEYS */;
INSERT INTO `enum_values` VALUES ('EV1000','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1000','USER_TYPE','STUDENT','','','',''),('EV1001','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1000','USER_TYPE','TEACHER','','','',''),('EV1002','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1000','USER_TYPE','ADMIN','','','',''),('EV1003','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1000','USER_TYPE','GUEST','','','',''),('EV1004','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 1','','','',''),('EV1005','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 2','','','',''),('EV1006','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 3','','','',''),('EV1007','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 4','','','',''),('EV1008','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 5','','','',''),('EV1009','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 6','','','',''),('EV1010','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 7','','','',''),('EV1011','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Semester 8','','','',''),('EV1012','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Summer Term','','','',''),('EV1013','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2000','SEMESTER','Winter Term','','','',''),('EV1014','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','A','','','',''),('EV1015','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','B','','','',''),('EV1016','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','C','','','',''),('EV1017','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','D','','','',''),('EV1018','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','E','','','',''),('EV1019','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2001','SECTION','F','','','',''),('EV1020','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Andhra Pradesh','','','',''),('EV1021','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Arunachal Pradesh','','','',''),('EV1022','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Assam','','','',''),('EV1023','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Bihar','','','',''),('EV1024','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Chhattisgarh','','','',''),('EV1025','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Goa','','','',''),('EV1026','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Gujarat','','','',''),('EV1027','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Haryana','','','',''),('EV1028','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Himachal Pradesh','','','',''),('EV1029','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Jharkhand','','','',''),('EV1030','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Karnataka','','','',''),('EV1031','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Kerala','','','',''),('EV1032','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Madhya Pradesh','','','',''),('EV1033','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Maharashtra','','','',''),('EV1034','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Manipur','','','',''),('EV1035','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Meghalaya','','','',''),('EV1036','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Mizoram','','','',''),('EV1037','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Nagaland','','','',''),('EV1038','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Odisha','','','',''),('EV1039','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Punjab','','','',''),('EV1040','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Rajasthan','','','',''),('EV1041','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Sikkim','','','',''),('EV1042','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Tamil Nadu','','','',''),('EV1043','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Telangana','','','',''),('EV1044','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Tripura','','','',''),('EV1045','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Uttar Pradesh','','','',''),('EV1046','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','Uttarakhand','','','',''),('EV1047','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','1001','STATE','West Bengal','','','',''),('EV1048','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','SYSTEM','','','',''),('EV1049','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','SECURITY','','','',''),('EV1050','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','PAYMENT','','','',''),('EV1051','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','REMINDER','','','',''),('EV1052','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','MESSAGE','','','',''),('EV1053','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','TASK','','','',''),('EV1054','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2002','ALERT TYPE','ERROR','','','',''),('EV1055','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','UNREAD','','','',''),('EV1056','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','READ','','','',''),('EV1057','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','ACKNOWLEDGED','','','',''),('EV1058','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','RESOLVED','','','',''),('EV1059','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','DISMISSED','','','',''),('EV1060','Admin','2025-08-09 00:00:00','Admin','2025-08-09 00:00:00','Y','2003','ALERT STATUS','EXPIRED','','','','');
/*!40000 ALTER TABLE `enum_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` varchar(20) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `feature_name` varchar(50) DEFAULT NULL,
  `feature_description` varchar(50) DEFAULT NULL,
  `feature_url` varchar(50) DEFAULT NULL,
  `display_sequence` int DEFAULT NULL,
  `parent_feature_id` varchar(20) DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `is_active` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES ('TR100','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','DASHBOARD','DASHBOARD','home.html',1,'','school','Y'),('TR101','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','USER MANAGEMENT','USER MANAGEMENT','',2,'','manage_accounts','Y'),('TR102','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','USER (Add/Edit/Del)','USER','usermanagementinq.html',1,'TR101','','Y'),('TR103','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','FACULTY & STAFF','FACULTY & STAFF','faculty_managementinq.html',2,'TR101','','N'),('TR107','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','COMMUNICATION AND NOTIFICATION','COMMUNICATION AND NOTIFICATION','',6,'','notifications','Y'),('TR108','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','DISCUSSION','DISCUSSION','discussioninq.html',1,'TR107','','N'),('TR109','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','ALERTS (Add/Del)','ALERTS','email_alertsinq.html',2,'TR107','','Y'),('TR110','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','MASTER DATA','MASTER DATA','',9,'','create_new_folder','Y'),('TR113','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','COURSES','COURSES','coursemasterinq.html',1,'TR110','','Y'),('TR114','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','SECTIONS','SECTIONS','sectiomasterinq.html',2,'TR110','','N'),('TR115','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','CLUBS','CLUBS','clubmasterinq.html',3,'TR110','','N'),('TR116','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','FESTS','FESTS','festmasterinq.html',4,'TR110','','N'),('TR117','Admin','2025-02-13 00:00:00','Admin','2025-02-13 00:00:00','HOSTEL','HOSTEL','hostelmasterinq.html',5,'TR110','','N');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-02 21:42:19
