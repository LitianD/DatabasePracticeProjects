/*
 Navicat Premium Data Transfer

 Source Server         : Xiang
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : practice

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 24/09/2018 15:30:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sc
-- ----------------------------
DROP TABLE IF EXISTS `sc`;
CREATE TABLE `sc`  (
  `sno` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cno` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `grade` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`sno`, `cno`) USING BTREE,
  INDEX `cno`(`cno`) USING BTREE,
  CONSTRAINT `sc_ibfk_1` FOREIGN KEY (`sno`) REFERENCES `student` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sc_ibfk_2` FOREIGN KEY (`cno`) REFERENCES `course` (`cno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sc
-- ----------------------------
INSERT INTO `sc` VALUES ('08300010', '800003', 55);
INSERT INTO `sc` VALUES ('08300010', '810011', 91);
INSERT INTO `sc` VALUES ('08300012', '800002', 91);
INSERT INTO `sc` VALUES ('08300012', '800003', NULL);
INSERT INTO `sc` VALUES ('08300012', '810011', 78);
INSERT INTO `sc` VALUES ('08300015', '800002', 89);
INSERT INTO `sc` VALUES ('08300015', '800003', 95);
INSERT INTO `sc` VALUES ('08300015', '810011', 58);
INSERT INTO `sc` VALUES ('08300015', '810015', 67);

SET FOREIGN_KEY_CHECKS = 1;
