/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : mm

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 11/02/2021 01:49:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bbs_config
-- ----------------------------
DROP TABLE IF EXISTS `bbs_config`;
CREATE TABLE `bbs_config`  (
  `config_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID：[0,2147483647]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '变量名：[0,16]',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'string' COMMENT '数据类型：[0,16]string文本型、number数字型、boolean布尔型',
  `title` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量标题：[0,16]可以用中文名',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量值：[0,255]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量描述：[0,255]描述该变量的作用',
  `model` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '数据模型：json格式，用于单选、多选模式',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '社区配置：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bbs_config
-- ----------------------------

-- ----------------------------
-- Table structure for bbs_thread
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread`;
CREATE TABLE `bbs_thread`  (
  `thread_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主题id：[0,8388607]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后前台才会显示该主题(0否|1是)',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态：[1,5](1正常|2推荐|3认证|4违规|5官方)',
  `type_id` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '主题分类ID：[0,1000]用来搜索指定类型的主题(bbs_thread_type)',
  `channel_id` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT '频道ID：[0,10000]该主题所属频道，仅该频道列表可以看到该主题(bbs_thread_channel)',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '排序：[0,10000]决定主题显示的顺序',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市ID：[0,8388607]对于一些地方主题，可以通过该ID筛看(sys_address_city)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑这篇主题到本站的用户ID(user_account.nickname)',
  `hot` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '热度：[0,1000000000]访问这篇主题的人次',
  `praise` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞次数：[0,1000000000]',
  `collect_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '采集规则ID：[0,1000000000]如果主题是通过采集的方式获得，那么具有采集ID',
  `time_create` datetime(0) NOT NULL DEFAULT '1997-01-01 00:00:00' COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '标题：[0,125]用于主题和html的<title>标签中',
  `keywords` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,125]用于搜索引擎收录',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]用于主题提纲和搜索引擎收录',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '来源地址：[0,255]用于跳转到发布该主题的网站',
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签：[0,255]用于标注主题所属相关内容，多个标签用空格隔开',
  `img` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '封面图：用于显示于主题列表页，多个封面图用换行分隔',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '正文：主题的主体内容',
  `collecter` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '收藏者：多个收藏者用”,“分隔',
  PRIMARY KEY (`thread_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '社区主题：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bbs_thread
-- ----------------------------

-- ----------------------------
-- Table structure for bbs_thread_channel
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_channel`;
CREATE TABLE `bbs_thread_channel`  (
  `channel_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '频道ID：[0,10000]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后才可以看到该频道(0否|1是)',
  `hide` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否隐藏：[0,1]隐藏非管理员该频道无法查看.(0否|1是)',
  `can_comment` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。(0否|1是)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]决定频道显示的先后顺序',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级频道展开时，才显示该频道(bbs_thread_channel.name.channel_id)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市：[0,8388607]一些地方频道，可以通过该条判断是否可查看(sys_address_city)',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '频道名称：[2,16]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '频道标题：[0,125]',
  `template` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '风格模板：[0,64]频道和主题都使用的样式。question问答、info资讯、news新闻、article文章、activity活动',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该频道的作用',
  `icon` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '频道图标：',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '外链地址：[0,255]如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  PRIMARY KEY (`channel_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '主题板块：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bbs_thread_channel
-- ----------------------------

-- ----------------------------
-- Table structure for bbs_thread_comment
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_comment`;
CREATE TABLE `bbs_thread_comment`  (
  `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论id：[0,2147483647]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用则显示该评论(0否|1是)',
  `score` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评分：[0,5]最低1分、最多5分',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示排序：[0,1000]决定显示的顺序',
  `thread_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 1 COMMENT '所属主题id：[0,8388607](bbs_thread.title)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑评论的用户ID(user_account.nickname)',
  `tag` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签：[0,64]评论人给的标签，多个标签用空格隔开',
  `reply` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '评论回复：对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '正文：评论内容',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '主题评论：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bbs_thread_comment
-- ----------------------------

-- ----------------------------
-- Table structure for bbs_thread_type
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_type`;
CREATE TABLE `bbs_thread_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主题分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](bbs_thread_type.name.type_id)',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称：[0,16]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `icon` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '分类图标：',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '主题分类：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bbs_thread_type
-- ----------------------------

-- ----------------------------
-- Table structure for cms_ad
-- ----------------------------
DROP TABLE IF EXISTS `cms_ad`;
CREATE TABLE `cms_ad`  (
  `ad_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '广告ID：[0,32767]',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,10000]数值越小，越优先显示',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放城市ID：[0,8388607](sys_address_city)',
  `area_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放地区：[0,8388607](sys_address_area)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '广告主ID：[0,8388607]表示是谁打的广告(user_account.nickname)',
  `times_user` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '访客数：[0,2147483647]',
  `times_max` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '次数上限：[0,2147483647]表示点击或展现达多少次后不再打该广告',
  `times_show` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '展现量：[0,2147483647]',
  `times_click` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击量：[0,2147483647]',
  `fee` double(5, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用：每次点击或展现、增加访客所需的费用',
  `fee_max` double(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用上限：表示打广告消费到多少钱后不再打广告',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '广告名称：[0,16]',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告类型：[0,16]text文字、img图片、video视频、flash交互动画',
  `location` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '投放位置：[0,16]',
  `fee_way` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付费方式：[0,16]click点击付费、show展现付费、user访客付费',
  `app` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '展现应用：[0,16]将在指定的应用下才展现广告',
  `trade` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属行业：[0,24]可以根据不同的行业定制不同的投放',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告标题：[0,32]',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告描述：[0,255]',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告图：[0,255]',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]在出现于关键词相关的情况下才打广告，多个关键词用空格分隔',
  PRIMARY KEY (`ad_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'CMS广告：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_ad
-- ----------------------------
INSERT INTO `cms_ad` VALUES (1, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告1', 'banner', '', '', '', '', 'banner_1', '', '', '/cms/home_pc/template/default/img/banner/banner_3.jpg', '/', '');
INSERT INTO `cms_ad` VALUES (2, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告2', 'banner', '', '', '', '', 'banner_2', '', '', '/cms/home_pc/template/default/img/banner/banner_2.jpg', '/', '');
INSERT INTO `cms_ad` VALUES (3, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告3', 'banner', '', '', '', '', 'banner_3', '', '', '/cms/home_pc/template/default/img/banner/banner_1.jpg', '/', '');

-- ----------------------------
-- Table structure for cms_article
-- ----------------------------
DROP TABLE IF EXISTS `cms_article`;
CREATE TABLE `cms_article`  (
  `article_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章id：[0,8388607]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后前台才会显示该文章(0否|1是)',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态：[1,5](1正常|2推荐|3认证|4违规|5官方)',
  `type_id` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文章分类ID：[0,1000]用来搜索指定类型的文章(cms_article_type)',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '排序：[0,10000]决定文章显示的顺序',
  `channel_id` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT '频道ID：[0,10000]该文章所属频道，仅该频道列表可以看到该文章(cms_article_channel)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑这篇文章到本站的用户ID(user_account.nickname)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市ID：[0,8388607]对于一些地方文章，可以通过该ID筛看(sys_address_city)',
  `hot` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '热度：[0,1000000000]访问这篇文章的人次',
  `praise` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞次数：[0,1000000000]',
  `collect_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '采集规则ID：[0,1000000000]如果文章是通过采集的方式获得，那么具有采集ID',
  `time_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `lang` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'zh_cn' COMMENT '语言：[0,16]默认zh_cn(zh_cn|en|zh_tw|ko|ja)',
  `author` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者：[0,16]写出该文章的人',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标题：[0,125]用于文章和html的title标签中',
  `keywords` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,125]用于搜索引擎收录',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]用于文章提纲和搜索引擎收录',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '来源：[0,255]文章的出处',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '来源地址：[0,255]用于跳转到发布该文章的网站',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,255]用于标注文章所属相关内容，多个标签用空格隔开',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '封面图：[0,255]用于显示于文章列表页，多个封面图用换行分隔',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '正文：文章的主体内容',
  `collecter` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '收藏者：多个收藏者用”,“分隔',
  PRIMARY KEY (`article_id`, `title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章：用于内容管理系统的文章' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_article
-- ----------------------------
INSERT INTO `cms_article` VALUES (6, 1, 1, 0, 100, 12, 0, 0, 0, 0, 0, '2020-12-17 13:57:14', '2020-12-17 14:19:42', 'zh_cn', '', '2017年超级美眉程序框架诞生', '', '', '', '', '', '', '', '');
INSERT INTO `cms_article` VALUES (7, 1, 1, 0, 100, 12, 0, 0, 0, 0, 0, '2020-12-17 00:00:00', '2020-12-17 14:19:43', 'zh_cn', '', '2018年基于超级美眉开发手机选号应用', '', '', '', '', '', '', '', '');
INSERT INTO `cms_article` VALUES (8, 1, 1, 0, 100, 11, 0, 0, 0, 0, 0, '2020-12-17 00:00:00', '2020-12-17 14:49:12', 'zh_cn', '', '选号平台', '', '一个在线交易手机号码的网站，在这里你能够根据各种条件搜索到自己喜欢的号码来进行购买。', '', '', '', '', '', '');
INSERT INTO `cms_article` VALUES (9, 1, 1, 0, 100, 11, 0, 0, 0, 0, 0, '2020-12-17 00:00:00', '2020-12-17 14:50:44', 'zh_cn', '', '企业官网', '', '一个具有中英文切换和风格切换的企业网站，并且带有SEO优化功能，适合企业建站宣传自己。', '', '', '', '', '', '');
INSERT INTO `cms_article` VALUES (10, 1, 1, 0, 100, 11, 0, 0, 0, 0, 0, '2020-12-17 00:00:00', '2020-12-21 17:27:04', 'zh_cn', '', '同城信息网', '类同 百姓网 58同城 信息分类网 服务 求职 招聘 租房 买房', '一个类似于58同城的信息分类网站，可以比58同城更精细的分类信息和更精准的找到自己想要的信息', '', '', '', '', '', '');

-- ----------------------------
-- Table structure for cms_article_channel
-- ----------------------------
DROP TABLE IF EXISTS `cms_article_channel`;
CREATE TABLE `cms_article_channel`  (
  `channel_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '频道ID：[0,10000]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后才可以看到该频道。(0否|1是)',
  `hide` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否隐藏：[0,1]隐藏非管理员该频道无法查看。(0否|1是)',
  `can_comment` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。(0否|1是)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]决定频道显示的先后顺序',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级频道展开时，才显示该频道(cms_article_channel.name.channel_id)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市：[0,8388607]一些地方频道，可以通过该条判断是否可查看。(sys_address_city)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '频道名称：[2,16]',
  `template` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风格模板：[0,64]频道和文章都使用的样式',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该频道的作用',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '频道图标：',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '外链地址：[0,255]如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '频道标题：[0,125]',
  PRIMARY KEY (`channel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章频道：用于汇总浏览文章，在不同频道下展示不同文章。' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_article_channel
-- ----------------------------
INSERT INTO `cms_article_channel` VALUES (2, 1, 1, 0, 100, 0, 0, 'info', '', '企业信息', '', '', '企业信息');
INSERT INTO `cms_article_channel` VALUES (3, 1, 0, 0, 100, 0, 0, 'help', '', '操作帮助', '', '', '操作帮助');
INSERT INTO `cms_article_channel` VALUES (4, 1, 0, 0, 100, 0, 0, 'product', '', '产品展示', '', '', '产品展示');
INSERT INTO `cms_article_channel` VALUES (5, 1, 0, 0, 100, 4, 0, 'ui', '', 'UI类产品展示', '', '', 'UI');
INSERT INTO `cms_article_channel` VALUES (6, 1, 0, 0, 100, 4, 0, 'front_end', '', '前端产品展示', '', '', '前端');
INSERT INTO `cms_article_channel` VALUES (7, 1, 0, 0, 100, 4, 0, 'after_end', '', '后端产品展示', '', '', '后端');
INSERT INTO `cms_article_channel` VALUES (8, 1, 0, 0, 100, 0, 0, 'doc', '', '开发文档', '', '', '开发文档');
INSERT INTO `cms_article_channel` VALUES (9, 1, 0, 0, 100, 8, 0, 'doc_front_end', '', '前端开发文档', '', '', '前端开发文档');
INSERT INTO `cms_article_channel` VALUES (10, 1, 0, 0, 100, 8, 0, 'doc_after_end', '', '后端开发文档', '', '', '后端开发文档');
INSERT INTO `cms_article_channel` VALUES (11, 1, 0, 0, 100, 4, 0, 'package', '', '完整应用展示', '', '', '完整应用');
INSERT INTO `cms_article_channel` VALUES (12, 1, 0, 0, 100, 2, 0, 'event', '', '历史事件', '', '', '历史事件');

-- ----------------------------
-- Table structure for cms_article_comment
-- ----------------------------
DROP TABLE IF EXISTS `cms_article_comment`;
CREATE TABLE `cms_article_comment`  (
  `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论id：[0,2147483647]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用则显示该评论(0否|1是)',
  `score` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评分：[0,5]最低1分、最多5分',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示排序：[0,1000]决定显示的顺序',
  `article_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 1 COMMENT '所属文章id：[0,8388607](cms_article.title)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑评论的用户ID(user_account.nickname)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言者姓名：[2,16]用于实名回复',
  `tag` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,64]评论人给的标签，多个标签用空格隔开',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '正文：评论内容',
  `reply` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '评论回复：对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章评论：用于记录读者对某文章的评论' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_article_comment
-- ----------------------------

-- ----------------------------
-- Table structure for cms_article_section
-- ----------------------------
DROP TABLE IF EXISTS `cms_article_section`;
CREATE TABLE `cms_article_section`  (
  `section_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '章节模块ID：[0,2147483647]',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '排序：[0,10000]决定文章显示的顺序',
  `article_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '对应文章ID：[0,2147483647](cms_article.title)',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '章节标题：[0,255]',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '章节标签：[0,255]',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '章节内容：',
  `img` varchar(0) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '章节图片：',
  PRIMARY KEY (`section_id`, `title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章章节：文章的正文是单独一块保存的，一个个章节保存' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_article_section
-- ----------------------------

-- ----------------------------
-- Table structure for cms_article_type
-- ----------------------------
DROP TABLE IF EXISTS `cms_article_type`;
CREATE TABLE `cms_article_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](cms_article_type.name.type_id)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称：[0,16]',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '分类图标：',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章分类：将文章归类，可选看不同类型的文章' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_article_type
-- ----------------------------

-- ----------------------------
-- Table structure for cms_lang
-- ----------------------------
DROP TABLE IF EXISTS `cms_lang`;
CREATE TABLE `cms_lang`  (
  `lang_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '语言ID',
  `key` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文',
  `zh_cn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '简体中文',
  `zh_tw` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '繁体中文',
  `ko` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '韩文',
  `ja` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日文',
  PRIMARY KEY (`lang_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'CMS语言包：用于开发站点多国语' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_lang
-- ----------------------------
INSERT INTO `cms_lang` VALUES (1, 'web_name', 'MM', '超级美眉', '', '', '');
INSERT INTO `cms_lang` VALUES (2, 'btn_sign_in', 'SignIn', '登录', '', '', '');
INSERT INTO `cms_lang` VALUES (3, 'btn_sign_up', 'SignUp', '注册', '', '', '');
INSERT INTO `cms_lang` VALUES (4, 'nav_home', 'Home', '首页', '', '', '');
INSERT INTO `cms_lang` VALUES (5, 'nav_about', 'About', '关于我们', '', '', '');
INSERT INTO `cms_lang` VALUES (6, 'nav_product', 'Product', '产品展示', '', '', '');
INSERT INTO `cms_lang` VALUES (7, 'nav_document', 'Document', '开发文档', '', '', '');
INSERT INTO `cms_lang` VALUES (8, 'nav_forum', 'Forum', '论坛', '', '', '');
INSERT INTO `cms_lang` VALUES (9, 'nav_service', 'Service', '技术服务', '', '', '');
INSERT INTO `cms_lang` VALUES (10, 'nav_contact', 'Contact', '联系方式', '', '', '');
INSERT INTO `cms_lang` VALUES (11, 'btn_read_more', 'Read More', '查看更多', '', '', '');
INSERT INTO `cms_lang` VALUES (12, 'btn_more', 'More', '更多', '', '', '');
INSERT INTO `cms_lang` VALUES (13, 'banner_1', 'Software development actually has a lot of considerations', '软件开发其实有很多注意事项', '', '', '');
INSERT INTO `cms_lang` VALUES (14, 'banner_2', 'Professional development team and solutions make you worry free', '专业的开发团队和解决方案让您无忧无虑', '', '', '');
INSERT INTO `cms_lang` VALUES (15, 'banner_3', 'Explore the world of super applications with us', '和我们一起探索超级应用的世界', '', '', '');
INSERT INTO `cms_lang` VALUES (16, 'title_online_solutions', 'Online solutions', '在线解决方案', '', '', '');
INSERT INTO `cms_lang` VALUES (17, 'desc_online_solutions', 'Cloud excel is used to provide solutions, which is convenient for cooperation and can be viewed and changed at any time', '采用云excel提供解决方案，协作方便，随时可看可改', '', '', '');
INSERT INTO `cms_lang` VALUES (18, 'title_team', 'Senior engineer team', '高级工程师团队', '', '', '');
INSERT INTO `cms_lang` VALUES (19, 'desc_team', 'Collaborative development of technical teams from Huawei, Tencent and other enterprises', '从华为、腾讯等企业出来的技术团队协作开发', '', '', '');
INSERT INTO `cms_lang` VALUES (20, 'title_document', 'Secondary development document', '二次开发文档', '', '', '');
INSERT INTO `cms_lang` VALUES (21, 'desc_document', 'Have mature program architecture and perfect development documents', '拥有成熟的程序架构和完善的开发文档', '', '', '');
INSERT INTO `cms_lang` VALUES (22, 'title_welcome', 'Welcome to our website', '欢迎来到我们网站', '', '', '');
INSERT INTO `cms_lang` VALUES (23, 'content_welcome_1', 'Maybe you\'ve met a lot of development companies to come to us, but when you see us, you will find that we are your best choice', '也许你看到过许多的开发公司才找到我们，但是当你看到我们之后就会发现，我们就是你最好的选择。', '', '', '');
INSERT INTO `cms_lang` VALUES (24, 'content_welcome_2', 'Reasonable price is only a feature. What\'s more, our development framework superior to the market after use makes it easier for you to upgrade your application and innovate with the market at any time', '合理的价格只是一个特点。更重要的是，我们的开发框架在使用后优于市场，使您更容易升级应用程序，并随时与市场一起创新', '', '', '');
INSERT INTO `cms_lang` VALUES (25, 'title_apply', 'Apply for preferential price', '申请优惠价', '', '', '');
INSERT INTO `cms_lang` VALUES (26, 'input_desc_search', 'Search service or document...', '搜索服务或文档...', '', '', '');
INSERT INTO `cms_lang` VALUES (27, 'desc_apply', 'Officially start activities in 2021', '2021年正式启动活动', '', '', '');
INSERT INTO `cms_lang` VALUES (28, 'content_apply', 'If you are our regular customers or introduced by customers, we will give you more favorable prices and give you valuable marketing services', '如果你是我们的老客户，或者是客户介绍过来的，我们将给你更加优惠的价格和赠送你超值的营销服务', '', '', '');
INSERT INTO `cms_lang` VALUES (29, 'title_form_need', 'Demand consultation', '需求咨询', '', '', '');
INSERT INTO `cms_lang` VALUES (30, 'desc_form_need', 'Free needs analysis for you', '免费为您分析需求', '', '', '');
INSERT INTO `cms_lang` VALUES (31, 'btn_submit', 'Submit', '提交', '', '', '');
INSERT INTO `cms_lang` VALUES (32, 'input_desc_name', 'Please enter your name', '请输入您的姓名', '', '', '');
INSERT INTO `cms_lang` VALUES (33, 'input_desc_phone', 'Please enter your phone', '请输入您的手机号码', '', '', '');
INSERT INTO `cms_lang` VALUES (34, 'dev_web', 'Complete DIY<br />Official website', '完成定制<br />企业官网', '', '', '');
INSERT INTO `cms_lang` VALUES (35, 'dev_blockchain', 'Complete a<br />blockchain app', '完成一款<br />区块链应用', '', '', '');
INSERT INTO `cms_lang` VALUES (36, 'dev_mall', 'Complete the whole<br />e-commerce platform', '完成整套<br />电商平台', '', '', '');
INSERT INTO `cms_lang` VALUES (37, 'dev_app', 'Complete large-scale<br />commercial app', '完成大型<br />商业应用', '', '', '');
INSERT INTO `cms_lang` VALUES (38, 'dev_sns', 'SNS', '社交软件', '', '', '');
INSERT INTO `cms_lang` VALUES (39, 'dev_platform', 'Electronic platform', '电商平台', '', '', '');
INSERT INTO `cms_lang` VALUES (40, 'dev_code', 'Code up', '源码升级', '', '', '');
INSERT INTO `cms_lang` VALUES (41, 'dev_science', 'Science', '科学实验', '', '', '');
INSERT INTO `cms_lang` VALUES (42, 'dev_finance', 'Finance', '金融理财', '', '', '');
INSERT INTO `cms_lang` VALUES (43, 'dev_block_chain', 'Block chain', '区块链应用', '', '', '');
INSERT INTO `cms_lang` VALUES (44, 'dev_manage_system', 'Manage system', '管理系统', '', '', '');
INSERT INTO `cms_lang` VALUES (45, 'dev_web_ui', 'Web UI', '网页设计', '', '', '');
INSERT INTO `cms_lang` VALUES (46, 'title_profile', 'Company Profile', '企业简介', '', '', '');
INSERT INTO `cms_lang` VALUES (47, 'content_profile_1', '', '深圳图灵魔方信息科技有限公司专注于科技信息咨询和移动应用开发领域，主要开发电商、社交、区块链相关应用。“图灵魔方”在应用设计和开发领域是为数不多的拥有自主研发框架和高级技术，能够在业内中更快速开发出优质应用。', '', '', '');
INSERT INTO `cms_lang` VALUES (48, 'content_profile_2', '', '原来我们只是为其他开发公司所服务，现在我们直接为需求方服务，不仅价格实惠，还更能实现理想的应用效果。', '', '', '');
INSERT INTO `cms_lang` VALUES (49, 'title_framework', 'MM', '超级美眉', '', '', '');
INSERT INTO `cms_lang` VALUES (50, 'desc_framework', 'Framework', '应用框架', '', '', '');
INSERT INTO `cms_lang` VALUES (51, 'content_framework', '', '这是用JavaScript编程语言开发的商业级应用框架，适用于大型商城、中小型游戏、社交软件开发，框架简化了对函数和数据的调用，让开发应用变得更加轻松、灵活。全新的架构体让多人协作开发和升级维护更加容易，是未来理想的选择。', '', '', '');
INSERT INTO `cms_lang` VALUES (52, 'title_latest_product', 'Latest Product', '最近产品', '', '', '');
INSERT INTO `cms_lang` VALUES (53, 'title_latest_event', 'Latest event', '最近事件', '', '', '');
INSERT INTO `cms_lang` VALUES (54, 'btn_view_all', 'View all', '查看全部', '', '', '');
INSERT INTO `cms_lang` VALUES (55, 'title_about_us', 'About Our Institution', '关于我们机构', '', '', '');
INSERT INTO `cms_lang` VALUES (56, 'desc_about_us', 'About Our Institution', '关于我们机构的介绍', '', '', '');

-- ----------------------------
-- Table structure for cms_nav
-- ----------------------------
DROP TABLE IF EXISTS `cms_nav`;
CREATE TABLE `cms_nav`  (
  `nav_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '导航ID：[0,32767]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '英文名称：[0,32]用于多国语识别',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文标题：[0,32]用于中文提示',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]跳转的链接地址',
  `style` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '风格样式：[0,255]自定义css样式',
  `class` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '样式类型：[0,32]绑定的css class',
  `target` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转方式：[0,32]_blank表示新窗口跳转',
  `position` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'top' COMMENT '展现位置：[0,125]top顶部、bottom底部、side侧边，main主要，quick快捷，menu菜单，多个位置用逗号隔开',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级导航展开时，才显示该导航(sys_nav.name.nav_id)',
  PRIMARY KEY (`nav_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'CMS导航：用于管理员自定义应用的导航' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cms_nav
-- ----------------------------
INSERT INTO `cms_nav` VALUES (1, 'home', '首页', '/', '', '', '', 'top', '', 0);
INSERT INTO `cms_nav` VALUES (2, 'about', '关于我们', '/about', '', '', '', 'top', '', 0);
INSERT INTO `cms_nav` VALUES (3, 'product', '产品展示', '/product', '', '', '', 'top', '', 0);
INSERT INTO `cms_nav` VALUES (4, 'service', '技术服务', '/service', '', '', '', 'top', '', 0);
INSERT INTO `cms_nav` VALUES (5, 'contact', '联系方式', '/contact', '', '', '', 'top', '', 0);

-- ----------------------------
-- Table structure for dev_app
-- ----------------------------
DROP TABLE IF EXISTS `dev_app`;
CREATE TABLE `dev_app`  (
  `app_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '应用ID：[0,2147483647]',
  `type_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '应用分类ID：[0,2147483647](dev_app_type.name.type_id)',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '应用名：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]',
  PRIMARY KEY (`app_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '应用：用于引导创建应用' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_app
-- ----------------------------

-- ----------------------------
-- Table structure for dev_app_type
-- ----------------------------
DROP TABLE IF EXISTS `dev_app_type`;
CREATE TABLE `dev_app_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '应用分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](dev_app_type.name.type_id)',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分类名称：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '应用分类：将应用归类，方便选择构建不同的应用' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_app_type
-- ----------------------------

-- ----------------------------
-- Table structure for dev_component
-- ----------------------------
DROP TABLE IF EXISTS `dev_component`;
CREATE TABLE `dev_component`  (
  `page_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '适用页面ID：[0,2147483647](dev_page.name.page_id)',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用次数：[0,2147483647]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '组件名称：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]',
  PRIMARY KEY (`page_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '组件：用于组装成新页面' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_component
-- ----------------------------

-- ----------------------------
-- Table structure for dev_component_type
-- ----------------------------
DROP TABLE IF EXISTS `dev_component_type`;
CREATE TABLE `dev_component_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '页面分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](dev_component_type.name.type_id)',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分类名称：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '组件分类：将组件归类，方便引用不同的组件' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_component_type
-- ----------------------------

-- ----------------------------
-- Table structure for dev_page
-- ----------------------------
DROP TABLE IF EXISTS `dev_page`;
CREATE TABLE `dev_page`  (
  `page_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '页面ID：[0,2147483647]',
  `group_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '页面分组ID：[0,2147483647](dev_page_group.name.group_id)',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用次数：[0,2147483647]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '页面名称：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]',
  PRIMARY KEY (`page_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '页面：用于构建MVC或MVVM页面' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_page
-- ----------------------------

-- ----------------------------
-- Table structure for dev_page_group
-- ----------------------------
DROP TABLE IF EXISTS `dev_page_group`;
CREATE TABLE `dev_page_group`  (
  `group_id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '页面分组ID：[0,30000]',
  `display` int(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` int(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组ID：[0,32767](dev_page_group.name.group_id)',
  `app_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '适用的应用ID：[0,2147483647](dev_app.name.app_id)',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用次数：[0,2147483647]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分组名称：[0,16]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组描述：[0,255]',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '页面分组：将文章归类，可选看不同类型的文章' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_page_group
-- ----------------------------

-- ----------------------------
-- Table structure for dev_table
-- ----------------------------
DROP TABLE IF EXISTS `dev_table`;
CREATE TABLE `dev_table`  (
  `table_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '数据表ID：[0,2147483647]',
  `app_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '适用的应用ID：[0,2147483647](dev_app.name.app_id)',
  `group_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '数据表分组ID：[0,2147483647](dev_table_group.name.group_id)',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用次数：[0,2147483647]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '表名：[0,32]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]',
  PRIMARY KEY (`table_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据表：用于构建应用时自动创建表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_table
-- ----------------------------

-- ----------------------------
-- Table structure for dev_table_field
-- ----------------------------
DROP TABLE IF EXISTS `dev_table_field`;
CREATE TABLE `dev_table_field`  (
  `field_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '字段ID：[0,2147483647]',
  `key` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否主键：[0,1]',
  `fill_zero` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否补零：[0,1]',
  `not_null` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否非空：[0,1]',
  `symbol` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否含符号：[0,1]',
  `decimal` smallint(2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '小数点位：[0,99]',
  `table_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '适用的表ID：[0,2147483647](dev_table.name.table_id)',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '使用次数：[0,2147483647]',
  `min_length` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最小长度：[0,2147483647]',
  `max_length` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最大长度：[0,2147483647]',
  `min` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最小值：[0,2147483647]',
  `max` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '最大值：[0,2147483647]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '字段名：[0,32]',
  `type` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '数据类型：[0,32]',
  `auto` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '自动：[0,125]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]',
  `default` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '默认值：[0,255]',
  `map` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联图：[0,255]',
  PRIMARY KEY (`field_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '开发表字段：用于构建数据表时自动创建字段' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_table_field
-- ----------------------------

-- ----------------------------
-- Table structure for dev_table_group
-- ----------------------------
DROP TABLE IF EXISTS `dev_table_group`;
CREATE TABLE `dev_table_group`  (
  `group_id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '数据表分组ID：[0,30000]',
  `display` int(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` int(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分组ID：[0,32767](dev_table_group.name.group_id)',
  `app_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '适用的应用ID：[0,2147483647](dev_app.name.app_id)',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分组名称：[0,16]',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组标题：[0,125]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组描述：[0,255]',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据表分组：将数据表分组，方便创造新表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_table_group
-- ----------------------------

-- ----------------------------
-- Table structure for dev_template
-- ----------------------------
DROP TABLE IF EXISTS `dev_template`;
CREATE TABLE `dev_template`  (
  `template_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '模板ID：[0,2147483647]',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模板图片：[0,255]',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件路径：[0,255]',
  `colors` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '支持颜色：[0,255]',
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签：[0,255]用于标注模板相关标签，多个标签用空格隔开',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称：[0,64]',
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题：[0,64]',
  PRIMARY KEY (`template_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dev_template
-- ----------------------------

-- ----------------------------
-- Table structure for mall_ad
-- ----------------------------
DROP TABLE IF EXISTS `mall_ad`;
CREATE TABLE `mall_ad`  (
  `ad_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '广告ID：[0,32767]',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,10000]数值越小，越优先显示',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放城市ID：[0,8388607](sys_address_city)',
  `area_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放地区：[0,8388607](sys_address_area)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '广告主ID：[0,8388607]表示是谁打的广告(user_account.nickname)',
  `times_user` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '访客数：[0,2147483647]',
  `times_max` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '次数上限：[0,2147483647]表示点击或展现达多少次后不再打该广告',
  `times_show` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '展现量：[0,2147483647]',
  `times_click` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击量：[0,2147483647]',
  `fee` double(5, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用：每次点击或展现、增加访客所需的费用',
  `fee_max` double(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用上限：表示打广告消费到多少钱后不再打广告',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '广告名称：[0,16]',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告类型：[0,16]text文字、img图片、video视频、flash交互动画',
  `location` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '投放位置：[0,16]',
  `fee_way` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付费方式：[0,16]click点击付费、show展现付费、user访客付费',
  `app` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '展现应用：[0,16]将在指定的应用下才展现广告',
  `trade` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属行业：[0,24]可以根据不同的行业定制不同的投放',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告标题：[0,32]',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告描述：[0,255]',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告图：[0,255]',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]在出现于关键词相关的情况下才打广告，多个关键词用空格分隔',
  PRIMARY KEY (`ad_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商城广告：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_ad
-- ----------------------------

-- ----------------------------
-- Table structure for mall_config
-- ----------------------------
DROP TABLE IF EXISTS `mall_config`;
CREATE TABLE `mall_config`  (
  `config_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID：[1,2147483647]',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '变量名：[0,16]',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'string' COMMENT '数据类型：[0,16]string文本型、number数字型、boolean布尔型',
  `title` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '变量标题：[0,16]可以用中文名',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '变量描述：[0,255]描述该变量的作用',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '变量值：[0,255]',
  `model` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '数据模型：json格式，用于单选、多选模式',
  PRIMARY KEY (`config_id`, `name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商城配置：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_config
-- ----------------------------

-- ----------------------------
-- Table structure for mall_lang
-- ----------------------------
DROP TABLE IF EXISTS `mall_lang`;
CREATE TABLE `mall_lang`  (
  `lang_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '语言ID：[0,2147483647]',
  `key` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '主键：[0,32]',
  `en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文：[0,255]',
  `zh_cn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '简体中文：[0,255]',
  `zh_tw` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '繁体中文：[0,255]',
  `ko` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '韩文：[0,255]',
  `ja` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日文：[0,255]',
  PRIMARY KEY (`lang_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商城语言：用于开发站点多国语' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_lang
-- ----------------------------

-- ----------------------------
-- Table structure for mall_nav
-- ----------------------------
DROP TABLE IF EXISTS `mall_nav`;
CREATE TABLE `mall_nav`  (
  `nav_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '导航ID：[0,32767]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后才可以看到该导航。(0否|1是)',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '英文名称：[0,32]用于多国语识别',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文标题：[0,32]用于中文提示',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]跳转的链接地址',
  `style` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '风格样式：[0,255]自定义css样式',
  `class` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '样式类型：[0,32]绑定的css class',
  `target` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转方式：[0,32]_blank表示新窗口跳转',
  `position` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'top' COMMENT '展现位置：[0,125]top顶部、bottom底部、side侧边，main主要，quick快捷，menu菜单，多个位置用逗号隔开',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级导航展开时，才显示该导航(mall_nav.name.nav_id)',
  PRIMARY KEY (`nav_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商城导航：用于管理员自定义应用的导航' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_nav
-- ----------------------------

-- ----------------------------
-- Table structure for mall_product
-- ----------------------------
DROP TABLE IF EXISTS `mall_product`;
CREATE TABLE `mall_product`  (
  `product_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '产品id：[0,8388607]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后前台才会显示该产品(0否|1是)',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态：[0,5](1出售中|2预售中|3已下架|4已删除|5已违规)',
  `type_id` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '产品分类ID：[0,1000]用来搜索指定类型的产品(mall_product_type.name)',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '排序：[0,10000]决定产品显示的顺序',
  `channel_id` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT '频道ID：[0,10000]该产品所属频道，该频道列表可以看到该产品(mall_product_channel.name)',
  `shop_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '店铺ID：[0,8388607]该商品所属的店铺(mall_shop.name)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市ID：[0,8388607]对于一些地方产品，可以通过该ID筛看(sys_address_city)',
  `hot` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '热度：[0,1000000000]访问这篇产品的人次',
  `praise` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞次数：[0,1000000000]',
  `price` double(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '卖价：[1]',
  `price_old` double(8, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '原价：[1]',
  `time_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]用于产品和html的<title>标签中',
  `keywords` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,125]用于搜索引擎收录',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]用于产品提纲和搜索引擎收录',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,255]用于标注产品所属相关内容，多个标签用空格隔开',
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '封面图：用于显示于产品列表页，多个封面图用换行分隔',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '正文：产品的主体内容',
  `collecter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '收藏者：多个收藏者用”,“分隔',
  `brand` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '品牌：[0,18]商品的品牌',
  `group_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分组ID：[0,8388607]该商品在店铺的分组(mall_product_group.name)',
  `sales` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '销量：[0,1000000000]',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品信息：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product
-- ----------------------------
INSERT INTO `mall_product` VALUES (1, 1, 2, 2, 100, 1, 1, 130200, 1, 3, 2.50, 8.56, '1997-01-01 00:00:00', '2020-06-23 21:03:02', '商品1', 'cvbjkl', 'cvbnklm', NULL, '', NULL, NULL, NULL, 0, 0);

-- ----------------------------
-- Table structure for mall_product_augmented
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_augmented`;
CREATE TABLE `mall_product_augmented`  (
  `augmented_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '附加产品ID：[0,2147483647]',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品名称：[0,255]',
  `group` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品分组：[0,32]',
  `price` decimal(10, 2) NOT NULL COMMENT '附加价格：',
  `shop_id` mediumint(9) UNSIGNED NOT NULL DEFAULT 0 COMMENT '店铺ID：[0,8388607]',
  PRIMARY KEY (`augmented_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '附加商品：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_augmented
-- ----------------------------

-- ----------------------------
-- Table structure for mall_product_channel
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_channel`;
CREATE TABLE `mall_product_channel`  (
  `channel_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '频道ID：[0,10000]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后才可以看到该频道。(0否|1是)',
  `hide` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否隐藏：[0,1]隐藏非管理员该频道无法查看。(0否|1是)',
  `can_comment` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。(0否|1是)',
  `display` mediumint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]决定频道显示的先后顺序',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级频道展开时，才显示该频道(mall_product_channel.name.channel_id)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市：[0,8388607]一些地方频道，可以通过该条判断是否可查看(sys_address_city)',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'product' COMMENT '频道类型：[0,16]question问答、info资讯、news新闻、product产品、activity活动',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '频道名称：[2,16]',
  `template` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风格模板：[0,64]频道和产品都使用的样式',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '频道图标：',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '外链地址：[0,255]如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该频道的作用',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '频道标题：[0,125]',
  PRIMARY KEY (`channel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品专区：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_channel
-- ----------------------------
INSERT INTO `mall_product_channel` VALUES (1, 1, 0, 0, 100, 0, 222400, 'info', '美食', '', '', '', '', NULL);
INSERT INTO `mall_product_channel` VALUES (2, 0, 0, 0, 100, 1, 0, 'info', '简餐便当', '', '', '', '', NULL);
INSERT INTO `mall_product_channel` VALUES (3, 0, 0, 0, 100, 0, 0, 'info', '汉堡披萨', '', '', '', '', NULL);
INSERT INTO `mall_product_channel` VALUES (4, 0, 0, 0, 100, 1, 0, 'info', '炸鸡炸串', '', '', '', '', NULL);
INSERT INTO `mall_product_channel` VALUES (5, 0, 0, 0, 100, 1, 0, 'info', '奶茶果汁', '', '', '', '', NULL);

-- ----------------------------
-- Table structure for mall_product_comment
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_comment`;
CREATE TABLE `mall_product_comment`  (
  `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论id：[0,2147483647]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用则显示该评论(0否|1是)',
  `score` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评分：[0,5]最低1分、最多5分',
  `display` smallint(3) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示排序：[0,1000]决定显示的顺序',
  `product_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 1 COMMENT '所属产品id：[0,8388607](mall_product.title)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑评论的用户ID(user_account.nickname)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言者姓名：[2,16]用于实名回复',
  `tag` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,64]评论人给的标签，多个标签用空格隔开',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '正文：评论内容',
  `reply` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '评论回复：对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品评论：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_comment
-- ----------------------------
INSERT INTO `mall_product_comment` VALUES (1, 1, 0, 100, 1, 1, NULL, '可爱', '这是我见过最可爱的雪糕', NULL);
INSERT INTO `mall_product_comment` VALUES (2, 0, 0, 100, 1, 6, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for mall_product_group
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_group`;
CREATE TABLE `mall_product_group`  (
  `group_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '产品分组ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分组名称：[0,16]',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '分组图标：',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分组描述：[0,255]',
  `shop_id` mediumint(9) UNSIGNED NOT NULL DEFAULT 0 COMMENT '店铺ID：[0,8388607]对应每个商家店铺(mall_shop.name)',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分组标题：[0,125]',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品分组：用于店铺自定义产品分组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_group
-- ----------------------------
INSERT INTO `mall_product_group` VALUES (34, 100, '爱尚酸菜小鱼', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (35, 100, '小酥肉系列', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (36, 100, '无骨烤鱼饭', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (37, 100, '鱼伴侣（配菜）', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (38, 100, '爱尚必点冒菜', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (39, 100, '新品香锅', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (40, 100, '爱尚特色香锅', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (41, 100, '爱尚有凉菜', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (42, 100, '爱尚酒水饮料', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (43, 100, '米饭单点', '', '', 1, NULL);
INSERT INTO `mall_product_group` VALUES (44, 100, '测试菜', '', '', 1, NULL);

-- ----------------------------
-- Table structure for mall_product_property
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_property`;
CREATE TABLE `mall_product_property`  (
  `property_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '产品分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称：[0,16]',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '分类图标：',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  PRIMARY KEY (`property_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品属性：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_property
-- ----------------------------
INSERT INTO `mall_product_property` VALUES (1, 100, '食品 ', 'data:image/jpeg;base64,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6idiWeMKAFUnJI6V2lABRRRQAVnzaxbW2swaZcLJFJcput5XA8uVhnMYOfvgDdggZHIzhsaFc34otrnXQPD1vbOkcyrLcX7oQtsobgxHvNlcrj7mAx/hDAGpDrFtc6zPpluskslsm64lQDy4mOMRk5++Qd2ADgcnGVzoVzfhe2udCB8PXFs7xwq0tvfohK3KluTKe02Wy2fv5LD+IL0lAGb4i/5FnVv+vOb/ANANaVZviL/kWdW/685v/QDWlVv4F6v9CF8b9F+oUUUVBZSSwdLlrgXcqs5UyIiqEYgAdwSBx61dqPzo/wC9+lHnR/3v0oAoz/8AIzWP/Xnc/wDocFaVY93N/wAVHYlG/wCXS4zx/tw1d86T+9+lXPaPp+rIhvL1/REP9gaN/wBAmw/8Bk/wqe20ywspDJa2NtBIRtLRRKpI9MgdOKTzpP736UedJ/e/SoLLdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KALdFVPOk/vfpR50n979KAJ4LeG1hENvDHDGCSEjUKAScngepJP41JVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgCeW3hn8vzoY5PLcSJvUHaw6MM9D71JVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP736UedJ/e/SgC3RVTzpP7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6vf2mlraQ2iX01pNPdxyI5VXiKoUXBGMuSMnPA6GqmqxarqF9pVxN4d1XzLPH2gQvatHOMo+0Fp1IAdFOSvQEY5pNNh1Sy1bVr2Hw5qoe9B+zid7RUt87mILLOxIZ2J4Xj0OKAOx0+9j1LTbW+hBEdzEsqg9QGAI/nWd4q1aTRfD897DcW0EiFQrXITacnGPnliXP1cfj0q7o9h/ZWi2On+Z5n2aBIi+MbioAz+NRa/pCa9oN7pck0kK3MTR+ZGzKVJHB+Ugkeozg9DxQB5nZfErV/7CsbmbVtD8wxM9xJNHH/D5Ix+7uSN37x26BjtwI62bzxVeL45/s+01GV2adBDZtLapDIhgD/MCDcDLfxKCB+BFXJPh6V1tb+x1O6tthiAkkvLqaQopBdATMAA20D5g49quan4U1W8uLu5t9fe3klu0uIYordBGmFVPn3B2chQfulASe3UAFbS/Fmr/ANib9SsbYXhtbeWB47guJWmcom8eWu35sZAzxVv/AITOw0/UtVsNZ1bSrSezMYiEsywmXMSsTtZs43EgY+nPWo5PD2ovaXWIraB4EtUsY4bgyb1t5C67mZF2ls7SBnHqaIJ9Stb/AFiceGNZkF/IrDa9mAm2MJxm4yc7c9B1oAueHtfu9SGnfbUgB1DTUvYjCpGDhfMU5Jzy6kH0OD0yejrlPDWl3sT6W11a3FrFpmnfY41uDHvlYldz4jdwBiNcfMfvH0rq6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDP17/AJF3U/8Ar0l/9ANaFZ+vf8i7qf8A16S/+gGtCrfwL1f6EL436L9QoooqCyK2toLO2jtrWCOCCJQscUSBVQDoABwBTLKwstOhaGxtILWJnLlIIwilj1OAOp9af9ni9JP+/wDJ/wDF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P/iaKgslooooAz3/AORq03/r2uP5xVYs/wDVS/8AXxN/6Maq7/8AI1ab/wBe1x/OKrFn/qpf+vib/wBGNVz2j6fqyIby9f0RYoooqCxyffFTf5/z/n/60KffFTf5/wA/5/8ArAEqfcFOpqfcFOoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsvUfDWg6xcC41PRNNvp1XYJLm0SVgvplgTjk/nWpRQBT03SdN0e3a30vT7SxhZt7R2sKxKWwBkhQBnAHPtVyiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMTxR/wAgO/8A+vKf/wBBq5VPxR/yA7//AK8p/wD0GrlW/gXq/wBCF8b9F+oUUUVBZU/tGL/nhe/+AU3/AMTR/aMX/PC9/wDAKb/4mtqigDm47hLjxVp21J1221xnzYHj7x9NwGfwq7Z/6qX/AK+Jv/RjUXn/ACNWlf8AXtc/zios/wDVS/8AXxN/6MarntH0/VkQ3l6/oixRRRUFjk++Km/z/n/P/wBaFPvipv8AP+f8/wD1gCVPuCnU1PuCnUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBieKP8AkB3/AP15T/8AoNL/AGjF/wA8L3/wCm/+JpPFH/IDv/8Aryn/APQa26t/AvV/oQvjfov1MX+0Yv8Anhe/+AU3/wATRW1RUFhRRRQBkXn/ACNWlf8AXtc/zios/wDVS/8AXxN/6Mai8/5GrSv+va5/nFRZ/wCql/6+Jv8A0Y1XPaPp+rIhvL1/RFiiiioLHJ98VN/n/P8An/60KffFTf5/z/n/AOsASp9wU6mp9wU6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMTxR/wAgO/8A+vKf/wBBrbrE8Uf8gO//AOvKf/0GturfwL1f6EL436L9QoooqCwooooAyLz/AJGrSv8Ar2uf5xUWf+ql/wCvib/0Y1F5/wAjVpX/AF7XP84qLP8A1Uv/AF8Tf+jGq57R9P1ZEN5ev6IsUUUVBY5Pvipv8/5/z/8AWhT74qb/AD/n/P8A9YAlT7gp1NT7gp1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAYnij/AJAd/wD9eU//AKDW3WJ4o/5Ad/8A9eU//oNbdW/gXq/0IXxv0X6hRRRUFhRWN4r03+1vDl1ZeVdTByhMdq0QkcBgcDzf3bA4wVfgjINcivh+9ax0c6n4TtbzT7YXCto1rFBGkbMwMcpiaTyi20ODhzgvkdTgQG9Fqv2/x6bPydn9nrNDv358zdHbyZxjj7+O/StKz/1Uv/XxN/6Maue0rSJtP+Ilzdy2q26XiMYQjgrsSG2XAA6AMGHQZx6YrobP/VS/9fE3/oxq0n8MfQiO8vX9EWKKKKzLHJ98VN/n/P8An/60KffFTf5/z/n/AOsASp9wU6mp9wU6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMTxR/wAgO/8A+vKf/wBBrbrE8Uf8gO//AOvKf/0GturfwL1f6EL436L9QoooqCzKsPDOgaVdm607Q9Ms7kgqZre0jjfB6jKgHFatFFAGRef8jVpX/Xtc/wA4qLP/AFUv/XxN/wCjGovP+Rq0r/r2uf5xUWf+ql/6+Jv/AEY1XPaPp+rIhvL1/RFiiiioLHJ98VN/n/P+f/rQp98VN/n/AD/n/wCsASp9wU6mp9wU6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMTxR/yA7/8A68p//Qa26xPFH/IDv/8Aryn/APQa26t/AvV/oQvjfov1CiiioLCiiigDIvP+Rq0r/r2uf5xUWf8Aqpf+vib/ANGNRef8jVpX/Xtc/wA4qLP/AFUv/XxN/wCjGq57R9P1ZEN5ev6IsUUUVBY5Pvipv8/5/wA//WhT74qb/P8An/P/ANYAlT7gp1NT7gp1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAYnij/kB3/wD15T/+g1t1ieKP+QHf/wDXlP8A+g1t1b+Ber/QhfG/RfqFFFFQWFFFFAGRef8AI1aV/wBe1z/OKiz/ANVL/wBfE3/oxqLz/katK/69rn+cVFn/AKqX/r4m/wDRjVc9o+n6siG8vX9EWKKKKgscn3xU3+f8/wCf/rQp98VN/n/P+f8A6wBKn3BTqan3BTqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAxPFH/ACA7/wD68p//AEGtusTxR/yA7/8A68p//Qa26t/AvV/oQvjfov1CiiioLOMuvHVxDr0mnQaFdXUdtLHBdSwRXD7ZGCk7CsJRlUOMlnQ8Hjpnotd1KbSNHmvbexmvpUKhYIlYk5YDJCqzYGcnarHAOAahbwzpJ1Jb9beSOYbMrFcSJE5QYUvGrBHIAGCykjA9BUKxazqnmWms6ZYW9m4z5tlqszShgeMYijK/UNkUdPMOt+hT0/VRq+s6PcF7JpDa3W77Fcm4iHzxjAcquT8pyMDByK0rP/VS/wDXxN/6MaqkOm2mk6/pNrZxskYgu2JeRpHZi0RLMzEsxJPUkmrdn/qpf+vib/0Y1XPaP9dWRDeXr+iLFFFFQWOT74qb/P8An/P/ANaFPvipv8/5/wA//WAJU+4KdTU+4KdQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAGJ4o/5Ad//wBeU/8A6DW3WJ4o/wCQHf8A/XlP/wCg1t1b+Ber/QhfG/RfqFFFFQWFFFFAGRef8jVpX/Xtc/zios/9VL/18Tf+jGovP+Rq0r/r2uf5xUWf+ql/6+Jv/RjVc9o+n6siG8vX9EWKKKKgscn3xU3+f8/5/wDrQp98VN/n/P8An/6wBKn3BTqan3BTqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAxPFH/IDv/8Aryn/APQa26xPFH/IDv8A/ryn/wDQa26t/AvV/oQvjfov1CiiioLCiiigDIvP+Rq0r/r2uf5xUWf+ql/6+Jv/AEY1F5/yNWlf9e1z/OKiz/1Uv/XxN/6MarntH0/VkQ3l6/oixRRRUFjk++Km/wA/5/z/APWhT74qb/P+f8//AFgCVPuCnU1PuCnUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBieKP+QHf/wDXlP8A+g1t1ieKP+QHf/8AXlP/AOg1t1b+Ber/AEIXxv0X6hRRRUFhRRRQBkXn/I1aV/17XP8AOKiz/wBVL/18Tf8AoxqLz/katK/69rn+cVFn/qpf+vib/wBGNVz2j6fqyIby9f0RYoooqCxyffFTf5/z/n/60KffFTf5/wA/5/8ArAEqfcFOpqfcFOoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDE8Uf8gO//AOvKf/0GtusTxR/yA7//AK8p/wD0GturfwL1f6EL436L9QoooqCwooooAyLz/katK/69rn+cVFn/AKqX/r4m/wDRjUXn/I1aV/17XP8AOKiz/wBVL/18Tf8Aoxque0fT9WRDeXr+iLFFFFQWOT74qb/P+f8AP/1oU++Km/z/AJ/z/wDWAJU+4KdTU+4KdQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAGJ4o/5Ad/8A9eU//oNbdYnij/kB3/8A15T/APoNbdW/gXq/0IXxv0X6hRRRUFhRRRQBkXn/ACNWlf8AXtc/ziqzJMVlZdz8HoATVa8/5GrSv+va5/nFU7f8fUn0H8zVz2j6fqyIby9f0QfaD/ek/wC+Wo+0H+9J/wB8tXNa94yt9Cu5YmtfPigRfOlF3BCI5HyUQmZ0HIUng5HHBzVCz+IcN9oWo6hBpu6SwtfPlSPULadN2PuboZHbnBwSgzg8Z4qFrqW9DtPtB/vSf98tR9oP96T/AL5avPx4+1mBg114fURNMiBljv49iswXkyWirkE5yWUV6DQAn2g/3pP++Wp8f2iVN6EbSSBlyDwcelNqxaf8e4/3m/8AQjQAzy7r1T/v4f8ACjy7r1T/AL+H/CuVuvFmow6hqxtdMu7lLWZIFhktbhEUAcvuSF3csW4CKyhUBJXdznWvijxVqHhTU2OlTWuoW9sXjkWC581n3cAJJaqp4z93eeny80r6XC2tju/LuvVP+/h/wo8u69U/7+H/AArx6HxN42k1K4gju9XkMTQ7YzZueGPO7Ompxj1Mf1PWvTrvVdTt/F2nacYLRdOuklxIHZpWZVB6YAQA+7Zz/Djliuafl3Xqn/fw/wCFRyPNCyiQn5gSNrE9Me3vV6qt1/rov91v6UDIftB/vSf98tR9oP8Aek/75auF8S/EldBvryzt9Jnu5bXbvLpNGpGyRzhhEw4EfB6HJOQFJrT0/wATanei7mOkW8ltbSIpa0vHldlbBLBGiXOAc4zk4OM8ZAeh0/2g/wB6T/vlqPtB/vSf98tXKP4l13+zb3U4dE05rG1ecZfU3WVliZlJ2iAgE7TgbvxrqwcgH1oAPtB/vSf98tR9p/2pOP8AZNLTE+9J/vf0FADvtB/vSf8AfLUfaD/ek/75asyHXLa41yTS4PnkhRzMTkGNl8v5cEc5EgOelV7PxLFPpQvriwv4V8qKXEdtJPvDgEbPLUlsHIPAIxkgAgk6XA2/tB/vSf8AfLUfaD/ek/75auWt/H2lXGo3lotrqx+zbMldJu2bLAnBURZXt165rqVYOisM4IyMgg/kelAB9oP96T/vlqcJWZQQ7YIyOaSmRf6lP90UAS73/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502igB29/7zfnRvf+83502igB29/7zfnRvf8AvN+dNooAdvf+8350b3/vN+dNooAdvf8AvN+dG9/7zfnTaKAHb3/vN+dG9/7zfnTaKAHb3/vN+dG9/wC83502igB29/7zfnRvf+83502igB29/wC8350b3/vN+dNooAdvf+8350b3/vN+dNooAdvf+8350b3/ALzfnTaKAHb3/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502igB29/7zfnRvf+83502igB29/7zfnRvf8AvN+dNooAdvf+8350b3/vN+dNooAdvf8AvN+dG9/7zfnTaKAHb3/vN+dG9/7zfnTaKAHb3/vN+dG9/wC83502igB29/7zfnRvf+83502igB29/wC8350b3/vN+dNooAdvf+8350b3/vN+dNooAdvf+8350b3/ALzfnTaKAHb3/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502igB29/7zfnRvf+83502igB29/7zfnRvf8AvN+dNooAdvf+8350b3/vN+dNooAdvf8AvN+dG9/7zfnTaKAHb3/vN+dG9/7zfnTaKAHb3/vN+dG9/wC83502igB29/7zfnRvf+83502igB29/wC8350b3/vN+dNooAdvf+8350b3/vN+dNooAdvf+8350b3/ALzfnTaKAHb3/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502igB29/7zfnRvf+83502igB29/7zfnRvf8AvN+dNooAdvf+8350b3/vN+dNooAdvf8AvN+dG9/7zfnTaKAHb3/vN+dG9/7zfnTaKAHb3/vN+dG9/wC83502igB29/7zfnRvf+83502igB29/wC8350b3/vN+dNooAdvf+8350b3/vN+dNooAdvf+8350b3/ALzfnTaKAHb3/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502igB29/7zfnRvf+83502igB29/7zfnRvf8AvN+dNooAdvf+8350b3/vN+dNooAdvf8AvN+dG9/7zfnTaKAHb3/vN+dG9/7zfnTaKAHb3/vN+dG9/wC83502igB29/7zfnRvf+83502igB29/wC8350b3/vN+dNooAdvf+8350b3/vN+dNooAdvf+8350b3/ALzfnTaKAHb3/vN+dG9/7zfnTaKAHb3/ALzfnRvf+83502ig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KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/woAZRT/In/ALsf/fZ/wo8if+7H/wB9n/CgBlFP8if+7H/32f8ACjyJ/wC7H/32f8KAGUU/yJ/7sf8A32f8KPIn/ux/99n/AAoAZRT/ACJ/7sf/AH2f8KPIn/ux/wDfZ/wo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', NULL);

-- ----------------------------
-- Table structure for mall_product_type
-- ----------------------------
DROP TABLE IF EXISTS `mall_product_type`;
CREATE TABLE `mall_product_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '产品分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](mall_product_type.name.type_id)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称：[0,16]',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '分类图标：',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '商品分类：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_product_type
-- ----------------------------
INSERT INTO `mall_product_type` VALUES (1, 100, 0, '餐饭', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (2, 100, 1, '蔬菜', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (3, 100, 1, '瓜果', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (4, 100, 1, '肉禽', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (5, 100, 1, '海鲜', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (6, 100, 1, '炖汤', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (7, 100, 1, '主食', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (8, 100, 1, '凉拌', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (9, 100, 1, '五谷', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (10, 100, 1, '酒水', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (11, 100, 1, '糖水', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (12, 100, 1, '甜品', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (13, 100, 1, '点心', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (14, 100, 1, '小吃', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (15, 100, 0, '饮品', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (16, 100, 15, '奶茶', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (17, 100, 15, '果汁', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (18, 100, 15, '咖啡', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (19, 100, 15, '鸡尾酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (20, 100, 15, '啤酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (21, 100, 15, '白酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (22, 100, 15, '红酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (23, 100, 15, '洋酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (24, 100, 15, '大补酒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (25, 100, 15, '冰沙', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (26, 100, 0, '特色菜', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (27, 100, 26, '铁板', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (28, 100, 26, '干锅', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (29, 100, 26, '小炒', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (30, 100, 26, '盖浇饭', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (31, 100, 26, '煲仔饭', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (32, 100, 26, '蒸饭', '', '', NULL);
INSERT INTO `mall_product_type` VALUES (33, 100, 26, '水煮', '', '', NULL);

-- ----------------------------
-- Table structure for mall_shop
-- ----------------------------
DROP TABLE IF EXISTS `mall_shop`;
CREATE TABLE `mall_shop`  (
  `shop_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '店铺id：[0,8388607]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后前台才会显示该店铺(0否|1是)',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态：[0,5](1营业中|2已歇业|3已关店|4已删除|5已违规)',
  `type_id` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '店铺分类ID：[0,1000]用来搜索指定类型的店铺(mall_shop_type.name)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '排序：[0,1000]决定店铺显示的顺序',
  `channel_id` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT '频道ID：[0,10000]该店铺所属频道，该频道列表可以看到该店铺(mall_shop_channel.name)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市ID：[0,8388607]对于一些地方店铺，可以通过该ID筛看(sys_address_city.name)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '店铺所属人ID：[0,8388607]即该店铺是属于哪个用户的(user_account.nickname)',
  `hot` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '热度：[0,1000000000]访问这篇店铺的人次',
  `praise` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞次数：[0,1000000000]',
  `time_create` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `name` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题：[0,125]用于店铺和html的<title>标签中',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]用于店铺提纲和搜索引擎收录',
  `keywords` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,64]用于搜索引擎收录',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '封面图：[0,255]用于显示于店铺列表页，多个封面图用换行分隔',
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,255]用于标注店铺所属相关内容，多个标签用空格隔开',
  `collecter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '收藏者：多个收藏者用”,“分隔',
  PRIMARY KEY (`shop_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '店铺信息：用于存储店铺相关的信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_shop
-- ----------------------------
INSERT INTO `mall_shop` VALUES (1, 1, 1, 2, 100, 0, 542500, 6, 5, 10, '1997-01-01 00:00:00', '2020-12-21 14:26:03', '粤海街道爱尚酸菜鱼小店', '主营酸菜鱼、烤鱼、酥肉、冒血旺', '', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAJlBTIDASIAAhEB', '', '');

-- ----------------------------
-- Table structure for mall_shop_channel
-- ----------------------------
DROP TABLE IF EXISTS `mall_shop_channel`;
CREATE TABLE `mall_shop_channel`  (
  `channel_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '频道ID：[0,10000]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用后才可以看到该频道(0否|1是)',
  `hide` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否隐藏：[0,1]隐藏非管理员该频道无法查看. 0为不隐藏，1为隐藏(0否|1是)',
  `can_comment` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。0为不可评论，1为可评论(0否|1是)',
  `display` mediumint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]决定频道显示的先后顺序',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级频道展开时，才显示该频道(mall_shop_channel.name.channel_id)',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市：[0,8388607]一些地方频道，可以通过该条判断是否可查看(sys_address_city.name)',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'shop' COMMENT '频道类型：[0,16]question问答、info资讯、news新闻、shop店铺、activity活动',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '频道名称：[2,16]',
  `template` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风格模板：[0,64]频道和店铺都使用的样式',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '频道图标：',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '外链地址：[0,255]如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该频道的作用',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '频道标题：[0,125]',
  PRIMARY KEY (`channel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '店铺专区：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_shop_channel
-- ----------------------------
INSERT INTO `mall_shop_channel` VALUES (1, 1, 0, 1, 100, 0, 620300, 'info', '美食区', '', '', '', '', NULL);
INSERT INTO `mall_shop_channel` VALUES (2, 1, 0, 1, 100, 0, 0, 'info', '零食区', '', '', '', '', NULL);

-- ----------------------------
-- Table structure for mall_shop_comment
-- ----------------------------
DROP TABLE IF EXISTS `mall_shop_comment`;
CREATE TABLE `mall_shop_comment`  (
  `comment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论id：[0,2147483647]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '是否启用：[0,1]启用则显示该评论(0否|是)',
  `score` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评分：[0,5]最低1分、最多5分',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示排序：[0,1000]决定显示的顺序',
  `shop_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 1 COMMENT '所属店铺id：[0,8388607](mall_shop.name)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]编辑评论的用户ID(user_account.nickname)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言者姓名：[2,16]用于实名回复',
  `tag` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签：[0,64]评论人给的标签，多个标签用空格隔开',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '正文：评论内容',
  `reply` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '评论回复：对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '店铺评论：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_shop_comment
-- ----------------------------
INSERT INTO `mall_shop_comment` VALUES (1, 1, 0, 100, 1, 6, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for mall_shop_type
-- ----------------------------
DROP TABLE IF EXISTS `mall_shop_type`;
CREATE TABLE `mall_shop_type`  (
  `type_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '店铺分类ID：[0,30000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类ID：[0,32767](mall_shop_type.name.type_id)',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称：[0,16]',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '分类图标：',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述：[0,255]',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类标题：[0,125]',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '店铺分类：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mall_shop_type
-- ----------------------------
INSERT INTO `mall_shop_type` VALUES (1, 100, 0, '餐饮', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (2, 100, 1, '中餐', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (3, 100, 1, '西餐', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (4, 100, 1, '饮品', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (5, 100, 1, '面点', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (6, 100, 1, '汤粉', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (7, 100, 1, '烧烤', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (8, 100, 1, '油炸', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (9, 100, 1, '火锅', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (10, 100, 1, '小吃', '', '', NULL);
INSERT INTO `mall_shop_type` VALUES (11, 100, 0, '食品', '', '', NULL);

-- ----------------------------
-- Table structure for sys_ad
-- ----------------------------
DROP TABLE IF EXISTS `sys_ad`;
CREATE TABLE `sys_ad`  (
  `ad_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '广告ID：[0,32767]',
  `display` smallint(5) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,10000]数值越小，越优先显示',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放城市ID：[0,8388607](sys_address_city)',
  `area_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '投放地区：[0,8388607](sys_address_area)',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '广告主ID：[0,8388607]表示是谁打的广告(user_account.nickname)',
  `times_user` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '访客数：[0,2147483647]',
  `times_max` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '次数上限：[0,2147483647]表示点击或展现达多少次后不再打该广告',
  `times_show` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '展现量：[0,2147483647]',
  `times_click` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击量：[0,2147483647]',
  `fee` double(5, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用：每次点击或展现、增加访客所需的费用',
  `fee_max` double(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '费用上限：表示打广告消费到多少钱后不再打广告',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '广告名称：[0,16]',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告类型：[0,16]text文字、img图片、video视频、flash交互动画',
  `location` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '投放位置：[0,16]',
  `fee_way` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付费方式：[0,16]click点击付费、show展现付费、user访客付费',
  `app` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '展现应用：[0,16]将在指定的应用下才展现广告',
  `trade` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属行业：[0,24]可以根据不同的行业定制不同的投放',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告标题：[0,32]',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告描述：[0,255]',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '广告图：[0,255]',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关键词：[0,255]在出现于关键词相关的情况下才打广告，多个关键词用空格分隔',
  PRIMARY KEY (`ad_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '广告信息：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_ad
-- ----------------------------
INSERT INTO `sys_ad` VALUES (1, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告1', 'banner', '', '', '', '', 'banner_1', '', '', '/cms/home_pc/template/default/img/banner/banner_3.jpg', '/', '');
INSERT INTO `sys_ad` VALUES (2, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告2', 'banner', '', '', '', '', 'banner_2', '', '', '/cms/home_pc/template/default/img/banner/banner_2.jpg', '/', '');
INSERT INTO `sys_ad` VALUES (3, 100, 0, 0, 0, 0, 0, 0, 0, 0.00, 0.00, '广告3', 'banner', '', '', '', '', 'banner_3', '', '', '/cms/home_pc/template/default/img/banner/banner_1.jpg', '/', '');

-- ----------------------------
-- Table structure for sys_address_area
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_area`;
CREATE TABLE `sys_address_area`  (
  `area_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '地区ID：[0,8388607]',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可见：[0,2](0仅表单可见|1表单和搜索可见|2均可见)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属城市ID：[0,8388607](sys_address_city)',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '地区名称：[0,16]',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '地区：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_address_area
-- ----------------------------

-- ----------------------------
-- Table structure for sys_address_city
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_city`;
CREATE TABLE `sys_address_city`  (
  `city_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '城市ID：[0,8388607]',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '显示位置：[0,2](0仅表单可见|1表单和搜索可见|2均可见)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `province_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所属省份ID：[0,8388607](sys_address_province)',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '城市名称：[0,16]',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '城市：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_address_city
-- ----------------------------
INSERT INTO `sys_address_city` VALUES (2, 0, 100, 0, '测试');

-- ----------------------------
-- Table structure for sys_address_province
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_province`;
CREATE TABLE `sys_address_province`  (
  `province_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '省份ID：[0,8388607]',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可见：[0,2](0仅表单可见|1表单和搜索可见|2均可见)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '省份名称：[0,16]',
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '省份：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_address_province
-- ----------------------------
INSERT INTO `sys_address_province` VALUES (1, 0, 100, '广东省');

-- ----------------------------
-- Table structure for sys_app
-- ----------------------------
DROP TABLE IF EXISTS `sys_app`;
CREATE TABLE `sys_app`  (
  `app_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '应用序号：[0,8388607]',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可用：[0,1]在未审核状态下， 该应用授权为不可用(0否|1是)',
  `encrypt` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '加解密方式：[0,10](1明文模式|2兼容模式|3安全模式)',
  `times_allow` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '每日允许请求次数：[0,32767]用于限制应用每日可授权次数',
  `times_today` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '今日请求次数：[0,32767]用于记录今日请求授权次数，判断授权次数是否超限',
  `max_age` smallint(5) UNSIGNED NOT NULL DEFAULT 1825 COMMENT '有效期时长：[0,32767]授权应用可以使用的时长，超时需重新申请。单位：天',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '持有者ID：[0,8388607]该客户端所有人的ID(user_account.nickname)',
  `times_count` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '请求总次数：[0,2147483647]用于记录授权总次数',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '上次使用时间：用于记录上次授权时间，防止频繁操作',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '应用名称：[0,16]用于用户登陆时显示授权应用',
  `appid` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '应用ID：[0,16]用于应用授权访问时的账号',
  `token` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息访问令牌：[0,32]用于访问应用时验证身份',
  `encoding_aes_key` varchar(43) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息加密钥匙：[16,43]用于给应用发送消息时的加密钥匙',
  `appsecret` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '应用密钥：[0,64]用于应用授权访问时的密码',
  `icon` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用图标：用于用户登录时显示',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息访问地址：[0,255]当接收到用户所发消息后回访该地址',
  `bind_ip` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '访问绑定IP：网站授权时确认重定向网址为已授权IP',
  `scope` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '允许使用的接口：多个接口用”，“分隔',
  `scope_not` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '不允许使用的接口：“多个接口用”，“分隔',
  `users` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '授权的用户：',
  PRIMARY KEY (`app_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '应用信息：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_app
-- ----------------------------

-- ----------------------------
-- Table structure for sys_app_refresh
-- ----------------------------
DROP TABLE IF EXISTS `sys_app_refresh`;
CREATE TABLE `sys_app_refresh`  (
  `refresh_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '刷新Token的ID：[0,2147483647]',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]表示当前Token绑定的用户uid(user_account.nickname)',
  `time_create` datetime(0) NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '创建时间：用来判断刷新令牌有效期',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：用来判断是否频繁刷新访问牌',
  `appid` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '应用ID：[0,16]',
  `refresh_token` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '刷新令牌：[0,32]用来刷新访问牌，保留30天',
  PRIMARY KEY (`refresh_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '应用刷新：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_app_refresh
-- ----------------------------

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `config_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID：[0,2147483647]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '变量名：[0,16]',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'string' COMMENT '数据类型：[0,16](string,文本型|number,数字型|boolean,布尔型)',
  `title` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量标题：[0,16]可以用中文名',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量值：[0,255]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '变量描述：[0,255]描述该变量的作用',
  `model` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '数据模型：json格式，用于单选、多选模式',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统配置：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, 'theme_name', 'string', '主题风格', 'default', '用于配置系统默认主题风格', '');
INSERT INTO `sys_config` VALUES (2, 'theme_color', 'string', '主题色', 'blue', '用于配置系统默认主题色调', '[{\n   \"name\":\"红\",\n   \"value\": \"red\"\n},{\n   \"name\":\"黄\",\n   \"value\": \"yellow\"\n},{\n   \"name\":\"绿\",\n   \"value\": \"green\"\n},{\n   \"name\":\"蓝\",\n   \"value\": \"blue\"\n},{\n   \"name\":\"紫\",\n   \"value\": \"purple\"\n}\n]');
INSERT INTO `sys_config` VALUES (3, 'sys_lang', 'string', '系统语言', 'zh_cn', '用于配置系统默认语言', '[{\n   \"name\":\"英文\",\n   \"value\": \"en\"\n},{\n   \"name\":\"简体中文\",\n   \"value\": \"zh_cn\"\n},{\n   \"name\":\"繁体中文\",\n   \"value\": \"zh_tw\"\n},{\n   \"name\":\"英文\",\n   \"value\": \"en\"\n},{\n   \"name\":\"日文\",\n   \"value\": \"ja\"\n},{\n   \"name\":\"韩文\",\n   \"value\": \"ko\"\n}\n]');
INSERT INTO `sys_config` VALUES (4, 'sys_lang_list', 'string', '系统支持语言', 'zh_cn en', '', '');

-- ----------------------------
-- Table structure for sys_lang
-- ----------------------------
DROP TABLE IF EXISTS `sys_lang`;
CREATE TABLE `sys_lang`  (
  `lang_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '语言ID',
  `key` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文',
  `zh_cn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '简体中文',
  `zh_tw` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '繁体中文',
  `ko` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '韩文',
  `ja` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日文',
  PRIMARY KEY (`lang_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 55 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统语言：用于开发站点多国语' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_lang
-- ----------------------------
INSERT INTO `sys_lang` VALUES (1, 'web_name', 'MM', '超级美眉', '', '', '');
INSERT INTO `sys_lang` VALUES (2, 'btn_sign_in', 'SignIn', '登录', '', '', '');
INSERT INTO `sys_lang` VALUES (3, 'btn_sign_up', 'SignUp', '注册', '', '', '');
INSERT INTO `sys_lang` VALUES (4, 'nav_home', 'Home', '首页', '', '', '');
INSERT INTO `sys_lang` VALUES (5, 'nav_about', 'About', '关于我们', '', '', '');
INSERT INTO `sys_lang` VALUES (6, 'nav_product', 'Product', '产品展示', '', '', '');
INSERT INTO `sys_lang` VALUES (7, 'nav_document', 'Document', '开发文档', '', '', '');
INSERT INTO `sys_lang` VALUES (8, 'nav_forum', 'Forum', '论坛', '', '', '');
INSERT INTO `sys_lang` VALUES (9, 'nav_service', 'Service', '技术服务', '', '', '');
INSERT INTO `sys_lang` VALUES (10, 'nav_contact', 'Contact', '联系方式', '', '', '');
INSERT INTO `sys_lang` VALUES (11, 'btn_read_more', 'Read More', '查看更多', '', '', '');
INSERT INTO `sys_lang` VALUES (12, 'btn_more', 'More', '更多', '', '', '');
INSERT INTO `sys_lang` VALUES (13, 'banner_1', 'Software development actually has a lot of considerations', '软件开发其实有很多注意事项', '', '', '');
INSERT INTO `sys_lang` VALUES (14, 'banner_2', 'Professional development team and solutions make you worry free', '专业的开发团队和解决方案让您无忧无虑', '', '', '');
INSERT INTO `sys_lang` VALUES (15, 'banner_3', 'Explore the world of super applications with us', '和我们一起探索超级应用的世界', '', '', '');
INSERT INTO `sys_lang` VALUES (16, 'title_online_solutions', 'Online solutions', '在线解决方案', '', '', '');
INSERT INTO `sys_lang` VALUES (17, 'desc_online_solutions', 'Cloud excel is used to provide solutions, which is convenient for cooperation and can be viewed and changed at any time', '采用云excel提供解决方案，协作方便，随时可看可改', '', '', '');
INSERT INTO `sys_lang` VALUES (18, 'title_team', 'Senior engineer team', '高级工程师团队', '', '', '');
INSERT INTO `sys_lang` VALUES (19, 'desc_team', 'Collaborative development of technical teams from Huawei, Tencent and other enterprises', '从华为、腾讯等企业出来的技术团队协作开发', '', '', '');
INSERT INTO `sys_lang` VALUES (20, 'title_document', 'Secondary development document', '二次开发文档', '', '', '');
INSERT INTO `sys_lang` VALUES (21, 'desc_document', 'Have mature program architecture and perfect development documents', '拥有成熟的程序架构和完善的开发文档', '', '', '');
INSERT INTO `sys_lang` VALUES (22, 'title_welcome', 'Welcome to our website', '欢迎来到我们网站', '', '', '');
INSERT INTO `sys_lang` VALUES (23, 'content_welcome_1', 'Maybe you\'ve met a lot of development companies to come to us, but when you see us, you will find that we are your best choice', '也许你看到过许多的开发公司才找到我们，但是当你看到我们之后就会发现，我们就是你最好的选择。', '', '', '');
INSERT INTO `sys_lang` VALUES (24, 'content_welcome_2', 'Reasonable price is only a feature. What\'s more, our development framework superior to the market after use makes it easier for you to upgrade your application and innovate with the market at any time', '合理的价格只是一个特点。更重要的是，我们的开发框架在使用后优于市场，使您更容易升级应用程序，并随时与市场一起创新', '', '', '');
INSERT INTO `sys_lang` VALUES (25, 'title_apply', 'Apply for preferential price', '申请优惠价', '', '', '');
INSERT INTO `sys_lang` VALUES (26, 'input_desc_search', 'Search service or document...', '搜索服务或文档...', '', '', '');
INSERT INTO `sys_lang` VALUES (27, 'desc_apply', 'Officially start activities in 2021', '2021年正式启动活动', '', '', '');
INSERT INTO `sys_lang` VALUES (28, 'content_apply', 'If you are our regular customers or introduced by customers, we will give you more favorable prices and give you valuable marketing services', '如果你是我们的老客户，或者是客户介绍过来的，我们将给你更加优惠的价格和赠送你超值的营销服务', '', '', '');
INSERT INTO `sys_lang` VALUES (29, 'title_form_need', 'Demand consultation', '需求咨询', '', '', '');
INSERT INTO `sys_lang` VALUES (30, 'desc_form_need', 'Free needs analysis for you', '免费为您分析需求', '', '', '');
INSERT INTO `sys_lang` VALUES (31, 'btn_submit', 'Submit', '提交', '', '', '');
INSERT INTO `sys_lang` VALUES (32, 'input_desc_name', 'Please enter your name', '请输入您的姓名', '', '', '');
INSERT INTO `sys_lang` VALUES (33, 'input_desc_phone', 'Please enter your phone', '请输入您的手机号码', '', '', '');
INSERT INTO `sys_lang` VALUES (34, 'dev_web', 'Complete DIY<br />Official website', '完成定制<br />企业官网', '', '', '');
INSERT INTO `sys_lang` VALUES (35, 'dev_blockchain', 'Complete a<br />blockchain app', '完成一款<br />区块链应用', '', '', '');
INSERT INTO `sys_lang` VALUES (36, 'dev_mall', 'Complete the whole<br />e-commerce platform', '完成整套<br />电商平台', '', '', '');
INSERT INTO `sys_lang` VALUES (37, 'dev_app', 'Complete large-scale<br />commercial app', '完成大型<br />商业应用', '', '', '');
INSERT INTO `sys_lang` VALUES (38, 'dev_sns', 'SNS', '社交软件', '', '', '');
INSERT INTO `sys_lang` VALUES (39, 'dev_platform', 'Electronic platform', '电商平台', '', '', '');
INSERT INTO `sys_lang` VALUES (40, 'dev_code', 'Code up', '源码升级', '', '', '');
INSERT INTO `sys_lang` VALUES (41, 'dev_science', 'Science', '科学实验', '', '', '');
INSERT INTO `sys_lang` VALUES (42, 'dev_finance', 'Finance', '金融理财', '', '', '');
INSERT INTO `sys_lang` VALUES (43, 'dev_block_chain', 'Block chain', '区块链应用', '', '', '');
INSERT INTO `sys_lang` VALUES (44, 'dev_manage_system', 'Manage system', '管理系统', '', '', '');
INSERT INTO `sys_lang` VALUES (45, 'dev_web_ui', 'Web UI', '网页设计', '', '', '');
INSERT INTO `sys_lang` VALUES (46, 'title_profile', 'Company Profile', '企业简介', '', '', '');
INSERT INTO `sys_lang` VALUES (47, 'content_profile_1', '', '深圳图灵魔方信息科技有限公司专注于科技信息咨询和移动应用开发领域，主要开发电商、社交、区块链相关应用。“图灵魔方”在应用设计和开发领域是为数不多的拥有自主研发框架和高级技术，能够在业内中更快速开发出优质应用。', '', '', '');
INSERT INTO `sys_lang` VALUES (48, 'content_profile_2', '', '原来我们只是为其他开发公司所服务，现在我们直接为需求方服务，不仅价格实惠，还更能实现理想的应用效果。', '', '', '');
INSERT INTO `sys_lang` VALUES (49, 'title_framework', 'MM', '超级美眉', '', '', '');
INSERT INTO `sys_lang` VALUES (50, 'desc_framework', 'Framework', '应用框架', '', '', '');
INSERT INTO `sys_lang` VALUES (51, 'content_framework', '', '这是用JavaScript编程语言开发的商业级应用框架，适用于大型商城、中小型游戏、社交软件开发，框架简化了对函数和数据的调用，让开发应用变得更加轻松、灵活。全新的架构体让多人协作开发和升级维护更加容易，是未来理想的选择。', '', '', '');
INSERT INTO `sys_lang` VALUES (52, 'title_latest_product', 'Latest Product', '最近产品', '', '', '');
INSERT INTO `sys_lang` VALUES (53, 'title_latest_event', 'Latest event', '最近事件', '', '', '');
INSERT INTO `sys_lang` VALUES (54, 'btn_view_all', 'View all', '查看全部', '', '', '');

-- ----------------------------
-- Table structure for sys_message
-- ----------------------------
DROP TABLE IF EXISTS `sys_message`;
CREATE TABLE `sys_message`  (
  `message_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '消息ID：[0,2147483647]用于记录和识别消息',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言标题：[0,255]',
  `note` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '留言内容：',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统消息：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_message
-- ----------------------------
INSERT INTO `sys_message` VALUES (1, NULL, '你好');
INSERT INTO `sys_message` VALUES (2, NULL, '你好');
INSERT INTO `sys_message` VALUES (3, NULL, '111');
INSERT INTO `sys_message` VALUES (4, NULL, '你好');
INSERT INTO `sys_message` VALUES (5, NULL, '你好');
INSERT INTO `sys_message` VALUES (6, NULL, '111');
INSERT INTO `sys_message` VALUES (7, NULL, '你好');
INSERT INTO `sys_message` VALUES (8, NULL, '111');
INSERT INTO `sys_message` VALUES (9, NULL, '111');
INSERT INTO `sys_message` VALUES (10, NULL, '111');
INSERT INTO `sys_message` VALUES (11, NULL, '111');
INSERT INTO `sys_message` VALUES (12, NULL, '111');
INSERT INTO `sys_message` VALUES (13, '', 'fdsfgsdf');
INSERT INTO `sys_message` VALUES (14, '', 'ngfnfgngfn');
INSERT INTO `sys_message` VALUES (15, '', 'ngfnfgngfn');
INSERT INTO `sys_message` VALUES (16, '', '321132');
INSERT INTO `sys_message` VALUES (17, '', '123123132');
INSERT INTO `sys_message` VALUES (18, '', '12132312132');
INSERT INTO `sys_message` VALUES (19, '', 'DERER');
INSERT INTO `sys_message` VALUES (20, '', 'DERER');
INSERT INTO `sys_message` VALUES (21, '', 'DERER');
INSERT INTO `sys_message` VALUES (22, '', 'DERER');
INSERT INTO `sys_message` VALUES (23, '', 'DEEE');
INSERT INTO `sys_message` VALUES (24, '', '12132312312312312321321312312321');
INSERT INTO `sys_message` VALUES (25, '', '213123132132');
INSERT INTO `sys_message` VALUES (26, '', '123123123');
INSERT INTO `sys_message` VALUES (27, '', '132123');

-- ----------------------------
-- Table structure for sys_nav
-- ----------------------------
DROP TABLE IF EXISTS `sys_nav`;
CREATE TABLE `sys_nav`  (
  `nav_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '导航ID：[0,32767]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '英文名称：[0,32]用于多国语识别',
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文标题：[0,32]用于中文提示',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接：[0,255]跳转的链接地址',
  `style` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '风格样式：[0,255]自定义css样式',
  `class` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '样式类型：[0,32]绑定的css class',
  `target` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转方式：[0,32]_blank表示新窗口跳转',
  `position` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'top' COMMENT '展现位置：[0,125]top顶部、bottom底部、side侧边，main主要，quick快捷，menu菜单，多个位置用逗号隔开',
  `device` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '呈现设备：[0,125]在什么设备上展示，web_pc、web_pad、web_phone、app_pad、app_phone，多个设备用逗号隔开',
  `father_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,10000]在频道列表操作时，当上级导航展开时，才显示该导航(sys_nav.name.nav_id)',
  PRIMARY KEY (`nav_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '导航：用于管理员自定义应用的导航' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_nav
-- ----------------------------
INSERT INTO `sys_nav` VALUES (1, 'home', '首页', '/', '', '', '', 'top', '', 0);
INSERT INTO `sys_nav` VALUES (2, 'about', '关于我们', '/about', '', '', '', 'top', '', 0);
INSERT INTO `sys_nav` VALUES (3, 'product', '产品展示', '/product', '', '', '', 'top', '', 0);
INSERT INTO `sys_nav` VALUES (4, 'service', '技术服务', '/service', '', '', '', 'top', '', 0);
INSERT INTO `sys_nav` VALUES (5, 'contact', '联系方式', '/contact', '', '', '', 'top', '', 0);

-- ----------------------------
-- Table structure for user_account
-- ----------------------------
DROP TABLE IF EXISTS `user_account`;
CREATE TABLE `user_account`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID：[0,8388607]用户获取其他与用户相关的数据',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '账户状态：[0,10](1可用|2异常|3已冻结|4已注销)',
  `vip` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '会员级别：[0,10]用于确定用户访问权限',
  `gm` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '管理员级别：[0,10]用于确定用户管理权限',
  `mc` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商家级别：[0,10]用于确定商家用户的管理权限',
  `group_id` smallint(6) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所在用户组：[0,32767]决定用户身份和权限(user_group)',
  `admin_id` smallint(6) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所在管理组：[0,32767]决定用户身份和权限(user_admin)',
  `referee_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '推荐人ID：[0,8388607]用于推荐注册时积分奖级(user_account.nickname.user_id)',
  `login_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '上次登录时间：',
  `salt` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '短验证：[0,6]',
  `invite_code` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '邀请注册码：[0,8]随着用户注册而生成',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码：[0,11]用户的手机号码，用于找回密码时或登录时',
  `phone_state` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '手机认证：[0,1](0未认证|1审核中|2已认证)',
  `username` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户名：[0,16]用户登录时所用的账户名称',
  `nickname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '昵称：[0,16]',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '密码：[0,32]用户登录所需的密码，由6-16位数字或英文组成',
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '邮箱：[0,64]用户的邮箱，用于找回密码时或登录时',
  `email_state` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '邮箱认证：[0,1](0未认证|1审核中|2已认证)',
  `login_ip` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上次登录IP：[0,128]',
  `signature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个性签名：[0,255]',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像地址：[0,255]',
  `friends` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '好友：多个好友ID用“,”分隔',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 43 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户账户：用于保存用户登录信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_account
-- ----------------------------
INSERT INTO `user_account` VALUES (1, 1, 14, 5, 5, 1, 1, 0, '2021-02-06 15:11:45', 'mm2020', '000000', NULL, 0, 'admin', '管理员', '0cf6066acc83160a6c65282835399c40', '', 0, '127.0.0.1', NULL, NULL, NULL, '2020-11-11 11:10:28');
INSERT INTO `user_account` VALUES (2, 1, 3, 5, 4, 0, 0, 0, '2021-02-06 13:06:21', 'mm2020', '775825', '', 0, 'wenwu', '文武', '0cf6066acc83160a6c65282835399c40', '', 0, '', '', '', '', '2020-11-11 11:10:45');
INSERT INTO `user_account` VALUES (3, 1, 1, 2, 3, 0, 0, 0, '2021-02-06 13:06:26', '', '', NULL, 0, 'test', '', '', '', 0, NULL, NULL, NULL, NULL, '2021-01-29 15:15:16');

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address`  (
  `address_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '地址ID：[0,8388607]',
  `province` mediumint(9) UNSIGNED NOT NULL DEFAULT 0 COMMENT '省：[0,8388607]',
  `city` mediumint(9) UNSIGNED NOT NULL DEFAULT 0 COMMENT '市：[0,8388607]',
  `area` mediumint(9) UNSIGNED NOT NULL DEFAULT 0 COMMENT '区：[0,8388607]',
  `sex` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收件人性别：[0,1](0女|1男)',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收件人电话：[0,11]',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收件人姓名：[0,32]',
  `house_number` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '门牌号：[0,125]',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收件地址：[0,255]',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]表示该地址是哪个用户的(user_account.nickname)',
  PRIMARY KEY (`address_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收货地址：用于保存用户的收件信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_address
-- ----------------------------

-- ----------------------------
-- Table structure for user_admin
-- ----------------------------
DROP TABLE IF EXISTS `user_admin`;
CREATE TABLE `user_admin`  (
  `admin_id` smallint(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '管理组ID：[0,1000]',
  `father_id` smallint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级ID：[0,32767](user_admin.name.admin_id)',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '名称：[0,16]',
  `department` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门：[0,12]用于区分管理组织结构',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该用户组的特点或权限范围',
  `icon` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图标：用于标识用户组',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理组：用于判断用户后台管理鉴权' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_admin
-- ----------------------------

-- ----------------------------
-- Table structure for user_count
-- ----------------------------
DROP TABLE IF EXISTS `user_count`;
CREATE TABLE `user_count`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]',
  `level` smallint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '等级：[0,1000]',
  `iq` smallint(3) UNSIGNED NOT NULL DEFAULT 100 COMMENT 'IQ智商：[80,200]用于激励用户评论和发帖',
  `credit` int(10) UNSIGNED NOT NULL DEFAULT 100 COMMENT '信用度：[0,2147483647]用于评估用户信誉',
  `credit_points` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '积分：[0,2147483647]用于代金消费或兑换商品',
  `exp` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '经验值：[0,2147483647]',
  `extcredits1` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分1：[0,2147483647]',
  `extcredits2` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分2：[0,2147483647]',
  `extcredits3` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分3：[0,2147483647]',
  `extcredits4` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分4：[0,2147483647]',
  `extcredits5` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分5：[0,2147483647]',
  `extcredits6` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分6：[0,2147483647]',
  `extcredits7` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分7：[0,2147483647]',
  `extcredits8` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '拓展积分8：[0,2147483647]',
  `money` double(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '钱：用于现金业务',
  `coin` decimal(16, 8) NOT NULL COMMENT '货币：用于游戏或数字货币业务',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户统计：用于统计用户等级、经验、积分等' ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of user_count
-- ----------------------------

-- ----------------------------
-- Table structure for user_group
-- ----------------------------
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group`  (
  `group_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户组ID：[0,8388607]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `level` smallint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '等级划分：[0,1000]用于识别级别分组',
  `next_group_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '下级用户组ID：[0,8388607]决定用户升级后所属用户组(user_group.name.group_id)',
  `exp` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '升级所需经验：[0,2147483647]用于确定用户的升级',
  `discount` double(3, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '折扣：用于确定用户的消费折扣',
  `bonus` double(3, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '奖励比例：用于确定用户的积分奖励',
  `app` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用：[0,12]用于区分用户组使用范围，cms内容管理系统、bbs社区、mall商城',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '名称：[0,16]',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述：[0,255]描述该用户组的特点或权限范围',
  `icon` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图标：用于标识用户组',
  `title` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分组标题：[0,125]',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户组：用于用户前端身份和鉴权' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_group
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]',
  `sex` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '性别：[0,2](0未设置|1男|2女)',
  `idcard_state` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '身份实名认证：[0,10](1未认证|2认证中|3认证通过)',
  `age` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '年龄：[0,150]',
  `province_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '省份ID：[0,2147483647]用户所在地的省份(sys_address_province)',
  `city_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所在城市ID：[0,2147483647](sys_address_city)',
  `birthday` date NOT NULL DEFAULT '1970-01-01' COMMENT '生日：',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名：[2,16]',
  `job` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职业：[0,16]',
  `school` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '毕业学校：[0,16]',
  `major` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所学专业：[0,16]',
  `idcard` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号：[0,64]',
  `company_address` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司地址：[0,125]用户当前就职的公司地址',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址：[0,255]用户居住地的详细地址',
  `job_scope` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作范围：[0,255]',
  `company_business` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公司经营范围：[0,255]',
  `idcard_img` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '身份证图片：保存json格式',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息：用于保存用户个人信息，如年龄、住址等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------

-- ----------------------------
-- Table structure for user_message
-- ----------------------------
DROP TABLE IF EXISTS `user_message`;
CREATE TABLE `user_message`  (
  `message_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '消息ID：[0,2147483647]用于记录和识别消息',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言标题：[0,255]',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '留言内容：',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言者手机：[0,11]',
  `email` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言者邮箱：[0,125]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言者姓名：[0,16]',
  `time_create` timestamp(0) NULL DEFAULT NULL COMMENT '留言时间',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户留言：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_message
-- ----------------------------
INSERT INTO `user_message` VALUES (1, NULL, '你好', NULL, NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (2, NULL, '你好', NULL, NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (3, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (4, NULL, '你好', NULL, NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (5, NULL, '你好', '15817188815', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (6, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (7, NULL, '你好', '15817188815', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (8, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (9, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (10, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (11, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (12, NULL, '111', '18823759846', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (13, '', 'fdsfgsdf', '18823759846', '', '', NULL);
INSERT INTO `user_message` VALUES (14, '', 'ngfnfgngfn', '18823759846', '', '', NULL);
INSERT INTO `user_message` VALUES (15, '', 'ngfnfgngfn', '18823759846', '', '', NULL);
INSERT INTO `user_message` VALUES (16, '', '321132', '12312313245', '', '', NULL);
INSERT INTO `user_message` VALUES (17, '', '123123132', '18079307448', '', '', NULL);
INSERT INTO `user_message` VALUES (18, '', '12132312132', '18079307448', '', '', NULL);
INSERT INTO `user_message` VALUES (19, '', 'DERER', '15817188815', '', '', NULL);
INSERT INTO `user_message` VALUES (20, '', 'DERER', '15817188815', '', '', NULL);
INSERT INTO `user_message` VALUES (21, '', 'DERER', '15817188815', '', '', NULL);
INSERT INTO `user_message` VALUES (22, '', 'DERER', '15817188815', '', '', NULL);
INSERT INTO `user_message` VALUES (23, '', 'DEEE', '12312133331', '', '', NULL);
INSERT INTO `user_message` VALUES (24, '', '12132312312312312321321312312321', '18079307448', '', '', NULL);
INSERT INTO `user_message` VALUES (25, '', '213123132132', '18079307448', '', '', NULL);
INSERT INTO `user_message` VALUES (26, '', '123123123', '18079307448', '', '', NULL);
INSERT INTO `user_message` VALUES (27, '', '132123', '12312312312', '', '', NULL);
INSERT INTO `user_message` VALUES (28, NULL, '123312312', '18079307448', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (29, NULL, '12213213213', '18079307448', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (30, NULL, '123231213', '18079307448', NULL, NULL, NULL);
INSERT INTO `user_message` VALUES (31, NULL, '4444', NULL, '22121@qq.com', NULL, NULL);
INSERT INTO `user_message` VALUES (32, NULL, '', '15817188815', NULL, '123123', NULL);
INSERT INTO `user_message` VALUES (33, NULL, '', '15817188815', NULL, '123123', NULL);
INSERT INTO `user_message` VALUES (34, NULL, '', '15817188815', NULL, 'name', NULL);
INSERT INTO `user_message` VALUES (35, NULL, '', '15817188815', NULL, 'name', NULL);
INSERT INTO `user_message` VALUES (36, NULL, '', '15817188815', NULL, 'ceshi', NULL);

-- ----------------------------
-- Table structure for user_power
-- ----------------------------
DROP TABLE IF EXISTS `user_power`;
CREATE TABLE `user_power`  (
  `power_id` smallint(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `admin_id` smallint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '管理组ID：[0,1000]',
  `display` smallint(4) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '名称：[0,16]',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由路径：用来确定访问权限的路由路径',
  `method` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方法：(GET|POST|ALL)',
  `user_add` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加权限人',
  `user_set` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改权限人',
  `user_del` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '删除权限人',
  `user_get` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '查看权限人',
  `field_set` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改可见字段',
  `field_add` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加可见字段',
  `field_del` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '删除可见字段',
  `field_get` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '查询可见字段',
  PRIMARY KEY (`power_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理组：用于判断用户后台管理鉴权' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_power
-- ----------------------------
INSERT INTO `user_power` VALUES (1, 0, 100, '', '/order/list', NULL, '管理员 录入员', '技术员', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_power` VALUES (2, 1, 100, '', '/order/edit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_power` VALUES (3, 1, 100, '', '/order/dispose', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_sns
-- ----------------------------
DROP TABLE IF EXISTS `user_sns`;
CREATE TABLE `user_sns`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID：[0,8388607]',
  `qq` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'QQ号：[5,12]',
  `qq_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'QQ认证：[0,1](0未认证|1已认证)',
  `wechat` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信号：[5,16]',
  `wechat_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：[0,1](0未认证|1已认证)',
  `mm` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'MM号：[5,16]',
  `mm_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'MM认证：[0,1](0未认证|1已认证)',
  `baidu` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '百度账号：[5,14]',
  `baidu_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '百度认证：[0,1](0未认证|1已认证)',
  `taobao` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '淘宝账号：[5,10]',
  `taobao_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '淘宝认证：[0,1](0未认证|1已认证)',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '社交账户：用于保存用的社交平台账户，方便同步登录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_sns
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
