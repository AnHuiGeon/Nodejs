-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nodetest
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `questioner` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questioner` (`questioner`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`questioner`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (10,'답은 3입니다.?','2019-05-24 18:26:14',1),(12,'답은 3이지????!!!','2019-05-24 18:27:07',1),(13,'8','2019-05-25 03:43:03',3),(14,'8이죠','2019-05-25 03:43:08',3),(15,'8일지도','2019-05-25 03:43:13',3),(16,'3이라니까요','2019-05-25 03:46:10',1),(17,'3일거야','2019-05-25 03:47:34',1),(18,'3일것입니다11','2019-05-25 03:48:47',1),(20,'12!!!','2019-05-27 10:05:14',5),(21,'12!??????','2019-05-27 10:05:18',5),(22,'12??????????????????','2019-05-27 10:06:43',5),(23,'12?!@#?!@?#!@?#?!@','2019-05-27 10:07:24',5),(24,'10','2019-05-27 10:31:12',4),(25,'10','2019-05-27 10:31:15',4),(26,'10?!!!1','2019-05-27 10:31:18',4),(27,'12212121212121212','2019-05-27 10:31:32',5),(30,'김민석!','2019-05-28 11:01:22',7),(31,'김민석아니야???','2019-05-28 11:01:27',7),(32,'김민석븅신!','2019-05-28 11:01:31',7),(33,'2222222222222222222222222222222222222222222222222','2019-05-28 11:25:58',6),(34,'22222222222222222222222','2019-05-28 11:26:02',6),(35,'kms 맞아??','2019-05-28 11:31:26',7),(36,'nemui','2019-05-28 11:39:31',7),(39,'4??????','2019-06-08 02:28:55',2),(40,'4입니다','2019-06-08 02:29:01',2),(41,'8일거에요','2019-06-08 02:29:09',3);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `age` int(11) NOT NULL,
  `introduce` varchar(400) NOT NULL,
  `license` varchar(100) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'KMS',25,'intro1','JPT945','/jojo1.jpg'),(2,'LSG',23,'intro2','JPT945','/jojo2.jpg'),(3,'AHG',36,'intro3','JPT945','/jojo3.jpg'),(4,'BSJ',24,'intro4','JPT945','/jojo4.jpg'),(5,'OJW',22,'intro5','JPT945','/jojo5.jpg');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'1+2?','2019-05-24 15:09:09'),(2,'1+3?','2019-05-24 15:09:40'),(3,'1+7?','2019-05-24 15:47:59'),(4,'1+9?','2019-05-25 03:42:32'),(5,'2+10?','2019-05-27 10:05:08'),(6,'111+111?','2019-05-28 07:41:50'),(7,'kms','2019-05-28 11:01:09'),(8,'123','2019-05-28 11:17:53');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) DEFAULT NULL,
  `nick` varchar(15) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `provider` varchar(10) NOT NULL DEFAULT 'local',
  `snsId` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123@123','123','$2b$12$a/NZp0ndFWpqB6KROWZCVuyb7xf32SDzwVE9XaVTjYz2Xzs5SRe3O','local',NULL,'2019-05-23 10:40:17','2019-05-23 10:40:17',NULL),(2,'123@234','234','$2b$12$.ZkiCDRx/5XxLBu4VliUUuuUXgHEwUthJHmFlv0YnLqyJQ.6/BQES','local',NULL,'2019-05-23 10:42:38','2019-05-23 10:42:38',NULL),(3,'123@789','789','$2b$12$kRh3IHUBEVUClXXRLnCcLOVuFDhoahbwxfucfFoAhvKz4JCDNSjCy','local',NULL,'2019-05-23 10:50:17','2019-05-23 10:50:17',NULL),(4,'123@369','369','$2b$12$4NlXZN7NGFyIJp4lp4m/XOrJouQV0tnhHTzgf7O9C6X0Y/JyRJcla','local',NULL,'2019-05-23 11:01:49','2019-05-23 11:01:49',NULL),(5,'123@098','098','$2b$12$CYby8FJuBmlY8Cz8KU5TzuFbMiZtj0XS8mWL/nijjFYecb0vX0qhy','local',NULL,'2019-05-24 07:35:43','2019-05-24 07:35:43',NULL),(6,'123@147','147','$2b$12$rvs.KaB35BdXKiM6GIYIl.OViu7ulXa0HrRDlFgbnF6WMg6NsZcnK','local',NULL,'2019-05-24 11:27:11','2019-05-24 11:27:11',NULL),(7,'','','$2b$12$7N8KdmHLYEeYrVmPwkdV3uaBoVc6fVQSMuEzFEHMrQCj/FpznU54u','local',NULL,'2019-05-24 13:49:08','2019-05-24 13:49:08',NULL),(8,'123@543','543','$2b$12$HFYP8zIweYTqWOcO.jibGu4jjHTI6AAW7o7yD8CYFIEMaSm15gZZm','local',NULL,'2019-05-28 07:41:41','2019-05-28 07:41:41',NULL),(9,'kms@kms','minsuck','$2b$12$yv8Xg.USn0d8/efE4G80yux5y7tp1de8/8fzh8MYclJtrntF19TTy','local',NULL,'2019-05-28 11:28:45','2019-05-28 11:28:45',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-08 17:45:08
