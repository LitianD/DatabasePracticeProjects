/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2018-09-19 08:26:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `SNO` decimal(6,0) NOT NULL,
  `SNAME` char(8) NOT NULL,
  `SEX` char(2) DEFAULT NULL,
  `BPLACE` char(20) DEFAULT NULL,
  PRIMARY KEY (`SNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
