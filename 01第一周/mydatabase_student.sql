-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `sno` varchar(8) NOT NULL,
  `sname` varchar(8) NOT NULL,
  `ssex` varchar(2) NOT NULL,
  `sbirthday` date DEFAULT NULL,
  `classno` varchar(6) DEFAULT NULL,
  `Totalcredit` smallint(5) unsigned zerofill NOT NULL,
  PRIMARY KEY (`sno`),
  foreign key(`classno`) references class(`classno`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('08300010','李在','男','1991-10-01','Rj0801',00000),('08300012','葛畅','男','1990-08-08','Rj0801',00000),('08300015','刘晶','女','1990-05-22','Rj0801',00000),('08300020','杨敏','女','1989-01-08','Rj0801',00000),('08300030','胡贤斌','男','1990-10-08','Rj0801',00000),('08300048','赵鸿泽','男','1989-06-06','Rj0802',00000),('08300050','王威','男','1990-06-10','Rj0802',00000),('08300067','赵玮','女','1990-08-21','Rj0803',00000),('08300075','王娜娜','女','1991-09-23','Rj0803',00000),('08300088','秦键','男','1989-03-01','Rj0803',00000),('08300100','田邦仪','女','1990-02-26','Rj0804',00000),('08300148','赵心砚','男','1991-04-25','Rj0805',00000),('08300160','杨玲玲','女','1990-12-12','Rj0806',00000);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-24 16:50:42
