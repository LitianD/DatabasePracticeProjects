/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2018-09-19 08:11:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ww
-- ----------------------------
DROP TABLE IF EXISTS `ww1`;
CREATE TABLE `ww1` (
  `ds` varchar(255) NOT NULL,
  `sdf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ds`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ww
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
