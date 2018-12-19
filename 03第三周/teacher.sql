/*
 Navicat Premium Data Transfer

 Source Server         : 32323
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : homework

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 24/09/2018 14:58:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `tno` int(6) NOT NULL,
  `tname` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tsex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '男',
  `tbirthday` date NOT NULL,
  `ttitle` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`tno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, '李英', '女', '1975-11-03', '讲师');
INSERT INTO `teacher` VALUES (2, '王大山', '男', '1969-03-02', '副教授');
INSERT INTO `teacher` VALUES (3, '张朋', '男', '1970-02-13', '讲师');
INSERT INTO `teacher` VALUES (4, '陈为军', '男', '1985-08-14', '助教');
INSERT INTO `teacher` VALUES (5, '宋浩然', '男', '1976-04-23', '讲师');
INSERT INTO `teacher` VALUES (6, '许红霞', '女', '1966-02-12', '副教授');
INSERT INTO `teacher` VALUES (7, '徐永军', '男', '1962-01-24', '教授');
INSERT INTO `teacher` VALUES (8, '李桂菁', '女', '1960-12-15', '教授');
INSERT INTO `teacher` VALUES (9, '王一凡', '女', '1974-12-08', '讲师');
INSERT INTO `teacher` VALUES (10, '田峰', '男', '1988-01-18', '助教');

SET FOREIGN_KEY_CHECKS = 1;
