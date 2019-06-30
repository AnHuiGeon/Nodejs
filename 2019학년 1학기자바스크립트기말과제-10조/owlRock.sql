-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: owlrock
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (47,'답은 3이에요','2019-06-14 11:30:43',9);
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
INSERT INTO `groups` VALUES (1,'김민석',25,'다들 반갑다 .내 이름은 김민석이라고 한다. 이번 학교에서는 사고 없이 졸업하고 싶으니 협조해줬으면 한다. 이상.','JPT 945, JLPT N1','/jojo1.jpg'),(2,'이상곤',23,'부족한 몸입니다만 열심히 했습니다.','JPT 870, JLPT N1','/jojo2.jpg'),(3,'안희건',26,'나 월배 안희건이다. 이리저리 둘러오다가 이 학교로 오게 되었는데 이 학교에서는 사고 안치고 조용히 지내고 싶다. 좋게좋게 지내보자','JPT 555','/jojo3.jpg'),(4,'변세진',24,'j반 환경구축중... 동기화중... 80% ... 90% ... 지금 이상으로 열심히 하겠습니다!','JPT 825, JLPT N1(진)','/jojo4.jpg'),(5,'오지우',22,'디자인이 별로 일수 있습니다. 밤낮으로 고민했습니다. 최선을 다했고 열심히 했습니다...','JPT 730, JLPT N3','/jojo5.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (9,'1 + 2가 뭔지 모르겠어요','2019-06-14 11:30:36');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester_contents`
--

DROP TABLE IF EXISTS `semester_contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semester_contents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester_contents`
--

LOCK TABLES `semester_contents` WRITE;
/*!40000 ALTER TABLE `semester_contents` DISABLE KEYS */;
INSERT INTO `semester_contents` VALUES (1,'수준별 일본 비즈니스 현장 회화 실습'),(2,'일본 비즈니스 매너, 일본 문화체험'),(3,'일어 청해/말하기/작문'),(4,'실무 일본어 회화, 현장 실습, 창의공학실무 등'),(5,'일본 IT 기업 견학'),(6,'한일 교류회 개최'),(13,'문화 탐방'),(14,'후쿠오카 대학 오픈캠퍼스 참석');
/*!40000 ALTER TABLE `semester_contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester_purposes`
--

DROP TABLE IF EXISTS `semester_purposes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semester_purposes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purpose` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester_purposes`
--

LOCK TABLES `semester_purposes` WRITE;
/*!40000 ALTER TABLE `semester_purposes` DISABLE KEYS */;
INSERT INTO `semester_purposes` VALUES (1,'일본 생활 적응력 향상 및 취업률 제고를 위함'),(2,'국가와 기업에서 요구하는 인재 양성'),(3,'취업 등 대외 경쟁 우위 선점'),(4,'해외 현지 생활체험을 통하여 외국어 활용 능력 향상');
/*!40000 ALTER TABLE `semester_purposes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester_summaries`
--

DROP TABLE IF EXISTS `semester_summaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semester_summaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `summary` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester_summaries`
--

LOCK TABLES `semester_summaries` WRITE;
/*!40000 ALTER TABLE `semester_summaries` DISABLE KEYS */;
INSERT INTO `semester_summaries` VALUES (160,'연수대상: 컴퓨터정보계열 2학년 WD-J'),(161,'연수장소: 일본 후쿠오카 연수기관'),(162,'연수기간: 8월 3일 ~ 9월 11일');
/*!40000 ALTER TABLE `semester_summaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semesterinfos`
--

DROP TABLE IF EXISTS `semesterinfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semesterinfos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `summary` varchar(400) NOT NULL,
  `purpose` varchar(400) NOT NULL,
  `content` varchar(400) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semesterinfos`
--

LOCK TABLES `semesterinfos` WRITE;
/*!40000 ALTER TABLE `semesterinfos` DISABLE KEYS */;
INSERT INTO `semesterinfos` VALUES (1,'연수대상: 컴퓨터정보계열 2학년 WD-J','일본 생활 적응력 향상 및 취업률 제고를 위함','수준별 일본 비즈니스 현장 회화 실습'),(2,'연수장소: 일본 후쿠오카 연수기관','국가와 기업에서 요구하는 인재 양성','일본 비즈니스 매너, 일본 문화체험'),(3,'연수기간: 8월 3일 ~ 9월 11일','취업 등 대외 경쟁 우위 선점','일어 청해/말하기/작문'),(4,'','해외 현지 생활체험을 통하여 외국어 활용 능력 향상','실무 일본어 회화, 현장 실습, 창의공학실무 등'),(5,'','','일본 IT 기업 견학'),(6,'','','한일 교류회 개최'),(7,'','','문화 탐방'),(8,'','','후쿠오카 대학 오픈캠퍼스 참석');
/*!40000 ALTER TABLE `semesterinfos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123@123','123','$2b$12$a/NZp0ndFWpqB6KROWZCVuyb7xf32SDzwVE9XaVTjYz2Xzs5SRe3O','local',NULL,'2019-05-23 10:40:17','2019-05-23 10:40:17',NULL),(2,'123@234','234','$2b$12$.ZkiCDRx/5XxLBu4VliUUuuUXgHEwUthJHmFlv0YnLqyJQ.6/BQES','local',NULL,'2019-05-23 10:42:38','2019-05-23 10:42:38',NULL),(3,'123@789','789','$2b$12$kRh3IHUBEVUClXXRLnCcLOVuFDhoahbwxfucfFoAhvKz4JCDNSjCy','local',NULL,'2019-05-23 10:50:17','2019-05-23 10:50:17',NULL),(4,'123@369','369','$2b$12$4NlXZN7NGFyIJp4lp4m/XOrJouQV0tnhHTzgf7O9C6X0Y/JyRJcla','local',NULL,'2019-05-23 11:01:49','2019-05-23 11:01:49',NULL),(5,'123@098','098','$2b$12$CYby8FJuBmlY8Cz8KU5TzuFbMiZtj0XS8mWL/nijjFYecb0vX0qhy','local',NULL,'2019-05-24 07:35:43','2019-05-24 07:35:43',NULL),(6,'123@147','147','$2b$12$rvs.KaB35BdXKiM6GIYIl.OViu7ulXa0HrRDlFgbnF6WMg6NsZcnK','local',NULL,'2019-05-24 11:27:11','2019-05-24 11:27:11',NULL),(7,'','','$2b$12$7N8KdmHLYEeYrVmPwkdV3uaBoVc6fVQSMuEzFEHMrQCj/FpznU54u','local',NULL,'2019-05-24 13:49:08','2019-05-24 13:49:08',NULL),(8,'123@543','543','$2b$12$HFYP8zIweYTqWOcO.jibGu4jjHTI6AAW7o7yD8CYFIEMaSm15gZZm','local',NULL,'2019-05-28 07:41:41','2019-05-28 07:41:41',NULL),(9,'kms@kms','minsuck','$2b$12$yv8Xg.USn0d8/efE4G80yux5y7tp1de8/8fzh8MYclJtrntF19TTy','local',NULL,'2019-05-28 11:28:45','2019-05-28 11:28:45',NULL),(10,'123@1234','1234','$2b$12$1mSHbmHQD7W503EaU9ElX.8Q0r.pHkjUfaFq8EGF7RTNwNa5phGB.','local',NULL,'2019-06-13 02:31:37','2019-06-13 02:31:37',NULL);
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

-- Dump completed on 2019-06-15 16:15:57
