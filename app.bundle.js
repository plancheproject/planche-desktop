/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	__webpack_require__(2)
	__webpack_require__(3)
	__webpack_require__(4)
	__webpack_require__(5)
	__webpack_require__(6)
	__webpack_require__(7)
	__webpack_require__(8)
	__webpack_require__(9)
	__webpack_require__(10)
	__webpack_require__(11)
	__webpack_require__(12)
	__webpack_require__(13)
	__webpack_require__(14)
	__webpack_require__(15)
	__webpack_require__(16)
	__webpack_require__(17)
	__webpack_require__(18)
	__webpack_require__(19)
	__webpack_require__(20)
	__webpack_require__(21)
	__webpack_require__(22)
	__webpack_require__(23)
	__webpack_require__(24)
	__webpack_require__(25)
	__webpack_require__(26)
	__webpack_require__(27)
	__webpack_require__(28)
	__webpack_require__(29)
	__webpack_require__(30)
	__webpack_require__(31)
	__webpack_require__(32)
	__webpack_require__(33)
	__webpack_require__(34)
	__webpack_require__(35)
	__webpack_require__(36)
	__webpack_require__(37)
	__webpack_require__(38)
	__webpack_require__(39)
	__webpack_require__(40)
	__webpack_require__(41)
	__webpack_require__(42)
	__webpack_require__(43)
	__webpack_require__(44)
	__webpack_require__(45)
	__webpack_require__(46)
	__webpack_require__(47)
	__webpack_require__(48)
	__webpack_require__(49)
	__webpack_require__(50)
	__webpack_require__(51)
	__webpack_require__(52)
	__webpack_require__(53)
	__webpack_require__(54)
	__webpack_require__(55)
	__webpack_require__(56)
	__webpack_require__(57)
	__webpack_require__(58)
	__webpack_require__(59)
	__webpack_require__(60)
	__webpack_require__(61)
	__webpack_require__(62)
	__webpack_require__(63)
	__webpack_require__(64)
	__webpack_require__(65)
	__webpack_require__(66)
	__webpack_require__(67)
	__webpack_require__(68)
	__webpack_require__(69)
	__webpack_require__(70)
	__webpack_require__(71)
	__webpack_require__(72)
	__webpack_require__(73)
	__webpack_require__(74)
	__webpack_require__(75)
	__webpack_require__(76)
	__webpack_require__(77)
	__webpack_require__(78)
	__webpack_require__(79)
	__webpack_require__(80)
	__webpack_require__(81)
	__webpack_require__(82)
	__webpack_require__(83)
	__webpack_require__(84)
	__webpack_require__(85)
	__webpack_require__(86)
	__webpack_require__(87)
	__webpack_require__(88)
	__webpack_require__(89)
	__webpack_require__(90)
	__webpack_require__(91)
	__webpack_require__(92)
	__webpack_require__(93)
	__webpack_require__(94)
	__webpack_require__(95)
	__webpack_require__(96)
	__webpack_require__(97)
	__webpack_require__(98)
	__webpack_require__(99)


/***/ },
/* 1 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.setting.Planche-Desktop', {
	    singleton         : true,
	    alternateClassName: ['Planche.lib.Setting'],
	
	    constructor: function (config) {
	
	        this.callSuper(arguments);
	    },
	
	    setHosts : function(hosts, callback) {
	
	        Planche.db.findOne({}, function (err, config) {
	
	            config.hosts = hosts;
	
	            Planche.db.update({}, config, {}, function (err, numAffected) {
	
	                if(callback){ callback(); }
	            });
	        });
	
	    },
	
	    getHosts: function(callback) {
	
	        var hosts   = [];
	
	        Planche.db.findOne({}, function (err, config) {
	
	            var savedLocalHosts = config.hosts;
	
	            Ext.Array.each(savedLocalHosts, function(connInfo, index) {
	
	                Ext.apply(connInfo, {
	                    'into' : 'localstorage',
	                    'index': index
	                });
	
	                hosts.push(connInfo);
	            });
	
	            if(callback) callback(hosts)
	        });
	    },
	
	    isEnableAutoLoadConnectionWindow : function(callback){
	
	        Planche.db.findOne({}, function (err, config) {
	            
	            if(callback){ callback(config.autoLoadConnectionWindow); }
	        });
	    }
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	Ext.define("Planche.overrides.RadioGroup", {
	    override: "Ext.form.RadioGroup",
	    setValue: Ext.Function.createSequence(
	        Ext.form.RadioGroup.prototype.setValue,
	        function(value){
	
	            var idx = this.name || this.id;
	            if(!Ext.isObject(value) && !Ext.isEmpty(idx)){
	                var data = {};
	
	                data[idx] = value;
	                this.setValue(data);
	            }
	        }
	    ),
	    getValue: function(first){
	
	       var value = this.callParent();
	        if(Ext.Object.getSize(value) == 1 && first === true){
	
	            return Ext.Object.getValues(value)[0];
	        }
	        else {
	
	            return value;
	        }
	    }
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	// fix hide submenu (in chrome 43)
	Ext.define("Planche.overrides.FixMenuBug", {
	    override: "Ext.menu.Menu",
	    onMouseLeave: function(e) {
	        var me = this;
	
	
	        // BEGIN FIX
	        var visibleSubmenu = false;
	        me.items.each(function(item) {
	            if(item.menu && item.menu.isVisible()) {
	                visibleSubmenu = true;
	            }
	        })
	        if(visibleSubmenu) {
	            //console.log('apply fix hide submenu');
	            return;
	        }
	        // END FIX
	
	
	        me.deactivateActiveItem();
	
	
	        if (me.disabled) {
	            return;
	        }
	
	
	        me.fireEvent('mouseleave', me, e);
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	Ext.define('Planche.dbms.mysql', function() {
	
	    var queries = {
	        SELECT_ALL_USER         : 'SELECT * FROM `mysql`.`user`',
	        SELECT_USER             : 'SELECT * FROM `mysql`.`user` WHERE user="{0}" AND host="{1}"',
	        SELECT_COUNT            : 'SELECT COUNT(1) as cnt FROM `{0}`.`{1}`',
	        CREATE_USER             : 'CREATE USER `{0}`@`{1}` IDENTIFIED BY "{2}"',
	        DELETE_USER             : 'DROP USER `{0}`@`{1}`',
	        GRANT                   : 'GRANT {0} ON {3} TO `{1}`@`{2}` {4}',
	        REVOKE                  : 'REVOKE {0} ON {3} FROM `{1}`@`{2}`',
	        RENAME_USER             : 'RENAME USER `{0}`@`{1}` TO `{2}`@`{3}`',
	        USER_PRIV               : 'SELECT * FROM `mysql`.`user` WHERE USER = "{0}" AND HOST = "{1}"',
	        USER_DATABASE_PRIV      : 'SELECT * FROM `mysql`.`db` WHERE USER = "{0}" AND HOST = "{1}"',
	        USER_TABLE_PRIV         : 'SELECT Db, Table_name, Table_priv FROM `mysql`.`tables_priv` WHERE USER = "{0}" AND HOST = "{1}"',
	        USER_COLUMN_PRIV        : 'SELECT Db, Table_name, Column_name, Column_priv FROM `mysql`.`columns_priv` WHERE USER = "{0}" AND HOST = "{1}"',
	        USER_PROC_PRIV          : 'SELECT Db, Routine_name, Routine_type, Proc_priv FROM `mysql`.`procs_priv` WHERE USER = "{0}" AND HOST = "{1}"',
	        SHOW_FULL_FIELDS        : 'SHOW FULL FIELDS FROM `{0}`.`{1}`',
	        SHOW_DATABASE_VIEWS     : 'SHOW FULL TABLES FROM `{0}` WHERE TABLE_TYPE LIKE \'VIEW\'',
	        SHOW_DATABASE_TABLES    : 'SHOW FULL TABLES FROM `{0}` WHERE table_type = \'BASE TABLE\'',
	        SHOW_ADVANCED_PROPERTIES: 'SHOW TABLE STATUS FROM `{0}` LIKE "{1}"',
	        SHOW_DATABASE           : 'SHOW DATABASES',
	        ADD_INDEX               : 'CREATE {3} INDEX {2} ON `{0}`.`{1}`({4}) {5}',
	        SHOW_INDEX              : 'SHOW INDEX FROM `{0}`.`{1}` WHERE key_name="{2}"',
	        SHOW_INDEXES            : 'SHOW INDEX FROM `{0}`.`{1}`',
	        DROP_INDEX              : 'DROP INDEX {2} ON `{0}`.`{1}`',
	        DROP_PROCEDURE          : 'DROP PROCEDURE {2} `{0}`.`{1}`',
	        DROP_FUNCTION           : 'DROP FUNCTION {2} `{0}`.`{1}`',
	        DROP_TRIGGER            : 'DROP TRIGGER {2} `{0}`.`{1}`',
	        DROP_EVENT              : 'DROP EVENT {2} `{0}`.`{1}`',
	        DROP_VIEW               : 'DROP VIEW {2} `{0}`.`{1}`',
	        SHOW_PROCEDURES         : 'SHOW PROCEDURE STATUS WHERE DB = "{0}"',
	        SHOW_FUNCTIONS          : 'SHOW FUNCTION STATUS WHERE DB = "{0}"',
	        SHOW_TRIGGERS           : 'SHOW TRIGGERS FROM `{0}`',
	        SHOW_EVENTS             : 'SELECT `Event_name`,`Definer`,`Event_type`,`Execute_at`,`Interval_value`,`Interval_field`,`Starts`,`Ends`,`Status` FROM `INFORMATION_SCHEMA`.`EVENTS` WHERE `EVENT_SCHEMA` = "{0}"',
	        SHOW_VIEWS              : 'SELECT `TABLE_NAME` AS View_name,`View_definition`,`Check_option`,`Is_updatable`,`Definer`,`Security_type` FROM `INFORMATION_SCHEMA`.`VIEWS` WHERE `TABLE_SCHEMA` = "{0}"',
	        SHOW_DATABASE_DDL       : 'SHOW CREATE DATABASE `{0}`',
	        SHOW_ALL_TABLE_STATUS   : 'SHOW TABLE STATUS FROM `{0}` WHERE ENGINE IS NOT NULL',
	        SHOW_TABLE_STATUS       : 'SHOW TABLE STATUS FROM `{0}` like "{1}"',
	        CHANGE_TABLE_TYPE       : 'ALTER TABLE `{0}`.`{1}` ENGINE = {2}',
	        INSERT_TABLE            : 'INSERT INTO `{0}`.`{1}` ({2}) VALUES({3});',
	        INSERT_TABLE_BULK       : 'INSERT INTO `{0}`.`{1}` ({2}) VALUES {3};',
	        INSERT_ON_DUPLICATE     : 'INSERT INTO `{0}`.`{1}` ({2}) VALUES({3}) ON DUPLICATE KEY UPDATE {4}',
	        UPDATE_TABLE            : 'UPDATE `{0}`.`{1}` SET {2} WHERE {3};',
	        DELETE_TABLE            : 'DELETE FROM `{0}`.`{1}` WHERE {2};',
	        SELECT_TABLE            : 'SELECT {2} FROM `{0}`.`{1}` {3};',
	        TRUNCATE_TABLE          : 'TRUNCATE TABLE `{0}`.`{1}`',
	        RENAME_TABLE            : 'RENAME TABLE `{0}`.`{1}` TO `{2}`.`{3}`',
	        DROP_TABLE              : 'DROP TABLE {2} `{0}`.`{1}`',
	        TABLE_CREATE_INFO       : 'SHOW CREATE TABLE `{0}`.`{1}`',
	        TABLE_KEYS_INFO         : 'SHOW KEYS FROM `{0}`.`{1}`',
	        INDEX_KEYS_INFO         : 'SHOW KEYS FROM `{0}`.`{1}` WHERE key_name="{2}"',
	        CREATE_PROCEDURE        : 'DELIMITER $$ \nCREATE \n/*[DEFINER = { user | CURRENT_USER }]*/ \nPROCEDURE `{0}`.`{1}`() \n\n/* LANGUAGE SQL */\n/* [NOT] DETERMINISTIC  { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA } */\n/* SQL SECURITY { DEFINER | INVOKER } */\n/* COMMENT \'string\'*/ \nBEGIN \n\n\t/* SQL Statements */ \n\nEND$$ \nDELIMITER ;',
	        CREATE_FUNCTION         : 'DELIMITER $$ \nCREATE \n/*[DEFINER = { user | CURRENT_USER }]*/ \nFUNCTION `{0}`.`{1}`() \nRETURNS INT /*{STRING|INTEGER|REAL|DECIMAL}*/ /*LANGUAGE SQL | [NOT] DETERMINISTIC | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA } | SQL SECURITY { DEFINER | INVOKER } | COMMENT \'string\'*/ \nBEGIN \n\n\t/* SQL Statements */ \n\nEND$$ \nDELIMITER ;',
	        CREATE_TRIGGER          : 'DELIMITER $$ \nCREATE \n/*[DEFINER = { user | CURRENT_USER }]*/ \nTRIGGER `{0}`.`{1}` \nBEFORE \n-- AFTER \nINSERT \n-- UPDATE \n-- DELETE \nON `{0}`.`<Table Name>` FOR EACH ROW \nBEGIN  \n\n\t/* SQL Statements */ \n\nEND$$ \nDELIMITER ;',
	        CREATE_EVENT            : 'DELIMITER $$ \n-- SET GLOBAL event_scheduler = ON$$ \n-- required for event to execute but not create \nCREATE \n/*[DEFINER = { user | CURRENT_USER }]*/ \nEVENT `{0}`.`{1}` \nON SCHEDULE EVERY 1 HOUR /* uncomment the example below you want to use */ \n-- scheduleexample 1: run once \n-- AT \'YYYY-MM-DD HH:MM.SS\'/CURRENT_TIMESTAMP { + INTERVAL 1 [HOUR|MONTH|WEEK|DAY|MINUTE|...] } \n-- scheduleexample 2: run at intervals forever after creation \n-- scheduleexample 3: specified start time, end time and interval for execution \n/* \n\tEVERY 1  [HOUR|MONTH|WEEK|DAY|MINUTE|...] \n\tSTARTS CURRENT_TIMESTAMP/\'YYYY-MM-DD HH:MM.SS\' { + INTERVAL 1[HOUR|MONTH|WEEK|DAY|MINUTE|...] } \n\tENDS CURRENT_TIMESTAMP/\'YYYY-MM-DD HH:MM.SS\' { + INTERVAL 1 [HOUR|MONTH|WEEK|DAY|MINUTE|...] } \n*/ \n/*[ON COMPLETION [NOT] PRESERVE] [ENABLE | DISABLE] */ \n/* COMMENT \'comment\' */ \nDO BEGIN \n\n\t/* SQL Statements */ \n\nEND$$ \nDELIMITER ;',
	        CREATE_VIEW             : 'CREATE \n/* [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}] */ \n/* DEFINER = user | CURRENT_USER */  \n/* SQL SECURITY { DEFINER | INVOKER }] */  \nVIEW `{0}`.`{1}` AS  \n/* SQL SELECT Statement */',
	        SHOW_CREATE_PROCEDURE   : 'SHOW CREATE PROCEDURE `{0}`.`{1}`',
	        SHOW_CREATE_TABLE       : 'SHOW CREATE TABLE `{0}`.`{1}`',
	        SHOW_CREATE_VIEW        : 'SHOW CREATE TABLE `{0}`.`{1}`',
	        SHOW_CREATE_FUNCTION    : 'SHOW CREATE FUNCTION `{0}`.`{1}`',
	        SHOW_CREATE_TRIGGER     : 'SHOW CREATE TRIGGER `{0}`.`{1}`',
	        SHOW_CREATE_EVENT       : 'SHOW CREATE EVENT `{0}`.`{1}`',
	        CREATE_TABLE            : 'CREATE TABLE `{0}`.`{1}` {2}',
	        ALTER_TABLE             : 'ALTER TABLE `{0}`.`{1}` {2}',
	        ALTER_VIEW              : 'DELIMITER $$ \nUSE `{0}`$$ \nDROP VIEW IF EXISTS `{1}`$$ \n{2}$$ \nDELIMITER;',
	        ALTER_PROCEDURE         : 'DELIMITER $$ \nUSE `{0}`$$ \nDROP PROCEDURE IF EXISTS `{1}`$$ \n{2}$$ \nDELIMITER;',
	        ALTER_FUNCTION          : 'DELIMITER $$ \nUSE `{0}`$$ \nDROP FUNCTION IF EXISTS `{1}`$$ \n{2}$$ \nDELIMITER;',
	        ALTER_TRIGGER           : 'DELIMITER $$ \nUSE `{0}`$$ \nDROP TRIGGER IF EXISTS `{1}`$$ \n{2}$$ \nDELIMITER;',
	        ALTER_EVENT             : 'DELIMITER $$ \nUSE `{0}`$$ \nDROP EVENT IF EXISTS `{1}`$$ \n{2}$$ \nDELIMITER;',
	        SHOW_PROCESS_LIST       : 'SHOW FULL PROCESSLIST',
	        SHOW_VARIABLES          : 'SHOW VARIABLES',
	        SHOW_STATUS             : 'SHOW STATUS',
	        SHOW_GLOBAL_STATUS      : 'SHOW GLOBAL STATUS',
	        SHOW_SESSION_STATUS     : 'SHOW SESSION STATUS',
	        CREATE_DATABASE         : 'CREATE DATABASE `{0}` CHARACTER SET {1} COLLATE {2}',
	        ALTER_DATABASE          : 'ALTER DATABASE `{0}` CHARACTER SET {1} COLLATE {2}',
	        DROP_DATABASE           : 'DROP DATABASE `{0}`',
	        SHOW_CHARSET            : 'SHOW CHARSET',
	        SHOW_COLLATION          : 'SHOW COLLATION',
	        SHOW_COLUMNS            : 'SHOW FULL COLUMNS FROM `{0}`.`{1}`',
	        CHARSET_DATABASE        : 'SHOW VARIABLES LIKE \'character_set_database\'',
	        COLLATION_DATABASE      : 'SHOW VARIABLES LIKE \'collation_database\'',
	        KILL_QUERY              : 'KILL {0}',
	        SHOW_DATABASES          : 'SHOW DATABASES',
	        COPY_TABLE_STRUCTURE    : 'CREATE TABLE `{2}`.`{3}` LIKE `{0}`.`{1}`',
	        COPY_TABLE_DATA         : 'INSERT `{2}`.`{3}` SELECT * FROM `{0}`.`{1}`'
	
	    };
	
	    var joins = [
	        'NATURAL JOIN', 'INNER JOIN', 'LFET INNER JOIN', 'RIGHT INNER JOIN', 'LEFT OUTER JOIN',
	        'LEFT JOIN', 'RIGHT OUTER JOIN', 'RIGHT JOIN', 'CROSS JOIN', 'JOIN', 'FROM'
	    ];
	
	    var etc = [
	        'ON DUPLICATE KEY UPDATE'
	    ];
	
	    var functions = [
	        'ABS', 'ACOS', 'ADDDATE', 'ADDTIME', 'AES_DECRYPT',
	        'AES_ENCRYPT', 'AREA', 'ASBINARY', 'ASWKB', 'ASCII',
	        'ASIN', 'ASTEXT', 'ASWKT', 'ATAN2', 'ATAN',
	        'ATAN', 'AVG', 'BDMPOLYFROMTEXT', 'BDMPOLYFROMWKB', 'BDPOLYFROMTEXT',
	        'BDPOLYFROMWKB', 'BENCHMARK', 'BIN', 'BINARY', 'BIT_AND',
	        'BIT_COUNT', 'BIT_LENGTH', 'BIT_OR', 'BIT_XOR', 'BOUNDARY',
	        'BUFFER', 'CAST', 'CEIL', 'CEILING', 'CHAR_LENGTH',
	        'CHAR', 'CHARACTER_LENGTH', 'CHARSET', 'COALESCE', 'COERCIBILITY',
	        'COLLATION', 'COMPRESS', 'CONCAT_WS', 'CONCAT', 'CONNECTION_ID',
	        'CONTAINS', 'CONV', 'CONVERT_TZ', 'CONVERT', 'COS',
	        'COT', 'COUNT', 'CRC32', 'CROSSES', 'CURDATE',
	        'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER',
	        'CURTIME', 'DATABASE', 'DATE_ADD', 'DATE_FORMAT', 'DATE_SUB',
	        'DATE', 'DATEDIFF', 'DAY', 'DAYNAME', 'DAYOFMONTH',
	        'DAYOFWEEK', 'DAYOFYEAR', 'DECODE', 'DEFAULT', 'DEGREES',
	        'DES_DECRYPT', 'DES_ENCRYPT', 'DIMENSION', 'DISJOINT', 'DIV',
	        'ELT', 'ENCODE', 'ENCRYPT', 'ENDPOINT', 'ENVELOPE',
	        'EQUALS', 'EXP', 'EXPORT_SET', 'EXTERIORRING', 'EXTRACT',
	        'EXTRACTVALUE', 'FIELD', 'FIND_IN_SET', 'FLOOR', 'FORMAT',
	        'FOUND_ROWS', 'FROM_BASE64', 'FROM_DAYS', 'FROM_UNIXTIME', 'GEOMCOLLFROMTEXT',
	        'GEOMETRYCOLLECTIONFROMTEXT', 'GEOMCOLLFROMWKB', 'GEOMETRYCOLLECTIONFROMWKB', 'GEOMETRYCOLLECTION', 'GEOMETRYN',
	        'GEOMETRYTYPE', 'GEOMFROMTEXT', 'GEOMETRYFROMTEXT', 'GEOMFROMWKB', 'GET_FORMAT',
	        'GET_LOCK', 'GLENGTH', 'GREATEST', 'GROUP_CONCAT', 'GTID_SUBSET',
	        'GTID_SUBTRACT', 'HEX', 'HOUR', 'IF', 'IFNULL',
	        'IN', 'INET_ATON', 'INET_NTOA', 'INET6_ATON', 'INET6_NTOA',
	        'INSERT', 'INSTR', 'INTERIORRINGN', 'INTERSECTS', 'INTERVAL',
	        'IS_FREE_LOCK', 'IS_IPV4_COMPAT', 'IS_IPV4_MAPPED', 'IS_IPV4', 'IS_IPV6',
	        'IS_USED_LOCK', 'ISCLOSED', 'ISEMPTY', 'ISNULL', 'ISSIMPLE',
	        'LAST_DAY', 'LAST_INSERT_ID', 'LCASE', 'LEAST', 'LEFT',
	        'LENGTH', 'LINEFROMTEXT', 'LINEFROMWKB', 'LINESTRINGFROMWKB', 'LINESTRING',
	        'LN', 'LOAD_FILE', 'LOCALTIME', 'LOCALTIME', 'LOCALTIMESTAMP',
	        'LOCALTIMESTAMP', 'LOCATE', 'LOG10', 'LOG2', 'LOG',
	        'LOWER', 'LPAD', 'LTRIM', 'MAKE_SET', 'MAKEDATE',
	        'MAKETIME', 'MASTER_POS_WAIT', 'MAX', 'MBRCONTAINS', 'MBRDISJOINT',
	        'MBREQUAL', 'MBRINTERSECTS', 'MBROVERLAPS', 'MBRTOUCHES', 'MBRWITHIN',
	        'MD5', 'MICROSECOND', 'MID', 'MIN', 'MINUTE',
	        'MLINEFROMTEXT', 'MULTILINESTRINGFROMTEXT', 'MLINEFROMWKB', 'MULTILINESTRINGFROMWKB', 'MOD',
	        'MONTH', 'MONTHNAME', 'MPOINTFROMTEXT', 'MULTIPOINTFROMTEXT', 'MPOINTFROMWKB',
	        'MULTIPOINTFROMWKB', 'MPOLYFROMTEXT', 'MULTIPOLYGONFROMTEXT', 'MPOLYFROMWKB', 'MULTIPOLYGONFROMWKB',
	        'MULTILINESTRING', 'MULTIPOINT', 'MULTIPOLYGON', 'NAME_CONST', 'NOT',
	        'IN', 'NOW', 'NULLIF', 'NUMGEOMETRIES', 'NUMINTERIORRINGS',
	        'NUMPOINTS', 'OCT', 'OCTET_LENGTH', 'OLD_PASSWORD', 'ORD',
	        'OVERLAPS', 'PASSWORD', 'PERIOD_ADD', 'PERIOD_DIFF', 'PI',
	        'POINT', 'POINTFROMTEXT', 'POINTFROMWKB', 'POINTN', 'POLYFROMTEXT',
	        'POLYGONFROMTEXT', 'POLYFROMWKB', 'POLYGONFROMWKB', 'POLYGON', 'POSITION',
	        'POW', 'POWER', 'PROCEDURE', 'ANALYSE', 'QUARTER',
	        'QUOTE', 'RADIANS', 'RAND', 'RANDOM_BYTES', 'REGEXP',
	        'RELEASE_LOCK', 'REPEAT', 'REPLACE', 'REVERSE', 'RIGHT',
	        'RLIKE', 'ROUND', 'ROW_COUNT', 'RPAD', 'RTRIM',
	        'SCHEMA', 'SEC_TO_TIME', 'SECOND', 'SESSION_USER', 'SHA1',
	        'SHA', 'SHA2', 'SIGN', 'SIN', 'SLEEP',
	        'SOUNDEX', 'SPACE', 'SQRT', 'SRID', 'ST_CONTAINS',
	        'ST_CROSSES', 'ST_DISJOINT', 'ST_EQUALS', 'ST_INTERSECTS', 'ST_OVERLAPS',
	        'ST_TOUCHES', 'ST_WITHIN', 'STARTPOINT', 'STD', 'STDDEV_POP',
	        'STDDEV_SAMP', 'STDDEV', 'STR_TO_DATE', 'STRCMP', 'SUBDATE',
	        'SUBSTR', 'SUBSTRING_INDEX', 'SUBSTRING', 'SUBTIME', 'SUM',
	        'SYSDATE', 'SYSTEM_USER', 'TAN', 'TIME_FORMAT', 'TIME_TO_SEC',
	        'TIME', 'TIMEDIFF', 'TIMESTAMP', 'TIMESTAMPADD', 'TIMESTAMPDIFF',
	        'TO_BASE64', 'TO_DAYS', 'TO_SECONDS', 'TOUCHES', 'TRIM',
	        'TRUNCATE', 'UCASE', 'UNCOMPRESS', 'UNCOMPRESSED_LENGTH', 'UNHEX',
	        'UNIX_TIMESTAMP', 'UPDATEXML', 'UPPER', 'USER', 'UTC_DATE',
	        'UTC_TIME', 'UTC_TIMESTAMP', 'UUID_SHORT', 'UUID', 'VALIDATE_PASSWORD_STRENGTH',
	        'VAR_POP', 'VAR_SAMP', 'VARIANCE', 'VERSION', 'WAIT_UNTIL_SQL_THREAD_AFTER_GTIDS',
	        'WEEK', 'WEEKDAY', 'WEEKOFYEAR', 'WEIGHT_STRING', 'WITHIN',
	        'X', 'Y', 'YEAR', 'YEARWEEK'
	    ];
	
	    var reserved_words = [
	        'ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE',
	        'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE',
	        'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH',
	        'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE',
	        'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN',
	        'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE',
	        'CROSS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER',
	        'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND',
	        'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE',
	        'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE',
	        'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DOUBLE',
	        'DROP', 'DUAL', 'DUPLICATE', 'EACH', 'ELSE',
	        'ELSEIF', 'ENCLOSED', 'ESCAPED', 'EXISTS', 'EXIT',
	        'EXPLAIN', 'FALSE', 'FETCH', 'FLOAT', 'FLOAT4',
	        'FLOAT8', 'FOR', 'FORCE', 'FOREIGN',
	        'FULLTEXT', 'GET', 'GRANT', 'GROUP BY', 'GROUP', 'HAVING',
	        'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF',
	        'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER',
	        'INOUT', 'INSENSITIVE', 'INSERT INTO', 'INSERT', 'INT', 'INT1',
	        'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER',
	        'INTERVAL', 'INTO', 'IO_AFTER_GTIDS', 'IO_BEFORE_GTIDS', 'IS',
	        'ITERATE', 'JOIN', 'KEY UPDATE', 'KEY', 'KEYS', 'KILL',
	        'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT',
	        'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP',
	        'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP',
	        'LOW_PRIORITY', 'MASTER_BIND', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE',
	        'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND',
	        'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT',
	        'NO_WRITE_TO_BINLOG', 'NULL', 'NUMERIC', 'ON DUPLICATE KEY UPDATE', 'ON', 'OPTIMIZE',
	        'OPTION', 'OPTIONALLY', 'OR', 'ORDER BY', 'ORDER', 'OUT',
	        'OUTER', 'OUTFILE', 'PARTITION', 'PRECISION', 'PRIMARY',
	        'PROCEDURE', 'PURGE', 'RANGE', 'READ', 'READS',
	        'READ_WRITE', 'REAL', 'REFERENCES', 'REGEXP', 'RELEASE',
	        'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL',
	        'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE',
	        'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE',
	        'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SMALLINT',
	        'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE',
	        'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL',
	        'STARTING', 'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN',
	        'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING',
	        'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE',
	        'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE',
	        'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES',
	        'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN',
	        'WHERE', 'WHILE', 'WITH', 'WRITE', 'XOR',
	        'YEAR_MONTH', 'ZEROFILL', 'BEGIN', 'END'
	    ];
	
	    var detect_keyword = [
	        'INSERT', 'INTO', 'UPDATE', 'FROM', 'JOIN',
	        'TABLE', 'PROCEDURE', 'FUNCTION', 'VIEW', 'TRIGGER',
	        'EVENT'
	    ];
	
	    var not_select_queries = [
	        "UPDATE", "CREATE", "DELETE", "INSERT", "ALTER", "DROP"
	    ];
	
	    var data_types = [
	        'tinyint', 'int', 'varchar', 'float', 'double',
	        'timestamp', 'bit', 'bigint', 'mediumint', 'date',
	        'time', 'datetime', 'year', 'date', 'enum',
	        'set', 'tinyblob', 'mediumblob', 'longblob', 'blob',
	        'varchar', 'char', 'geometr'
	    ];
	
	    //var strs = "";
	    //Ext.Array.each(data_types, function(name, idx) {
	    //
	    //    strs += "'" + name + "', ";
	    //
	    //    if ((idx + 1) % 5 === 0 && idx > 0) {
	    //
	    //        strs += "\n";
	    //    }
	    //});
	    //
	    //console.log(strs);
	
	    var regexpLimit = "LIMIT\\s*[0-9]+(\\s*,\\s*[0-9]+)?";
	
	    return {
	        singleton         : true,
	        constructor       : function(config) {
	
	
	            this.callParent(arguments);
	        },
	        getQuery          : function(query) {
	
	            var args = Ext.Array.slice(arguments, 1);
	            args.unshift(queries[query]);
	
	            return Ext.String.format.apply(this, args);
	        },
	        getDataTypes      : function() {
	
	            return data_types;
	        },
	        getDataTypesToJSON: function() {
	
	            var json = [];
	
	            Ext.Array.each(data_types, function(type, idx) {
	
	                json.push([type, type]);
	            });
	
	            return json;
	        },
	
	        getDetectKeywords: function() {
	
	            return detect_keyword;
	        },
	
	        getNotSelectQueries: function() {
	
	            return not_select_queries;
	        },
	
	        getFunctions: function() {
	
	            return functions;
	        },
	
	        getReservedWords: function() {
	
	            return reserved_words;
	        },
	
	        getJoins: function() {
	
	            return joins;
	        },
	
	        getRegexpLimit: function() {
	
	            return regexpLimit;
	        }
	    }
	})
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.QuickCommand', {
	    constructor: function() {
	
	        this.init();
	    },
	
	    init : function(){
	
	        this.commands = [];
	    },
	
	    append: function(command) {
	
	        this.commands.push(command);
	    },
	
	    get: function() {
	
	        return this.commands;
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.SchemaUtil', {
	    singleton            : true,
	    alternateClassName   : ['Planche.SchemaUtil'],
	    exportAllSchemaToHTML: function(db, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Table Information'    : api.getQuery('SHOW_ALL_TABLE_STATUS', db),
	                'View Information'     : api.getQuery('SHOW_VIEWS', db),
	                'Procedure Information': api.getQuery('SHOW_PROCEDURES', db),
	                'Function Information' : api.getQuery('SHOW_FUNCTIONS', db),
	                'Trigger Information'  : api.getQuery('SHOW_TRIGGERS', db),
	                'Event Information'    : api.getQuery('SHOW_EVENTS', db),
	                'Create Database DDL'  : api.getQuery('SHOW_DATABASE_DDL', db)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        if (key == 'Create Database DDL') {
	
	                            html.push('<div class="info">' + response.records[0][1].replace(/\n/gi, '<br/>') + '</div>');
	                        }
	                        else if (key.match(/^Table Schema/)) {
	
	                            html.push('<div class="info">' + response.records[0][1].replace(/\n/gi, '<br/>') + '</div>');
	                        }
	                        else {
	
	                            if (key == 'Table Information') {
	
	                                response.records.map(function(row, idx) {
	
	                                    queries['Table Schema - ' + row[0]] = api.getQuery('TABLE_CREATE_INFO', db, row[0]);
	                                    keys.unshift('Table Schema - ' + row[0]);
	
	                                    queries['Table Indexes - ' + row[0]] = api.getQuery('INDEX_KEYS_INFO', db, row[0]);
	                                    keys.unshift('Table Indexes - ' + row[0]);
	
	                                    queries['Table Fields - ' + row[0]] = api.getQuery('SHOW_COLUMNS', db, row[0]);
	                                    keys.unshift('Table Fields - ' + row[0]);
	                                });
	                            }
	
	                            html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        }
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportRootInfoToHTML: function(db, nodeName, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Show Databases': api.getQuery('SHOW_DATABASES')
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportDatabaseInfoToHTML: function(db, nodeName, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Table Information'    : api.getQuery('SHOW_ALL_TABLE_STATUS', db),
	                'View Information'     : api.getQuery('SHOW_VIEWS', db),
	                'Procedure Information': api.getQuery('SHOW_PROCEDURES', db),
	                'Function Information' : api.getQuery('SHOW_FUNCTIONS', db),
	                'Trigger Information'  : api.getQuery('SHOW_TRIGGERS', db),
	                'Event Information'    : api.getQuery('SHOW_EVENTS', db),
	                'Create Database DDL'  : api.getQuery('SHOW_DATABASE_DDL', db)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        if (key == 'Create Database DDL') {
	
	                            html.push('<div class="info">' + response.records[0][1].replace(/\n/gi, '<br/>') + '</div>');
	                        }
	                        else {
	
	                            html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        }
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportTablesInfoToHTML: function(db, nodeName, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Show Table Status': api.getQuery('SHOW_ALL_TABLE_STATUS', db)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportTableInfoToHTML: function(db, table, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Show Table Fields' : api.getQuery('SHOW_FULL_FIELDS', db, table),
	                'Show Table Indexes': api.getQuery('TABLE_KEYS_INFO', db, table),
	                'Create Table DDL'  : api.getQuery('TABLE_CREATE_INFO', db, table)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	
	                        if (key == 'Create Table DDL') {
	
	                            if (response.records.length == 0) {
	
	                                html.push(app.generateQueryErrorMsg(config.query, 'Empty'));
	                            }
	                            else {
	
	                                html.push('<div class="info">' + response.records[0][1].replace(/\n/gi, '<br/>') + '</div>');
	                            }
	                        }
	                        else {
	
	                            html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        }
	
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportColumnsInfoToHTML: function(db, table, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Show Table Fields': api.getQuery('SHOW_FULL_FIELDS', db, table)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    exportIndexesInfoToHTML: function(db, table, cmp, updateMethod) {
	
	        var app = Planche.getApplication(),
	            api = app.getAPIS(),
	            queries = {
	                'Show Table Indexes': api.getQuery('TABLE_KEYS_INFO', db, table)
	            },
	            keys = Ext.Object.getKeys(queries),
	            html = [],
	            tunneling;
	
	        cmp['setLoading'](true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var key = keys.shift();
	            if (key) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : queries[key],
	                    success: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(Planche.SchemaUtil.generateRecordToHTML(response));
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        html.push('<h3>' + key + '</h3>');
	                        html.push(app.generateQueryErrorMsg(config.query, response.message));
	                        tunneling();
	                    }
	                });
	            }
	            else {
	
	                cmp[updateMethod](html.join(""));
	                cmp['setLoading'](false);
	            }
	
	        }, this))();
	    },
	
	    generateRecordToHTML: function(record) {
	
	        var html = '';
	        html += '<table class="info" width="100%">';
	        html += '<tr>';
	        Ext.Array.each(record.fields, function(col, cidx) {
	
	            html += '<th>' + col.name + '</th>';
	        });
	        html += '</tr>';
	
	        if (record.records.length === 0) {
	
	            html += '<tr>';
	            html += '<td colspan="' + record.fields.length + '">There\'s no data to display</td>';
	            html += '</tr>';
	            html += '</table>';
	            return html;
	        }
	
	        Ext.Array.each(record.records, function(row, ridx) {
	
	            html += '<tr>';
	            Ext.Array.each(record.fields, function(col, cidx) {
	
	                html += '<td>' + row[cidx] + '</td>';
	            });
	            html += '</tr>';
	        });
	        html += '</table>';
	        return html;
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.QueryParser', {
	    constructor: function(engine) {
	
	        this.engine = engine;
	
	        this.type = Planche.lib.QueryTokenType.get();
	
	        this.defaultLimit = 100;
	        this.openComments = ['#', '-- ', '/*'];
	        this.closeComments = ['\n', '\n', '*/'];
	        this.boundaries = [
	            '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '()', '(', ')', '+', '-',
	            '=', '\\', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?'
	        ];
	        this.comparison = ['=', '<=', '>=', '!=', '<>', '<', '>'];
	
	        var boundaries = this.addSlashes(this.boundaries).join("|");
	
	        this.regexpWhiteSpace = new RegExp('^\\s+', 'g');
	        this.regexpTrim = new RegExp('(^\\s*)|(\\s*$)', 'gi');
	        this.regexpNotSelectQueries = new RegExp('^(' + this.engine.getNotSelectQueries().join("|") + ')', "gi");
	        this.regexpBoundaries = new RegExp('^(' + boundaries + ')', "g");
	        this.regexpSplit = new RegExp('(' + boundaries + '|$|\\s)', "g");
	        this.regexpJoin = new RegExp('^(' + this.engine.getJoins().join("|") + ')', "gi");
	        this.regexpLimit = new RegExp('^' + this.engine.getRegexpLimit(), "gi");
	
	        this.regexpDelimiter = new RegExp('^;', 'g');
	        this.regexpFunctions = new RegExp('^([a-zA-Z0-9_$.]+)\\(', "gi");
	        this.regexpReservedWords = new RegExp('^(' + this.engine.getReservedWords().join("|") + ')($|\\s|' + boundaries + ')', "i");
	        this.regexpComparison = new RegExp('^(' + this.addSlashes(this.comparison).join("|") + ')', "g");
	        this.regexpFunctions = new RegExp('^([a-zA-Z0-9_$.]+)\\(', "gi");
	
	        this.regexpBackTickQuotedString = /^\`(?:[^\`\\]|\\.)*\`/;
	        this.regexpQuotedString = /^(\'(?:[^\'\\]|\\.)*\'|\"(?:[^\"\\]|\\.)*\")/;
	
	        this.regexpReference = /(^[`]?[\w.]+[`]?\.[`]?[\w.]+[`]?)|(^[`]?[\w.]+[`]?)/;
	        this.regexpNumber = /^[0-9]+/;
	
	        this.regexpAlgorithm = /^ALGORITHM(\s+)?=(\s+)?[a-zA-Z]+/gi;
	        this.regexpDefiner = /^DEFINER(\s+)?=(\s+)?([`\'\"]?)(.+?)\3@?([`\'\"]?)(.+?)\5/gi;
	
	        this.space = ' ';
	        this.newln = '\n';
	        this.tab = '\t';
	    },
	
	    parse: function(string, delimiter) {
	
	        if (delimiter) {
	
	            this.regexpDelimiter = new RegExp("^" + this.addSlashes(delimiter), 'g');
	        }
	
	        var tokens, queries, i;
	
	        tokens = this.tokenize(string);
	        queries = this.splitQuery(tokens);
	        queries = this.parseQuery(queries);
	
	        for (i in queries) {
	
	            queries[i] = Ext.create('Planche.lib.Query', queries[i]);
	        }
	
	        return queries;
	    },
	
	    tokenize: function(string) {
	
	        var len = string.length;
	        var tokens = [], token;
	        this.detect = false;
	
	        while (len) {
	
	            token = this.getNextToken(string);
	            string = string.substring(token.value.length);
	
	            //break infinity loop
	            if (len == string.length) {
	
	                break;
	            }
	            else {
	
	                len = string.length;
	            }
	
	            tokens.push(token);
	        }
	
	        return tokens;
	    },
	
	    getNextToken : function(string) {
	
	        var token = {}, matches;
	
	        if (matches = string.match(this.regexpWhiteSpace)) {
	
	            token.type = this.type.SPACE;
	            token.value = matches[0];
	            return token;
	        }
	
	        var cmts = this.openComments, cmt, i, inCmt = -1, pos;
	        for (i in cmts) {
	
	            cmt = cmts[i];
	
	            if (string.substring(0, cmt.length) == cmt) {
	
	                inCmt = i;
	                break;
	            }
	        }
	
	        if (inCmt > -1) {
	
	            token.type = this.type.COMMENT;
	            pos = string.indexOf(this.closeComments[inCmt]);
	            if (pos > -1) {
	
	                token.value = string.substring(0, pos + this.closeComments[inCmt].length);
	            }
	            else {
	
	                token.value = string.substring(0);
	            }
	
	            return token;
	        }
	
	        if (matches = string.match(this.regexpDelimiter)) {
	
	            token.type = this.type.QUERY_END;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpAlgorithm)) {
	
	            token.type = this.type.ALGORITHM;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpDefiner)) {
	
	            token.type = this.type.DEFINER;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpComparison)) {
	
	            token.type = this.type.COMPARISON;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpJoin)) {
	
	            this.detect = true;
	
	            token.type = this.type.JOIN;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpFunctions)) {
	
	            token.type = this.type.FUNCTION;
	
	            var value = matches[0];
	
	            string = string.substring(value.length);
	
	            var len          = string.length,
	                funcDepth    = 1,
	                funcToken    = {},
	                funcPos,
	                me           = this,
	                getNextToken = function(string) {
	
	                    // console.log(string);
	
	                    if (m = string.match(me.regexpWhiteSpace)) {
	
	                        return m[0];
	                    }
	
	                    if (m = string.match(me.regexpFunctions)) {
	
	                        funcDepth++;
	                        return m[0];
	                    }
	
	                    if (m = string.match(me.regexpQuotedString)) {
	
	                        return m[0];
	                    }
	
	                    if (m = string.match(me.regexpBoundaries)) {
	
	                        if (m[0] == '(') {
	
	                            funcDepth++;
	                        }
	                        else if (m[0] == ')') {
	
	                            funcDepth--;
	                        }
	
	                        return m[0];
	                    }
	
	                    if (funcPos = string.search(me.regexpSplit)) {
	
	                        if (m = string.match(me.regexpNumber)) {
	
	                            return string.substring(0, funcPos);
	                        }
	                        else {
	
	                            return string.substring(0, funcPos);
	                        }
	                    }
	                    else {
	
	                        return string;
	                    }
	                };
	
	            while (len) {
	
	                var funcToken = getNextToken(string);
	
	                value += funcToken;
	
	                string = string.substring(funcToken.length);
	
	                //break infinity loop
	                if (len == string.length) {
	
	                    break;
	                }
	                else {
	
	                    len = string.length;
	                }
	
	                if (funcDepth === 0) {
	
	                    break;
	                }
	            }
	
	
	            token.value = value;
	            return token;
	        }
	
	        if (matches = string.match(this.regexpLimit)) {
	
	            token.type = this.type.LIMIT;
	            token.value = matches[0];
	
	            return token;
	        }
	
	        if (matches = string.match(/^DELIMITER\s?([^\s]+)/i)) {
	
	            token.type = this.type.DELIMITER;
	            token.value = matches[0];
	
	            this.regexpDelimiter = new RegExp("^" + this.addSlashes(matches[1]), 'g');
	
	            return token;
	        }
	
	        if (matches = string.match(this.regexpReservedWords)) {
	
	            this.detect = false;
	
	            var upper = matches[1].toUpperCase();
	
	            if (this.engine.getDetectKeywords().indexOf(upper) > -1) {
	
	                this.detect = upper;
	            }
	
	            token.type = this.type.RESERVED_WORD;
	            token.value = matches[1];
	            return token;
	        }
	
	        if (this.detect) {
	
	            if (matches = string.match(this.regexpReference)) {
	
	                token.type = this.type[this.detect] || this.type.TABLE;
	                token.value = matches[0];
	
	                //console.log(matches);
	                this.detect = false;
	
	                return token;
	            }
	        }
	
	        if (matches = string.match(this.regexpReference)) {
	
	            token.type = this.type.REFERENCE;
	            token.value = matches[0];
	
	            return token;
	        }
	
	        if (matches = string.match(this.regexpBackTickQuotedString)) {
	
	            token.type = this.type.BACKTICK_QUOTED_STRING;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpQuotedString)) {
	
	            token.type = this.type.QUOTED_STRING;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (matches = string.match(this.regexpBoundaries)) {
	
	            token.type = this.type.BOUNDARY;
	            token.value = matches[0];
	            return token;
	        }
	
	        if (pos = string.search(this.regexpSplit)) {
	
	            var value = string.substring(0, pos);
	
	            if (matches = string.match(this.regexpNumber)) {
	
	                token.type = this.type.NUMBER;
	                token.value = value;
	                return token;
	            }
	            else {
	
	                token.type = this.type.STRING;
	                token.value = value;
	                return token;
	            }
	        }
	        else {
	
	            var value = string;
	        }
	
	        token.type = this.type.STRING;
	        token.value = value;
	
	        return token;
	    },
	    addSlashes   : function(arr) {
	
	        if (typeof arr == 'string') {
	
	            return Ext.Array.map(arr.split(''), function(item, idx) {
	                return item.replace(/./g, '\\$&');
	            }).join('');
	        }
	        else {
	
	            return Ext.Array.map(arr, function(item, idx) {
	                return item.replace(/./g, '\\$&');
	            });
	        }
	    },
	    setLineCursor: function(tokens) {
	
	        var i, j, token, type, word, line = 0, cursor = 0;
	
	        for (i = 0 ; i < tokens.length ; i++) {
	
	            token = tokens[i];
	            type = token.type;
	            word = token.value;
	
	            token.sline = [line, cursor];
	
	            if (type == this.type.SPACE || type == this.type.LIMIT) {
	
	                for (j = 0 ; j < word.length ; j++) {
	
	                    chr = word[j];
	                    if (chr == this.newln) {
	
	                        line++;
	                        cursor = 0;
	                    }
	                    else {
	
	                        cursor++;
	                    }
	                }
	            }
	            else {
	
	                cursor += word.length;
	            }
	
	            token.eline = [line, cursor];
	        }
	
	        return tokens;
	    },
	
	    splitQuery: function(tokens) {
	
	        var queries = [], tmpTokens = [], raw = '', token, delimiter = false, sline = [0, 0], eline = [0, 0];
	
	        tokens = this.setLineCursor(tokens);
	        level = 1;
	
	        while (tokens.length) {
	
	            token = tokens.shift();
	
	            if (token.type == this.type.DELIMITER) {
	
	                if (tmpTokens.length > 0 && Ext.String.trim(raw)) {
	
	                    queries.push({raw: raw, sline: sline, eline: eline, tokens: tmpTokens, delimiter: false});
	                }
	
	                queries.push({
	                    raw      : token.value,
	                    sline    : token.sline,
	                    eline    : token.eline,
	                    tokens   : [token],
	                    delimiter: true
	                });
	
	                sline = token.eline;
	                tmpTokens = [];
	                raw = '';
	                continue;
	            }
	
	            if (token.type == this.type.QUERY_END) {
	
	                tmpTokens.push(token);
	
	                queries.push({raw: raw, sline: sline, eline: token.eline, tokens: tmpTokens, delimiter: false});
	
	                sline = token.eline;
	                tmpTokens = [];
	                raw = '';
	                continue;
	            }
	
	            tmpTokens.push(token);
	            raw += token.value;
	            eline = token.eline;
	        }
	
	        if (raw.replace(/\s/g, "")) {
	
	            queries.push({raw: raw, sline: sline, eline: eline, tokens: tmpTokens});
	        }
	
	        return queries;
	    },
	
	    parseQuery: function(queries) {
	
	        var i, j, tokens, token, query, level, hasLimit,
	            value, type, matches, isSelectQuery, sql = '';
	
	        for (i in queries) {
	
	            level = 1;
	            hasLimit = false;
	            query = queries[i];
	
	            if (!query) return;
	
	            query.start = 0;
	            query.end = this.defaultLimit;
	
	            isSelectQuery = null;
	            sql = '';
	
	            for (j = 0 ; j < query.tokens.length ; j++) {
	
	                token = query.tokens[j];
	                value = token.value;
	                type = token.type;
	
	                if (type == this.type.DELIMITER) {
	
	                    isSelectQuery = null;
	                    sql += value;
	                    continue;
	                }
	
	                if (type == this.type.BOUNDARY) {
	
	                    if (value == "(") {
	
	                        level++;
	                    }
	
	                    if (value == ")") {
	
	                        level--;
	                    }
	                    sql += value;
	                    continue;
	                }
	
	                if (isSelectQuery == null) {
	
	                    if (value.match(this.regexpNotSelectQueries)) {
	
	                        isSelectQuery = false;
	                    }
	                    else if (value.match(/^SELECT/gi)) {
	
	                        isSelectQuery = true;
	                    }
	
	                    query.isSelectQuery = isSelectQuery;
	
	                    sql += value;
	                    continue;
	                }
	
	                if (isSelectQuery === true && level == 1 && type == this.type.LIMIT) {
	
	                    hasLimit = true;
	                    matches = value.replace(/\s+/g, '').match(/[0-9]+/g);
	                    if (matches.length == 2) {
	
	                        query.start = parseInt(matches[0], 10);
	                        query.end = parseInt(matches[1], 10);
	                    }
	                    else {
	
	                        query.start = 0;
	                        query.end = parseInt(matches[0], 10);
	                    }
	                }
	                else {
	
	                    if (type != this.type.QUERY_END) {
	
	                        sql += value;
	                    }
	                }
	            }
	
	            if (isSelectQuery === true && hasLimit === false) {
	
	                hasLimit = true;
	                query.start = 0;
	                query.end = this.defaultLimit;
	            }
	
	            query.hasLimit = hasLimit;
	            query.sql = sql;
	        }
	
	        return queries;
	    }
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.QueryTokenType', function() {
	
	    var type = {
	        STRING                : 0,
	        COMMENT               : 1,
	        SPACE                 : 2,
	        TOP_LEVEL             : 3,
	        JOIN                  : 4,
	        CONDITIONS            : 5,
	        FUNCTION              : 6,
	        BOUNDARY              : 7,
	        QUOTED_STRING         : 8,
	        DELIMITER             : 9,
	        QUERY_END             : 10,
	        LIMIT                 : 11,
	        COMPARISON            : 12,
	        RESERVED_WORD         : 13,
	        KEYWORD               : 14,
	        TABLE                 : 15,
	        NUMBER                : 16,
	        ALGORITHM             : 17,
	        DEFINER               : 18,
	        BACKTICK_QUOTED_STRING: 19,
	        PROCEDURE             : 20,
	        TRIGGER               : 21,
	        EVENT                 : 22,
	        FUNCTION              : 23,
	        VIEW                  : 24,
	        REFERENCE             : 25
	    };
	
	    return {
	        singleton  : true,
	        constructor: function(config) {
	
	            this.callParent(arguments);
	        },
	        get        : function() {
	
	            return type;
	        }
	    };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.QueryAlignment', function() {
	
	    var type;
	
	    var independent_newline = [
	            'SELECT', 'WHERE', 'SET', 'ORDER BY', 'GROUP BY', 'VALUES',
	            'HAVING', 'BEGIN', 'END', 'INSERT INTO', 'INSERT', 'UPDATE', 'DELETE FROM', 'DELETE', 'DROP TABLE', 'CREATE TABLE', 'ALTER TABLE',
	            'NATURAL JOIN', 'INNER JOIN', 'LFET INNER JOIN', 'RIGHT INNER JOIN', 'LEFT OUTER JOIN',
	            'LEFT JOIN', 'RIGHT OUTER JOIN', 'RIGHT JOIN', 'CROSS JOIN', 'JOIN', 'FROM', 'ON DUPLICATE KEY UPDATE'
	        ],
	        independent_inline = [
	            'AND', 'OR', 'XOR', 'END', ','
	        ];
	
	    return {
	        requires : [
	            'Planche.lib.QueryTokenType'
	        ],
	        singleton  : true,
	        constructor: function(config) {
	
	            this.callParent(arguments);
	
	            type = Planche.lib.QueryTokenType.get();
	        },
	
	        equalLastChar: function(str, ch) {
	
	            return str.slice(str.length - 1) === ch;
	        },
	
	        alignment: function(query) {
	
	            var tokens = [];
	            Ext.Array.each(query.getTokens(), function(token, idx) {
	
	                //first remove spaces and new lines, whitespaces
	                if (token.type == type.SPACE) {
	
	                    return;
	                }
	
	                tokens.push(token);
	            });
	
	            var me = this,
	                tmpStr = '',
	                indentLevel = 1,
	                prevToken = {
	                    value: null,
	                    type : null
	                },
	                countColumn = 0;
	
	            Ext.Array.each(tokens, function(token, idx) {
	
	                var tokenVal = token.value,
	                    tokenValUCase = tokenVal.toUpperCase(),
	                    tokenType = token.type,
	                    nextToken = tokens[idx + 1] || {value: null, type: null},
	                    nextTokenType = nextToken.type,
	                    nextTokenVal = nextToken.value,
	                    prevTokenType = prevToken.type,
	                    prevTokenVal = prevToken.value;
	
	
	                //if (tokenType === type.JOIN) {
	                //
	                //    tmpStr += (me.equalLastChar(tmpStr, '\n') ? '' : '\n') + (new Array(indentLevel).join("\t"));
	                //
	                //    if (nextToken.type === type.TABLE) {
	                //
	                //        tmpStr += tokenValUCase + " ";
	                //        prevToken = token;
	                //        return;
	                //    }
	                //
	                //    tmpStr += tokenValUCase + "\n" + (new Array(indentLevel).join("\t"));
	                //    prevToken = token;
	                //    return;
	                //}
	                //
	
	                if(independent_newline.indexOf(tokenValUCase) > -1){
	
	                    if(indentLevel > 1 && prevTokenVal != '(') {
	
	                        indentLevel--;
	                    }
	
	                    tmpStr += '\n'+(new Array(indentLevel).join("\t")) + tokenValUCase + '\n';
	
	                    indentLevel++;
	
	                    tmpStr += (new Array(indentLevel).join("\t"));
	
	                    prevToken = token;
	
	                    return;
	                }
	
	                if(independent_inline.indexOf(tokenValUCase) > -1){
	
	                    tmpStr += '\n'+(new Array(indentLevel).join("\t")) + tokenValUCase + (tokenValUCase == ',' ? '' : ' ');
	                    prevToken = token;
	                    return;
	                }
	
	                if (tokenType === type.RESERVED_WORD) {
	
	                    tmpStr += tokenValUCase + " ";
	                    prevToken = token;
	                    return;
	                }
	
	                if (tokenType == type.QUOTED_STRING || tokenType == type.BACKTICK_QUOTED_STRING) {
	
	                    if (countColumn === -1) {
	
	                        countColumn = 0;
	                    }
	
	                    if (countColumn > -1) {
	
	                        countColumn++;
	                    }
	
	                    tmpStr += tokenVal;
	                    prevToken = token;
	
	                    return;
	                }
	
	                if (tokenType === type.BOUNDARY) {
	
	                    if (tokenVal != ',') {
	
	                        countColumn = -1;
	                    }
	
	                    if (tokenVal == '(') {
	
	                        if (tokens[idx + 2]) {
	
	                            if (tokens[idx + 2].value == ')') {
	
	                                tmpStr += tokenVal;
	                                prevToken = token;
	                                return;
	                            }
	                        }
	
	                        indentLevel++;
	                        tmpStr += tokenVal + "\n" + (new Array(indentLevel).join("\t"));
	                        prevToken = token;
	                        return;
	                    }
	
	                    if (tokenVal == ')') {
	
	                        if (tokens[idx - 2]) {
	
	                            if (tokens[idx - 2].value == '(') {
	
	                                tmpStr += tokenVal + " ";
	                                prevToken = token;
	                                return;
	                            }
	                        }
	
	                        if(indentLevel > 1) {
	
	                            indentLevel--;
	                        }
	
	                        tmpStr += "\n" + (new Array(indentLevel).join("\t"));
	
	                        if (nextTokenVal == ',') {
	
	                            tmpStr += tokenVal;
	                            prevToken = token;
	                            return;
	                        }
	
	                        tmpStr += tokenVal + " ";
	                        prevToken = token;
	                        return;
	                    }
	
	                    if (tokenVal == ',') {
	
	                        if (prevTokenVal == ")") {
	
	                            tmpStr += tokenVal + "\n" + (new Array(indentLevel).join("\t"));
	                            prevToken = token;
	                            return;
	                        }
	
	                        if (countColumn % 5 == 0 && countColumn > 0) {
	
	                            //if (countColumn % 5 == 0){
	                            //
	                            //    ((2 - 1) * 5) + 1
	                            //}
	
	                            tmpStr += tokenVal + "\n" + (new Array(indentLevel).join("\t"));
	                            prevToken = token;
	                            return;
	                        }
	
	                        tmpStr += tokenVal + " ";
	                        prevToken = token;
	                        return;
	                    }
	
	                    if (nextTokenType === type.STRING) {
	
	                        tmpStr += tokenVal;
	                        prevToken = token;
	                        return;
	                    }
	
	                    tmpStr += tokenVal + " ";
	                    prevToken = token;
	                    return;
	                }
	
	                if (tokenType === type.FUNCTION) {
	
	                    if (nextTokenType === type.RESERVED_WORD) {
	
	                        tmpStr += tokenValUCase + "\n" + (new Array(indentLevel).join("\t"));
	                        prevToken = token;
	                        return;
	                    }
	
	                    tmpStr += tokenValUCase + " ";
	                    prevToken = token;
	                    return;
	                }
	
	                if (tokenType == type.COMMENT) {
	
	                    tmpStr += (me.equalLastChar(tmpStr, '\n') ? '' : '\n') + (new Array(indentLevel).join("\t"));
	
	                    tmpStr += tokenVal;
	
	                    if (tokenVal.slice(tokenVal.length - 2) == "*/") {
	
	                        tmpStr += "\n" + (new Array(indentLevel).join("\t"));
	                    }
	
	                    prevToken = token;
	                    return;
	                }
	
	                if (tokenType == type.DELIMITER) {
	
	                    tmpStr += tokenVal;
	                    tmpStr += '\n\n';
	                    prevToken = token;
	                    return;
	                }
	
	                if (nextTokenVal === ".") {
	
	                    tmpStr += tokenVal;
	                    prevToken = token;
	                    return;
	                }
	
	                tmpStr += tokenVal + " ";
	                prevToken = token;
	            });
	
	            return tmpStr;
	        }
	    };
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.Query', {
		constructor : function (query) {
	
			Ext.apply(this, query);
	
			this.orderColumn = '';
			this.orderDirection = '';
		},
	
		getPrevRecordSetSQL : function () {
	
			this.start -= this.end;
	
			if(this.start < 0) this.start = 0;
			
			return this.getSQL();
		},
	
		getNextRecordSetSQL : function () {
	
			this.start += this.end;
	
			return this.getSQL();
		},
	
		getPrevRecordSQL : function () {
	
			this.start--;
	
			if(this.start < 0) this.start = 0;
			
			return this.getSQL();
		},
	
		getNextRecordSQL : function () {
	
			this.start++;
	
			return this.getSQL();
		},
	
		getSQL : function () {
			
			if(this.isSelectQuery == true) {
	
				var sql = this.sql;
	
				if(this.orderColumn && this.orderDirection) {
	
					sql += ' ORDER BY ' + this.orderColumn + ' ' + this.orderDirection;
				}
	
				sql += ' LIMIT ' + this.start + ", " + this.end;
	
				return sql;
			}
			else {
	
				return this.raw;
			}
		},
	
		getRawSQL : function () {
	
			return this.raw;
		},
	
		getTokens : function () {
	
			return this.tokens;
		},
	
		isSelectQuery : function () {
	
			return this.selectQuery;
		},
	
		isDelimiter : function () {
	
			return this.delimiter;
		},
	
		hasNext : function () {
	
			return this.raw.length > this.end ? true : false;
		},
	
		setRecords : function (records) {
	
			Ext.apply(this, {
				records : records
			});
		},
	
		setOrderBy : function (column, direction) {
	
			this.orderColumn = column;
			this.orderDirection = direction;
		},
	
		isSelectedQuery : function (line, cursor) {
	
			var linecursor = parseFloat(line + "." + cursor);
	
			if(this.sline <= linecursor && linecursor >= this.eline) {
	
				return true;
			}
			else {
	
				return false;
			}
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.DBUtil', {
	    singleton         : true,
	    alternateClassName: ['Planche.DBUtil'],
	    getAssocArray     : function(fields, records, upper_case_key) {
	
	        upper_case_key = upper_case_key || false;
	
	        if (upper_case_key) {
	
	            Ext.Array.each(fields, function(field, fidx) {
	
	                fields[fidx].name = field.name.toUpperCase();
	            });
	        }
	
	        var tmp = [];
	        Ext.Array.each(records, function(record, ridx) {
	
	            var row = {};
	            Ext.Array.each(fields, function(field, fidx) {
	
	                row[field.name] = record[fidx];
	            });
	
	            tmp.push(row);
	        });
	
	        return tmp;
	    },
	
	    escapeString : function (str) {
	
	        //https://gist.github.com/zirosas/9479236
	        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
	            switch (char) {
	                case "\0":
	                    return "\\0";
	                case "\x08":
	                    return "\\b";
	                case "\x09":
	                    return "\\t";
	                case "\x1a":
	                    return "\\z";
	                case "\n":
	                    return "\\n";
	                case "\r":
	                    return "\\r";
	                case "\"":
	                case "'":
	                case "\\":
	                case "%":
	                    return "\\"+char; // prepends a backslash to backslash, percent,
	                                      // and double/single quotes
	            }
	        });
	    }
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.Base64', {
	    singleton         : true,
	    alternateClassName: ['Planche.Base64'],
	    _keyStr           : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	    encode            : function(e) {
	        var t = "";
	        var n, r, i, s, o, u, a;
	        var f = 0;
	        e = this._utf8_encode(e);
	        while (f < e.length) {
	            n = e.charCodeAt(f++);
	            r = e.charCodeAt(f++);
	            i = e.charCodeAt(f++);
	            s = n >> 2;
	            o = (n & 3) << 4 | r >> 4;
	            u = (r & 15) << 2 | i >> 6;
	            a = i & 63;
	            if (isNaN(r)) {u = a = 64} else if (isNaN(i)) {a = 64}
	            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
	        }
	        return t
	    },
	    decode            : function(e) {
	        var t = "";
	        var n, r, i;
	        var s, o, u, a;
	        var f = 0;
	        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	        while (f < e.length) {
	            s = this._keyStr.indexOf(e.charAt(f++));
	            o = this._keyStr.indexOf(e.charAt(f++));
	            u = this._keyStr.indexOf(e.charAt(f++));
	            a = this._keyStr.indexOf(e.charAt(f++));
	            n = s << 2 | o >> 4;
	            r = (o & 15) << 4 | u >> 2;
	            i = (u & 3) << 6 | a;
	            t = t + String.fromCharCode(n);
	            if (u != 64) {t = t + String.fromCharCode(r)}
	            if (a != 64) {t = t + String.fromCharCode(i)}
	        }
	        t = this._utf8_decode(t);
	        return t
	    },
	    _utf8_encode      : function(e) {
	        e = e.replace(/\r\n/g, "\n");
	        var t = "";
	        for (var n = 0 ; n < e.length ; n++) {
	            var r = e.charCodeAt(n);
	            if (r < 128) {t += String.fromCharCode(r)} else if (r > 127 && r < 2048) {
	                t += String.fromCharCode(r >> 6 | 192);
	                t += String.fromCharCode(r & 63 | 128)
	            } else {
	                t += String.fromCharCode(r >> 12 | 224);
	                t += String.fromCharCode(r >> 6 & 63 | 128);
	                t += String.fromCharCode(r & 63 | 128)
	            }
	        }
	        return t
	    },
	    _utf8_decode      : function(e) {
	        var t = "";
	        var n = 0;
	        var r = c1 = c2 = 0;
	        while (n < e.length) {
	            r = e.charCodeAt(n);
	            if (r < 128) {
	                t += String.fromCharCode(r);
	                n++
	            } else if (r > 191 && r < 224) {
	                c2 = e.charCodeAt(n + 1);
	                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
	                n += 2
	            } else {
	                c2 = e.charCodeAt(n + 1);
	                c3 = e.charCodeAt(n + 2);
	                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
	                n += 3
	            }
	        }
	        return t
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	Ext.define('Planche.store.DatabaseSchemaTree', {
	    extend       : 'Ext.data.TreeStore',
	    root         : {
	        type    : 'database',
	        text    : '',
	        icon    : 'resources/images/icon_database.png',
	        leaf    : false,
	        expanded: true,
	        children: [{
	            type: 'tables',
	            text: 'Tables',
	            leaf: false
	        }, {
	            type: 'views',
	            text: 'Views',
	            leaf: false
	        }, {
	            type: 'procedures',
	            text: 'Procedures',
	            leaf: false
	        }, {
	            type: 'functions',
	            text: 'Functions',
	            leaf: false
	        }, {
	            type: 'triggers',
	            text: 'Triggers',
	            leaf: false
	        }, {
	            type: 'events',
	            text: 'Events',
	            leaf: false
	        }]
	    },
	    initComponent: function() {
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	Ext.define('Planche.store.GrantSchemaTree', {
	    extend: 'Ext.data.TreeStore',
	    root  : {
	        type    : 'global',
	        path    : 'global',
	        text    : 'Global Privileges',
	        expanded: true
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	Ext.define('Planche.view.user.GrantPrivList', {
	    extend       : 'Ext.grid.Panel',
	    alias        : 'widget.grant-priv-list',
	    emptyText    : 'There\'s no data to display',
	    initComponent: function() {
	
	        var list = this;
	
	        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
	            mode         : 'multi'
	        });
	
	        this.columns = [
	            {text: 'Privileges', dataIndex: 'cmd', flex: 1, sortable: false, menuDisabled: true}
	        ];
	
	        this.store = Ext.create('Ext.data.Store', {
	            fields: ['priv', 'cmd'],
	            data  : []
	        });
	
	        this.callParent(arguments);
	
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.DownloadToCSVTargetList', {
	    extend       : 'Ext.grid.Panel',
	    alias        : 'widget.download-to-csv-target-list',
	    config       : {
	        application: null
	    },
	    initComponent: function() {
	
	        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
	            mode: 'multi'
	        });
	
	        this.columns = [
	            Ext.create('Ext.grid.RowNumberer'),
	            {
	                text     : 'Table',
	                dataIndex: 'Name',
	                flex     : 1,
	                renderer : function(value, p, record) {
	
	                    return Ext.String.format('<img src=\'resources/images/icon_table.png\'> {0}', record.raw.Name);
	                }
	            }, {
	                text     : 'Comment',
	                dataIndex: 'Comment',
	                width    : 200
	            }];
	
	        this.store = Ext.create('Ext.data.Store', {
	            fields: ['Name', 'Comment'],
	            data  : []
	        });
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.CopyDatabaseTargetList', {
	    extend       : 'Ext.grid.Panel',
	    alias        : 'widget.copy-database-target-list',
	    config       : {
	        application: null
	    },
	    initComponent: function() {
	
	        var app = this.getApplication();
	
	        this.columns = [{
	            text     : 'Connection',
	            dataIndex: 'connection'
	        }, {
	            text     : 'Database',
	            dataIndex: 'database',
	            flex     : 1,
	            renderer : function(value, p, record) {
	
	                return Ext.String.format('<img src=\'resources/images/icon_database.png\'> {0}', record.raw.database);
	            }
	        }];
	
	        this.store = Ext.create('Ext.data.Store', {
	            fields: ['connection', 'database'],
	            data  : []
	        });
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.Window', {
	    extend       : 'Ext.window.Window',
	    config       : {
	        buttons: []
	    },
	    initComponent: function() {
	
	        this.callParent(arguments);
	
	        if (typeof this.buttons === 'undefined' || this.buttons === null) {
	
	            this.buttons = [];
	        }
	
	        if (this.closable) {
	
	            this.buttons.push({
	                text   : '닫기',
	                handler: function(button, event) {
	
	                    var win = button.up("window");
	                    win.destroy();
	                }
	            });
	        }
	    },
	    stateful     : true,
	    layout       : 'fit',
	    bodyStyle    : "background-color:#FFFFFF",
	    tools        : [{
	        type   : 'maximize',
	        handler: function(event, toolEl, owner, tool) {
	
	            owner.up("window").toggleMaximize();
	        }
	    }, {
	        hidden : true,
	        type   : 'restore',
	        handler: function(event, toolEl, owner, tool) {
	
	            var win = owner.up("window");
	
	            var state = win.getState();
	
	            win.setPosition(state.pos[0], state.pos[1]);
	
	            win.toggleMaximize();
	        }
	    }],
	    width        : 900,
	    height       : 800,
	    overflowY    : 'auto',
	    autoScroll   : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    modal        : true
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.Menu', {
	    extend  : 'Ext.toolbar.Toolbar',
	    xtype   : 'planche-menu',
	    defaults: {
	        xtype: 'splitbutton',
	        split: false
	    },
	    items   : (function() {
	
	        var menus = ['Connection'];
	
	        if(Planche.platform == 'planche-wordpress' || Planche.platform == 'planche-desktop') {
	
	            // menus.push('Bookmark')
	        }
	
	        menus.push(
	            'Query', 'Edit', 'Database', 'Table', 'Export', 'Tools', 'Help'
	        );
	
	        var tmp = [];
	        Ext.Array.each(menus, function(name, idx) {
	
	            tmp.push({text: name, menu: Ext.create('Ext.menu.Menu')});
	        });
	
	        return tmp;
	    })()
	});


/***/ },
/* 20 */
/***/ function(module, exports) {

	Ext.define('Planche.view.Main', {
	    extend : 'Ext.container.Container',
	    xtype  : 'app-main',
	    style  : {"background": "#E0E0E0"},
	    padding: 5,
	    layout : {
	        type: 'vbox'
	    },
	
	    /**
	     * Planche Main View
	     *
	     * @class Planche.view.Main
	     * @constructor
	     */
	    initComponent: function() {
	
	        this.items = [
	            this.initTopMenu(),
	            this.initToolBar(),
	            this.initConnectTabPanel(),
	            this.initFooter(),
	            this.initContextMenu()
	        ];
	
	        this.callParent(arguments);
	    },
	
	    /**
	     * initialize top menu
	     *
	     * @method initTopMenu
	     */
	    initTopMenu: function() {
	
	        return {
	            xtype   : 'planche-menu',
	            id      : 'top-menu',
	            width   : '100%',
	            height  : 30,
	            margin  : '0px 0px 2px 0px'
	        };
	    },
	
	    /**
	     * initialize tool-bar
	     *
	     * @method initToolBar
	     */
	    initToolBar: function() {
	
	        return {
	            xtype  : 'planche-toolbar',
	            id     : 'planche-toolbar',
	            padding: 3,
	            margin : '0px 0px 1px 0px'
	        };
	    },
	
	    /**
	     * initialize connnect tab panel
	     *
	     * @method initConnectTabPanel
	     */
	    initConnectTabPanel: function() {
	
	        //메인탭에 커넥션별 탭을 구성한다.
	        return {
	            id      : 'connect-tab-panel',
	            xtype   : 'tabpanel',
	            flex    : 1,
	            width   : '100%',
	            height  : '100%',
	            border  : false,
	            margin  : '0px 0px 5px 0px',
	            stateful: true
	        };
	    },
	
	    /**
	     * initialize context menu
	     *
	     * @method initContextMenu
	     */
	    initContextMenu: function() {
	
	        return {
	            xtype   : 'menu',
	            id      : 'schema-context-menu',
	            defaults: {
	                scope: this
	            },
	            items   : []
	        };
	    },
	
	    /**
	     * initialize footer
	     *
	     * @method initFooter
	     */
	    initFooter: function() {
	
	        return {
	            xtype   : 'container',
	            layout  : 'hbox',
	            id      : 'planche-footer',
	            defaults: {
	                scope: this
	            },
	            items   : [{
	                xtype : 'progressbar',
	                id    : 'footer-task-progressbar',
	                width : 200,
	                height: 20
	            }, {
	                xtype  : 'component',
	                width : '100%',
	                border: 1,
	                text   : 'Loading tasks',
	                margin : '0px 0px 0px 5px',
	                padding: '3px 0px 0px 0px',
	                html   : '<div id="footer-task-message">Task status</div>',
	                style  : {
	                    color: '#629632'
	                }
	            }]
	        };
	    }
	});


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Planche viewport
	 *
	 * @class Planche.view.Viewport
	 */
	Ext.define('Planche.view.Viewport', {
	    extend: 'Ext.container.Viewport',
	    requires:[
	        'Ext.layout.container.Fit',
	        'Planche.view.Main'
	    ],
	
	    layout: {
	        type: 'fit'
	    },
	
	    items: [{
	        xtype: 'app-main'
	    }]
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.ConnectTab', {
	    extend  : 'Ext.panel.Panel',
	    alias   : 'widget.connect-tab',
	    layout  : 'border',
	    border  : false,
	    closable: true,
	    width   : '100%',
	    height  : 30,
	    style   : {"background": "#E0E0E0"},
	    padding : '5px 0px 0px 0px',
	    items   : [{
	        xtype: 'schema-tree'
	    }, {
	
	        xtype: 'query-tab-panel'
	    }],
	    config  : {
	        hostName    : 'localhost',
	        tunnelingURL: 'http://',
	        host        : '',
	        user        : '',
	        pass        : '',
	        db          : '',
	        charset     : 'utf8',
	        port        : 3306,
	        DBMS        : 'mysql',
	        APIS        : Planche.dbms.mysql,
	        requestType : 'ajax',
	        quickCommand: null
	    }
	});


/***/ },
/* 23 */
/***/ function(module, exports) {

	Ext.define('Planche.view.user.UserAdd', {
	    extend       : 'Planche.lib.Window',
	    alias        : 'widget.user-add',
	    stateful     : true,
	    title        : 'User Add',
	    layout       : 'vbox',
	    bodyStyle    : "background-color:#FFFFFF",
	    width        : 500,
	    height       : 500,
	    overflowY    : 'auto',
	    autoScroll   : true,
	    modal        : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    config       : {
	        user: '',
	        host: ''
	    },
	    items        : [{
	        xtype   : 'fieldset',
	        title   : 'User Information',
	        layout  : 'anchor',
	        defaults: {
	            xtype : "textfield",
	            anchor: '100%'
	        },
	        flex    : 1,
	        width   : '100%',
	        items   : [{
	            id        : 'user-add-user-name',
	            fieldLabel: 'Username',
	            value     : ''
	        }, {
	            id        : 'user-add-host',
	            fieldLabel: 'Host',
	            value     : ''
	        }, {
	            id        : 'user-add-password',
	            fieldLabel: 'Password',
	            inputType : 'password',
	            value     : ''
	        }, {
	            id        : 'user-add-retype-password',
	            fieldLabel: 'ReType Password',
	            inputType : 'password',
	            value     : ''
	        }]
	    }, {
	        xtype   : 'fieldset',
	        title   : 'Operation Restrictions',
	        layout  : 'anchor',
	        defaults: {
	            xtype    : "spinnerfield",
	            anchor   : '100%',
	            value    : 0,
	            minValue : 0,
	            increment: 10
	        },
	        flex    : 1,
	        width   : '100%',
	        items   : [{
	            id        : 'user-add-max-questions',
	            fieldLabel: 'Max number of queries per hour'
	        }, {
	            id        : 'user-add-max-updates',
	            fieldLabel: 'Max number of updates per hour'
	        }, {
	            id        : 'user-add-max-connections',
	            fieldLabel: 'Max number of connections per hour'
	        }, {
	            id        : 'user-add-max-user-connections',
	            fieldLabel: 'Max number of user connections'
	        }]
	    }],
	    buttons      : [{
	        id  : 'user-add-save-user',
	        text: 'Save User'
	    }, {
	        id  : 'user-add-close',
	        text: 'Close'
	    }],
	    initComponent: function () {
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	Ext.define('Planche.view.user.GrantUserList', {
	    extend       : 'Ext.grid.Panel',
	    alias        : 'widget.grant-user-list',
	    config       : {
	        application: null
	    },
	    initComponent: function() {
	
	        var app = this.getApplication();
	
	        this.columns = [{
	            text        : 'User',
	            dataIndex   : 'User',
	            flex        : 1,
	            sortable    : false,
	            menuDisabled: true,
	            renderer    : function(value, p, record) {
	
	                return Ext.String.format('<img src=\'resources/images/icon_user.png\'> {0}', value + '@' + record.raw.Host);
	            }
	        }, {
	            text : 'Edit', xtype: 'actioncolumn', width: 50, sortable: false, menuDisabled: true, align: 'center',
	            items: [{
	                icon   : 'resources/images/icon_edit.png',
	                tooltip: 'Edit User'
	            }]
	        }, {
	            text : 'Delete', xtype: 'actioncolumn', width: 50, sortable: false, menuDisabled: true, align: 'center',
	            items: [{
	                icon   : 'resources/images/icon_delete.gif',
	                tooltip: 'Delete User'
	            }]
	        }];
	
	        this.store = Ext.create('Ext.data.Store', {
	            fields: ['User', 'Host'],
	            data  : []
	        });
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	Ext.define('Planche.view.user.GrantSchemaTree', {
	    extend       : 'Ext.tree.Panel',
	    alias        : 'widget.grant-schema-tree',
	    initComponent: function () {
	
	        this.store = Ext.create('Planche.store.GrantSchemaTree');
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	Ext.define('Planche.view.user.Grant', {
	    extend       : 'Planche.lib.Window',
	    alias        : 'widget.grant',
	    stateful     : true,
	    title        : 'User Manager',
	    layout       : 'border',
	    bodyStyle    : "background-color:#FFFFFF",
	    width        : 900,
	    height       : 500,
	    overflowY    : 'auto',
	    autoScroll   : true,
	    modal        : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    config       : {
	        application: null
	    },
	    tbar         : [
	        {
	            xtype: 'button',
	            id   : 'grant-add-user',
	            text : 'Add User'
	        }
	    ],
	    buttons      : [{
	        id      : 'grant-save-changes',
	        text    : 'Save Changes'
	    }, {
	        id      : 'grant-cancel-changes',
	        text    : 'Cancel Changes'
	    }, {
	        id  : 'grant-close',
	        text: 'Close'
	    }],
	    initComponent: function() {
	
	        this.items = [{
	            xtype      : 'grant-user-list',
	            id         : 'grant-user-list',
	            region     : 'west',
	            flex       : 1,
	            height     : '100%',
	            split      : true,
	            disabled   : false,
	            application: this.getApplication()
	        }, {
	            xtype   : 'grant-schema-tree',
	            id      : 'grant-schema-tree',
	            region  : 'center',
	            width   : 200,
	            height  : '100%',
	            disabled: true
	        }, {
	            xtype   : 'grant-priv-list',
	            id      : 'grant-priv-list',
	            region  : 'east',
	            height  : '100%',
	            flex    : 1,
	            split   : true,
	            disabled: true
	        }];
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.TableInfoTab', {
	    extend       : 'Ext.panel.Panel',
	    alias        : 'widget.table-info-tab',
	    id           : 'table-info-tab',
	    title        : 'Table Information',
	    padding      : '10 10 10 10',
	    autoScroll   : true,
	    config       : {
	        edited     : false,
	        application: null,
	        database   : null,
	        table      : null
	    },
	    initComponent: function() {
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.TableSQLTab', {
	    extend       : 'Ext.container.Container',
	    alias        : 'widget.table-sql-tab',
	    id           : 'table-sql-tab',
	    title        : 'Table SQL',
	    config       : {
	        edited     : false,
	        application: null,
	        database   : null,
	        table      : null
	    },
	    html         : '<textarea></textarea>',
	    initComponent: function() {
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.TableIndexesTab', {
	    extend: 'Ext.grid.Panel',
	    alias : 'widget.table-indexes-tab',
	    id    : 'table-indexes-tab',
	    title : 'Table Indexes',
	    config: {
	        edited: false,
	        application : null,
	        database : null,
	        table : null
	    },
	    selModel : {
	        singleSelect:true
	    },
	    initComponent : function () {
	
	        var app = this.getApplication(),
	            tb = this.getTable();
	
	        this.buttons = [{
	            id  : 'table-indexes-btn-create',
	            text: 'Create Index'
	        },{
	            id  : 'table-indexes-btn-edit',
	            text: 'Edit Index'
	        },{
	            id  : 'table-indexes-btn-delete',
	            text: 'Delete Index'
	        }];
	
	        this.columns = [
	            { text: 'Index Name', dataIndex: 'Key_name', width : 120},
	            { text: 'Columns', dataIndex: 'Column_name', width : 120},
	            { text: 'Index Type', dataIndex: 'Index_type', width : 120},
	            { text: 'Comment', dataIndex: 'Index_comment', flex : 1}
	        ];
	
	        var fields  = [];
	
	        //create grid fields
	        Ext.each(this.columns, function (obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        //create store
	        this.store = Ext.create('Ext.data.Store', {
	            fields            : fields,
	            clearRemovedOnLoad: false
	        });
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 30 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.TablePropertiesTab', {
	    extend: 'Ext.panel.Panel',
	    alias : 'widget.table-properties-tab',
	    id    : 'table-properties-tab',
	    title : 'Table Properties',
	    height: '100%',
	    border: false,
	    config: {
	        edited     : false,
	        application: null,
	        database   : null,
	        table      : null,
	        properties : {}
	    },
	    items : [{
	        xtype  : 'form',
	        id     : 'properties-form',
	        layout : {
	            type      : 'table',
	            // The total column count must be specified here
	            columns   : 2,
	            tableAttrs: {
	                style: {
	                    width: '100%'
	                }
	            }
	        },
	        border : false,
	        padding: 10,
	        items  : [{
	            xtype           : 'combobox',
	            id              : 'properties-table-type',
	            name            : 'properties-table-type',
	            fieldLabel      : 'Table Type',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : [
	                ['MYISAM', 'MYISAM'],
	                ['MRG_MYISAM', 'MRG_MYISAM'],
	                ['CSV', 'CSV'],
	                ['BLACKHOLE', 'BLACKHOLE'],
	                ['MEMORY', 'MEMORY'],
	                ['FEDERATED', 'FEDERATED'],
	                ['ARCHIVE', 'ARCHIVE'],
	                ['INNODB', 'INNODB'],
	                ['PERFORMANCE_SCHEMA', 'PERFORMANCE_SCHEMA']
	            ]
	        }, {
	            xtype           : 'combobox',
	            id              : 'properties-charset',
	            name            : 'properties-charset',
	            fieldLabel      : 'Charset',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : {
	                type  : 'array',
	                fields: ['id', 'text'],
	                data  : [],
	                proxy : {
	                    type: 'memory'
	                }
	            }
	        }, {
	            xtype           : 'combobox',
	            id              : 'properties-collation',
	            name            : 'properties-collation',
	            fieldLabel      : 'Collation',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : {
	                type  : 'array',
	                fields: ['id', 'text'],
	                data  : [],
	                proxy : {
	                    type: 'memory'
	                }
	            }
	        }, {
	            xtype           : 'combobox',
	            id              : 'properties-checksum',
	            name            : 'properties-checksum',
	            fieldLabel      : 'Check Sum',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : [
	                [0, 0],
	                [1, 1]
	            ]
	        }, {
	            xtype           : 'combobox',
	            id              : 'properties-delay-key-write',
	            name            : 'properties-delay-key-write',
	            fieldLabel      : 'Delay Key Write',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : [
	                [0, 0],
	                [1, 1]
	            ]
	        }, {
	            xtype           : 'combobox',
	            id              : 'properties-row-format',
	            name            : 'properties-row-format',
	            fieldLabel      : 'Row Format',
	            displayField    : 'text',
	            emptyText       : 'Default',
	            disableKeyFilter: true,
	            editable        : false,
	            valueField      : 'id',
	            validateBlank   : true,
	            allowBlank      : true,
	            typeAhead       : true,
	            store           : [
	                ['compressed', 'compressed'],
	                ['dynamic', 'dynamic'],
	                ['fixed', 'fixed']
	            ]
	        }, {
	            xtype     : 'textfield',
	            fieldLabel: 'Auto Incr.',
	            id        : 'properties-auto-incr',
	            name      : 'properties-auto-incr',
	            allowBlank: true
	        }, {
	            xtype     : 'textfield',
	            fieldLabel: 'Avg Row Len.',
	            id        : 'properties-avg-row-len',
	            name      : 'properties-avg-row-len',
	            allowBlank: true
	        }, {
	            xtype     : 'textfield',
	            fieldLabel: 'Minimum Row',
	            id        : 'properties-minimum-row',
	            name      : 'properties-minimum-row',
	            allowBlank: true
	        }, {
	            xtype     : 'textfield',
	            fieldLabel: 'Maximum Row',
	            id        : 'properties-maximum-row',
	            name      : 'properties-maximum-row',
	            allowBlank: true
	        }, {
	            xtype     : 'textfield',
	            fieldLabel: 'Comment',
	            id        : 'properties-comment',
	            name      : 'properties-comment',
	            allowBlank: true
	        }]
	    }],
	
	    initComponent: function() {
	
	        var app = this.getApplication(),
	            tb = this.getTable();
	
	        this.tbar = {
	            id        : 'properties-schema-name',
	            xtype     : 'textfield',
	            width     : '100%',
	            allowBlank: false,
	            emptyText : 'Enter new table name..',
	            disabled  : tb ? true : false,
	            value     : tb
	        };
	
	        this.buttons = [{
	            id  : 'table-properties-btn-create',
	            text: tb ? 'Alter' : 'Create'
	        }];
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 31 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.TableSchemaTab', {
	    extend       : 'Ext.grid.Panel',
	    alias        : 'widget.table-schema-tab',
	    id           : 'table-schema-tab',
	    border       : false,
	    title        : 'Table Schema',
	    selModel     : {
	        selType: 'cellmodel'
	    },
	    config       : {
	        edited     : false,
	        application: null,
	        database   : null,
	        table      : null
	    },
	    columnLines  : true,
	    width        : '100%',
	    flex         : 1,
	    initComponent: function() {
	
	        var app = this.getApplication(),
	            tb = this.getTable();
	
	        this.addPlugin(Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 2
	        }));
	
	        this.tbar = {
	            id        : 'table-schema-name',
	            xtype     : 'textfield',
	            width     : '100%',
	            allowBlank: false,
	            emptyText : 'Enter new table name..',
	            disabled  : tb ? true : false,
	            value     : tb
	        };
	
	        this.buttons = [{
	            id  : 'table-schema-btn-create',
	            text: tb ? 'Alter' : 'Create'
	        }, {
	            id  : 'table-schema-btn-insert',
	            text: 'Insert'
	        }, {
	            id  : 'table-schema-btn-delete',
	            text: 'Delete'
	        }];
	
	        this.columns = [
	            {
	                text: 'Field Name', dataIndex: 'field', width: 120, editor: {
	                xtype: 'textfield'
	            }
	            },
	            {
	                text: 'Datatype', dataIndex: 'type', width: 120, editor: {
	                xtype: 'combobox',
	                store: app.getAPIS().getDataTypesToJSON()
	            }
	            },
	            {
	                text: 'Length', dataIndex: 'len', width: 60, editor: {
	                xtype: 'textfield'
	            }
	            },
	            {
	                text: 'Default', dataIndex: 'default', width: 100, editor: {
	                xtype: 'textfield'
	            }
	            },
	            {text: 'PK', xtype: 'checkcolumn', dataIndex: 'pk', width: 60},
	            {text: 'Not Null', xtype: 'checkcolumn', dataIndex: 'not_null', width: 60},
	            {text: 'Unsigned', xtype: 'checkcolumn', dataIndex: 'unsigned', width: 60},
	            {text: 'Auto Incr', xtype: 'checkcolumn', dataIndex: 'auto_incr', width: 60},
	            {text: 'Zerofill', xtype: 'checkcolumn', dataIndex: 'zerofill', width: 60},
	            {
	                text: 'Comment', dataIndex: 'comment', flex: 1, editor: {
	                xtype: 'textfield'
	            }
	            }
	        ];
	
	        var fields = [];
	
	        //create grid fields
	        Ext.each(this.columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        //create store
	        this.store = Ext.create('Ext.data.Store', {
	            fields            : fields,
	            clearRemovedOnLoad: false
	        });
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.EditSchemaWindow', {
	    extend  : 'Planche.lib.Window',
	    stateful  : true,
	    layout    : 'fit',
	    bodyStyle :"background-color:#FFFFFF",
	    width     : 1000,
	    height    : 500,
	    overflowY : 'auto',
	    autoScroll: true,
	    border    : false,
	    modal     : true,
	    plain     : true,
	    fixed     : true,
	    shadow    : false,
	    autoShow  : true,
	    constrain : true,
	    buttons   : [{
	        id     : 'edit-schema-btn-close',
	        text   : 'Close'
	    }]
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	Ext.define('Planche.view.table.EditIndexWindow', {
	    extend    : 'Planche.lib.Window',
	    id        : 'edit-index-window',
	    stateful  : true,
	    bodyStyle : "background-color:#FFFFFF",
	    width     : 1000,
	    height    : 500,
	    overflowY : 'auto',
	    autoScroll: true,
	    border    : false,
	    modal     : true,
	    plain     : true,
	    fixed     : true,
	    shadow    : false,
	    autoShow  : true,
	    constrain : true,
	    config    : {
	        database : null,
	        table    : null,
	        indexName: null
	    },
	    items     : [{
	        xtype     : 'grid',
	        border    : false,
	        selModel  : {
	            selType: 'cellmodel'
	        },
	        plugins   : [{
	            ptype      : 'cellediting',
	            clickToEdit: 2
	        }],
	        viewConfig: {
	            emptyText: 'There are no columns to show in this view.'
	        },
	        id        : 'edit-index-grid',
	        columns   : [
	            {text: 'Field Name', dataIndex: 'field', width: 120},
	            {text: 'Datatype', dataIndex: 'type', width: 120},
	            {text: 'Comment', dataIndex: 'comment', flex: 1},
	            {text: 'Use Column', xtype: 'checkcolumn', width: 100, dataIndex: 'use'},
	            {
	                text: 'Length', width: 100, dataIndex: 'length', editor: {
	                    xtype: 'textfield'
	                }
	            },
	            {
	                text: 'Sort', dataIndex: 'sort', width: 100, editor: {
	                    xtype: 'combobox',
	                    store: ['ASC', 'DESC']
	                }
	            }
	        ],
	        store     : Ext.create('Ext.data.Store', {
	            fields            : [
	                'field', 'type', 'comment', 'use',
	                'length', 'sort'
	            ],
	            clearRemovedOnLoad: false
	        }),
	        tbar      : {
	            id        : 'edit-index-name',
	            xtype     : 'textfield',
	            width     : '100%',
	            allowBlank: false,
	            required : true,
	            emptyText : 'Enter index name'
	        },
	        fbar      : [{
	            flex      : 1,
	            xtype     : 'radiogroup',
	            fieldLabel: 'Index Options',
	            id        : 'edit-index-option',
	            defaults  : {
	                xtype: 'radiofield'
	            },
	            items     : [{
	                boxLabel  : 'No Option',
	                name      : 'edit-index-option',
	                inputValue: '',
	                checked   : true
	            }, {
	                boxLabel  : 'Unique',
	                name      : 'edit-index-option',
	                inputValue: 'UNIQUE'
	            }, {
	                boxLabel  : 'Fulltext',
	                name      : 'edit-index-option',
	                inputValue: 'FULLTEXT'
	            }]
	        },{
	            flex      : 1,
	            xtype     : 'radiogroup',
	            fieldLabel: 'Using',
	            id        : 'edit-index-using',
	            defaults  : {
	                xtype: 'radiofield'
	            },
	            items     : [{
	                boxLabel  : 'BTree',
	                name      : 'edit-index-using',
	                checked   : true,
	                inputValue: 'BTREE'
	            }, {
	                boxLabel  : 'Hash',
	                name      : 'edit-index-using',
	                inputValue: 'HASH'
	            }]
	        }]
	    }],
	    buttons   : [{
	        id  : 'edit-index-btn-save',
	        text: 'Save'
	    }, {
	        id  : 'edit-index-btn-close',
	        text: 'Close'
	    }]
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.Toolbar', {
	    extend  : 'Ext.toolbar.Toolbar',
	    xtype   : 'planche-toolbar',
	    width   : '100%',
	    defaults: {
	        xtype       : 'button',
	        allowDepress: false,
	        scale       : 'medium',
	        tooltipType : 'title',
	        scope       : this,
	        disabled    : true
	    },
	    items   : [
	        {
	            icon    : 'resources/images/new_database.png',
	            tooltip : 'Create a new connection(ALT+N)',
	            id      : 'toolbar-new-connect',
	            disabled: false
	        },
	        {
	            icon   : 'resources/images/new_query.png',
	            tooltip: 'New query editor(ALT+T)',
	            id     : 'toolbar-query-editor'
	        },
	        {
	            icon   : 'resources/images/icon_play24x24.png',
	            tooltip: 'Query Execution(F9)',
	            id     : 'toolbar-query-exec'
	        },
	        {
	            icon   : 'resources/images/icon_stop24x24.png',
	            tooltip: 'Stop Operations(ALT+S)',
	            id     : 'toolbar-stop-operation'
	        },
	        {
	            icon   : 'resources/images/icon_user24x24.png',
	            tooltip: 'User Manager(ALT+U)',
	            id     : 'toolbar-user-manager'
	        },
	        '-',
	        {
	            icon: 'resources/images/icon_quick_command24x24.png',
	            text: 'Quick Cmd',
	            cls : 'btn',
	            id  : 'toolbar-quick-command'
	        },
	        '-',
	        {
	            icon: 'resources/images/icon_proc24x24.png',
	            text: 'Procs',
	            cls : 'btn',
	            id  : 'toolbar-show-procs'
	        },
	        {
	            icon: 'resources/images/icon_vars24x24.png',
	            text: 'Vars',
	            cls : 'btn',
	            id  : 'toolbar-show-vars'
	        },
	        {
	            icon  : 'resources/images/icon_status24x24.png',
	            text  : 'Status',
	            id    : 'toolbar-show-status',
	            cls   : 'btn',
	            margin: '0px 6px 0px 0px'
	        },
	        '-',
	        {
	            icon  : 'resources/images/icon_flush24x24.png',
	            text  : 'Flush',
	            id    : 'toolbar-flush',
	            cls   : 'btn',
	            margin: '0px 6px 0px 0px'
	        },
	        '-',
	        {
	            icon  : 'resources/images/icon_sql.png',
	            text  : 'Tokenize',
	            id    : 'toolbar-tokenize',
	            cls   : 'btn',
	            margin: '0px 2px 0px 3px'
	        },
	        '-',
	        {
	            icon   : 'resources/images/icon_fullscreen24x24.png',
	            text   : 'FullScreen',
	            id     : 'toolbar-fullscreen',
	            cls    : 'btn',
	            margin : '0px 2px 0px 3px'
	        }
	    ]
	
	});

/***/ },
/* 35 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.QueryTabPanel', {
	    extend  : 'Ext.tab.Panel',
	    alias   : 'widget.query-tab-panel',
	    flex    : 1,
	    region  : 'center',
	    width   : '100%',
	    height  : '100%',
	    border  : false,
	    items : [{
	    	xtype : 'query-tab',
	    	title : 'Query'
	    }]
	});

/***/ },
/* 36 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.ResultTabPanel', {
	    extend  : 'Ext.tab.Panel',
	    xtype   : 'result-tab-panel',
		layout  : 'fit',
		region	: 'south',
		split	: true,
		border	: true,
		width	: '100%',
		height	: 300,
	    items : [{
	    	xtype : 'message-tab'
	    },{
	    	xtype : 'table-data-tab'
	    },{
	    	xtype : 'info-tab'
	    },{
	    	xtype : 'history-tab'
	    }]
	});

/***/ },
/* 37 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.QueryEditor', {
		extend		: 'Ext.Component',
		xtype		: 'query-editor',
		region		: 'center',
		header		: false,
		border		: true,
		width		: '100%',
		flex		: 1,
		bodyPadding	: 5,
		html		: '<textarea></textarea>'
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.HistoryTab', {
		extend		: 'Ext.Component',
		xtype		: 'history-tab',
		icon		: 'resources/images/icon_history.png',
		title		: 'History',
		split		: true,
		border		: false,
		autoScroll	: true,
		flex		: 1,
		html		: '<textarea></textarea>'
	});


/***/ },
/* 39 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.InfoTab', {
	    extend: 'Ext.container.Container',
	    xtype : 'info-tab',
		icon    : 'resources/images/icon_info.png',
		title   : 'Info',
		split	: true,
		border	: false,
		flex	: 1,
		padding : '10 10 10 10',
		autoScroll: true
	});


/***/ },
/* 40 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.TableDataTab', {
	    extend: 'Ext.container.Container',
	    xtype : 'table-data-tab',
	    layout: 'fit',
	    split : true,
	    icon  : 'resources/images/icon_table.png',
	    title : 'Table Data',
	    border: false,
	    frame : false,
	    flex  : 1
	});

/***/ },
/* 41 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.MessageTab', {
		extend		: 'Ext.container.Container',
		xtype		: 'message-tab',
		icon		: 'resources/images/icon_message.png',
		title		: 'Messages',
		split		: true,
		border		: false,
		autoScroll	: true,
		padding		: '10 10 10 10',
		flex		: 1
	});

/***/ },
/* 42 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.QueryTab', {
	    extend: 'Ext.container.Container',
	    xtype : 'query-tab',
	    layout: 'border',
	    icon  : 'resources/images/icon_document_add.png',
	    border: false,
	    width : '100%',
	    flex  : 1,
	    items : [{
	        xtype : 'query-editor'
	    },{
	        xtype : 'result-tab-panel'
	    }]
	});

/***/ },
/* 43 */
/***/ function(module, exports) {

	Ext.define('Planche.view.layout.SchemaTree', {
	    extend       : 'Ext.tree.Panel',
	    alias        : 'widget.schema-tree',
	    config : {
	        database : null
	    },
	    initComponent: function() {
	
	        this.store = Ext.create('Planche.store.SchemaTree');
	        this.callParent(arguments);
	    },
	    width        : 200,
	    height       : '100%',
	    region       : 'west',
	    split        : true
	});

/***/ },
/* 44 */
/***/ function(module, exports) {

	Ext.define('Planche.store.SchemaTree', {
	    extend: 'Ext.data.TreeStore',
	    root: {
	        type : 'root',
	        text : 'root@',
	        expanded: true
	    },
	    initComponent : function(){
	
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 45 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.DownloadToCSV', {
	    extend       : 'Planche.lib.Window',
	    id           : 'download-to-csv-window',
	    title        : 'Download To CSV',
	    stateful     : true,
	    bodyStyle    : "background-color:#FFFFFF",
	    width        : 600,
	    height       : 500,
	    border       : false,
	    modal        : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    config       : {
	        database   : null,
	        application: null
	    },
	    initComponent: function() {
	
	        var app = this.getApplication();
	
	        this.items = [{
	            xtype: 'download-to-csv-target-list',
	            title: 'Select to export target',
	            id   : 'download-to-csv-target-list'
	        }];
	
	        this.callParent(arguments);
	    },
	    buttons      : [{
	        id  : 'download-to-csv-btn-export',
	        text: 'Export'
	    }, {
	        id  : 'download-to-csv-btn-close',
	        text: 'Close'
	    }]
	});

/***/ },
/* 46 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.SchemaToHTML', {
	    extend       : 'Planche.lib.Window',
	    id           : 'schema-to-html-window',
	    title        : 'Schema to HTML',
	    stateful     : true,
	    bodyStyle    : "background-color:#FFFFFF",
	    width        : 1000,
	    height       : 500,
	    border       : false,
	    modal        : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    config       : {
	        database   : null,
	        application: null
	    },
	    initComponent: function() {
	
	        var app = this.getApplication();
	
	        this.items = [{
	            xtype     : 'panel',
	            id        : 'schema-to-html',
	            layout    : 'fit',
	            padding   : '10 10 10 10',
	            autoScroll: true,
	            border    : false
	        }];
	
	        this.callParent(arguments);
	    },
	    buttons      : [{
	        id  : 'schema-to-html-btn-close',
	        text: 'Close'
	    }]
	});

/***/ },
/* 47 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.DatabaseSchemaTree', {
	    extend       : 'Ext.tree.Panel',
	    alias        : 'widget.database-schema-tree',
	    config       : {
	        database: null
	    },
	    rootVisible  : true,
	    width        : 200,
	    height       : '100%',
	    initComponent: function() {
	
	        this.store = Ext.create('Planche.store.DatabaseSchemaTree');
	        this.callParent(arguments);
	    }
	});

/***/ },
/* 48 */
/***/ function(module, exports) {

	Ext.define('Planche.view.database.CopyDatabaseWindow', {
	    extend       : 'Planche.lib.Window',
	    id           : 'copy-database-window',
	    title        : 'Copy table(s) to other database',
	    stateful     : true,
	    bodyStyle    : "background-color:#FFFFFF",
	    width        : 1000,
	    height       : 500,
	    overflowY    : 'auto',
	    autoScroll   : true,
	    border       : false,
	    modal        : true,
	    plain        : true,
	    fixed        : true,
	    shadow       : false,
	    autoShow     : true,
	    constrain    : true,
	    config       : {
	        database   : null,
	        application: null
	    },
	    initComponent: function() {
	
	        var app = this.getApplication();
	
	        this.items = [{
	            xtype : 'panel',
	            layout: 'border',
	            items : [{
	                xtype   : 'database-schema-tree',
	                title   : 'Source',
	                region  : 'west',
	                width   : 300,
	                split   : true,
	                id      : 'copy-database-source-tree',
	                database: this.getDatabase()
	            }, {
	                xtype : 'copy-database-target-list',
	                title : 'Target',
	                region: 'center',
	                id    : 'copy-database-target-grid'
	            }, {
	                xtype : 'form',
	                title : 'Option',
	                layout: 'vbox',
	                region: 'east',
	                width : 300,
	                split : true,
	                id    : 'copy-database-option-form',
	                items : [{
	                    xtype   : 'radiogroup',
	                    margin  : '5 0 0 5',
	                    id      : 'copy-database-option-1',
	                    layout  : 'vbox',
	                    defaults: {
	                        xtype: 'radiofield'
	                    },
	                    items   : [{
	                        boxLabel  : 'Structure & Data',
	                        name      : 'copy-database-option-1',
	                        inputValue: 1,
	                        checked   : true
	                    }, {
	                        boxLabel  : 'Structure Only',
	                        name      : 'copy-database-option-1',
	                        inputValue: 2
	                    }]
	                }, {
	                    xtype   : 'checkbox',
	                    margin  : '0 0 0 8',
	                    id      : 'copy-database-option-2',
	                    name    : 'copy-database-option-2',
	                    boxLabel: 'Drop if exists in target',
	                    value   : 1,
	                    checked : true
	                }, {
	                    xtype   : 'checkbox',
	                    margin  : '0 0 0 8',
	                    id      : 'copy-database-option-3',
	                    name    : 'copy-database-option-3',
	                    boxLabel: 'Use bulk INSERT(Only Post Method Ajax)',
	                    value   : 1,
	                    checked : true
	                }]
	            }]
	        }];
	
	        this.callParent(arguments);
	    },
	    buttons      : [{
	        id  : 'copy-database-btn-copy',
	        text: 'Copy'
	    }, {
	        id  : 'copy-database-btn-close',
	        text: 'Close'
	    }]
	});

/***/ },
/* 49 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.SchemaTree', {
	    extend: 'Ext.app.Controller',
	    config: {
	        databasesChildren: [{
	            type: 'tables',
	            text: 'Tables',
	            leaf: false
	        }, {
	            type: 'views',
	            text: 'Views',
	            leaf: false
	        }, {
	            type: 'procedures',
	            text: 'Procedures',
	            leaf: false
	        }, {
	            type: 'functions',
	            text: 'Functions',
	            leaf: false
	        }, {
	            type: 'triggers',
	            text: 'Triggers',
	            leaf: false
	        }, {
	            type: 'events',
	            text: 'Events',
	            leaf: false
	        }],
	        tablesChildren   : [{
	            type: 'columns',
	            text: 'Columns',
	            leaf: false
	        }, {
	            type: 'indexes',
	            text: 'Indexes',
	            leaf: false
	        }],
	        rootType         : 'root',
	        tables           : {}
	    },
	
	    constructor: function(config) {
	
	        this.callParent(arguments);
	    },
	
	    selectNode: function(tree, node, index, eOpts) {
	
	        var app = this.getApplication();
	
	        if (node.raw.type == 'table' || node.raw.type == 'view') {
	
	            if (app.getActiveTableDataTab().isVisible()) {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedNode();
	
	                if (app.openMode == 'select') {
	
	                    app.openTable(db, table);
	                }
	                else {
	
	                    app.countTable(db, table);
	                }
	            }
	        }
	    },
	
	    expandTree: function(node, nodeConfig) {
	
	        if (node.childNodes.length > 0) { return; }
	        this.loadTree(node, nodeConfig);
	    },
	
	    loadTree: function(node, nodeConfig) {
	
	        //var loadFunc = this['load' + (node.raw.type == this.getRootType() ? 'Databases' : node.data.text.replace(/\s/gi, ''))];
	        var loadFunc = this['load' + (node.raw.type == this.getRootType() ? 'Databases' : node.raw.type.substring(0, 1).toUpperCase() + node.raw.type.substring(1))];
	
	        if (loadFunc) {
	
	            node.removeAll();
	            Ext.Function.bind(loadFunc, this)(node, nodeConfig);
	        }
	    },
	
	    reloadTree: function(node, nodeConfig) {
	
	        this.loadTree(node, nodeConfig);
	    },
	
	    loadDatabases: function(node, nodeConfig) {
	
	        var app = this.application,
	            me = this,
	            tree = node.getOwnerTree(),
	            tab = tree.up('connect-tab');
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            connection: tab,
	            query     : app.getAPIS().getQuery('SHOW_DATABASE'),
	            success   : function(config, response) {
	
	                var children = [];
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type    : 'database',
	                        path    : ['database', row[0]].join("`"),
	                        text    : row[0],
	                        icon    : 'resources/images/icon_database.png',
	                        leaf    : false,
	                        children: (function(){
	
	                            var subNode = Ext.clone(me.getDatabasesChildren());
	                            Ext.Array.each(subNode, function(child){
	
	                                child.path = [child.type, row[0], child.text].join("`");
	                            });
	
	                            return subNode;
	                        })()
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure   : function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadTables: function(node, nodeConfig) {
	
	        var app = this.application,
	            me = this,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_ALL_TABLE_STATUS', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    if (row[1] == 'NULL') { return; }
	
	                    children.push(Ext.apply({
	                        type    : 'table',
	                        path    : ['table', db, row[0]].join("`"),
	                        text    : row[0],
	                        icon    : 'resources/images/icon_table.png',
	                        leaf    : false,
	                        children: (function(){
	
	                            var subNode = Ext.clone(me.getTablesChildren());
	                            Ext.Array.each(subNode, function(child){
	
	                                child.path = [child.type, db, row[0], child.text].join("`");
	                            });
	
	                            return subNode;
	                        })()
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	
	                node.appendChild(children);
	
	                tree.fireEvent('iteminsert', tree, node);
	
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadViews: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_VIEWS', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'view',
	                        path: ['view', db, row[0]].join("`"),
	                        text: row[0],
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadProcedures: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_PROCEDURES', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'procedure',
	                        path: ['procedure', db, row[1]].join("`"),
	                        text: row[1],
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	
	                }
	
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadFunctions: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_FUNCTIONS', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'function',
	                        path: ['function', db, row[1]].join("`"),
	                        text: row[1],
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadTriggers: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_TRIGGERS', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'trigger',
	                        path: ['trigger', db, row[0]].join("`"),
	                        text: row[0],
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadEvents: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node, 'database'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_EVENTS', db),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'event',
	                        path: ['event', db, row[0]].join("`"),
	                        text: row[0],
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadColumns: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node),
	            tb = app.getParentNode(node, 'table'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_FULL_FIELDS', db, tb),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    children.push(Ext.apply({
	                        type: 'column',
	                        path: ['column', db, tb, row[0]].join("`"),
	                        name: row[0],
	                        text: row[0] + ' ' + row[1] + (row[8] ? ' [ ' + row[8] + ' ] ' : ''),
	                        icon: 'resources/images/icon_' + (row[4] == 'PRI' ? 'primary' : 'column') + '.png',
	                        leaf: true,
	                        qtip: row[8]
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    },
	
	    loadIndexes: function(node, nodeConfig) {
	
	        var app = this.application,
	            db = app.getParentNode(node),
	            tb = app.getParentNode(node, 'table'),
	            tree = node.getOwnerTree();
	
	        nodeConfig = nodeConfig || {};
	
	        tree.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_INDEXES', db, tb),
	            success: function(config, response) {
	
	                var children = [];
	                node.removeAll();
	                var groups = {};
	                Ext.Array.each(response.records, function(row, idx) {
	
	                    groups[row[2]] = groups[row[2]] || [];
	                    groups[row[2]].push('\'' + row[4] + '\'');
	                });
	
	                Ext.Object.each(groups, function(name, columns) {
	
	                    children.push(Ext.apply({
	                        type: 'index',
	                        path: ['index', db, tb, name].join("`"),
	                        text: name + ' (' + columns.join(',') + ')',
	                        icon: 'resources/images/icon_table.png',
	                        leaf: true
	                    }, nodeConfig));
	                });
	
	                if (children.length == 0) {
	
	                    tree.setLoading(false);
	                    return;
	                }
	
	                node.appendChild(children);
	                tree.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                tree.setLoading(false);
	            }
	        });
	    }
	});

/***/ },
/* 50 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.user.Grant', {
	    extend: 'Planche.lib.SchemaTree',
	    views : [
	        'Planche.view.user.Grant',
	        'Planche.view.user.GrantSchemaTree',
	        'Planche.view.user.GrantUserList'
	    ],
	    init  : function() {
	
	        this.callParent(arguments);
	
	        this.setDatabasesChildren([{
	            type: 'tables',
	            text: 'Tables',
	            leaf: false
	        }, {
	            type: 'views',
	            text: 'Views',
	            leaf: false
	        }, {
	            type: 'procedures',
	            text: 'Procedures',
	            leaf: false
	        }, {
	            type: 'functions',
	            text: 'Functions',
	            leaf: false
	        }]);
	
	        this.setTablesChildren([{
	            text: 'Columns',
	            leaf: false
	        }]);
	
	        var app = this.getApplication(),
	            me  = this;
	
	        this.control({
	            'grant'                                  : {
	                boxready: this.initGrant
	            },
	            '#grant-add-user'                        : {
	                click: this.addUser
	            },
	            '#grant-save-changes'                    : {
	                click: this.saveChanges
	            },
	            '#grant-cancel-changes'                  : {
	                click: this.cancelChanges
	            },
	            '#grant-close'                           : {
	                click: this.close
	            },
	            'grant-priv-list'                        : {
	                selectionchange: this.selectPrivList
	            },
	            'grant-user-list'                        : {
	                select: this.selectUserList
	            },
	            'grant-user-list gridcolumn[text=Edit]'  : {
	                click: this.editUser
	            },
	            'grant-user-list gridcolumn[text=Delete]': {
	                click: this.deleteUser
	            },
	            'grant-schema-tree'                      : {
	                beforeitemexpand: this.expandTree,
	                reloadTree      : this.reloadTree,
	                expandTree      : this.expandTree,
	                select          : this.selectSchemaTree
	            }
	        });
	
	        app.on('after_save_user', function() {
	
	            me.initUserList();
	        });
	    },
	
	    initWindow: function(result) {
	
	        Ext.create('Planche.view.user.Grant', {
	            application: this.getApplication()
	        });
	    },
	
	    initGrant: function() {
	
	        var tree = this.getSchemaTree(),
	            node = tree.getRootNode();
	
	        this.setRootType('global');
	
	        this.initUserList();
	        this.loadTree(node);
	    },
	
	    initUserList: function() {
	
	        var app      = this.getApplication(),
	            userList = this.getUserList();
	
	        userList.setLoading(true);
	        userList.selModel.deselectAll();
	
	        app.tunneling({
	            query  : app.getAPIS().getQuery('SELECT_ALL_USER'),
	            success: function(config, response) {
	
	                var records = Planche.DBUtil.getAssocArray(response.fields, response.records);
	                userList.store.loadData(records);
	                userList.setLoading(false);
	            }
	        });
	    },
	
	    initSchemaTree: function() {
	
	        var tree = this.getSchemaTree();
	
	        tree.selModel.deselectAll();
	        tree.selModel.select(0, true);
	    },
	
	    initPrivList: function() {
	
	        var privList = this.getPrivList();
	        privList.store.removeAll(true);
	    },
	
	    addUser: function() {
	
	        this.getApplication().openWindow('user.UserAdd');
	    },
	
	    editUser: function(grid, rowIndex, colIndex, item, e, record) {
	
	        this.getApplication().openWindow('user.UserAdd', record.data.User, record.data.Host);
	    },
	
	    deleteUser: function(grid, rowIndex, colIndex, item, e, record) {
	
	        var app = this.getApplication(),
	            me  = this;
	
	        Ext.Msg.confirm('confirm', 'Do you really want to delete the user?', function(res) {
	
	            if (res == "no") {
	
	                return;
	            }
	
	            app.tunneling({
	                query  : app.getAPIS().getQuery('DELETE_USER', record.data.User, record.data.Host),
	                success: function() {
	
	                    me.initUserList();
	                }
	            });
	        });
	    },
	
	    getSelectedUser: function() {
	
	        var selUser = this.getUserListSelection()[0];
	
	        if (!selUser) {
	
	            return false;
	        }
	
	        return selUser;
	    },
	
	    saveChanges: function(btn) {
	
	        var win        = btn.up('window'),
	            app        = this.getApplication(),
	            api        = app.getAPIS(),
	            me         = this,
	            user       = this.getSelectedUser(),
	            tunnelings = [],
	            messages   = [],
	            newPrivs   = user.get('priv'),
	            oldPrivs   = user.get('old_priv');
	
	        if (!user) {
	
	            Ext.Msg.Alert('No selected user');
	            return;
	        }
	
	        Ext.Object.each(newPrivs, function(path, newPriv) {
	
	            var oldPriv = oldPrivs[path] || [];
	
	            if (Ext.Array.equals(oldPriv, newPriv)) {
	
	                return;
	            }
	
	            var on         = "",
	                option     = "",
	                path       = path.split("`"),
	                type       = path[0],
	                func       = 'get' + type.charAt(0).toUpperCase() + type.slice(1) + 'PrivItems',
	                cmds       = this[func](),
	                grantPriv  = [],
	                revokePriv = [];
	
	            Ext.Array.each(newPriv, function(val, idx) {
	
	                if (oldPriv.indexOf(val) > -1) {
	
	                    return;
	                }
	
	                if(!cmds[val]){
	
	                    return;
	                }
	
	                grantPriv.push(cmds[val]);
	
	                if (val == 'GRANT') {
	
	                    option = "WITH " + cmds[val];
	                    return;
	                }
	            });
	
	
	            Ext.Array.each(oldPriv, function(val, idx) {
	
	                if (newPriv.indexOf(val) > -1) {
	
	                    return;
	                }
	
	                if(!cmds[val]){
	
	                    return;
	                }
	
	                revokePriv.push(cmds[val]);
	            });
	
	            switch (type.toLowerCase()) {
	
	                case "global" :
	
	                    on = "*.*";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	                case "database" :
	
	                    on = "`" + path[1] + "`.*";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	
	                case "table" :
	
	                    on = "`" + path[1] + "`.`" + path[2] + "`";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	
	                case "view" :
	
	                    on = "`" + path[1] + "`.`" + path[2] + "`";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	
	                case "column" :
	
	                    on = "`" + path[1] + "`.`" + path[2] + "`";
	                    grantPriv = grantPriv.length > 0 ? (path[2] + "(" + grantPriv.join(")," + path[2] + "(") + ")") : "";
	                    revokePriv = revokePriv.length > 0 ? (path[2] + "(" + revokePriv.join(")," + path[2] + "(") + ")") : "";
	                    break;
	
	                case "procedure" :
	
	                    on = "PROCEDURE `" + path[1] + "`.`" + path[2] + "`";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	
	                case "function" :
	
	                    on = "FUNCTION `" + path[1] + "`.`" + path[2] + "`";
	                    grantPriv = grantPriv.join(",");
	                    revokePriv = revokePriv.join(",");
	                    break;
	            }
	
	            if (grantPriv) {
	
	                tunnelings.push({
	                    query  : api.getQuery('GRANT', grantPriv, user.get('User'), user.get('Host'), on, option),
	                    failure: function(config, response) {
	
	                        messages.push(app.generateError(config.query, response.message));
	                    }
	                });
	            }
	
	            if (revokePriv) {
	
	                tunnelings.push({
	                    query  : api.getQuery('REVOKE', revokePriv, user.get('User'), user.get('Host'), on, option),
	                    failure: function(config, response) {
	
	                        messages.push(app.generateError(config.query, response.message));
	                    }
	                });
	            }
	
	
	        }, this);
	
	        if (tunnelings.length == 0) {
	
	            Ext.Msg.alert('info', 'Grants has no changes');
	            return;
	        }
	
	        app.tunnelings(tunnelings, {
	            start  : function() {
	
	                win.setDisabled(true);
	            },
	            success: function() {
	
	                me.initPrivList();
	                me.initSchemaTree();
	
	                Ext.Msg.alert('info', 'Successfully apply the permissions.');
	                win.setDisabled(false);
	            },
	            failure: function() {
	
	                app.openMessage(messages);
	                win.setDisabled(false);
	            }
	        });
	    },
	
	    cancelChanges: function(btn) {
	
	        this.initPrivList();
	        this.initSchemaTree();
	        this.initUserList();
	    },
	
	    close: function(btn) {
	
	        btn.up("window").destroy();
	    },
	
	    selectUserList: function() {
	
	        var me       = this,
	            app      = me.getApplication(),
	            api      = app.getAPIS(),
	            tree     = this.getSchemaTree(),
	            user     = this.getSelectedUser(),
	            userList = this.getUserList(),
	            privList = this.getPrivList(),
	            viewList = {};
	
	        if (user.get('old_priv') && user.get('priv')) {
	
	            me.initPrivList();
	            me.initSchemaTree();
	            return;
	        }
	
	        userList.setLoading(true);
	        tree.setDisabled(true);
	        privList.setDisabled(true);
	
	        var settings   = {},
	            messages   = [],
	            tunnelings = [{
	                query  : api.getQuery('USER_PRIV', user.get('User'), user.get('Host')),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records, true)[0],
	                        path    = 'global';
	                    settings[path] = settings[path] || [];
	                    Ext.Object.each(records, function(key, val) {
	
	                        if (val != 'Y') {
	
	                            return;
	                        }
	
	                        if (key.indexOf('_PRIV') == -1) {
	
	                            return;
	                        }
	
	                        settings[path].push(key.toUpperCase());
	                    });
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            }, {
	                query  : api.getQuery('USER_DATABASE_PRIV', user.get('User'), user.get('Host')),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records, true),
	                        path    = '';
	                    Ext.Array.each(records, function(row) {
	
	                        path = ['database', row.DB].join("`");
	                        settings[path] = settings[path] || [];
	
	                        Ext.Object.each(row, function(key, val) {
	
	                            if (val != 'Y') {
	
	                                return;
	                            }
	
	                            if (key.indexOf('_PRIV') == -1) {
	
	                                return;
	                            }
	
	                            settings[path].push(key.toUpperCase());
	                        });
	                    });
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            }, {
	                query  : api.getQuery('USER_TABLE_PRIV', user.get('User'), user.get('Host')),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records, true),
	                        path    = '',
	                        type    = '';
	                    Ext.Array.each(records, function(row) {
	
	                        if (!row.TABLE_PRIV) {
	
	                            return;
	                        }
	
	                        type = viewList[row.DB].indexOf(row.TABLE_NAME) > -1 ? 'view' : 'table';
	
	                        path = [type, row.DB, row.TABLE_NAME].join("`");
	                        settings[path] = settings[path] || [];
	                        settings[path] = row.TABLE_PRIV.toUpperCase().split(",");
	                    });
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            }, {
	                query  : api.getQuery('USER_COLUMN_PRIV', user.get('User'), user.get('Host')),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records, true),
	                        path    = '';
	                    Ext.Array.each(records, function(row) {
	
	                        if (!row.COLUMN_PRIV) {
	
	                            return;
	                        }
	
	                        path = ['column', row.DB, row.TABLE_NAME, row.COLUMN_NAME].join("`");
	                        settings[path] = settings[path] || [];
	                        settings[path] = row.COLUMN_PRIV.toUpperCase().split(",");
	                    });
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            }, {
	                query  : api.getQuery('USER_PROC_PRIV', user.get('User'), user.get('Host')),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records, true),
	                        path    = '';
	                    Ext.Array.each(records, function(row) {
	
	                        if (!row.PROC_PRIV) {
	
	                            return;
	                        }
	
	                        path = [row.ROUTINE_TYPE, row.DB, row.ROUTINE_NAME].join("`").toLowerCase();
	                        settings[path] = settings[path] || [];
	                        settings[path] = row.PROC_PRIV.toUpperCase().split(",");
	                    });
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            }];
	
	        app.tunneling({
	            query  : api.getQuery('SHOW_DATABASES'),
	            success: function(config, response) {
	
	                var records        = Planche.DBUtil.getAssocArray(response.fields, response.records, true),
	                    viewTunnelings = [];
	
	                Ext.Array.each(records, function(row) {
	
	                    var db = row.DATABASE;
	
	                    viewList[db] = viewList[db] || [];
	
	                    viewTunnelings.push({
	                        query  : api.getQuery('SHOW_DATABASE_VIEWS', db),
	                        success: function(config, response) {
	
	                            Ext.Array.each(response.records, function(row2) {
	
	                                viewList[db].push(row2[0]);
	                            });
	                        },
	                        failure: function(config, response) {
	
	                            messages.push(app.generateError(config.query, response.message));
	                        }
	                    });
	                });
	
	                app.tunnelings(viewTunnelings, {
	                    start  : function() {
	
	                        userList.setLoading(true);
	                        tree.setDisabled(true);
	                    },
	                    success: function() {
	
	                        app.tunnelings(tunnelings, {
	                            success: function() {
	
	                                user.set('old_priv', Ext.clone(settings));
	                                user.set('priv', Ext.clone(settings));
	
	                                me.initPrivList();
	                                me.initSchemaTree();
	
	                                userList.setLoading(false);
	                                tree.setDisabled(false);
	                            },
	                            failure: function() {
	
	                                app.openMessage(messages);
	
	                                userList.setLoading(false);
	                                tree.setDisabled(false);
	                            }
	                        });
	                    },
	                    failure: function() {
	
	                        app.openMessage(messages);
	
	                        userList.setLoading(false);
	                        tree.setDisabled(false);
	                    }
	                })
	            },
	            failure: function(config, response) {
	
	                messages.push(app.generateError(config.query, response.message));
	            }
	        });
	    },
	
	    selectPrivList: function() {
	
	        var user          = this.getSelectedUser(),
	            selTree       = this.getSchemaTreeSelection(),
	            privList      = this.getPrivList(),
	            selectedPrivs = privList.selModel.getSelection().map(function(model) {
	
	                return model.get('priv');
	            }),
	
	            settings      = user.get('priv');
	
	        settings[selTree[0].raw.path] = selectedPrivs;
	
	        user.set('priv', settings);
	
	        this.getSaveChangeBtn().setDisabled(false);
	    },
	
	    selectSchemaTree: function(tree, record, index) {
	
	        var me       = this,
	            privList = this.getPrivList(),
	            user     = this.getSelectedUser(),
	            type     = record.raw.type,
	            path     = record.raw.path,
	            records  = [];
	
	        privList.setDisabled(true);
	
	        if (!type) {
	
	            privList.store.loadData(records);
	            privList.setDisabled(false);
	            return;
	        }
	
	        var func = 'get' + type.charAt(0).toUpperCase() + type.slice(1) + 'PrivItems';
	        Ext.Object.each(me[func](), function(priv, cmd) {
	
	            records.push({
	                priv: priv,
	                cmd : cmd
	            });
	        });
	
	        try {
	
	            priv = user.get('priv')[path] || [];
	        }
	        catch (e) {
	
	            priv = [];
	        }
	
	
	        privList.store.loadData(records);
	
	        var selModel = privList.selModel;
	
	        Ext.Array.each(records, function(row, idx) {
	
	            if (priv.indexOf(row.priv) > -1) {
	
	                selModel.select(idx, true);
	            }
	        });
	
	        privList.store.sync();
	
	        if (user) {
	
	            privList.setDisabled(false);
	        }
	    },
	
	    getUserList: function() {
	
	        return Ext.getCmp('grant-user-list');
	    },
	
	    getUserListSelection: function() {
	
	        return this.getUserList().selModel.getSelection();
	    },
	
	    getSchemaTree: function() {
	
	        return Ext.getCmp('grant-schema-tree');
	    },
	
	    getSchemaTreeSelection: function() {
	
	        return this.getSchemaTree().selModel.getSelection();
	    },
	
	    getPrivList: function() {
	
	        return Ext.getCmp('grant-priv-list');
	    },
	
	    getPrivListSelection: function() {
	
	        return this.getPrivList().selModel.getSelection();
	    },
	
	    getSaveChangeBtn: function() {
	
	        return Ext.getCmp('grant-save-changes');
	    },
	
	    getCancelChangeBtn: function() {
	
	        return Ext.getCmp('grant-cancel-changes');
	    },
	
	
	    getGlobalPrivItems: function() {
	
	        return {
	            'SELECT_PRIV'           : 'SELECT',
	            'INSERT_PRIV'           : 'INSERT',
	            'UPDATE_PRIV'           : 'UPDATE',
	            'DELETE_PRIV'           : 'DELETE',
	            'CREATE_PRIV'           : 'CREATE',
	            'DROP_PRIV'             : 'DROP',
	            'RELOAD_PRIV'           : 'RELOAD',
	            'SHUTDOWN_PRIV'         : 'SHUTDOWN',
	            'PROCESS_PRIV'          : 'PROCESS',
	            'FILE_PRIV'             : 'FILE',
	            'GRANT_PRIV'            : 'GRANT OPTION',
	            'REFERENCES_PRIV'       : 'REFERENCES',
	            'INDEX_PRIV'            : 'INDEX',
	            'ALTER_PRIV'            : 'ALTER',
	            'SHOW_DB_PRIV'          : 'SHOW DATABASES',
	            'SUPER_PRIV'            : 'SUPER',
	            'CREATE_TMP_TABLE_PRIV' : 'CREATE TEMPORARY TABLES',
	            'LOCK_TABLES_PRIV'      : 'LOCK TABLES',
	            'EXECUTE_PRIV'          : 'EXECUTE',
	            'REPL_SLAVE_PRIV'       : 'REPLICATION SLAVE',
	            'REPL_CLIENT_PRIV'      : 'REPLICATION CLIENT',
	            'CREATE_VIEW_PRIV'      : 'CREATE VIEW',
	            'SHOW_VIEW_PRIV'        : 'SHOW VIEW',
	            'CREATE_ROUTINE_PRIV'   : 'CREATE ROUTINE',
	            'ALTER_ROUTINE_PRIV'    : 'ALTER ROUTINE',
	            'CREATE_USER_PRIV'      : 'CREATE USER',
	            'EVENT_PRIV'            : 'EVENT',
	            'TRIGGER_PRIV'          : 'TRIGGER',
	            'CREATE_TABLESPACE_PRIV': 'CREATE TABLESPACE'
	        };
	    },
	
	    getDatabasePrivItems: function() {
	
	        return {
	            'SELECT_PRIV'          : 'SELECT',
	            'INSERT_PRIV'          : 'INSERT',
	            'UPDATE_PRIV'          : 'UPDATE',
	            'DELETE_PRIV'          : 'DELETE',
	            'CREATE_PRIV'          : 'CREATE',
	            'DROP_PRIV'            : 'DROP',
	            'GRANT_PRIV'           : 'GRANT OPTION',
	            'REFERENCES_PRIV'      : 'REFERENCES',
	            'INDEX_PRIV'           : 'INDEX',
	            'ALTER_PRIV'           : 'ALTER',
	            'CREATE_TMP_TABLE_PRIV': 'CREATE TEMPORARY TABLES',
	            'LOCK_TABLES_PRIV'     : 'LOCK TABLES',
	            'CREATE_VIEW_PRIV'     : 'CREATE VIEW',
	            'SHOW_VIEW_PRIV'       : 'SHOW VIEW',
	            'CREATE_ROUTINE_PRIV'  : 'CREATE ROUTINE',
	            'ALTER_ROUTINE_PRIV'   : 'ALTER ROUTINE',
	            'EXECUTE_PRIV'         : 'EXECUTE',
	            'EVENT_PRIV'           : 'EVENT',
	            'TRIGGER_PRIV'         : 'TRIGGER'
	        };
	    },
	
	    getTablePrivItems: function() {
	
	        return {
	            'ALTER'      : 'ALTER',
	            'CREATE'     : 'CREATE',
	            'CREATE VIEW': 'CREATE VIEW',
	            'DELETE'     : 'DELETE',
	            'DROP'       : 'DROP',
	            'GRANT'      : 'GRANT OPTION',
	            'INDEX'      : 'INDEX',
	            'INSERT'     : 'INSERT',
	            'REFERENCES' : 'REFERENCES',
	            'SELECT'     : 'SELECT',
	            'SHOW_VIEW'  : 'SHOW VIEW',
	            'TRIGGER'    : 'TRIGGER',
	            'UPDATE'     : 'UPDATE'
	        };
	    },
	
	    getColumnPrivItems: function() {
	
	        return {
	            'INSERT'    : 'INSERT',
	            'REFERENCES': 'REFERENCES',
	            'SELECT'    : 'SELECT',
	            'UPDATE'    : 'UPDATE'
	        };
	    },
	
	    getViewPrivItems: function() {
	
	        return {
	            'ALTER'      : 'ALTER',
	            'CREATE'     : 'CREATE',
	            'CREATE VIEW': 'CREATE VIEW',
	            'DELETE'     : 'DELETE',
	            'DROP'       : 'DROP',
	            'GRANT'      : 'GRANT OPTION',
	            'INDEX'      : 'INDEX',
	            'INSERT'     : 'INSERT',
	            'REFERENCES' : 'REFERENCES',
	            'SELECT'     : 'SELECT',
	            'SHOW VIEW'  : 'SHOW VIEW',
	            'TRIGGER'    : 'TRIGGER',
	            'UPDATE'     : 'UPDATE'
	        };
	    },
	
	    getProcedurePrivItems: function() {
	
	        return {
	            'ALTER ROUTINE': 'ALTER ROUTINE',
	            'EXECUTE'      : 'EXECUTE',
	            'GRANT'        : 'GRANT OPTION'
	        };
	    },
	
	    getFunctionPrivItems: function() {
	
	        return {
	            'ALTER ROUTINE': 'ALTER ROUTINE',
	            'EXECUTE'      : 'EXECUTE',
	            'GRANT'        : 'GRANT OPTION'
	        };
	    }
	});


/***/ },
/* 51 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.SchemaTree', {
	    extend: 'Planche.lib.SchemaTree',
	    views : [
	        'Planche.view.layout.SchemaTree'
	    ],
	    stores: [
	        'Planche.store.SchemaTree'
	    ],
	    init  : function() {
	
	        var app = this.getApplication(),
	            me = this;
	
	        this.control({
	            'schema-tree': {
	                select          : function(tree, node, index, eOpts) {
	
	                    app.setSelectedNode(node);
	                    app.setSelectedTree(node.getOwnerTree());
	
	                    this.selectNode(tree, node, index, eOpts);
	                },
	                beforeitemexpand: this.expandTree,
	                show            : this.showTree,
	                reloadTree      : this.reloadTree,
	                expandTree      : this.expandTree,
	                boxready        : function(tree) {
	
	                    var node = tree.getRootNode(),
	                        tab = tree.up('connect-tab'),
	                        task = new Ext.util.DelayedTask();
	
	                    task.delay(100, function() {
	
	                        node.set('text', tab.getUser() + '@' + tab.getHost());
	
	                        app.setSelectedTree(tree);
	
	                        tree.getSelectionModel().select(node);
	
	                        me.loadTree(node);
	
	                    }, this);
	                }
	            },
	            'connect-tab': {
	                show  : this.showTree,
	                select: this.showTree
	            }
	        });
	    },
	
	    showTree: function(tab) {
	
	        var tree = tab.down('schema-tree'),
	            app = this.getApplication(),
	            selected = tree.getSelectionModel().getSelection();
	
	        app.setSelectedTree(tree);
	
	        if(selected.length == 0){
	
	            return;
	        }
	
	        app.setSelectedNode(selected[0]);
	    }
	});


/***/ },
/* 52 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.database.CopyDatabaseWindow', {
	    extend: 'Planche.lib.SchemaTree',
	    views : [
	        'Planche.view.database.CopyDatabaseWindow',
	        'Planche.view.database.DatabaseSchemaTree'
	    ],
	    config: {
	        tablesChildren: []
	    },
	    init  : function() {
	
	        this.initCopy();
	
	        var app = this.getApplication();
	
	        this.control({
	            '#copy-database-source-tree': {
	                beforeitemexpand: function(node) {
	
	                    var selType = app.getSelectedNode(true).raw.type;
	
	                    this.expandTree(node, {
	                        checked: selType === 'database'
	                    });
	                },
	                show            : app.setSelectedTree,
	                reloadTree      : function(node) {
	
	                    var selType = app.getSelectedNode(true).raw.type;
	
	                    this.reloadTree(node, {
	                        checked: selType === 'database'
	                    });
	                },
	                expandTree      : function(node) {
	
	                    var selType = app.getSelectedNode(true).raw.type;
	
	                    this.expandTree(node, {
	                        checked: selType === 'database'
	                    });
	                },
	                iteminsert : function(node){
	
	                    var selNode = app.getSelectedNode(true);
	                    Ext.Array.each(node.childNodes, function(child, idx){
	
	                        if(child.raw.text == selNode.raw.text || selNode.raw.type == 'tables'){
	
	                            child.set('checked', true);
	                            child.save();
	                        }
	                    });
	                },
	                boxready        : function(tree) {
	
	                    var me = this,
	                        task = new Ext.util.DelayedTask(),
	                        node = tree.getRootNode(),
	                        db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    node.set('text', db);
	
	                    task.delay(100, function() {
	
	                        tree.getSelectionModel().select(node);
	
	                        me.loadTree(node, {
	                            checked: false
	                        });
	
	                        Ext.Array.each(node.childNodes, function(child, idx){
	
	                            var checked = false;
	
	                            if(!table){
	
	                                checked = true;
	                            }
	
	                            me.expandTree(child, {
	                                checked: checked
	                            });
	
	                            child.expand();
	                        });
	                    });
	                }
	            },
	            '#copy-database-target-grid': {
	                boxready: function(grid) {
	
	                    var connectTabPanel = app.getConnectTabPanel(),
	                        connectTabs = connectTabPanel.query('connect-tab');
	
	                    if (connectTabs == 0) {
	
	                        return;
	                    }
	
	                    var record = [];
	                    connectTabs.map(function(tab) {
	
	                        if (tab.id === app.getActiveConnectTab().id) {
	
	                            return;
	                        }
	
	                        var tree = tab.child('treepanel'),
	                            root = tree.getRootNode();
	
	                        root.childNodes.map(function(node) {
	
	                            record.push({
	                                connection: tab.title,
	                                database  : node.data.text,
	                                tab       : tab
	                            });
	                        });
	                    });
	
	
	                    grid.store.loadData(record);
	                },
	
	                select : function(view, record){
	
	                    var reqType = window.location.protocol == 'file:' ? 'jsonp' : record.raw.tab.getRequestType(),
	                        isJSONP = reqType === 'jsonp';
	
	                    Ext.getCmp('copy-database-option-3').setDisabled(isJSONP);
	                    Ext.getCmp('copy-database-option-3').setValue(!isJSONP);
	                }
	            },
	            '#copy-database-btn-copy'   : {
	                click: this.copy
	            },
	            '#copy-database-btn-close'  : {
	                click: this.close
	            }
	        });
	
	        this.callParent(arguments);
	    },
	
	    initWindow: function(type, name) {
	
	        var app = this.getApplication();
	
	        Ext.create('Planche.view.database.CopyDatabaseWindow', {
	            database   : app.getSelectedDatabase(),
	            application: app
	        });
	    },
	
	    initCopy: function() {
	
	        this.messages = [];
	        this.queue = [];
	        this.tableInfo = {};
	        this.selectedSource = [];
	        this.selectedTarget = [];
	        this.copyPerOnce = 1;
	    },
	
	    copy: function(btn) {
	
	        this.initCopy();
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            me = this,
	            source = this.getSelectedSource(),
	            target = this.getSelectedTarget();
	
	        if (!source) {
	
	            Ext.Msg.alert('info', 'Please select a source');
	            return;
	        }
	
	        if (!target) {
	
	            Ext.Msg.alert('info', 'Please select a target');
	            return;
	        }
	
	        btn.setDisabled(true);
	
	        this.addTableCopyQueue(true);
	
	        Ext.Object.each(source['view'] || [], function(idx, src) {
	
	            me.addDropObjectQueue('view', target.db, src);
	
	            me.addQueue(
	                'view-structure',
	                source.connection,
	                source.db,
	                api.getQuery('SHOW_CREATE_VIEW', source.db, src),
	                me.addCopyQueue,
	                ['view']
	            );
	        });
	
	        Ext.Object.each(source['procedure'] || [], function(idx, src) {
	
	            me.addDropObjectQueue('procedure', target.db, src);
	
	            me.addQueue(
	                'procedure-structure',
	                source.connection,
	                source.db,
	                api.getQuery('SHOW_CREATE_PROCEDURE', source.db, src),
	                me.addCopyQueue,
	                ['procedure']
	            );
	        });
	
	        Ext.Object.each(source['function'] || [], function(idx, src) {
	
	            me.addDropObjectQueue('function', target.db, src);
	
	            me.addQueue(
	                'function-structure',
	                source.connection,
	                source.db,
	                api.getQuery('SHOW_CREATE_FUNCTION', source.db, src),
	                me.addCopyQueue,
	                ['function']
	            );
	        });
	
	        Ext.Object.each(source['trigger'] || [], function(idx, src) {
	
	            me.addDropObjectQueue('trigger', target.db, src);
	
	            me.addQueue(
	                'trigger-structure',
	                source.connection,
	                source.db,
	                api.getQuery('SHOW_CREATE_TRIGGER', source.db, src),
	                me.addTriggerCopyQueue
	            );
	        });
	
	        Ext.Object.each(source['event'] || [], function(idx, src) {
	
	            me.addDropObjectQueue('event', target.db, src);
	
	            me.addQueue(
	                'event-structure',
	                source.connection,
	                source.db,
	                api.getQuery('SHOW_CREATE_EVENT', source.db, src),
	                me.addCopyQueue,
	                ['event']
	            );
	        });
	
	        this.runQueue();
	    },
	
	    close: function(btn) {
	
	        btn.up('window').destroy();
	    },
	
	    addTriggerCopyQueue: function(config, response) {
	
	        var app = this.getApplication(),
	            row = Planche.DBUtil.getAssocArray(response.fields, response.records)[0],
	            query = row['SQL Original Statement'],
	            target = this.getSelectedTarget();
	
	        this.addQueue(
	            'trigger-copy',
	            target.connection,
	            target.db,
	            query
	        );
	    },
	
	    addCopyQueue: function(config, response, type) {
	
	        //queue.type을 작업해줘야합니다.
	        var app = this.getApplication(),
	            row = Planche.DBUtil.getAssocArray(response.fields, response.records)[0],
	            query = row['Create ' + type[0].toUpperCase() + type.slice(1)],
	            target = this.getSelectedTarget(),
	            form = Ext.getCmp('copy-database-option-form'),
	            options = form.getValues();
	
	        this.addQueue(
	            (type + '-copy'),
	            target.connection,
	            target.db,
	            query
	        );
	
	        if (options['copy-database-option-1'] !== 1) {
	
	            this.addTableCopyQueue();
	        }
	    },
	
	    addTableCopyQueue: function(init) {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            me = this,
	            target = this.getSelectedTarget(),
	            form = Ext.getCmp('copy-database-option-form'),
	            options = form.getValues();
	
	        if (init) {
	
	            this.selectedSource = this.getSelectedSource();
	
	            if (options['copy-database-option-3'] === 'on') {
	
	                this.copyPerOnce = 10000;
	            }
	            else {
	
	                this.copyPerOnce = 1;
	            }
	        }
	
	        this.selectedSource.table = this.selectedSource.table || [];
	
	        if (this.selectedSource.table.length == 0) {
	
	            return;
	        }
	
	        var src = this.selectedSource.table.shift();
	
	        if (!src) {
	
	            return;
	        }
	
	        me.addQueue(
	            'table-structure',
	            this.selectedSource.connection,
	            this.selectedSource.db,
	            api.getQuery('SHOW_CREATE_TABLE', this.selectedSource.db, src),
	            me.addCopyQueue,
	            ['table']
	        );
	
	        if (options['copy-database-option-2'] === 'on') {
	
	            me.addDropObjectQueue('table', target.db, src);
	        }
	
	        if (options['copy-database-option-1'] === 1) {
	
	            me.addQueue(
	                'table-count',
	                this.selectedSource.connection,
	                this.selectedSource.db,
	                api.getQuery('SELECT_COUNT', this.selectedSource.db, src),
	                me.addDataSelectQueue,
	                [this.selectedSource.connection, this.selectedSource.db, src, true]
	            );
	        }
	    },
	
	    addDropObjectQueue: function(type, db, obj) {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            target = this.getSelectedTarget();
	
	        this.addQueue(
	            'object-drop',
	            target.connection,
	            target.db,
	            api.getQuery('DROP_' + type.toUpperCase(), db, obj, 'IF EXISTS')
	        );
	    },
	
	    addDataSelectQueue: function(config, response, connection, db, table, init) {
	
	        //queue.type을 작업해줘야합니다.
	        var app = this.getApplication(),
	            api = app.getAPIS();
	
	        if (init) {
	
	            this.tableInfo[table] = this.tableInfo[table] || {};
	            var info = this.tableInfo[table],
	                row = Planche.DBUtil.getAssocArray(response.fields, response.records)[0];
	
	            info.cnt = parseInt(row.cnt, 10);
	            info.offset = 0;
	        }
	        else {
	
	            var info = this.tableInfo[table];
	            info.offset += this.copyPerOnce;
	        }
	
	        if (info.cnt == 0) {
	
	            this.addTableCopyQueue();
	            return;
	        }
	
	        if ((info.cnt - info.offset) < 1) {
	
	            this.addTableCopyQueue();
	            return;
	        }
	
	        if (info.offset >= info.cnt) {
	
	            info.offset = info.cnt;
	        }
	
	        var query = api.getQuery('SELECT_TABLE', db, table, '*', 'LIMIT ' + info.offset + ', ' + this.copyPerOnce);
	
	        this.addQueue(
	            'data-copy',
	            connection,
	            db,
	            query,
	            this.addDataInsertQueue,
	            [connection, db, table]
	        );
	    },
	
	    addDataInsertQueue: function(config, response, connection, db, table) {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            me = this,
	            target = this.getSelectedTarget();
	
	        var fields = [];
	        response.fields.map(function(field, idx) {
	
	            fields.push("`" + field.name + "`");
	        });
	
	        if (response.records.length === 0) {
	
	            return;
	        }
	
	        var values = [];
	        response.records.map(function(row, idx) {
	
	            var value = [];
	            for (var field in row) {
	
	                if (row[field] === null) {
	
	                    value.push("NULL");
	                    continue;
	                }
	                else if (!row[field]) {
	
	                    value.push("''");
	                    continue;
	                }
	
	                value.push("'" + Ext.String.escape(row[field]) + "'");
	            }
	
	            values.push("(" + value.join(",") + ")");
	        });
	
	        var query = api.getQuery('INSERT_TABLE_BULK', target.db, table, fields.join(','), values.join(','));
	
	        me.addQueue(
	            'data-insert',
	            target.connection,
	            target.db,
	            query,
	            me.addDataSelectQueue,
	            [connection, db, table, false]
	        );
	    },
	
	    addQueue: function(type, connection, db, query, callback, params) {
	
	        callback = callback || function() {
	        };
	        params = params || [];
	
	        this.queue.push({
	            type      : type,
	            connection: connection,
	            db        : db,
	            query     : query,
	            callback  : callback,
	            params    : params
	        });
	    },
	
	    resetQueue: function() {
	
	        this.queue = [];
	    },
	
	    getQueue: function() {
	
	        return this.queue.shift();
	    },
	
	    runQueue: function() {
	
	        var app = this.getApplication(),
	            me = this,
	            btnCopy = Ext.getCmp('copy-database-btn-copy');
	
	        var progress = this.getProgressBox(),
	            page = {},
	            total = {},
	            total_page = {},
	            copy_per_page = this.copyPerOnce,
	            table = null,
	            execute;
	
	        progress.updateProgress(0, 'Processing...');
	        (execute = function() {
	
	            var queue = me.getQueue();
	
	            if (queue) {
	
	                app.tunneling({
	                    connection: queue.connection,
	                    db        : queue.db,
	                    query     : queue.query,
	                    type      : 'copy',
	                    success   : function(config, response) {
	
	                        if (queue.type == 'table-count') {
	
	                            table = queue.params[2];
	                            total[table] = parseInt(response.records[0][0], 10);
	                            total_page[table] = Math.ceil(total[table] / copy_per_page);
	                            page[table] = 1;
	                        }
	
	                        if (queue.type == 'data-insert') {
	
	                            table = queue.params[2];
	                            var num = Math.ceil((page[table] / total_page[table]) * 100),
	                                val = num / 100,
	                                curCnt = page[table] * copy_per_page;
	
	                            if (curCnt > total[table]) {
	
	                                curCnt = total[table];
	                            }
	
	                            progress.setTitle('Copy Table to Different Host - ' + queue.params[1] + '.' + table);
	                            progress.updateProgress(val, 'Copies ' + num + '% (' + curCnt + '/' + total[table] + ')');
	
	                            page[table]++;
	                        }
	
	                        queue.callback.apply(me, [config, response].concat(queue.params));
	                        execute();
	                    },
	                    failure   : function(config, response) {
	
	                        btnCopy.setDisabled(false);
	                        me.messages.push(this.generateError(queue.query, response.message));
	
	                        progress.updateProgress(1, 'Failed! See the error message');
	                        setTimeout(function() {
	
	                            progress.close();
	                        }, 2000);
	
	                        me.openMessage();
	                    }
	                });
	            }
	            else {
	
	                btnCopy.setDisabled(false);
	
	                progress.updateProgress(1, 'Successfully completed');
	
	                app.fireEvent('after_copy_tables');
	
	                setTimeout(function() {
	
	                    progress.close();
	                }, 2000);
	
	                if (me.openMessage()) {
	
	                    return;
	                }
	            }
	
	        })();
	
	    },
	
	    getProgressBox: function() {
	
	        return Ext.MessageBox.show({
	            title       : 'Copy Table to Different Host',
	            progressText: 'Copies...',
	            width       : 300,
	            progress    : true,
	            closable    : false,
	            hidden      : true
	        });
	    },
	
	    getSelectedTarget: function() {
	
	        var grid = Ext.getCmp('copy-database-target-grid'),
	            selected = grid.getSelectionModel().getSelection();
	
	        if (selected.length == 0) {
	
	            return false;
	        }
	
	        var target = selected.shift(),
	            db = target.raw.database,
	            connection = target.raw.tab;
	
	        return {
	            db        : db,
	            connection: connection
	        }
	    },
	
	    getSelectedSource: function() {
	
	        var app = this.getApplication(),
	            tree = Ext.getCmp('copy-database-source-tree'),
	            selected = tree.getChecked(),
	            source = {},
	            connection = app.getActiveConnectTab(),
	            db = tree.getRootNode().get('text'),
	            me = this;
	
	        if (selected.length == 0) {
	
	            return false;
	        }
	
	        selected.map(function(node, idx) {
	
	            var type = node.raw.type;
	            source[type] = source[type] || [];
	            source[type].push(node.raw.text);
	        });
	
	        source.connection = connection;
	        source.db = db;
	
	        return source;
	    },
	
	    openMessage: function(message) {
	
	        message = message || '';
	
	        var app = this.getApplication();
	
	        app.openMessage(message);
	
	        if (message) {
	
	            return true;
	        }
	
	        if (this.messages.length > 0) {
	
	            app.openMessage(this.messages);
	            return true;
	        }
	        else {
	
	            return false;
	        }
	    }
	});


/***/ },
/* 53 */
/***/ function(module, exports) {

	Ext.define('Planche.lib.Menu', {
	    extend: 'Ext.app.Controller',
	    added : false,
	    add : function (topBtn) {
	
	        this.added = true;
	    },
	
	    show: function(topBtn) {
	
	        if (!this.added) {
	
	            this.add(topBtn);
	        }
	
	        Ext.Array.each(topBtn.menu.query('menuitem'), function(menu, idx) {
	
	            switch (typeof menu.allowDisable) {
	
	                case 'function':
	
	                    menu.setDisabled(menu.allowDisable.apply(menu.scope || menu, [topBtn, menu]));
	                    break;
	
	                case 'boolean' :
	
	                    menu.setDisabled(menu.allowDisable);
	                    break;
	            }
	        });
	
	        topBtn.menu.showBy(topBtn);
	    }
	});

/***/ },
/* 54 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.bookmark.Planche-Desktop', {
	    extend: 'Planche.lib.Menu',
	    alternateClassName: 'Planche.controller.menu.Bookmark',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        topBtn.menu.add([{
	            text   : 'Add SQL bookmark',
	            handler : function(){
	
	                alert('coming soon');
	            }
	        }, {
	            text   : 'Load SQL bookmark',
	            handler : function(){
	
	                alert('coming soon');
	            }
	        }]);
	
	        this.added = true;
	    }
	});


/***/ },
/* 55 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Help', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        //Help Toolbar Setting
	        topBtn.menu.add([{
	            text   : 'About Planche',
	            handler : function(){
	
	                window.open('https://github.com/plancheproject/planche', 'about');
	            }
	        }, {
	            text   : 'Planche issues',
	            handler : function(){
	
	                window.open('https://github.com/plancheproject/planche/issues', 'issue');
	            }
	        }]);
	
	        this.added = true;
	    }
	});


/***/ },
/* 56 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Tools', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        topBtn.menu.add([{
	            text        : 'User Manager',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openUserPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Flush',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openFlushPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Open Quick Command',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openQuickPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Show Process List',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openProcessPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Show Variables',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openVariablesPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Show Status',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openStatusPanel();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }]);
	
	        this.added = true;
	    }
	});


/***/ },
/* 57 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Export', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        topBtn.menu.add([{
	            text        : 'Export Database Schema To HTML',
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                app.openSchemaToHTMLWindow();
	            }
	        }, '-', {
	            text        : 'Download To CSV',
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                app.openSchemaToCSVWindow();
	            }
	        }, '-', {
	            text    : 'Backup Database As SQL Dump(Not Yet)',
	            disabled: true,
	            menu    : [{
	                text: ''
	            }]
	        }, {
	            text    : 'Import(Not Yet)',
	            disabled: true,
	            menu    : [{
	                text: 'Import External Data'
	            }, {
	                text: 'Execute SQL Script'
	            }]
	        }]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 58 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Table', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        topBtn.menu.add([{
	            text        : 'Paste SQL Statement',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            menu        : [{
	                text: 'INSERT INTO &lt;Table Name&gt;..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'insert');
	                }
	            }, {
	                text: 'UPDATE &lt;Table Name&gt; SET..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'update');
	                }
	            }, {
	                text: 'DELETE FROM &lt;Table Name&gt;..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'delete');
	                }
	            }, {
	                text: 'SELECT &lt;col-1&gt;..&lt;col-n&gt; FROM &lt;Table Name&gt;',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'select');
	                }
	            }, {
	                text   : 'INSERT ... ON DUPLICATE KEY UPDATE',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'duplicate_update');
	                }
	            }]
	        }, {
	            text: 'Copy Table To Differnt Host/Database',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var node = app.getSelectedNode(true);
	                app.openCopyDatabaseWindow(node);
	            }
	        }, '-', {
	            text: 'Open Table',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedNode();
	
	                app.openTable(db, table);
	            }
	        }, {
	            text: 'Create Table',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase();
	                app.openCreateTableWindow(db);
	            }
	        }, {
	            text: 'Alter Table',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-schema-tab');
	            }
	        }, {
	            text: 'Table Properties',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-properties-tab');
	            }
	        }, {
	            text: 'Manage Indexes',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-indexes-tab');
	            }
	        }, {
	            text: 'View table\'s sql',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-sql-tab');
	            }
	        }, {
	            text: 'View Table information',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-info-tab');
	            }
	        }, {
	            text: 'More Table Operations',
	            allowDisable: function(topBtn, menu) {
	
	                if (app.getSelectedTable()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            menu        : [{
	                text   : 'Rename Table',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.renameTable(db, table);
	                }
	            }, {
	                text   : 'Truncate Table',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.truncateTable(db, table, function() {
	
	                        app.openTable(db, table);
	                    });
	                }
	            }, {
	                text   : 'Drop Table From Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.dropTable(db, table);
	                }
	            }, {
	                text   : 'Reorder Column(s)',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable(true);
	
	                    app.openReorderColumns(db, table);
	                }
	            }, {
	                text   : 'Duplicate Table Structure/Data',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.duplicateTable(db, table, function(){
	
	                        var node = app.getSelectedTable(true);
	                        app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                        app.reloadTree();
	                    });
	                }
	            }, {
	                text   : 'View Advanced Properties',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.openAdvancedProperties(db, table);
	                }
	            }, {
	                text: 'Change Table To Type',
	                menu: [
	                    {
	
	                        text   : 'MYISAM',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'MRG_MYISAM',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'CSV',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'BLACKHOLE',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'MEMORY',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'FEDERATED',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'ARCHIVE',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'INNODB',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    },
	                    {
	
	                        text   : 'PERFORMANCE_SCHEMA',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }
	                ]
	            }]
	        }, '-', {
	            text        : 'Create Trigger',
	            disabled    : true,
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            handler     : function() {
	
	                var db = app.getSelectedDatabase();
	                app.createTrigger(db);
	            }
	        }]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 59 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Edit', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        topBtn.menu.add([{
	            text        : 'Refresh Object Browser',
	            scope       : this.application,
	            handler     : function() {
	
	                app.reloadTree();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'SQL Formatter',
	            scope       : this.application,
	            handler     : function() {
	
	                this.formatQuery();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveEditor()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, '-', {
	            text        : 'Undo',
	            scope       : this.application,
	            handler     : function() {
	
	                this.getActiveEditor().undo();
	            },
	            allowDisable: function() {
	
	                if (!this.getActiveEditor()) {
	
	                    return true;
	                }
	
	                if (this.getActiveEditor().historySize().undo < 1) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Redo',
	            scope       : this.application,
	            handler     : function() {
	
	                this.getActiveEditor().redo();
	            },
	            allowDisable: function() {
	
	                if (!this.getActiveEditor()) {
	
	                    return true;
	                }
	
	                if (this.getActiveEditor().historySize().redo < 1) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }
	            // '-'
	            // ,{
	            //     text : 'Cut',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.getActiveEditor().cut();
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         if(!this.getActiveEditor().somethingSelected()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	            // },{
	            //     text : 'Copy',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.getActiveEditor().copy();
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         if(!this.getActiveEditor().somethingSelected()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	            // },{
	            //     text : 'Paste',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.getActiveEditor().paste();
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	            // },
	            // '-'
	            // ,{
	            //     text : 'Find',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.openFindPanel()
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	            // },{
	            //     text : 'Find Next',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.openWindow('command.Find');
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	            // },{
	            //     text : 'Replace',
	            //     scope : this.application,
	            //     handler : function () {
	
	            //         this.openWindow('command.Replace');
	            //     },
	            //     allowDisable : function () {
	
	            //         if(!this.getActiveEditor()) {
	
	            //             return true;
	            //         }
	
	            //         return false;
	            //     }
	        ]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 60 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Database', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        var app = this.getApplication();
	
	        topBtn.menu.add([{
	            text        : 'Copy Database To Different Host/Database',
	            handler     : function() {
	
	                app.openCopyDatabaseWindow();
	            },
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            }
	        }, {
	            text        : 'Create Database',
	            handler     : function() {
	
	                app.createDatabase();
	            },
	            allowDisable: function() {
	
	                if (!app.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Alter Database',
	            handler     : function() {
	
	                var db = app.getSelectedDatabase();
	                app.alterDatabase(db);
	            },
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            }
	        }, {
	            text        : 'Create',
	            allowDisable: function() {
	
	                var node = app.getSelectedNode(true);
	                var db = app.getParentNode(node);
	
	                if (!db) {
	
	                    return true;
	                }
	
	                return false;
	            },
	            menu        : [{
	                text   : 'Table',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.openCreateTableWindow(db);
	                }
	            }, {
	                text   : 'View',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.createView(db);
	                }
	            }, {
	                text   : 'Stored Procedure',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.createProcedure(db);
	                }
	            }, {
	                text   : 'Function',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.createFunction(db);
	                }
	            }, {
	                text   : 'Trigger',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.createTrigger(db);
	                }
	            }, {
	                text   : 'Event',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.createEvent(db);
	                }
	            }]
	        }, {
	            text        : 'More Database Operations',
	            allowDisable: function() {
	
	                if (app.getSelectedDatabase()) {
	
	                    return false;
	                }
	
	                return true;
	            },
	            menu        : [{
	                text   : 'Drop Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.dropDatabase(db, function() {
	
	                        var node = app.getSelectedTable(true);
	                        app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                        node.remove();
	                    });
	                }
	            }, {
	                text   : 'Truncate Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.truncateDatabase(db, function() {
	
	                        var node = app.getSelectedTable(true);
	                        Ext.Array.each(node.childNodes, function(childNode, idx) {
	
	                            childNode.removeAll();
	                        });
	                    });
	                }
	            }
	
	            //    , {
	            //    text   : 'Empty Database',
	            //    handler: function() {
	            //
	            //        var db = app.getSelectedDatabase();
	            //        app.emptyDatabase(db);
	            //    }
	            //}
	            ]
	        }]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 61 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Query', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        topBtn.menu.add([{
	            text        : 'Excute Query',
	            scope       : this.application,
	            handler     : function() {
	
	                this.executeQuery();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveEditor()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, '-', {
	            text        : 'New Query Editor',
	            scope       : this.application,
	            handler     : function() {
	
	                this.openQueryTab();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Close Query Tab',
	            scope       : this.application,
	            handler     : function() {
	
	                var actSubTab = this.getActiveQueryTab();
	                actSubTab.destroy();
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (this.getQueryTabPanel().child().length < 2) {
	
	                    return true;
	                }
	
	                if (!this.getActiveQueryTab()) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }, {
	            text        : 'Close Other Query Tabs',
	            scope       : this.application,
	            handler     : function() {
	
	                var tabPanel = this.getQueryTabPanel().query('tabpanel');
	                var actSubTab = this.getActiveQueryTab();
	
	                Ext.Array.each(tabPanel, function(tab, idx) {
	
	                    if (actSubTab != tab.up()) {
	
	                        tab.up().destroy();
	                    }
	                    else {
	
	                        tab.addClass('x-tab-strip-closable');
	                    }
	                });
	            },
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveQueryTab()) {
	
	                    return true;
	                }
	
	                var tabPanel = this.getQueryTabPanel().query('tabpanel');
	
	                if (tabPanel.length < 2) {
	
	                    return true;
	                }
	
	                return false;
	            }
	        }]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 62 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.menu.Connection', {
	    extend: 'Planche.lib.Menu',
	    add   : function(topBtn) {
	
	        topBtn.menu.add([{
	            text        : 'New Connection Using Current Setting',
	            scope       : this.application,
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            },
	            handler     : function() {
	
	                var tab = this.getActiveConnectTab();
	                this.initConnectTab({
	                    hostName    : tab.getHostName(),
	                    tunnelingURL: tab.getTunnelingURL(),
	                    requestType : tab.getRequestType(),
	                    host        : tab.getHost(),
	                    user        : tab.getUser(),
	                    pass        : tab.getPass(),
	                    charset     : tab.getCharset(),
	                    port        : tab.getPort(),
	                    dbms        : tab.getDBMS()
	                });
	            }
	        }, {
	            text   : 'New Connection',
	            scope  : this.application,
	            handler: function() {
	
	                this.openConnPanel();
	            }
	        }, {
	            text        : 'Disconnect',
	            scope       : this.application,
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            },
	            handler     : function() {
	
	                this.closeActiveConnectionTab();
	            }
	        }, {
	            text        : 'Disconnect All',
	            scope       : this.application,
	            allowDisable: function(topBtn, menu) {
	
	                if (!this.getActiveConnectTab()) {
	
	                    return true;
	                }
	
	                return false;
	            },
	            handler     : function() {
	
	                var app = this,
	                    conns = app.getConnectTabPanel().query('>>tab');
	                Ext.Array.each(conns, function(tab, idx) {
	
	                    app.closeActiveConnectionTab();
	                });
	            }
	        }]);
	
	        this.added = true;
	    }
	});

/***/ },
/* 63 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.user.UserAdd', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.user.UserAdd'
	    ],
	    init  : function() {
	
	        var app = this.getApplication();
	
	        this.control({
	            'user-add'           : {
	                boxready: this.initUserForm
	            },
	            '#user-add-save-user': {
	                click: this.saveUser
	            },
	            '#user-add-close'    : {
	                click: this.close
	            }
	        });
	    },
	
	    initWindow: function(user, host) {
	
	        Ext.create('Planche.view.user.UserAdd', {
	            user: user,
	            host: host
	        });
	    },
	
	    initUserForm: function(win) {
	
	        var app = this.getApplication(),
	            user = win.getUser(),
	            host = win.getHost();
	
	        if (!(user || host)) {
	
	            return;
	        }
	
	        app.tunneling({
	            db     : '',
	            query  : app.getAPIS().getQuery('SELECT_USER', user, host),
	            success: function(config, response) {
	
	                var list = Planche.DBUtil.getAssocArray(response.fields, response.records);
	
	                Ext.getCmp('user-add-user-name').setValue(list[0]['User']);
	                Ext.getCmp('user-add-host').setValue(list[0]['Host']);
	                Ext.getCmp('user-add-max-questions').setValue(list[0]['max_questions']);
	                Ext.getCmp('user-add-max-updates').setValue(list[0]['max_updates']);
	                Ext.getCmp('user-add-max-connections').setValue(list[0]['max_connections']);
	                Ext.getCmp('user-add-max-user-connections').setValue(list[0]['max_user_connections']);
	            }
	        });
	    },
	
	    saveUser: function(btn) {
	
	        var app = this.getApplication(),
	            win = btn.up("window"),
	            api = app.getAPIS(),
	            tunnelings = [],
	            user = Ext.getCmp('user-add-user-name').getValue(),
	            host = Ext.getCmp('user-add-host').getValue(),
	            pass = Ext.getCmp('user-add-password').getValue(),
	            repass = Ext.getCmp('user-add-retype-password').getValue(),
	            isEdit = true,
	            operOption = [],
	            option = [],
	            messages = [];
	
	        if (!win.getUser() && !win.getHost()) {
	
	            if (this.checkPassword(pass, repass) === -1) {
	
	                return;
	            }
	
	            tunnelings.push({
	                db     : '',
	                query  : api.getQuery('CREATE_USER', user, host, pass),
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	
	            isEdit = false;
	        }
	        else {
	
	            var result = this.checkPassword(pass, repass);
	
	            if (result === -1) {
	
	                return;
	            }
	
	            if (result == 1) {
	
	                if (pass) {
	
	                    option.push('IDENTIFIED BY "' + pass + '"');
	                }
	            }
	        }
	
	        //If input name is different from the old user name. It will be changing
	        if (isEdit && (user != win.getUser() || host != win.getHost())) {
	
	            tunnelings.push({
	                db     : '',
	                query  : api.getQuery('RENAME_USER', win.getUser(), win.getHost(), user, host),
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        }
	
	
	        //Add Grant "with options"
	        var val = [
	            Ext.getCmp('user-add-max-questions').getValue(),
	            Ext.getCmp('user-add-max-updates').getValue(),
	            Ext.getCmp('user-add-max-connections').getValue(),
	            Ext.getCmp('user-add-max-user-connections').getValue()
	        ];
	
	        if (val[0]) {
	
	            operOption.push('MAX_QUERIES_PER_HOUR ' + val[0]);
	        }
	
	        if (val[1]) {
	
	            operOption.push('MAX_UPDATES_PER_HOUR ' + val[1]);
	        }
	
	        if (val[2]) {
	
	            operOption.push('MAX_CONNECTIONS_PER_HOUR ' + val[2]);
	        }
	
	        if (val[3]) {
	
	            operOption.push('MAX_USER_CONNECTIONS ' + val[3]);
	        }
	
	        if (operOption.length > 0) {
	
	            option.push("WITH " + operOption.join(" "));
	        }
	
	        if (option.length > 0) {
	
	            tunnelings.push({
	                db     : '',
	                query  : api.getQuery('GRANT', 'USAGE', user, host, "*.*", option.join(" ")),
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        }
	
	        app.tunnelings(tunnelings, {
	            start : function(){
	
	                win.setLoading(true);
	            },
	            success: function() {
	
	                app.fireEvent('after_save_user');
	                win.setLoading(false);
	                win.destroy();
	            },
	            failure: function() {
	
	                app.showMessage(messages);
	                win.setLoading(false);
	            }
	        });
	    },
	
	    checkPassword: function(pass, repass) {
	
	        if (pass || repass) {
	
	            if (pass != repass) {
	
	                Ext.Msg.alert('error', 'Password do not match');
	                return -1;
	            }
	            else {
	
	                return 1;
	            }
	        }
	
	        return 0;
	    },
	
	    close: function(btn) {
	
	        var win = btn.up("window");
	        win.destroy();
	    }
	});


/***/ },
/* 64 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.Main', {
	    extend: 'Ext.app.Controller',
	    init : function () {
	
	
	    }
	});
	


/***/ },
/* 65 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.TableInfoTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.TableInfoTab'
	    ],
	    init  : function() {
	
	        this.control({
	            'table-info-tab': {
	                boxready: function(tab) {
	
	                    var db = tab.getDatabase(),
	                        table = tab.getTable();
	
	                    Planche.SchemaUtil.exportTableInfoToHTML(db, table, tab, 'update');
	                }
	            }
	        });
	    }
	});


/***/ },
/* 66 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.TableSQLTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.TableInfoTab'
	    ],
	    init  : function() {
	
	        this.control({
	            'table-sql-tab': {
	                boxready: this.initTab,
	                resize  : this.resizeTab
	            }
	        });
	    },
	
	    resizeTab: function(tab, width, height) {
	
	        tab.getEditor().setSize(width, height);
	    },
	
	    initTab: function(tab, width, height) {
	
	        var app = this.getApplication(),
	            db = tab.getDatabase(),
	            table = tab.getTable(),
	            query = app.getAPIS().getQuery('TABLE_CREATE_INFO', db, table),
	            textarea = tab.getEl().query('textarea')[0];
	
	        Ext.apply(tab, {
	            editor   : CodeMirror.fromTextArea(textarea, {
	                mode          : 'text/x-mysql',
	                indentWithTabs: true,
	                smartIndent   : true,
	                lineNumbers   : true,
	                matchBrackets : true,
	                autofocus     : true
	            }),
	            getEditor: function() {
	
	                return this.editor;
	            }
	        });
	
	        tab.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : query,
	            success: function(config, response) {
	
	                tab.getEditor().setValue(response.records[0][1]);
	                tab.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                tab.setLoading(false);
	            }
	        });
	    }
	});


/***/ },
/* 67 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.TableIndexesTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.TableIndexesTab'
	    ],
	    init  : function() {
	
	        this.control({
	            '#table-indexes-tab'       : {
	                boxready: this.initTab,
	                reload  : this.initTab
	            },
	            '#table-indexes-btn-create': {
	                click: this.createIndex
	            },
	            '#table-indexes-btn-edit'  : {
	                click: this.editIndex
	            },
	            '#table-indexes-btn-delete': {
	                click: this.deleteIndex
	            }
	        });
	    },
	
	    createIndex: function(btn) {
	
	        var app = this.getApplication(),
	            tab = Ext.getCmp('table-indexes-tab'),
	            db  = tab.getDatabase(),
	            tb  = tab.getTable();
	
	        app.openCreateIndexWindow(db, tb);
	    },
	
	    editIndex: function(btn) {
	
	        var app      = this.getApplication(),
	            tab      = Ext.getCmp('table-indexes-tab'),
	            db       = tab.getDatabase(),
	            tb       = tab.getTable(),
	            selModel = tab.getSelectionModel(),
	            selList  = selModel.getSelection();
	
	        if (selList.length == 0) {
	
	            app.showMessage('Choose the index you want to edit.');
	            return;
	        }
	
	        app.openAlterIndexWindow(db, tb, selList[0].data.Key_name);
	    },
	
	    deleteIndex: function(btn) {
	
	        var app      = this.getApplication(),
	            tab      = Ext.getCmp('table-indexes-tab'),
	            db       = tab.getDatabase(),
	            tb       = tab.getTable(),
	            selModel = tab.getSelectionModel(),
	            selList  = selModel.getSelection();
	
	        if (selList.length == 0) {
	
	            app.showMessage('Choose the index you want to delete.');
	            return;
	        }
	
	        var index = selList[0].raw.Key_name;
	        Ext.Msg.confirm('Drop Index \'' + index + '\'', 'Do you really want to drop the index?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('DROP_INDEX', db, tb, index),
	                    success: function(config, response) {
	
	                        tab.fireEvent('reload', tab);
	                    }
	                });
	            }
	        });
	    },
	
	    initTab: function(tab) {
	
	        var app = this.getApplication(),
	            db  = tab.getDatabase(),
	            tb  = tab.getTable();
	
	        if (!tb) {
	
	            return;
	        }
	
	        tab.setLoading(true);
	
	        //load table fileds list
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_INDEXES', db, tb),
	            success: function(config, response) {
	
	                var records = Planche.DBUtil.getAssocArray(response.fields, response.records);
	                tab.getStore().loadData(records);
	
	                tab.setLoading(false);
	            }
	        });
	    }
	});


/***/ },
/* 68 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.TablePropertiesTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.TablePropertiesTab'
	    ],
	    init  : function() {
	
	        var app = this.getApplication(),
	            loadedCollation = false,
	            loadedCharset = false;
	
	        this.control({
	            'table-properties-tab'        : {
	                boxready: this.initTab
	            },
	            '#table-properties-btn-create': {
	                click: function(btn) {
	
	                    var ctrl = app.getController('table.TableSchemaTab');
	                    ctrl[btn.getText().toLowerCase()](btn);
	                }
	            },
	            '#properties-collation'       : {
	                focus: function(combo) {
	
	                    if (loadedCollation) {
	
	                        return;
	                    }
	
	                    var tab = Ext.getCmp('table-properties-tab'),
	                        db = tab.getDatabase(),
	                        table = tab.getTable();
	
	                    app.tunneling({
	                        db     : db,
	                        query  : app.getAPIS().getQuery('SHOW_COLLATION', db, table),
	                        success: function(config, response) {
	
	                            var tmp = [];
	                            Ext.Array.each(response.records, function(row, idx) {
	
	                                tmp.push({
	                                    id  : row[0],
	                                    text: row[0]
	                                });
	                            });
	
	                            combo.store.loadData(tmp);
	
	                            loadedCollation = true;
	                        }
	                    });
	                }
	            },
	            '#properties-charset'         : {
	                focus: function(combo) {
	
	                    if (loadedCharset) {
	
	                        return;
	                    }
	
	
	                    var tab = Ext.getCmp('table-properties-tab'),
	                        db = tab.getDatabase(),
	                        table = tab.getTable();
	
	                    app.tunneling({
	                        db     : db,
	                        query  : app.getAPIS().getQuery('SHOW_CHARSET', db, table),
	                        success: function(config, response) {
	
	                            var tmp = [];
	                            Ext.Array.each(response.records, function(row, idx) {
	
	                                tmp.push({
	                                    id  : row[0],
	                                    text: row[0]
	                                });
	                            });
	
	                            combo.store.loadData(tmp);
	
	                            loadedCharset = true;
	                        }
	                    });
	                }
	            }
	
	        });
	    },
	
	    initTab: function(tab) {
	
	        var app = this.getApplication(),
	            db = tab.getDatabase(),
	            table = tab.getTable();
	
	        if (!table) {
	
	            return;
	        }
	
	        var bindData,
	            tunnelings = [{
	                db     : db,
	                query  : app.getAPIS().getQuery('SHOW_CREATE_TABLE', db, table),
	                success: function(config, response) {
	
	                    var def = response.records[0][1],
	                        getPropertie = function(field) {
	
	                            var regexp = new RegExp(field + '=([a-zA-Z0-9_]+)', 'i'),
	                                result = def.match(regexp);
	
	                            if (!result) {
	
	                                return null;
	                            }
	
	                            return result[1];
	                        };
	
	                    bindData = {
	                        'properties-table-type'     : getPropertie('ENGINE'),
	                        'properties-charset'        : getPropertie('CHARSET'),
	                        'properties-checksum'       : getPropertie('CHECKSUM'),
	                        'properties-delay-key-write': getPropertie('DELAY_KEY_WRITE'),
	                        'properties-row-format'     : getPropertie('ROW_FORMAT'),
	                        'properties-auto-incr'      : getPropertie('AUTO_INCREMENT'),
	                        'properties-avg-row-len'    : getPropertie('AVG_ROW_LENGTH'),
	                        'properties-minimum-row'    : getPropertie('MIN_ROWS'),
	                        'properties-maximum-row'    : getPropertie('MAX_ROWS')
	                    };
	                }
	            }, {
	                db     : db,
	                query  : app.getAPIS().getQuery('SHOW_TABLE_STATUS', db, table),
	                success: function(config, response) {
	
	                    var data = Planche.DBUtil.getAssocArray(response.fields, response.records)[0];
	
	                    if (data.Create_options) {
	
	                        var arr = data.Create_options.split(" ");
	                        Ext.Array.each(arr, function(row) {
	
	                            row = row.split("=");
	                            data[row[0]] = row[1];
	                        });
	                    }
	
	                    Ext.applyIf(bindData, {
	                        'properties-table-type'     : data.Engine,
	                        'properties-charset'        : data.Charset,
	                        'properties-collation'      : data.Collation,
	                        'properties-checksum'       : data.checksum,
	                        'properties-delay-key-write': data.delay_key_write,
	                        'properties-row-format'     : data.row_format,
	                        'properties-auto-incr'      : data.Auto_increment,
	                        'properties-avg-row-len'    : data.avg_row_length,
	                        'properties-minimum-row'    : data.min_rows,
	                        'properties-maximum-row'    : data.max_rows,
	                        'properties-comment'        : data.Comment
	                    });
	                }
	            }];
	
	        app.tunnelings(tunnelings, {
	            success: function() {
	
	                var form = Ext.getCmp('properties-form');
	                form.getForm().setValues(bindData);
	                tab.setProperties(bindData);
	            }
	        });
	    },
	
	    getTableProperties: function() {
	
	        var form = Ext.getCmp('properties-form');
	
	        if (!form) {
	
	            return '';
	        }
	
	        var tab = Ext.getCmp('table-properties-tab'),
	            oldVals = tab.getProperties(),
	            newVals = form.getValues(),
	            properties = [],
	            getNewValue = function(key) {
	
	                if (newVals[key] === '') {
	
	                    return null;
	                }
	
	                if (newVals[key] == oldVals[key]) {
	
	                    return null;
	                }
	
	                return newVals[key];
	            };
	
	        var create_options = [],
	            newVal = null;
	
	        newVal = getNewValue('properties-table-type');
	        if (newVal != null) {
	
	            properties.push('ENGINE=' + newVal);
	        }
	
	        newVal = getNewValue('properties-charset');
	        if (newVal != null) {
	
	            properties.push('CHARSET=' + newVal);
	        }
	
	        newVal = getNewValue('properties-collation');
	        if (newVal != null) {
	
	            properties.push('COLLATE=' + newVal);
	        }
	
	        newVal = getNewValue('properties-checksum');
	        if (newVal != null) {
	
	            properties.push('CHECKSUM=' + newVal);
	        }
	
	        newVal = getNewValue('properties-avg-row-len');
	        if (newVal != null) {
	
	            properties.push('AVG_ROW_LENGTH=' + newVal);
	        }
	
	        newVal = getNewValue('properties-auto-incr');
	        if (newVal != null) {
	
	            properties.push('AUTO_INCREMENT=' + newVal);
	        }
	
	        newVal = getNewValue('properties-comment');
	        if (newVal != null) {
	
	            properties.push('COMMENT=\'' + newVal + '\'');
	        }
	
	        newVal = getNewValue('properties-delay-key-write');
	        if (newVal != null) {
	
	            properties.push('DELAY_KEY_WRITE=' + newVal);
	        }
	
	        newVal = getNewValue('properties-row-format');
	        if (newVal != null) {
	
	            properties.push('ROW_FORMAT=' + newVal);
	        }
	
	        newVal = getNewValue('properties-minimum-row');
	        if (newVal != null) {
	
	            properties.push('MIN_ROWS=' + newVal);
	        }
	
	        newVal = getNewValue('properties-maximum-row');
	        if (newVal != null) {
	
	            properties.push('MAX_ROWS=' + newVal);
	        }
	
	        if (create_options.length > 0) {
	
	            properties.push('CREATE_OPTIONS=\'' + create_options.join(" ") + '\'');
	        }
	
	        return properties.join(' ');
	    },
	
	    syncProperties: function() {
	
	        var form = Ext.getCmp('properties-form');
	
	        if (!form) {
	
	            return '';
	        }
	
	        var tab = Ext.getCmp('table-properties-tab');
	
	        newVals = form.getValues();
	
	        tab.setProperties(newVals);
	    }
	});


/***/ },
/* 69 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.TableSchemaTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.TableSchemaTab'
	    ],
	    init  : function() {
	
	        this.control({
	            'table-schema-tab'        : {
	                beforeedit: this.beforeEdit,
	                edit      : this.edit,
	                boxready  : this.initTableSchemaTab
	            },
	            '#table-schema-btn-create': {
	                click: this.createTable
	            },
	            '#table-schema-btn-insert': {
	                click: this.insertRow
	            },
	            '#table-schema-btn-delete': {
	                click: this.deleteRow
	            }
	        });
	    },
	
	    edit: function(editor, e) {
	
	        var tab = Ext.getCmp("table-schema-tab");
	
	        if (e.originalValue != e.value) {
	
	            tab.setEdited(true);
	        }
	
	        tab.getView().focus();
	    },
	
	    beforeEdit: function(editor, e) {
	
	        var
	            tab = Ext.getCmp("table-schema-tab"),
	            app = this.getApplication(),
	            store = tab.getStore(),
	            selModel = tab.getSelectionModel(),
	            selection = selModel.getSelection()[0],
	            index = store.indexOf(selection) + 1;
	
	        if (index == store.getCount()) {
	
	            store.insert(store.getCount(), [{}]);
	        }
	    },
	
	    insertRow: function(btn) {
	
	        var tab = btn.up("table-schema-tab"),
	            store = tab.getStore(),
	            selModel = tab.getSelectionModel(),
	            selection = selModel.getSelection()[0];
	
	        if (selection) {
	
	            var index = store.indexOf(selection);
	            store.insert(index, [{}]);
	        }
	        else {
	
	            store.insert(store.getCount(), [{}]);
	        }
	    },
	
	    deleteRow: function(btn) {
	
	        var tab = btn.up("table-schema-tab"),
	            store = tab.getStore(),
	            selModel = tab.getSelectionModel(),
	            selection = selModel.getSelection()[0],
	            cnt = store.getCount();
	
	        if (!selection) { return; }
	        if (cnt == 1) { return; }
	        if (selModel.getCurrentPosition().row == 0) {
	
	            selModel.move('down');
	        }
	        else {
	
	            selModel.move('up');
	        }
	
	        store.remove(selection);
	    },
	
	    createTable: function(btn) {
	
	        this[btn.getText().toLowerCase()](btn);
	    },
	
	    create: function(btn) {
	
	        var app = this.getApplication(),
	            tab = Ext.getCmp("table-schema-tab"),
	            textfield = btn.up('window').down('textfield'),
	            table = textfield.getValue(),
	            me = this;
	
	        if (!table) {
	
	            textfield.validate();
	            return;
	        }
	
	        var db = tab.getDatabase(),
	            query = '(',
	            primaries = [], fields = [],
	            store = tab.getStore();
	
	        Ext.Object.each(store.getRange(), function(idx, obj) {
	
	            if (!obj.data.field) return;
	
	            var data = obj.data,
	                field = '';
	
	            field += '\n\t`' + data.field + '` ' + data.type;
	            field += data.len ? '(' + data.len + ')' : '';
	            field += data.unsigned === true ? ' UNSIGNED' : '';
	            field += data.zerofill === true ? ' ZEROFILL' : '';
	            field += data.not_null === true ? ' NOT NULL' : '';
	            field += data['default'] ? ' DEFAULT \'' + data['default'] + '\'' : '';
	            field += data.auto_incr === true ? ' AUTO_INCREMENT' : '';
	            field += data.comment ? ' COMMENT \'' + (data.comment) + '\'' : '';
	            fields.push(field);
	
	            if (data.pk === true) {
	
	                primaries.push('`' + data.field + '`');
	            }
	        });
	
	        if (primaries.length > 0) {
	
	            fields.push('\n\tPRIMARY KEY (' + primaries.join(',') + ')');
	        }
	        query += fields.join(",") + ') ';
	
	        query += this.getTableProperties();
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('CREATE_TABLE', db, table, query),
	            success: function(config, response) {
	
	                app.openMessage(app.generateSuccessMsg(config.query, 'This table has been created successfully.'));
	
	                app.reloadTablesNode(db);
	
	                me.syncProperties();
	
	                btn.up('window').destroy();
	
	                app.openAlterTableWindow(db, table);
	                app.fireEvent('after_create_table');
	            },
	            failure: function(config, response) {
	
	                app.openMessage(app.generateError(config.query, response.message));
	                Ext.Msg.alert('Error', response.message);
	            }
	        });
	    },
	
	    alter: function(btn) {
	
	        var
	            app = this.getApplication(),
	            tab = Ext.getCmp("table-schema-tab"),
	            textfield = btn.up('window').down('textfield'),
	            table = textfield.getValue(),
	            me = this;
	
	        if (!table) {
	
	            return;
	        }
	
	        var
	            store = tab.getStore(),
	            db = tab.getDatabase(),
	            query = '',
	            add_primaries = [],
	            del_primaries = [],
	            primaries = [],
	            fields = [];
	
	        Ext.Object.each(store.getNewRecords(), function(idx, obj) {
	
	            if (!obj.data.field) return;
	
	            var data = obj.data,
	                field = '\n\tADD COLUMN';
	
	            field += ' `' + data.field + '` ' + data.type;
	            field += data.len ? '(' + data.len + ')' : '';
	            field += data.unsigned === true ? ' UNSIGNED' : '';
	            field += data.zerofill === true ? ' ZEROFILL' : '';
	            field += data.not_null === true ? ' NOT NULL' : '';
	            field += data['default'] ? ' DEFAULT \'' + data['default'] + '\'' : '';
	            field += data.auto_incr === true ? ' AUTO_INCREMENT' : '';
	            field += data.comment ? ' COMMENT \'' + data.comment + '\'' : '';
	            fields.push(field);
	
	            if (data.pk === true) {
	
	                add_primaries.push('`' + data.field + '`');
	            }
	        });
	
	        Ext.Object.each(store.getRemovedRecords(), function(idx, obj) {
	
	            if (!obj.raw.field) return;
	
	            var field = '\n\tDROP COLUMN `' + obj.raw.field + '`';
	            fields.push(field);
	
	            if (obj.raw.pk === true) {
	
	                del_primaries.push('`' + obj.raw.field + '`');
	            }
	        });
	
	        Ext.Object.each(store.getUpdatedRecords(), function(idx, obj) {
	
	            if (!obj.data.field) return;
	
	            var data = obj.data,
	                field = '\n\tCHANGE `' + obj.raw.field + '`';
	
	            field += ' `' + data.field + '` ' + data.type;
	            field += data.len ? '(' + data.len + ')' : '';
	            field += data.unsigned === true ? ' UNSIGNED' : '';
	            field += data.zerofill === true ? ' ZEROFILL' : '';
	            field += data.not_null === true ? ' NOT NULL' : '';
	            field += data['default'] ? ' DEFAULT \'' + data['default'] + '\'' : '';
	            field += data.auto_incr === true ? ' AUTO_INCREMENT' : '';
	            field += data.comment ? ' COMMENT \'' + data.comment + '\'' : '';
	            fields.push(field);
	
	            if (obj.raw.pk === true) {
	
	                if (data.pk != true) {
	
	                    del_primaries.push('`' + data.field + '`');
	                }
	            }
	            else if (obj.raw.pk != true && data.pk === true) {
	
	                add_primaries.push('`' + data.field + '`');
	            }
	        });
	
	
	        if (del_primaries.length > 0 || add_primaries.length > 0) {
	
	            fields.push('DROP PRIMARY KEY');
	            var primaries = [];
	            Ext.Object.each(store.getRange(), function(idx, obj) {
	
	                if (obj.data.pk === true) {
	
	                    primaries.push('`' + obj.data.field + '`');
	                }
	            });
	            fields.push('ADD PRIMARY KEY(' + Ext.Array.merge(primaries, add_primaries).join(",") + ')');
	        }
	
	        query += fields.join(",");
	
	        query += this.getTableProperties();
	
	        if (!Ext.String.trim(query)) {
	
	            Ext.Msg.alert('Info', 'There are no changes.');
	            return;
	        }
	
	        tab.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('ALTER_TABLE', db, table, query),
	            success: function(config, response) {
	
	                app.openMessage(app.generateSuccessMsg(config.query, 'This table has been modified successfully.'));
	
	                app.reloadTablesNode(db);
	
	                btn.up('window').destroy();
	
	                me.syncProperties();
	                tab.setLoading(false);
	
	                app.fireEvent('after_alter_table');
	            },
	            failure: function(config, response) {
	
	                app.openMessage(app.generateError(config.query, response.message));
	
	                Ext.Msg.alert('Error', response.message);
	
	                tab.setLoading(false);
	            }
	        });
	    },
	
	    getTableProperties: function() {
	
	        var
	            app = this.getApplication(),
	            ctrl = app.getController('table.TablePropertiesTab');
	
	        return ctrl.getTableProperties();
	    },
	
	    syncProperties: function() {
	
	        var
	            app = this.getApplication(),
	            ctrl = app.getController('table.TablePropertiesTab');
	
	        return ctrl.syncProperties();
	
	    },
	
	    initTableSchemaTab: function(tab) {
	
	        var
	            app = this.getApplication(),
	            db = tab.getDatabase(),
	            tb = tab.getTable(),
	            store = tab.getStore(),
	            getMatch = function(str, pattern, idx) {
	
	                var r = str.match(pattern);
	                if (r) r = r[idx];
	                return r;
	            },
	            records = [];
	
	        if (!tb) {
	
	            store.insert(store.getCount(), [{}]);
	            return;
	        }
	
	        tab.setLoading(true);
	
	        //load table fileds list
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_FULL_FIELDS', db, tb),
	            success: function(config, response) {
	
	                Ext.Object.each(response.records, function(idx, row) {
	
	                    var
	                        type = getMatch(row[1], /[a-zA-Z]+/, 0),
	                        len = getMatch(row[1], /\((.*)\)/, 1),
	                        unsigned = getMatch(row[1], /unsigned/, 0),
	                        zerofill = getMatch(row[1], /zerofill/, 0);
	
	                    records.push({
	                        'field'    : row[0],
	                        'type'     : type,
	                        'len'      : len,
	                        'default'  : (row[5] == "NULL" ? "" : row[5]),
	                        'pk'       : (row[4] == "PRI" ? true : false),
	                        'not_null' : (row[3] == "NO" ? true : false),
	                        'unsigned' : unsigned,
	                        'auto_incr': (row[6] == "auto_increment" ? true : false),
	                        'zerofill' : zerofill,
	                        'comment'  : row[8]
	                    });
	                });
	
	                var store = tab.getStore();
	
	                store.loadData(records);
	                store.sync();
	
	                store.insert(store.getCount(), [{}]);
	
	                tab.setLoading(false);
	            }
	        });
	    }
	});


/***/ },
/* 70 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.ReorderColumns', {
	    extend: 'Ext.app.Controller',
	
	    initWindow: function(db, tb, result) {
	
	        Ext.create('Planche.lib.Window', {
	            stateful  : true,
	            title     : 'Reorder columns \'' + tb + '\' in \'' + db + '\'',
	            layout    : 'fit',
	            bodyStyle : "background-color:#FFFFFF",
	            width     : 400,
	            height    : 300,
	            overflowY : 'auto',
	            autoScroll: true,
	            modal     : true,
	            plain     : true,
	            fixed     : true,
	            shadow    : false,
	            autoShow  : true,
	            constrain : true,
	            items     : this.initGrid(),
	            buttons   : [{
	                text   : 'Up',
	                scope  : this,
	                handler: this.up
	            }, {
	                text   : 'Down',
	                scope  : this,
	                handler: this.down
	            }, {
	                text   : 'Save',
	                scope  : this,
	                handler: this.save
	            }, {
	                text   : 'Close',
	                scope  : this,
	                handler: this.close
	            }],
	            listeners : {
	                scope   : this,
	                boxready: function() {
	
	                    this.initTableData(result);
	                }
	            }
	        });
	    },
	
	    initGrid: function() {
	
	        var columns = this.makeListColumns(),
	            fields = [];
	
	        Ext.each(columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            id         : 'reorder-columns-grid',
	            border     : false,
	            columnLines: true,
	            width      : '100%',
	            flex       : 1,
	            columns    : columns,
	            store      : Ext.create('Ext.data.Store', {
	                fields: fields
	            })
	        });
	
	        return this.grid;
	    },
	
	
	    initTableData: function(result) {
	
	        var store = this.grid.getStore(),
	            records = [];
	
	        Ext.Object.each(result.records, function(idx, row) {
	
	            records.push({
	                field: row[0],
	                type : row[1]
	            });
	        });
	        store.insert(0, records);
	    },
	
	    makeListColumns: function() {
	
	        return [
	            {text: 'Field', dataIndex: 'field', width: 120},
	            {text: 'Type', dataIndex: 'type', flex: 1}
	        ];
	    },
	
	    up: function(btn) {
	
	        this.moveSelectedRow('up');
	    },
	
	    down: function(btn) {
	
	        this.moveSelectedRow('down');
	    },
	
	    save: function(btn) {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            db = app.getSelectedDatabase(),
	            tb = app.getSelectedTable(),
	            grid = Ext.getCmp('reorder-columns-grid'),
	            selection = grid.selModel.getSelection();
	
	        app.tunneling({
	            db     : db,
	            query  : api.getQuery('SHOW_CREATE_TABLE', db, tb),
	            success: function(config, response) {
	
	                var row = Planche.DBUtil.getAssocArray(response.fields, response.records)[0],
	                    lines = row["Create Table"].split("\n"),
	                    fields = {};
	
	                lines.shift();
	                lines.pop();
	
	                lines.map(function(line, idx) {
	
	                    var line = Ext.String.trim(line),
	                        pos = line.indexOf(" "),
	                        field = line.substring(0, pos),
	                        options = line.substring(pos + 1, line.length - 1);
	
	                    fields[field] = options;
	                });
	
	                var columns = [],
	                    prevField = null;
	                grid.store.getRange().map(function(row, idx) {
	
	                    var field = row.raw.field,
	                        position = (idx == 0 ? "FIRST" : "AFTER " + prevField);
	                    columns.push("MODIFY COLUMN " + field + " " + fields["`"+field+"`"] + " " + position);
	                    prevField = field;
	                });
	
	                app.tunneling({
	                    db     : db,
	                    query  : api.getQuery("ALTER_TABLE", db, tb, columns.join(",")),
	                    success: function(config, response) {
	
	                        Ext.Msg.alert('info', 'Successfully reordered');
	                        btn.up('window').destroy();
	                    }
	                });
	            },
	            failure: function(config, response) {
	
	                app.generateQueryErrorMsg(config.query, response.message);
	                btn.up('window').destroy();
	            }
	        });
	
	
	    },
	
	    close: function(btn) {
	
	        btn.up('window').destroy();
	    },
	
	    moveSelectedRow: function(direction) {
	
	        var record = this.grid.getSelectionModel().getSelection()[0],
	            index = this.grid.getStore().indexOf(record);
	
	        if (!record) {
	            return;
	        }
	
	        if (direction === 'up') {
	            index--;
	            if (index < 0) {
	                return;
	            }
	        } else {
	            index++;
	            if (index >= this.grid.getStore().getCount()) {
	                return;
	            }
	        }
	        this.grid.getStore().remove(record);
	        this.grid.getStore().insert(index, record);
	        this.grid.getSelectionModel().select(index, true);
	    }
	});

/***/ },
/* 71 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.EditTextColumn', {
	    extend: 'Ext.app.Controller',
	
	    initWindow: function(colName, content) {
	
	        Ext.create('Planche.lib.Window', {
	            id        : 'column-text-view-window',
	            stateful  : true,
	            title     : 'Text View - ' + colName,
	            layout    : 'fit',
	            bodyStyle : "background-color:#FFFFFF",
	            width     : 500,
	            height    : 400,
	            overflowY : 'auto',
	            autoScroll: true,
	            modal     : true,
	            plain     : true,
	            fixed     : true,
	            shadow    : false,
	            autoShow  : true,
	            constrain : true,
	            items     : [{
	                xtype: 'textareafield',
	                value: this.htmlspecialchars_decode(content)
	            }],
	            buttons   : [{
	                text : 'Close',
	                scope: this,
	                handler : function(btn){
	
	                    var win = btn.up("window");
	                    win.destroy();
	                }
	            }]
	        });
	    },
	
	    htmlspecialchars_decode: function(string, quote_style) {
	
	        var optTemp = 0,
	            i = 0,
	            noquotes = false;
	        if (typeof quote_style === 'undefined') {
	            quote_style = 2;
	        }
	        string = string.toString()
	            .replace(/&lt;/g, '<')
	            .replace(/&gt;/g, '>');
	        var OPTS = {
	            'ENT_NOQUOTES'         : 0,
	            'ENT_HTML_QUOTE_SINGLE': 1,
	            'ENT_HTML_QUOTE_DOUBLE': 2,
	            'ENT_COMPAT'           : 2,
	            'ENT_QUOTES'           : 3,
	            'ENT_IGNORE'           : 4
	        };
	        if (quote_style === 0) {
	            noquotes = true;
	        }
	        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
	            quote_style = [].concat(quote_style);
	            for (i = 0 ; i < quote_style.length ; i++) {
	                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
	                if (OPTS[quote_style[i]] === 0) {
	                    noquotes = true;
	                } else if (OPTS[quote_style[i]]) {
	                    optTemp = optTemp | OPTS[quote_style[i]];
	                }
	            }
	            quote_style = optTemp;
	        }
	        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
	            string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
	            // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of
	            // PHP
	        }
	        if (!noquotes) {
	            string = string.replace(/&quot;/g, '"');
	        }
	        // Put this in last place to avoid escape being double-decoded
	        string = string.replace(/&amp;/g, '&');
	
	        return string;
	    }
	});

/***/ },
/* 72 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.AdvancedProperties', {
	    extend: 'Ext.app.Controller',
	
	    initWindow: function(db, tb, result) {
	
	        Ext.create('Planche.lib.Window', {
	            stateful  : true,
	            title     : 'Advanced properties \'' + tb + '\' in \'' + db + '\'',
	            layout    : 'fit',
	            bodyStyle : "background-color:#FFFFFF",
	            width     : 400,
	            height    : 300,
	            overflowY : 'auto',
	            autoScroll: true,
	            modal     : true,
	            plain     : true,
	            fixed     : true,
	            shadow    : false,
	            autoShow  : true,
	            constrain : true,
	            items     : this.initGrid(),
	            buttons   : [{
	                text   : 'close',
	                scope  : this,
	                handler: this.close
	            }],
	            listeners : {
	                scope   : this,
	                boxready: function() {
	
	                    this.initTableData(result);
	                }
	            }
	        });
	    },
	
	    initGrid: function() {
	
	        var columns = this.makeListColumns();
	
	        var fields = [];
	        Ext.each(columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.columnGrid = Ext.create('Ext.grid.Panel', {
	            border     : false,
	            plugins    : [
	                Ext.create('Ext.grid.plugin.CellEditing', {
	                    clicksToEdit: 2
	                })
	            ],
	            columnLines: true,
	            width      : '100%',
	            flex       : 1,
	            columns    : columns,
	            store      : Ext.create('Ext.data.Store', {
	                fields: fields
	            })
	        });
	
	        return this.columnGrid;
	    },
	
	    initTableData: function(result) {
	
	        var store = this.columnGrid.getStore();
	
	        var records = [];
	        Ext.Object.each(result.fields, function(idx, col) {
	
	            records.push({
	                variable: col.name,
	                values  : result.records[0][idx]
	            });
	        });
	        store.insert(0, records);
	    },
	
	    makeListColumns: function() {
	
	        return [
	            {text: 'Variable', dataIndex: 'variable', width: 120},
	            {text: 'Values', dataIndex: 'values', flex: 1}
	        ];
	    },
	
	
	    close: function(btn) {
	
	        btn.up('window').destroy();
	    }
	});

/***/ },
/* 73 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.EditSchemaWindow', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.EditSchemaWindow',
	        'Planche.view.table.TableSchemaTab',
	        'Planche.view.table.TablePropertiesTab',
	        'Planche.view.table.TableIndexesTab',
	        'Planche.view.table.TableSQLTab',
	        'Planche.view.table.TableInfoTab'
	    ],
	    init  : function() {
	
	        this.control({
	            '#edit-schema-btn-close': {
	                'click': this.cancel
	            }
	        });
	    },
	
	    initWindow: function(db, tb, openTab) {
	
	        var title = (tb ? 'Alter Table \'' + tb + '\' in \'' + db + '\'' : 'Create new table');
	        Ext.create('Planche.view.table.EditSchemaWindow', {
	            title    : title,
	            items    : this.initTabPanel(db, tb),
	            listeners: {
	                boxready: function(win) {
	
	                    if (!tb) {
	
	                        Ext.invoke(win.query('table-properties-tab, table-indexes-tab, table-sql-tab, table-info-tab'), 'setDisabled', true);
	                    }
	
	                    if(openTab){
	
	                        var tab = win.down(openTab);
	                        tab.show();
	                    }
	                }
	            }
	        });
	    },
	
	    initTabPanel: function(db, tb) {
	
	        return {
	            xtype: 'tabpanel',
	            items: [
	                this.initTableSchemaTab(db, tb),
	                this.initTablePropertiesTab(db, tb),
	                this.initTableIndexexTab(db, tb),
	                this.initTableSQLTab(db, tb),
	                this.initTableInfoTab(db, tb)
	            ]
	        }
	    },
	
	    initTableSchemaTab: function(db, tb) {
	
	        return {
	            xtype      : 'table-schema-tab',
	            application: this.getApplication(),
	            database   : db,
	            table      : tb
	        }
	    },
	
	    initTablePropertiesTab: function(db, tb) {
	
	        return {
	            xtype      : 'table-properties-tab',
	            application: this.getApplication(),
	            database   : db,
	            table      : tb
	        }
	    },
	
	    initTableIndexexTab: function(db, tb) {
	
	        return {
	            xtype      : 'table-indexes-tab',
	            application: this.getApplication(),
	            database   : db,
	            table      : tb
	        }
	    },
	
	    initTableSQLTab: function(db, tb) {
	
	        return {
	            xtype      : 'table-sql-tab',
	            application: this.getApplication(),
	            database   : db,
	            table      : tb
	        }
	    },
	
	    initTableInfoTab: function(db, tb) {
	
	        return {
	            xtype      : 'table-info-tab',
	            application: this.getApplication(),
	            database   : db,
	            table      : tb
	        }
	    },
	
	    cancel: function(btn) {
	
	        var tab = Ext.getCmp('table-schema-tab');
	        if (tab.getEdited()) {
	
	            Ext.Msg.confirm('Cancel', 'You will lose all changes. Do you want to quit?', function(btn, text) {
	
	                if (btn == 'yes') {
	
	                    this.up('window').destroy();
	                }
	            }, btn);
	        }
	        else {
	
	            btn.up('window').destroy();
	        }
	    }
	});


/***/ },
/* 74 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.table.EditIndexWindow', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.table.EditIndexWindow'
	    ],
	    init  : function() {
	
	        this.control({
	            '#edit-index-btn-save' : {
	                'click': this.save
	            },
	            '#edit-index-btn-close': {
	                'click': this.cancel
	            },
	            '#edit-index-grid'     : {
	                'boxready' : this.initGrid,
	                'cellclick': this.selectField
	            }
	        });
	    },
	
	    initWindow: function(db, table, index) {
	
	        var title = (index ? 'Alter Index \'' + index + '\' in `' + db + '`.`' + table + '`' : 'Create new index');
	
	        Ext.create('Planche.view.table.EditIndexWindow', {
	            title    : title,
	            database : db,
	            table    : table,
	            indexName: index
	        });
	    },
	
	    initGrid: function(grid) {
	
	        var app = this.getApplication(),
	            win = grid.up("window"),
	            index = Ext.getCmp('edit-index-name'),
	            option = Ext.getCmp('edit-index-option'),
	            indexName = win.getIndexName(),
	            db = win.getDatabase(),
	            table = win.getTable(),
	            me = this,
	            getMatch = function(str, pattern, idx) {
	
	                var r = str.match(pattern);
	                if (r) r = r[idx];
	                return r;
	            };
	
	        if (!table) {
	
	            return;
	        }
	
	        var columns = {},
	            records = [],
	            messages = [],
	            tunnelings = [],
	            editMode = false;
	
	        tunnelings.push({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_FULL_FIELDS', db, table),
	            success: function(config, response) {
	
	                Ext.Object.each(response.records, function(idx, row) {
	
	                    var type = getMatch(row[1], /[a-zA-Z]+/, 0),
	                        len = getMatch(row[1], /\((.*)\)/, 1),
	                        unsigned = getMatch(row[1], /unsigned/, 0),
	                        zerofill = getMatch(row[1], /zerofill/, 0);
	
	                    records.push({
	                        'field'  : row[0],
	                        'type'   : type,
	                        'comment': row[8],
	                        'use'    : false,
	                        'sort'   : null,
	                        'length' : null
	                    });
	                });
	            },
	            failure: function(config, response) {
	
	                messages.push(app.generateError(config.query, response.message));
	            }
	        });
	
	        if (indexName) {
	
	            editMode = true;
	            index.setValue(indexName);
	
	            tunnelings.push({
	                db     : db,
	                query  : app.getAPIS().getQuery('INDEX_KEYS_INFO', db, table, indexName),
	                success: function(config, response) {
	
	                    var records = Planche.DBUtil.getAssocArray(response.fields, response.records),
	                        optionVal = '';
	
	                    Ext.Array.each(records, function(row, idx) {
	
	                        if (row.Non_unique == '0') {
	
	                            optionVal = 'UNIQUE';
	                        }
	
	                        if (row.Index_type == 'FULLTEXT') {
	
	                            optionVal = 'FULLTEXT';
	                        }
	
	                        columns[row.Column_name] = {
	                            len: row.Sub_part
	                        };
	                    });
	
	                    option.setValue({'edit-index-option': optionVal});
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        }
	
	        app.tunnelings(tunnelings, {
	            start  : function() {
	
	                win.setLoading(true);
	            },
	            success: function() {
	
	                if (editMode) {
	
	                    Ext.Array.each(records, function(obj, idx) {
	
	                        if (columns[obj.field]) {
	
	                            records[idx].use = true;
	                        }
	                    });
	                }
	
	                me.loadColumns(records);
	                win.setLoading(false);
	            },
	            failure: function() {
	
	                app.showMessage(messages);
	                win.setLoading(false);
	            }
	        });
	    },
	
	    loadColumns: function(records) {
	
	        var grid = Ext.getCmp('edit-index-grid');
	
	        grid.getStore().loadData(records);
	
	    },
	
	    selectField: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
	
	        if (cellIndex < 3) {
	
	            record.set('use', !record.get('use'));
	        }
	    },
	
	    save: function() {
	
	        var app = this.getApplication(),
	            win = Ext.getCmp('edit-index-window'),
	            tab = Ext.getCmp('table-indexes-tab'),
	            grid = Ext.getCmp('edit-index-grid'),
	            index = Ext.getCmp('edit-index-name'),
	            using = Ext.getCmp('edit-index-using'),
	            usingValue = using.getValue()['edit-index-using'],
	            option = Ext.getCmp('edit-index-option'),
	            optionValue = option.getValue()['edit-index-option'],
	            indexName = index.getValue(),
	            db = win.getDatabase(),
	            table = win.getTable(),
	            oldIndexName = win.getIndexName(),
	            store = grid.getStore(),
	            list = store.getRange(),
	            tunnelings = [],
	            columns = [],
	            messages = [];
	
	        if (!indexName) {
	
	            index.markInvalid('Please input index name');
	            return;
	        }
	
	        Ext.Array.each(list, function(obj, idx) {
	
	            var d = obj.data;
	
	            if (d.use) {
	
	                var column = d.field;
	
	                if (d.length) {
	
	                    column = column + '(' + d.length + ')';
	                }
	
	                if (d.sort) {
	
	                    column = column + ' ' + d.sort;
	                }
	
	                columns.push(column);
	            }
	        });
	
	        if (oldIndexName) {
	
	            tunnelings.push({
	                db     : db,
	                query  : app.getAPIS().getQuery('DROP_INDEX', db, table, oldIndexName),
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        }
	
	        usingValue = optionValue != 'FULLTEXT' ? "USING " + usingValue : usingValue;
	        tunnelings.push({
	            db     : db,
	            query  : app.getAPIS().getQuery('ADD_INDEX', db, table, indexName, optionValue, columns.join(","), usingValue),
	            failure: function(config, response) {
	
	                messages.push(app.generateError(config.query, response.message));
	            }
	        });
	
	        app.tunnelings(tunnelings, {
	            start  : function() {
	
	                win.setLoading(true);
	            },
	            success: function() {
	
	                if(tab){
	
	                    tab.fireEvent('reload', tab);
	                }
	
	                win.setLoading(false);
	                win.destroy();
	            },
	            failure: function() {
	
	                app.showMessage(messages);
	                win.setLoading(false);
	            }
	        });
	    },
	
	    cancel: function() {
	
	        var win = Ext.getCmp('edit-index-window');
	        win.destroy();
	    }
	});


/***/ },
/* 75 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.Toolbar', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.layout.Toolbar'
	    ],
	    init : function () {
	
	        var app = this.getApplication();
	
	        this.control({
	            '#toolbar-new-connect' : {
	                click : Ext.Function.bind(app.openConnPanel, app)
	            },
	
	            '#toolbar-query-editor' : {
	                click : Ext.Function.bind(app.openQueryTab, app)
	            },
	
	            '#toolbar-query-exec' : {
	                click : Ext.Function.bind(app.executeQuery, app)
	            },
	
	            '#toolbar-stop-operation' : {
	                click : Ext.Function.bind(app.stopOperation, app)
	            },
	
	            '#toolbar-user-manager' : {
	                click : Ext.Function.bind(app.openUserPanel, app)
	            },
	
	            '#toolbar-tokenize' : {
	                click : Ext.Function.bind(app.tokenize, app)
	            },
	
	           '#toolbar-quick-command' : {
	                click : Ext.Function.bind(app.openQuickPanel, app)
	            },
	
	           '#toolbar-show-procs' : {
	                click : Ext.Function.bind(app.openProcessPanel, app)
	            },
	
	            '#toolbar-show-vars' : {
	                click : Ext.Function.bind(app.openVariablesPanel, app)
	            },
	
	            '#toolbar-show-status' : {
	                click : Ext.Function.bind(app.openStatusPanel, app)
	            },
	
	            '#toolbar-flush' : {
	                click : Ext.Function.bind(app.openFlushPanel, app)
	            },
	
	            '#toolbar-fullscreen' : {
	                click : Ext.Function.bind(app.changeToFullscreen, app)
	            },
	
	            'app-main toolbar splitbutton' : {
	                click : this.showMenu,
	                mouseover : this.showMenu
	            }
	        });
	    },
	
	    showMenu : function (btn) {
	
	        Ext.applyIf(btn, { custom : false });
	
	        if(btn.custom == true) { return; }
	
	        var id = 'menu.'+btn.text;
	
	        var ctrl = this.getController(id, btn);
	        ctrl.show(btn);
	    }
	});


/***/ },
/* 76 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.ConnectTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.layout.SchemaTree',
	        'Planche.view.layout.QueryTabPanel'
	    ],
	    init : function () {
	
	        this.control({
	            'connect-tab' : {
	                boxready : function (tab) {
	
	                    this.getApplication().checkToolbar();
	                },
	                activate : function (tab) {
	
	                    this.getApplication().checkToolbar();
	                },
	                destroy : function (tab) {
	
	                    this.getApplication().checkToolbar();
	                }
	            }
	        });
	    }
	});


/***/ },
/* 77 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.HistoryTab', {
	    extend: 'Ext.app.Controller',
	    init : function () {
	
	    	this.control({
	    		'history-tab' : {
					boxready : function (editor, width, height) {
	
			            textarea = editor.getEl().query('textarea')[0];
	
			            Ext.apply(editor, {
			            	editor : CodeMirror.fromTextArea(textarea, {
			                    mode: 'text/x-mysql',
			                    indentWithTabs: true,
			                    smartIndent: true,
			                    matchBrackets : true,
			                    autofocus: true,
			                    readOnly : true,
			                    lineNumbers : false,
			                    showCursorWhenSelecting : false
			                }),
			            	getEditor : function () {
			            		return this.editor;
			            	}
			            });
	
						var task = new Ext.util.DelayedTask(function () {
	
						    editor.getEditor().setValue(this.application.history.join("\n"));
	
						}, this);
	
						task.delay(100);
					},
					resize : function (editor, width, height) {
	
						editor.getEditor().setSize(width, height);
					},
					activate : function (editor) {
	
						try{
	
							if(editor.getEditor()) {
	
								editor.getEditor().setValue(this.application.history.join("\n"));
							}
						}
						catch(e) {
	
						}
	
					}
	    		}
	    	})
	    }
	});

/***/ },
/* 78 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.InfoTab', {
	    extend  : 'Ext.app.Controller',
	    prevNode: null,
	    init    : function() {
	
	        var app = this.getApplication();
	
	        this.control({
	            'info-tab'   : {
	                show: function(grid) {
	
	                    var node = app.getSelectedNode(true);
	
	                    if (this.prevNode == node) {
	
	                        return;
	                    }
	
	                    this.prevNode = node;
	
	                    this.openInfo(node);
	                }
	            },
	            'schema-tree': {
	                select: function(view) {
	
	                    var treeview = view.views[0],
	                        tree = treeview.up("treepanel");
	
	                    app.setSelectedTree(tree);
	
	                    var node = app.getSelectedNode(true);
	
	                    this.openInfo(node);
	                }
	            }
	        });
	    },
	
	    openInfo: function(node) {
	
	        var app = this.getApplication(),
	            type = node.raw.type,
	            db = app.getSelectedDatabase(),
	            table = app.getSelectedTable(),
	            func = 'export' + type.charAt(0).toUpperCase() + type.slice(1) + 'InfoToHTML',
	            util = Planche.SchemaUtil;
	
	        if (util[func]) {
	
	            var info = app.getActiveInfoTab();
	            if (info.isVisible()) {
	
	                util[func](db, table, info, 'update');
	            }
	        }
	    }
	});

/***/ },
/* 79 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.TableDataTab', {
	    extend: 'Ext.app.Controller',
	    prevNode : null,
	    init : function () {
	
	        var app = this.getApplication();
	
	        this.control({
	            'table-data-tab'   : {
	                show: function() {
	
	                    var node = app.getSelectedNode(true);
	
	                    if(!app.getParentNode(node, 'table')){
	
	                        return;
	                    }
	
	                    if(this.prevNode == node){
	
	                        return;
	                    }
	
	                    this.prevNode = node;
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedNode();
	
	                    if(app.openMode == 'select'){
	
	                        app.openTable(db, table);
	                    }
	                    else {
	
	                        app.countTable(db, table);
	                    }
	                }
	            }
	        });
	    }
	});

/***/ },
/* 80 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.MessageTab', {
	    extend: 'Ext.app.Controller',
	    init : function () {
	
	    	this.control({
	    		'message-tab' : {
		    		'openMessage' : this.openMessage
		    	}
		    });
	    },
	
	   	openMessage : function (messages) {
	
	        var 
			app		= this.getApplication(),
			panel	= app.getActiveMessageTab(),
			dom		= Ext.get(panel.getEl().query("div[id$=innerCt]"));
	
	        if(typeof messages == 'object') {
	
	        	var message = '';
	        	Ext.Array.each(messages, function (str, idx) {
	
	        		message += str+"<br/><br/>";
	        	});
	        	
	        	dom.setHTML(message);
	        }
	        else {
	
	        	dom.setHTML(messages);
	        }
	        
	        panel.show();
		}
	});

/***/ },
/* 81 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.QueryTab', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.layout.QueryEditor',
	        'Planche.view.layout.ResultTabPanel'
	    ],
	    init : function () {
	
	    }
	});


/***/ },
/* 82 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.ResultTabPanel', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.layout.MessageTab',
	        'Planche.view.layout.TableDataTab',
	        'Planche.view.layout.InfoTab',
	        'Planche.view.layout.HistoryTab'
	    ],
	    timer : null,
	    query : null,
	    init  : function() {
	
	        this.control({
	            'result-tab-panel': {
	                'initQueryResult': this.initQueryResult
	            }
	        });
	    },
	
	    loadGridRecord : function(cmd, db, callback){
	
	        if (typeof cmd == 'undefined') { cmd = ''; }
	
	        var me = this,
	            app = me.getApplication();
	
	        app.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : me.query['get' + cmd + 'SQL'](),
	            success: function(config, response) {
	
	                var data = app.makeRecords(response.fields, response.records),
	                    textRows = me.grid.down('text[text=Total]').next();
	
	                me.grid.store.loadData(data);
	                me.grid.store.sync();
	
	                textRows.setText(parseInt(response.affected_rows, 10));
	
	                app.setLoading(false);
	
	                if (callback) {
	
	                    callback(cmd, db);
	                }
	            }
	        });
	    },
	
	    initQueryResult: function(config, db, query, response) {
	
	        config.tab = config.tab === true || true;
	
	        this.query = query;
	
	        var me = this,
	            app = me.getApplication(),
	            schema = response.fields, records = response.records,
	            columns = [], fields = [], plugins = [{
	                ptype: 'bufferedrenderer'
	            }], grid,
	
	            loadGridRecord = function(cmd, db) {
	
	                me.loadGridRecord(cmd, db, function(){
	
	                    var textRefreshPerSec = me.grid.down('text[text=Refresh Per Sec]').next(),
	                        refreshPerSec = parseFloat(textRefreshPerSec.getValue());
	
	                    if (refreshPerSec > 0) {
	
	                        me.timer = setTimeout(loadGridRecord.bind(me, cmd, db), refreshPerSec * 1000);
	                    }
	                });
	            },
	
	            updateToolbar = function() {
	
	                var textfield = grid.query('textfield'),
	                    btnPrev = grid.down('button[text=Previous]'),
	                    btnNext = grid.down('button[text=Next]'),
	                    textRows = me.grid.down('text[text=Total]').next();
	
	                btnNext.setDisabled(grid.store.data.length < query.end);
	                btnPrev.setDisabled(1 > query.start);
	
	                textfield[0].setValue(query.start);
	                textfield[1].setValue(query.end);
	
	                textRows.setText(grid.store.data.length);
	            },
	
	            colObjs = {};
	
	        Ext.Array.each(schema, function(col, idx) {
	
	            colObjs[col.name] = Ext.create('Ext.grid.column.Column', {
	                text        : col.name,
	                dataIndex   : col.name,
	                listeners   : {
	                    dblclick: function(view, el, ridx, cidx, event, data) {
	
	                        app.openWindow('table.EditTextColumn', col.name, data.get(col.name));
	                    }
	                },
	                hideable    : false,
	                menuDisabled: true,
	                draggable   : false,
	                groupable   : false,
	                renderer    : function(value){
	
	                    if(value === null){
	
	                        return '(NULL)';
	                    }
	
	                    return Ext.htmlEncode(value);
	                },
	                editor      : {
	                    xtype: 'textfield'
	                }
	            });
	
	            columns.push(colObjs[col.name]);
	
	            fields.push(col.name);
	        });
	
	        var storeConfig = {
	            fields    : fields,
	            autoLoad  : false,
	            pageSize  : 10,
	            data      : app.makeRecords(schema, records),
	            remoteSort: true,
	            proxy     : {
	                type  : 'memory',
	                reader: {
	                    type: 'json'
	                }
	            }
	        };
	
	        var orderColumn = null,
	            orderColumnDir = 'ASC',
	            isEditable = false;
	
	        if (config.openTable) {
	
	            Ext.apply(storeConfig, {
	                sort: function(params) {
	
	                    if (orderColumn != params.property) {
	
	                        if (orderColumn != null) {
	
	                            var column = colObjs[orderColumn];
	                            column.removeCls('x-column-header-sort-DESC');
	                            column.removeCls('x-column-header-sort-ASC');
	                        }
	
	                        orderColumnDir = orderColumn == null ? 'DESC' : 'ASC';
	                        orderColumn = params.property;
	                    }
	                    else {
	
	                        orderColumnDir = orderColumnDir == 'ASC' ? 'DESC' : 'ASC';
	                    }
	
	                    query.setOrderBy(orderColumn, orderColumnDir);
	
	                    loadGridRecord();
	                }
	            });
	
	            plugins.push({
	                ptype       : 'cellediting',
	                clicksToEdit: 1
	            });
	
	            isEditable = true;
	        }
	
	        var grid = this.grid = Ext.create('Ext.grid.Panel', Ext.Object.merge({
	            border     : true,
	            flex       : 1,
	            columnLines: true,
	            selModel   : {
	                selType: 'checkboxmodel'
	            },
	            viewConfig : {
	                emptyText: 'There are no items to show in this view.'
	            },
	            plugins    : plugins,
	            tbar       : [{
	                xtype   : 'button',
	                text    : 'Add',
	                icon    : 'resources/images/icon_add_row16x16.png',
	                disabled: !isEditable,
	                cls     : 'btn',
	                handler : function(){
	
	                    me.addRecord(db, config.openTable);
	                }
	            }, {
	                xtype   : 'button',
	                text    : 'Save',
	                icon    : 'resources/images/icon_save_row16x16.png',
	                disabled: !isEditable,
	                cls     : 'btn',
	                handler : function(){
	
	                    me.saveChanges(db, config.openTable);
	                }
	            }, {
	                xtype   : 'button',
	                text    : 'Del',
	                icon    : 'resources/images/icon_del_row16x16.png',
	                disabled: !isEditable,
	                cls     : 'btn',
	                handler : function(){
	
	                    me.delRecord(db, config.openTable);
	                }
	            }, {
	                xtype : 'tbseparator',
	                margin: '0 5 0 5'
	            }, {
	                xtype   : 'button',
	                text    : 'Previous',
	                icon    : 'resources/images/icon_prev16x16.png',
	                cls     : 'btn',
	                disalbed: true,
	                handler : function(btn) {
	
	                    loadGridRecord('PrevRecordSet');
	                }
	            }, {
	                xtype    : 'textfield',
	                value    : query.start,
	                listeners: {
	                    specialkey: function(field, el) {
	
	                        if (el.getKey() == Ext.EventObject.ENTER) {
	
	                            query.start = parseInt(field.getValue(), 10);
	                            loadGridRecord();
	                        }
	                    }
	                }
	            }, {
	                xtype   : 'button',
	                text    : 'Next',
	                icon    : 'resources/images/icon_next16x16.png',
	                cls     : 'btn',
	                disalbed: true,
	                handler : function(btn) {
	
	                    loadGridRecord('NextRecordSet');
	                }
	            }, {
	                xtype : 'text',
	                text  : 'Size',
	                margin: '0 0 0 5'
	            }, {
	                xtype    : 'textfield',
	                value    : query.end,
	                width    : 80,
	                margin   : '0 0 0 5',
	                listeners: {
	                    specialkey: function(field, el) {
	
	                        if (el.getKey() == Ext.EventObject.ENTER) {
	
	                            query.end = parseInt(field.getValue(), 10);
	                            loadGridRecord();
	                        }
	                    }
	                }
	            }, {
	                xtype : 'tbseparator',
	                margin: '0 5 0 5'
	            }, {
	                xtype: 'text',
	                text : 'Refresh Per Sec'
	            }, {
	                xtype    : 'textfield',
	                value    : 0,
	                width    : 40,
	                margin   : '0 0 0 5',
	                listeners: {
	                    specialkey: function(field, el) {
	
	                        if (el.getKey() == Ext.EventObject.ENTER) {
	
	                            loadGridRecord();
	                        }
	                    }
	                }
	            }, {
	                xtype  : 'button',
	                text   : 'Refresh',
	                icon   : 'resources/images/icon_refresh16x16.png',
	                cls    : 'btn',
	                margin : '0 0 0 5',
	                handler: function(btn) {
	
	                    clearTimeout(me.timer);
	                    loadGridRecord();
	                }
	            }, {
	                xtype  : 'button',
	                text   : 'Stop',
	                icon   : 'resources/images/icon_stop16x16.png',
	                cls    : 'btn',
	                margin : '0 0 0 5',
	                handler: function(btn) {
	
	                    clearTimeout(me.timer);
	                    var textRefreshPerSec = grid.down('text[text=Refresh Per Sec]').next();
	                    textRefreshPerSec.setValue(0);
	                }
	            }, {
	                xtype : 'tbseparator',
	                margin: '0 5 0 5'
	            }, {
	                xtype  : 'button',
	                text   : 'Tokens',
	                cls    : 'btn',
	                handler: function(btn) {
	
	                    app.openTokenPanel(query.getTokens());
	                }
	            }],
	            fbar       : [
	                {xtype: 'text', text: 'Total'},
	                {xtype: 'text', text: '0', width: 50, rtl: true},
	                {xtype: 'text', text: 'Rows'}
	            ],
	            remoteSort : true,
	            store      : Ext.create('Ext.data.Store', storeConfig),
	            columns    : columns
	        }, config));
	
	        grid.store.on('datachanged', function() {
	
	            updateToolbar();
	        });
	
	        grid.on('sortchange', function() {
	
	            if (!orderColumn) return;
	
	            setTimeout(function() {
	
	                var column = colObjs[orderColumn];
	
	                if (orderColumnDir == 'ASC') {
	
	                    column.removeCls('x-column-header-sort-DESC');
	                    column.addCls('x-column-header-sort-ASC');
	                }
	                else {
	
	                    column.removeCls('x-column-header-sort-ASC');
	                    column.addCls('x-column-header-sort-DESC');
	                }
	            }, 100);
	        });
	
	        updateToolbar();
	
	        if (config.openTable) {
	
	            var tab = app.getActiveTableDataTab();
	
	            Ext.apply(tab, {
	                loadedTable: config.openTable
	            });
	
	            tab.removeAll();
	
	            tab.show();
	            tab.add(grid);
	        }
	        else {
	
	            var resultTabPanel = app.getActiveResultTabPanel();
	
	            resultTabPanel.add(grid);
	            resultTabPanel.setActiveTab(grid);
	        }
	    },
	
	    addRecord: function(btn) {
	
	        var grid = this.grid,
	            store = grid.store;
	
	        store.add({});
	        grid.scrollByDeltaY(999999);
	    },
	
	    saveChanges: function(db, table) {
	
	        var me = this,
	            app = me.getApplication(),
	            api = app.getAPIS(),
	            grid = this.grid,
	            store = grid.store,
	            selModel = grid.getSelectionModel(),
	            selection = selModel.getSelection();
	
	        if (selection.length == 0) {
	
	            Ext.Msg.alert('info', 'Please, select one more rows to delete');
	            return;
	        }
	
	        var tunnelings = [],
	            messages = [];
	
	        Ext.Array.each(store.getNewRecords(), function(record) {
	
	            var fields = [],
	                values = [];
	            Ext.Object.each(record.data, function(key, value) {
	
	                fields.push(key);
	
	                if(value){
	
	                    values.push('"' + Planche.DBUtil.escapeString(value) + '"');
	                }
	                else {
	
	                    values.push('NULL');
	                }
	
	            });
	
	            tunnelings.push({
	                db     : db,
	                query  : api.getQuery('INSERT_TABLE', db, table, fields.join(", "), values.join(", ")),
	                success: function(config) {
	
	                    messages.push(app.generateSuccessMsg(config.query, 'Records was successfully added'));
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        });
	
	        Ext.Array.each(store.getUpdatedRecords(), function(record) {
	
	            var where = [],
	                changes = [];
	            Ext.Object.each(record.raw, function(key, value) {
	
	                if(value === null){
	
	                    where.push(key + ' IS NULL');
	                }
	                else {
	
	                    where.push(key + '="' + Planche.DBUtil.escapeString(value) + '"');
	                }
	
	                if (record.data[key] != value) {
	
	                    changes.push(key + '="' + Planche.DBUtil.escapeString(record.data[key]) + '"');
	                }
	            });
	
	            tunnelings.push({
	                db     : db,
	                query  : api.getQuery('UPDATE_TABLE', db, table, changes.join(", "), where.join(' AND ')),
	                success: function(config) {
	
	                    messages.push(app.generateSuccessMsg(config.query, 'Records was successfully updated'));
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        });
	
	        if (tunnelings.length == 0) {
	
	            Ext.Msg.alert('info', 'There\'s no changes');
	            return;
	        }
	
	        app.tunnelings(tunnelings, {
	            start  : function() {
	
	                app.setLoading(true);
	            },
	            success: function() {
	
	                //app.setLoading(false);
	                //store.sync();
	
	                me.loadGridRecord('', db);
	            },
	            failure: function() {
	
	                app.openMessage(messages);
	                app.setLoading(false);
	            }
	        });
	    },
	
	    delRecord: function(db, table) {
	
	        var me = this,
	            app = me.getApplication(),
	            api = app.getAPIS(),
	            grid = this.grid,
	            store = grid.store,
	            selModel = grid.getSelectionModel(),
	            selection = selModel.getSelection();
	
	        if (selection.length == 0) {
	
	            Ext.Msg.alert('info', 'Please, select one more rows to delete');
	            return;
	        }
	
	        var tunnelings = [],
	            messages = [];
	        Ext.Array.each(selection, function(record) {
	
	            var where = [];
	            Ext.Object.each(record.raw, function(key, value) {
	
	                if(value === null){
	
	                    where.push(key + ' IS NULL');
	                }
	                else {
	
	                    where.push(key + '="' + Planche.DBUtil.escapeString(value) + '"');
	                }
	            });
	
	            tunnelings.push({
	                db     : db,
	                query  : api.getQuery('DELETE_TABLE', db, table, where.join(' AND ')),
	                success: function(config) {
	
	                    messages.push(app.generateSuccessMsg(config.query, 'Records was successfully removed'));
	                },
	                failure: function(config, response) {
	
	                    messages.push(app.generateError(config.query, response.message));
	                }
	            });
	        });
	
	        app.tunnelings(tunnelings, {
	            start  : function() {
	
	                app.setLoading(true);
	            },
	            success: function() {
	
	                app.setLoading(false);
	                store.remove(selection);
	                //store.sync();
	
	                me.loadGridRecord('', db, function(){
	
	                    app.setLoading(false);
	                });
	            },
	
	            failure: function() {
	
	                app.openMessage(messages);
	                app.setLoading(false);
	            }
	        });
	    }
	});


/***/ },
/* 83 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.QueryEditor', {
	    extend: 'Ext.app.Controller',
	    init : function () {
	
	    	this.control({
	    		'query-editor' : {
					boxready : function (editor, width, height) {
	
			            textarea = editor.getEl().query('textarea')[0];
	
			            Ext.apply(editor, {
			            	editor : CodeMirror.fromTextArea(textarea, {
			                    mode: 'text/x-mysql',
			                    indentWithTabs: true,
			                    smartIndent: true,
			                    lineNumbers: true,
			                    matchBrackets : true,
			                    autofocus: true
			                }),
			            	getEditor : function () {
	
			            		return this.editor;
			            	}
			            });
					},
					resize : function (editor, width, height) {
	
						editor.getEditor().setSize(width, height);
					}
	    		}
	    	})
	    }
	});


/***/ },
/* 84 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.QueryTabPanel', {
	    extend: 'Ext.app.Controller',
	    controllers : [
	        'Planche.controller.layout.QueryTab'
	    ],
	    views : [
	        'Planche.view.layout.QueryTab'
	    ],
	    init : function () {
	
	        this.control({
	            'query-tab-panel' : {
	                'initQueryTab' : this.initQueryTab
	            }
	        });
	    },
	
	    initQueryTab : function (name, closable) {
	
	        var
	        app      = this.getApplication(),
	        tabPanel = app.getQueryTabPanel(),
	        closable = closable !== false,
	        tab      = Ext.create('Planche.view.layout.QueryTab', {
	            title    : name,
	            closable : closable
	        });
	
	        if(!tabPanel) { return; }
	
	        tabPanel.add(tab);
	        tabPanel.setActiveTab(tab);
	    }
	});


/***/ },
/* 85 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.layout.SchemaTreeContextMenu', {
	    extend: 'Ext.app.Controller',
	    init  : function() {
	
	        this.control({
	            'schema-tree': {
	                'itemcontextmenu': this.initContextMenu
	            }
	        });
	    },
	
	    initContextMenu: function(view, node, item, index, e, eOpts) {
	
	        //서버트리의 이벤트를 잡아 내서 node위에서 right click을 했을 경우만 
	        //context메뉴를 보여준다.
	        e.preventDefault();
	
	        var app = this.getApplication(),
	            menu = app.getSchemaContextMenu(),
	            type = node.raw.type,
	            func = 'load' + type.charAt(0).toUpperCase() + type.slice(1) + 'ContextMenu';
	
	        if (!this[func]) {
	
	            return;
	        }
	
	        menu.removeAll();
	        menu.add(this[func]());
	        menu.showAt(e.getXY());
	    },
	
	    loadRootContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [
	            {
	                text   : 'Create Database',
	                handler: function() {
	
	                    app.createDatabase();
	                }
	            },
	            {
	                text   : 'Refresh All',
	                handler: function() {
	
	                    app.reloadTree();
	                }
	            }
	        ];
	    },
	
	    loadDatabaseContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [
	            {
	                text   : 'Refresh Databases',
	                scope  : app,
	                handler: function(){
	
	                    app.reloadTree();
	                }
	            },
	            {
	                text   : 'Create Database',
	                handler: function(){
	
	                    app.createDatabase();
	                }
	            }, {
	                text   : 'Alter Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.alterDatabase(db);
	                }
	            },
	            {
	                text   : 'Drop Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.dropDatabase(db, function() {
	
	                        var node = app.getSelectedTable(true);
	                        app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                        node.remove();
	                    });
	                }
	            }, {
	                text   : 'Truncate Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase();
	                    app.truncateDatabase(db, function() {
	
	                        var node = app.getSelectedTable(true);
	                        Ext.Array.each(node.childNodes, function(childNode, idx) {
	
	                            childNode.removeAll();
	                        });
	                    });
	                }
	            }
	
	            //,{
	            //    text   : 'Empty Database',
	            //    handler: function() {
	            //
	            //        var db = app.getSelectedDatabase();
	            //        app.emptyDatabase(db);
	            //    }
	            //}
	        ];
	    },
	
	    loadTablesContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Tables',
	            scope  : app,
	            handler: function() {
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create Table',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase();
	                app.openCreateTableWindow(db);
	            }
	        }, {
	            text   : 'Copy Table(s) To Differnt Host/Database',
	            handler: function() {
	
	                app.openCopyDatabaseWindow();
	            }
	        }];
	    },
	
	    loadTableContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text     : 'Paste SQL Statement',
	            defaults : {
	                scope: this
	            },
	            listeners: {
	                scope   : this,
	                activate: function(menu) {
	
	                    var subTab = app.getActiveQueryTab();
	                    Ext.Object.each(menu.menu.items.items, function(idx, obj) {
	                        obj[subTab ? 'enable' : 'disable']();
	                    });
	                }
	            },
	            menu     : [{
	                text   : 'INSERT INTO &lt;Table Name&gt;..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'insert');
	                }
	            }, {
	                text   : 'UPDATE &lt;Table Name&gt; SET..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'update');
	                }
	            }, {
	                text   : 'DELETE FROM &lt;Table Name&gt;..',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'delete');
	                }
	            }, {
	                text   : 'SELECT &lt;col-1&gt;..&lt;col-n&gt; FROM &lt;Table Name&gt;',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'select');
	                }
	            }, {
	                text   : 'INSERT ... ON DUPLICATE KEY UPDATE',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.pasteSQLStatement(db, table, 'duplicate_update');
	                }
	            }]
	        }, {
	            text   : 'Copy Table(s) To Differnt Host/Database',
	            handler: function() {
	
	                app.openCopyDatabaseWindow();
	            }
	        }, {
	            xtype: 'menuseparator'
	        }, {
	            text   : 'Open Table',
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedNode();
	
	                app.openTable(db, table);
	            }
	        }, {
	            text   : 'Count Table',
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedNode();
	
	                app.countTable(db, table);
	            }
	        }, {
	            text   : 'Create Table',
	            handler: function() {
	
	                var db = app.getSelectedDatabase();
	                app.openCreateTableWindow(db);
	            }
	        }, {
	            text   : 'Alter Table',
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table);
	            }
	        }, {
	            text: 'More Table Operations',
	            menu: [{
	                text   : 'Rename Table',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.renameTable(db, table);
	                }
	            }, {
	                text   : 'Truncate Table',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.truncateTable(db, table, function() {
	
	                        app.openTable(db, table);
	                    });
	                }
	            }, {
	                text   : 'Drop Table From Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.dropTable(db, table);
	                }
	            }, {
	                text   : 'Reorder Column(s)',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.openReorderColumns(db, table);
	                }
	            }, {
	                text   : 'Duplicate Table Structure/Data',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.duplicateTable(db, table, function() {
	
	                        var node = app.getSelectedTable(true);
	                        app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                        app.reloadTree();
	                    });
	                }
	            }, {
	                text   : 'Copy Table Structure/Data To Other Database',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.duplicateTable(db, table, function() {
	
	                        var node = app.getSelectedTable(true);
	                        app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                        app.reloadTree();
	                    });
	                }
	            }, {
	                text   : 'View Advanced Properties',
	                handler: function() {
	
	                    var db = app.getSelectedDatabase(),
	                        table = app.getSelectedTable();
	
	                    app.openAdvancedProperties(db, table);
	                }
	            }, {
	                text: 'Change Table To Type',
	                menu: [
	                    {
	                        text   : 'MYISAM',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	
	                        text   : 'MRG_MYISAM',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'CSV',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'BLACKHOLE',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'MEMORY',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'FEDERATED',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	
	                        text   : 'ARCHIVE',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'INNODB',
	                        handler: function(btn) {
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }, {
	                        text   : 'PERFORMANCE_SCHEMA',
	                        handler: function(btn) {
	
	                            app.changeTableToType(app.getSelectedDatabase(), app.getSelectedNode(), btn.text);
	                        }
	                    }
	                ]
	            }]
	        }, {
	            xtype: 'menuseparator'
	        }, {
	            text   : 'Create Trigger',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createTrigger(db);
	            }
	        }];
	    },
	
	    loadIndexesContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create index',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openCreateIndexWindow(db, table);
	            }
	        }, {
	            text   : 'Manage index',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedTable();
	
	                app.openAlterTableWindow(db, table, 'table-indexes-tab');
	            }
	        }];
	    },
	
	    loadViewsContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Views',
	            scope  : app,
	            handler: function(){
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create View',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createView(db);
	            }
	        }];
	    },
	
	    loadViewContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create View',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createView(db);
	            }
	        }, {
	            text   : 'Alter View',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    view = app.getSelectedNode();
	
	                app.alterView(db, view);
	            }
	        }, {
	            text   : 'Drop View',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    view = app.getSelectedNode();
	                app.dropView(db, view, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    node.remove();
	                });
	            }
	        }, {
	            text   : 'Open View',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    table = app.getSelectedNode();
	
	                app.openTable(db, table);
	            }
	        }, {
	            text   : 'Rename View',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    view = app.getSelectedNode();
	
	                app.renameView(db, view, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    app.reloadTree();
	                });
	            }
	        }, {
	            text   : 'Export View',
	            scope  : app,
	            handler: function() {
	
	            }
	        }];
	    },
	
	    loadEventsContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Events',
	            scope  : app,
	            handler: function(){
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create Event',
	            handler: function() {
	
	                var db = app.getSelectedDatabase();
	                app.createEvent(db);
	            }
	        }];
	    },
	
	    loadEventContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create Event',
	            handler: function() {
	
	                var db = app.getSelectedDatabase();
	                app.createEvent(db);
	            }
	        }, {
	            text   : 'Alter Event',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    event = app.getSelectedNode();
	
	                app.alterEvent(db, event);
	            }
	        }, {
	            text   : 'Drop Event',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    event = app.getSelectedNode();
	
	                app.dropEvent(db, event, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    node.remove();
	                });
	            }
	        }, {
	            text   : 'Rename Event',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    event = app.getSelectedNode();
	
	                app.renameEvent(db, event, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    app.reloadTree();
	                });
	            }
	        }];
	    },
	
	    loadTriggersContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Triggers',
	            handler: function(){
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create Trigger',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createTrigger(db);
	            }
	        }];
	    },
	
	    loadTriggerContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create Trigger',
	            scope  : app,
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createTrigger(db);
	            }
	        }, {
	            text   : 'Alter Trigger',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    trigger = app.getSelectedNode();
	
	                app.alterTrigger(db, trigger.match(/.+?\b/)[0]);
	            }
	        }, {
	            text   : 'Drop Trigger',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    trigger = app.getSelectedNode();
	
	                app.dropTrigger(db, trigger, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    node.remove();
	                });
	            }
	        }, {
	            text   : 'Rename Trigger',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    trigger = app.getSelectedNode();
	                app.renameTrigger(db, trigger, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    app.reloadTree();
	                });
	            }
	        }];
	    },
	
	    loadFunctionsContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Functions',
	            scope  : app,
	            handler: function(){
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create Function',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createFunction(db);
	            }
	        }];
	    },
	
	    loadFunctionContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create Function',
	            scope  : app,
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createFunction(db);
	            }
	        }, {
	            text   : 'Alter Function',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    func = app.getSelectedNode();
	
	                app.alterFunction(db, func);
	            }
	        }, {
	            text   : 'Drop Function',
	            scope  : app,
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    func = app.getSelectedNode();
	
	                app.dropFunction(db, func, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    node.remove();
	                });
	            }
	        }];
	    },
	
	    loadProceduresContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Refresh Procedures',
	            scope  : app,
	            handler: function(){
	
	                app.reloadTree();
	            }
	        }, {
	            text   : 'Create Procedure',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createProcedure(db);
	            }
	        }];
	    },
	
	    loadProcedureContextMenu: function() {
	
	        var app = this.getApplication();
	
	        return [{
	            text   : 'Create Procedure',
	            handler: function(){
	
	                var db = app.getSelectedDatabase();
	                app.createProcedure(db);
	            }
	        }, {
	            text   : 'Alter Procedure',
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    procedure = app.getSelectedNode();
	
	                app.alterProcedure(db, procedure);
	            }
	        }, {
	            text   : 'Drop Procedure',
	            handler: function() {
	
	                var db = app.getSelectedDatabase(),
	                    procedure = app.getSelectedNode();
	
	                app.dropProcedure(db, procedure, function(){
	
	                    var node = app.getSelectedNode(true);
	                    app.getSelectedTree().getSelectionModel().select(node.parentNode);
	                    node.remove();
	                });
	            }
	        }];
	    }
	
	});
	


/***/ },
/* 86 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.query.Token', {
	    extend: 'Ext.app.Controller',
	    initWindow : function (tokens) {
	
	        this.tokens = tokens;
	
	        Ext.create('Planche.lib.Window', {
	            id : 'window-'+this.id,
	            stateful: true,
	            title : 'Show Tokens',
	            layout : 'fit',
	            bodyStyle:"background-color:#FFFFFF",
	            width : 900,
	            height: 500,
	            overflowY: 'auto',
	            autoScroll : true,
	            modal : true,
	            plain: true,
	            fixed : true,
	            shadow : false,
	            autoShow : true,
	            constrain : true,
	            items : this.initGrid(),
	            buttons : [{
	                text : 'Close',
	                scope : this,
	                handler : function (btn, e) {
	                    
	                    var win = btn.up('window');
	                    win.destroy();
	                }
	            }]
	        });
	    },
	
	    initGrid : function () {
	
	        var columns = this.makeListColumns();
	
	        var fields = [];
	        Ext.each(columns, function (obj) {
	
	            if(obj.xtype == 'rownumberer'){
	
	                return;
	            }
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            border : false,
	            columnLines: true,
	            width : '100%',
	            flex  : 1,
	            columns : columns,
	            store: Ext.create('Ext.data.Store', {
	                fields: fields,
	                data : this.makeData()
	            })
	        });
	
	        return this.grid;
	    },
	
	    makeData : function () {
	
	        var type = [];
	        Ext.Object.each(Planche.lib.QueryTokenType.get(), function (idx, val) {
	
	            type[val] = idx;
	        });
	
	        var data = [];
	        Ext.Array.each(this.tokens, function (token, idx) {
	
	            data.push({type : type[token.type], token : token.value });
	        });
	
	        return data;
	    },
	
	    makeRecords : function (fields, records) {
	
	        var tmp = [];
	        Ext.Array.each(records, function (row, ridx) {
	
	            var record = {};
	            Ext.Array.each(fields, function (col, cidx) {
	
	                record[col.name] = row[cidx];
	            });
	            tmp.push(record);
	        });
	
	        return tmp;
	    },
	
	    makeListColumns : function () {   
	        
	        return [
	            { xtype: 'rownumberer', width : 40},
	            { text: 'Token Type', dataIndex: 'type', width : 100},
	            { text: 'Token', dataIndex: 'token', flex : 1}
	        ];
	    }
	});

/***/ },
/* 87 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.database.DownloadToCSV', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.database.DownloadToCSV'
	    ],
	    init  : function() {
	
	        this.control({
	            '#download-to-csv-window'    : {
	                boxready: this.loadTables
	            },
	            '#download-to-csv-btn-export': {
	                click: this.exportCSV
	            },
	            '#download-to-csv-btn-close' : {
	                click: this.close
	            }
	        });
	
	        this.callParent(arguments);
	    },
	
	    loadTables: function() {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            db = app.getSelectedDatabase();
	
	        app.tunneling({
	            db     : db,
	            query  : api.getQuery('SHOW_ALL_TABLE_STATUS', db),
	            success: function(config, response) {
	
	                var grid = Ext.getCmp('download-to-csv-target-list'),
	                    data = Planche.DBUtil.getAssocArray(response.fields, response.records);
	
	                grid.store.loadData(data);
	
	            },
	            failure: function(config, response) {
	
	                app.openMessage(app.generateQueryErrorMsg(config.query, response.message));
	            }
	        });
	    },
	
	    initWindow: function() {
	
	        var app = this.getApplication();
	
	        Ext.create('Planche.view.database.DownloadToCSV', {
	            database   : app.getSelectedDatabase(),
	            application: app
	        });
	    },
	
	    exportCSV: function(btn) {
	
	        // Define the string
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            tab = app.getActiveConnectTab(),
	            db = app.getSelectedDatabase(),
	            grid = Ext.getCmp('download-to-csv-target-list'),
	            selection = grid.selModel.getSelection(),
	            params = {
	                type   : 'export',
	                host   : tab.getHost(),
	                user   : tab.getUser(),
	                pass   : tab.getPass(),
	                charset: tab.getCharset(),
	                port   : tab.getPort(),
	                db     : db,
	                query  : []
	            },
	            tunnelingURL = tab.getTunnelingURL();
	
	        if (selection.length == 0) {
	
	            Ext.Msg.alert('Info', 'Please, select to export table(s)');
	            return;
	        }
	
	        selection.map(function(table, idx) {
	
	            params.query = api.getQuery('SELECT_TABLE', db, table.raw.Name, '*', '');
	            params.csv = table.raw.Name;
	
	            var cmd = Planche.Base64.encode(Ext.JSON.encode(params)),
	                url = tunnelingURL + "?cmd=" + cmd,
	                iframeId = 'download-iframe-' + table.raw.Name,
	                iframe = Ext.query('#' + iframeId);
	
	            if (iframe.length === 0) {
	
	                var winEl = btn.up('window').getEl();
	                Ext.DomHelper.append(winEl, {
	                    tag   : 'iframe',
	                    id    : iframeId,
	                    src   : url,
	                    style : 'display:none'
	                });
	            }
	            else {
	
	                iframe[0].setAttribute('src', url);
	            }
	        });
	    },
	
	    close: function(btn) {
	
	        btn.up('window').destroy();
	    }
	});


/***/ },
/* 88 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.database.SchemaToHTML', {
	    extend: 'Ext.app.Controller',
	    views : [
	        'Planche.view.database.SchemaToHTML'
	    ],
	    init  : function() {
	
	        var app = this.getApplication();
	
	        this.control({
	            '#schema-to-html-window': {
	                boxready: function(win){
	
	                    win.maximize();
	                }
	            },
	            '#schema-to-html': {
	                boxready: function(panel){
	
	                    var db = app.getSelectedDatabase();
	                    Planche.SchemaUtil.exportAllSchemaToHTML(db, panel, 'update');
	                }
	            },
	            '#schema-to-html-btn-close' : {
	                click : this.close
	            }
	        });
	
	        this.callParent(arguments);
	    },
	
	    initWindow: function() {
	
	        var app = this.getApplication();
	
	        Ext.create('Planche.view.database.SchemaToHTML', {
	            database   : app.getSelectedDatabase(),
	            application: app
	        });
	    },
	
	    close : function(btn){
	
	        btn.up('window').destroy();
	    }
	});


/***/ },
/* 89 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.database.CreateDatabase', {
	    extend    : 'Ext.app.Controller',
	    initWindow: function(db) {
	
	        this.isAlter = db ? true : false;
	        this.loadData(db);
	    },
	
	    loadData: function(db) {
	
	        var app = this.getApplication(),
	            me = this,
	            queries = [
	                {key: 'collation', str: app.getAPIS().getQuery('SHOW_COLLATION')},
	                {key: 'charset', str: app.getAPIS().getQuery('SHOW_CHARSET')},
	                {key: 'collation_val', str: app.getAPIS().getQuery('COLLATION_DATABASE')},
	                {key: 'charset_val', str: app.getAPIS().getQuery('CHARSET_DATABASE')}
	            ],
	            tunneling,
	            messages = [];
	
	        app.setLoading(true);
	
	        me.comboData = {};
	        me.comboValue = {};
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var query = queries.shift();
	
	            if (query) {
	
	                app.tunneling({
	                    db     : db,
	                    query  : query.str,
	                    success: function(config, response) {
	
	                        if (query.key == 'collation' || query.key == 'charset') {
	
	                            var tmp = [];
	                            Ext.Array.each(response.records, function(row, idx) {
	
	                                tmp.push({
	                                    id  : row[0],
	                                    text: row[0]
	                                });
	                            });
	
	                            me.comboData[query.key] = tmp;
	                        }
	                        else {
	
	                            me.comboValue[query.key] = response.records[0][1];
	                        }
	
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        messages.push(app.generateErrorMessage(query.str, response.message));
	
	                        tunneling();
	                    }
	                })
	            }
	            else {
	
	                app.getActiveConnectTab().setLoading(false);
	
	                if (messages.length == 0) {
	
	                    this.initCreateWindow(db);
	                }
	                else {
	
	                    app.openMessage(messages);
	                }
	            }
	
	        }, me))();
	    },
	
	    initCreateWindow: function(db) {
	
	        Ext.create('Planche.lib.Window', {
	            stateful   : true,
	            title      : this.isAlter ? 'Alter database \'' + db + '\'' : 'Create new database',
	            layout     : 'vbox',
	            bodyStyle  : "background-color:#FFFFFF",
	            width      : 300,
	            height     : 200,
	            bodyPadding: '10px 10px 10px 10px',
	            overflowY  : 'auto',
	            autoScroll : true,
	            modal      : true,
	            plain      : true,
	            fixed      : true,
	            shadow     : false,
	            autoShow   : true,
	            constrain  : true,
	            items      : [
	                this.initDatabaseName(db),
	                this.initDatabaseCharSet(),
	                this.initDatabaseCollation()
	            ],
	            buttons    : [{
	                text   : this.isAlter ? 'Alter' : 'Create',
	                scope  : this,
	                handler: this.isAlter ? this.alter : this.create
	            }, {
	                text   : 'Cancel',
	                scope  : this,
	                handler: this.cancel
	            }]
	        });
	    },
	
	    initDatabaseName: function(database) {
	
	        return {
	            id        : 'database-name',
	            xtype     : 'textfield',
	            width     : '100%',
	            allowBlank: false,
	            emptyText : 'Enter new database name..',
	            disabled  : this.isAlter,
	            value     : this.isAlter ? database : ''
	        };
	    },
	
	    initDatabaseCollation: function() {
	
	        this.comboData.collation.unshift({
	            id: '', text: 'Database Collation'
	        });
	
	        this.comboCollation = this.initComboBox(
	            'database-collation',
	            this.comboData.collation,
	            this.comboValue.collation_val
	        );
	
	        return this.comboCollation;
	    },
	
	    initDatabaseCharSet: function() {
	
	        this.comboData.charset.unshift({
	            id: '', text: 'Database Charset'
	        });
	
	        this.comboCharset = this.initComboBox(
	            'database-charset',
	            this.comboData.charset,
	            this.comboValue.charset_val
	        );
	
	        return this.comboCharset;
	    },
	
	    initComboBox: function(id, data, value) {
	
	        var store = new Ext.data.Store({
	                fields: ['id', 'text'],
	                data  : data
	            }),
	
	            // Simple ComboBox using the data store
	            combo = Ext.create('Ext.form.ComboBox', {
	                width       : '100%',
	                id          : id,
	                emptyText   : 'default',
	                value       : value,
	                displayField: 'text',
	                queryMode   : 'local',
	                valueField  : 'id',
	                labelWidth  : 80,
	                editable    : true,
	                store       : store,
	                typeAhead   : true,
	                anyMatch    : true
	            });
	
	        return combo;
	    },
	
	    create: function(btn) {
	
	        var textfield = btn.up('window').down('textfield'),
	            db = textfield.getValue(),
	            app = this.getApplication(),
	            node = app.getSelectedNode(true),
	            collation = Ext.getCmp('database-collation').getValue(),
	            charset = Ext.getCmp('database-charset').getValue();
	
	        if (!db) {
	
	            textfield.validate();
	            return;
	        }
	
	        app.tunneling({
	            query  : app.getAPIS().getQuery('CREATE_DATABASE', db, charset, collation),
	            success: function(config, response) {
	
	                var tree = app.getSelectedTree(),
	                    rootNode = tree.getRootNode();
	
	                app.reloadTree(rootNode);
	
	                btn.up('window').destroy();
	
	                app.fireEvent('after_create_database');
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	            }
	        });
	    },
	
	    alter: function(btn) {
	
	        var app = this.getApplication(),
	            node = app.getSelectedNode(true),
	            db = app.getParentNode(node),
	            collation = Ext.getCmp('database-collation').getValue(),
	            charset = Ext.getCmp('database-charset').getValue();
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('ALTER_DATABASE', db, charset, collation),
	            success: function(config, response) {
	
	                var tree = app.getSelectedTree(),
	                    rootNode = tree.getRootNode();
	
	                app.reloadTree(rootNode);
	
	                btn.up('window').destroy();
	
	                app.fireEvent('after_alter_database');
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	            }
	        });
	    },
	
	    cancel: function(btn) {
	
	        btn.up('window').destroy();
	    }
	});

/***/ },
/* 90 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.connection.NewConnect', {
	    extend    : 'Ext.app.Controller',
	    mode      : 'add',
	    initWindow: function(connInfo) {
	
	        Ext.create('Planche.lib.Window', {
	            id        : 'new-conn-window',
	            stateful  : true,
	            title     : 'Add New Connection',
	            layout    : 'fit',
	            bodyStyle : "background-color:#FFFFFF",
	            width     : 500,
	            height    : 400,
	            overflowY : 'auto',
	            autoScroll: true,
	            modal     : true,
	            plain     : true,
	            fixed     : true,
	            shadow    : false,
	            autoShow  : true,
	            constrain : true,
	            items     : {
	                xtype   : 'form',
	                id      : 'new-conn-form',
	                layout  : 'vbox',
	                width   : '100%',
	                height  : '100%',
	                padding : '5 5 5 5',
	                border  : false,
	                defaults: {
	                    labelWidth: 100,
	                    width     : '100%',
	                    anchor    : '100%',
	                    xtype     : 'textfield',
	                    labelPad  : 5
	                },
	                items   : [{
	                    xtype     : 'hiddenfield',
	                    id        : 'new-conn-into',
	                    name      : 'new-conn-into',
	                    value     : 'localstorage',
	                    allowBlank: false
	                }, {
	                    xtype     : 'hiddenfield',
	                    id        : 'new-conn-index',
	                    name      : 'new-conn-index',
	                    value     : 0,
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Host Name',
	                    id        : 'new-conn-hostName',
	                    name      : 'new-conn-hostName',
	                    emptyText : 'New Connection Host Name',
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Tunneling URL',
	                    emptyText : 'http://localhost:8888/',
	                    id        : 'new-conn-tunnelingURL',
	                    name      : 'new-conn-tunnelingURL',
	                    allowBlank: false
	                }, {
	                    xtype      : 'radiogroup',
	                    fieldLabel : 'Request Type',
	                    defaultType: 'radiofield',
	                    id         : 'new-conn-requestType',
	                    padding    : '0px 10px 5px 0px',
	                    layout     : 'hbox',
	                    items      : [
	                        {
	                            boxLabel  : 'JSONP',
	                            name      : 'new-conn-requestType',
	                            inputValue: 'jsonp',
	                            margin    : '0px 10px 0px 0px',
	                            checked   : true
	                        }, {
	                            boxLabel  : 'AJAX',
	                            name      : 'new-conn-requestType',
	                            inputValue: 'ajax'
	                        }
	                    ]
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Host',
	                    id        : 'new-conn-host',
	                    name      : 'new-conn-host',
	                    emptyText : 'localhost',
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'User',
	                    id        : 'new-conn-user',
	                    name      : 'new-conn-user',
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Password',
	                    inputType : 'password',
	                    id        : 'new-conn-pass',
	                    name      : 'new-conn-pass',
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Charset',
	                    id        : 'new-conn-charset',
	                    name      : 'new-conn-charset',
	                    value     : 'utf8',
	                    allowBlank: false
	                }, {
	                    xtype     : 'textfield',
	                    fieldLabel: 'Port',
	                    id        : 'new-conn-port',
	                    name      : 'new-conn-port',
	                    value     : 3306,
	                    allowBlank: false
	                }, {
	                    xtype      : 'radiogroup',
	                    fieldLabel : 'DBMS',
	                    defaultType: 'radiofield',
	                    id         : 'new-conn-dbms',
	                    padding    : '0px 10px 5px 0px',
	                    layout     : 'hbox',
	                    items      : [
	                        {
	                            boxLabel  : 'MySQL',
	                            name      : 'new-conn-dbms',
	                            inputValue: 'mysql',
	                            checked   : true,
	                            margin    : '0px 10px 0px 0px'
	                        }
	                    ]
	                }, {
	                    xtype      : 'radiogroup',
	                    fieldLabel : 'Auto Connection',
	                    defaultType: 'radiofield',
	                    id         : 'new-conn-autoConnection',
	                    padding    : '0px 10px 5px 0px',
	                    layout     : 'hbox',
	                    items      : [
	                        {
	                            boxLabel  : 'Yes',
	                            name      : 'new-conn-autoConnection',
	                            inputValue: true,
	                            margin    : '0px 10px 0px 0px'
	                        }, {
	                            boxLabel  : 'No',
	                            name      : 'new-conn-autoConnection',
	                            inputValue: false,
	                            checked   : true
	                        }
	                    ]
	                }]
	            },
	            buttons   : [{
	                text   : 'Add New Connection',
	                id     : 'add-new-conn-btn',
	                scope  : this,
	                handler: this.save
	            }, {
	                text   : 'Cancel',
	                scope  : this,
	                handler: this.cancel
	            }],
	            listeners : {
	                scope   : this,
	                boxready: function() {
	
	                    if (!connInfo) {
	
	                        this.mode = 'add';
	                        return;
	                    }
	
	                    this.mode = 'edit';
	
	                    var title = 'Save connection into local storage';
	                    if (connInfo.raw.into == 'hostfile') {
	
	                        title = 'Add new connection into local storage';
	                        this.mode = 'add';
	                    }
	
	                    Ext.getCmp('add-new-conn-btn').setText(title);
	
	                    var values = {},
	                        form   = this.getForm();
	
	                    Ext.Object.each(connInfo.raw, function(key, val) {
	
	                        values['new-conn-' + key] = val;
	                    });
	
	                    form.setValues(values);
	                }
	            }
	        });
	    },
	
	    getForm: function() {
	
	        return Ext.getCmp('new-conn-form').getForm();
	    },
	
	    save: function(btn) {
	
	        var me = this,
	            form   = me.getForm(),
	            values = form.getValues(),
	            win    = btn.up("window"),
	            app    = me.getApplication();
	
	        Planche.lib.Setting.getHosts(function(hosts){
	
	            var newValues = {};
	
	            Ext.Object.each(values, function(key, val) {
	
	                newValues[key.substring(9)] = val;
	            });
	
	            if (me.mode == 'add') {
	
	                newValues['index'] = hosts.length;
	                hosts.push(newValues);
	            }
	            else if (me.mode == 'edit') {
	
	                hosts[newValues['index']] = newValues;
	            }
	
	            Planche.lib.Setting.setHosts(hosts, function(){
	
	                app.fireEvent('initHosts');
	            });
	
	            win.destroy();
	
	            Ext.getCmp('edit-conn-btn').setDisabled(true);
	            Ext.getCmp('del-conn-btn').setDisabled(true);
	            Ext.getCmp('conn-btn').setDisabled(true);
	            Ext.getCmp('test-conn-btn').setDisabled(true);
	        });
	    },
	
	    cancel: function(btn) {
	
	        var win = btn.up("window");
	        win.destroy();
	    }
	});


/***/ },
/* 91 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.connection.Connect', {
	    extend    : 'Ext.app.Controller',
	    tmpCopy   : null,
	    initWindow: function() {
	
	        var app = this.getApplication(),
	            columns = this.makeListColumns(),
	            fields = [];
	
	        Ext.each(columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.store = Ext.create('Ext.data.Store', {
	            fields: fields
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            id         : 'connect-grid',
	            border     : false,
	            columnLines: true,
	            width      : '100%',
	            flex       : 1,
	            columns    : columns,
	            store      : this.store,
	            listeners  : {
	                scope       : this,
	                select      : function(grid, record) {
	
	                    if (record.raw.into == 'hostfile') {
	
	                        Ext.getCmp('edit-conn-btn').setDisabled(true);
	                        Ext.getCmp('del-conn-btn').setDisabled(true);
	                    }
	                    else {
	
	                        Ext.getCmp('edit-conn-btn').setDisabled(false);
	                        Ext.getCmp('del-conn-btn').setDisabled(false);
	                    }
	
	                    Ext.getCmp('conn-btn').setDisabled(false);
	                    Ext.getCmp('test-conn-btn').setDisabled(false);
	                },
	                itemdblclick: this.connect,
	                cellkeydown : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
	
	                    if (e.keyCode === Ext.EventObject.ENTER) {
	
	                        this.connect();
	                    }
	                }
	            }
	        });
	
	
	        Ext.create('Planche.lib.Window', {
	            id        : 'connect-window',
	            stateful  : true,
	            title     : 'Connect to MySQL Host',
	            layout    : 'fit',
	            bodyStyle : "background-color:#FFFFFF",
	            width     : 900,
	            height    : 500,
	            overflowY : 'auto',
	            autoScroll: true,
	            modal     : true,
	            plain     : true,
	            fixed     : true,
	            shadow    : false,
	            autoShow  : true,
	            constrain : true,
	            items     : this.grid,
	            buttons   : [{
	                text    : 'Connect',
	                id      : 'conn-btn',
	                disabled: true,
	                scope   : this,
	                handler : this.connect
	            }, {
	                text    : 'Test Connect',
	                id      : 'test-conn-btn',
	                disabled: true,
	                scope   : this,
	                handler : this.testConnect
	            }, {
	                text   : 'Add New Connnection',
	                scope  : this,
	                handler: this.newConnect
	            }, {
	                text    : 'Edit Connnection',
	                id      : 'edit-conn-btn',
	                disabled: true,
	                scope   : this,
	                handler : this.editConnect
	            }, {
	                text    : 'Del Connnection',
	                id      : 'del-conn-btn',
	                disabled: true,
	                scope   : this,
	                handler : this.delConnect
	            }],
	            listeners : {
	                scope   : this,
	                boxready: function(win) {
	
	                    win.setLoading(true);
	
	                    this.initHosts(function(){
	
	                        win.setLoading(false);
	                    });
	
	                    this.initKeyMap();
	
	                    app.on('initHosts',function(){
	
	                        app.setLoading(true);
	
	                        this.initHosts(function(){
	
	                            app.setLoading(false);
	                        });
	                    }, this);
	                }
	            }
	        });
	    },
	
	    initHosts: function(callback) {
	
	        var me = this,
	            app = me.getApplication();
	
	        Planche.lib.Setting.getHosts(function(hosts){
	
	            me.store.loadData(hosts);
	
	            if(callback) callback();
	
	            Ext.getCmp('edit-conn-btn').setDisabled(true);
	            Ext.getCmp('del-conn-btn').setDisabled(true);
	        });
	    },
	
	    connect  : function() {
	
	        var me = this,
	            app = me.getApplication();
	
	        this.ping(function() {
	
	            var win = me.getConnectWindow(),
	                conn = me.getSelectedConnection();
	
	            conn.raw.requestType = window.location.protocol == 'file:' ? 'jsonp' : conn.raw.requestType;
	            app.initConnectTab(conn.raw);
	
	            win.destroy();
	        });
	    },
	
	    testConnect: function() {
	
	        var me = this;
	
	        this.ping(function() {
	
	            var win = me.getConnectWindow();
	            win.setLoading(false);
	
	            Ext.Msg.alert('Info', 'Connection is successful');
	        });
	    },
	
	    newConnect: function() {
	
	        if (typeof localStorage == 'undefined') {
	
	            Ext.Msg.alert('notice', 'Your browser does not support local storage');
	            return;
	        }
	
	        var app = this.getApplication();
	        app.openWindow('connection.NewConnect');
	    },
	
	    editConnect: function() {
	
	        if (typeof localStorage == 'undefined') {
	
	            Ext.Msg.alert('notice', 'Your browser does not support local storage');
	            return;
	        }
	
	        var app = this.getApplication(),
	            conn = this.getSelectedConnection();
	
	        app.openWindow('connection.NewConnect', conn);
	    },
	
	    delConnect : function(){
	
	        var app = this.getApplication(),
	            conn = this.getSelectedConnection();
	
	        Planche.lib.Setting.getHosts(function(hosts){
	
	            hosts.splice(conn.raw.index, 1);
	
	            Planche.lib.Setting.setHosts(hosts, function(){
	
	                app.fireEvent('initHosts');
	            });
	        });
	    },
	
	    ping: function(callback) {
	
	        var win = this.getConnectWindow(),
	            app = this.getApplication(),
	            conn = this.getSelectedConnection();
	
	        win.setLoading(true);
	
	        app.tunneling(Ext.apply({
	            query  : 'SELECT 1',
	            timeout: 20000,
	            success: function(config, response) {
	
	                callback();
	            },
	            failure: function(config, response) {
	
	                Ext.Msg.alert('Error', response.message);
	                win.setLoading(false);
	            }
	        }, conn.raw));
	    },
	
	    getConnectWindow: function() {
	
	        return Ext.getCmp('connect-window');
	    },
	
	    getSelectedConnection: function() {
	
	        var grid = Ext.getCmp('connect-grid'),
	            selGrid = grid.selModel.getSelection();
	
	        if (selGrid.length == 0) {
	
	            return false;
	        }
	
	        return selGrid[0];
	    },
	
	    makeListColumns: function() {
	
	        return [
	            {
	                text: 'Host Name', dataIndex: 'hostName', width: 200, renderer: function(value, p, record) {
	
	                return Ext.String.format('<img src=\'resources/images/icon_database24x24.png\'> {0}', value);
	            }
	            },
	            {
	                text: 'Host', dataIndex: 'host', width: 100, renderer: function(value, p, record) {
	
	                return Ext.String.format('<img src=\'resources/images/icon_server24x24.png\'> {0}', value);
	            }
	            },
	            {
	                text: 'User', dataIndex: 'user', width: 100, renderer: function(value, p, record) {
	
	                return Ext.String.format('<img src=\'resources/images/icon_user24x24.png\'> {0}', value);
	            }
	            },
	            {
	                text: 'Req.Type', dataIndex: 'requestType', width: 60, renderer: function(value) {
	
	                return value ? value.toUpperCase() : 'JSONP';
	            }
	            },
	            {text: 'Charset', dataIndex: 'charset', width: 50},
	            {text: 'Port', dataIndex: 'port', width: 40},
	            {text: 'HTTP Tunneling URL', dataIndex: 'tunnelingURL', flex: 1}
	        ];
	    },
	
	    copyHost: function() {
	
	        if (typeof localStorage == 'undefined') {
	
	            Ext.Msg.alert('notice', 'Your browser does not support local storage');
	            return;
	        }
	
	        this.tmpCopy = Ext.clone(this.getSelectedConnection().raw);
	        this.tmpCopy.into = 'localstorage';
	    },
	
	    pasteHost: function() {
	
	        if(!this.tmpCopy){
	
	            return;
	        }
	
	        var me = this,
	            app = me.getApplication();
	
	        Planche.lib.Setting.getHosts(function(hosts){
	
	            me.tmpCopy['index'] = hosts.length;
	            hosts.push(me.tmpCopy);
	
	            Planche.lib.Setting.setHosts(hosts, function(){
	
	                app.fireEvent('initHosts');
	                me.tmpCopy = null;
	            });
	        });
	    },
	
	    initKeyMap: function() {
	
	        var map = new Ext.util.KeyMap({
	            target : Ext.getCmp('connect-grid').getEl(),
	            binding: [{
	                scope: this,
	                key  : Ext.EventObject.C,
	                ctrl : true,
	                fn   : this.copyHost
	            }, {
	                scope: this,
	                key  : Ext.EventObject.V,
	                ctrl : true,
	                fn   : this.pasteHost
	            }]
	        });
	    }
	});


/***/ },
/* 92 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Variables', {
	    extend    : 'Ext.app.Controller',
	    grid      : null,
	    initWindow: function() {
	
	        Ext.create('Planche.lib.Window', {
	            id       : 'window-' + this.id,
	            title    : 'Show Variables',
	            bodyStyle: "background-color:#FFFFFF",
	            width    : 900,
	            height   : 500,
	            items    : this.initGrid(),
	            buttons  : [{
	                text   : 'Close',
	                scope  : this,
	                handler: function(btn, e) {
	
	                    var win = btn.up('window');
	                    win.destroy();
	                }
	            }],
	            listeners: {
	                scope   : this,
	                boxready: function() {
	
	                    this.loadList();
	                }
	            }
	        });
	    },
	
	    initGrid: function() {
	
	        var columns = this.makeListColumns(),
	            fields = [];
	
	        Ext.each(columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            border     : false,
	            columnLines: true,
	            width      : '100%',
	            flex       : 1,
	            columns    : columns,
	            store      : Ext.create('Ext.data.Store', {
	                fields: fields
	            })
	        });
	
	        return this.grid;
	    },
	
	    loadList: function() {
	
	        var app = this.application,
	            node = app.getSelectedNode(true),
	            db = app.getParentNode(node);
	
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_VARIABLES', db),
	            success: Ext.Function.bind(function(config, response) {
	
	                var records = this.makeRecords(response.fields, response.records);
	
	                this.grid.store.loadData(records);
	                this.grid.setLoading(false);
	
	            }, this)
	        });
	    },
	
	    makeRecords    : function(fields, records) {
	
	        var tmp = [];
	        Ext.Array.each(records, function(row, ridx) {
	
	            var record = {};
	            Ext.Array.each(fields, function(col, cidx) {
	
	                record[col.name] = row[cidx];
	            });
	            tmp.push(record);
	        });
	
	        return tmp;
	    },
	    makeListColumns: function() {
	
	        return [
	            {text: 'Variable Name', dataIndex: 'Variable_name', width: 300},
	            {text: 'Value', dataIndex: 'Value', flex: 1}
	        ];
	    }
	});

/***/ },
/* 93 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Status', {
	    extend    : 'Ext.app.Controller',
	    grid      : null,
	    initWindow: function() {
	
	        Ext.create('Planche.lib.Window', {
	            id       : 'window-' + this.id,
	            title    : 'Show Status',
	            bodyStyle: "background-color:#FFFFFF",
	            width    : 900,
	            height   : 500,
	            items    : this.initGrid(),
	            buttons  : [{
	                text   : 'Close',
	                scope  : this,
	                handler: function(btn, e) {
	
	                    var win = btn.up('window');
	                    win.destroy();
	                }
	            }],
	            listeners: {
	                scope   : this,
	                boxready: function() {
	
	                    this.loadList();
	                }
	            }
	        });
	    },
	
	    initGrid: function() {
	
	        var columns = this.makeListColumns(),
	            fields = [];
	
	        Ext.each(columns, function(obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            border     : false,
	            columnLines: true,
	            width      : '100%',
	            flex       : 1,
	            columns    : columns,
	            store      : Ext.create('Ext.data.Store', {
	                fields: fields
	            }),
	            tbar       : [
	                {
	                    xtype  : 'button',
	                    text   : 'All',
	                    cls    : 'btn',
	                    pressed: true,
	                    scope  : this,
	                    margin : '0 0 0 5',
	                    scope  : this,
	                    handler: function(btn) {
	
	                        Ext.invoke(btn.up("grid").query('>>button'), 'toggle', false);
	                        btn.toggle(true);
	
	                        this.loadList();
	                    }
	                },
	                {
	                    xtype  : 'button',
	                    text   : 'Global',
	                    cls    : 'btn',
	                    scope  : this,
	                    margin : '0 0 0 5',
	                    scope  : this,
	                    handler: function(btn) {
	
	                        Ext.invoke(btn.up("grid").query('>>button'), 'toggle', false);
	                        btn.toggle(true);
	
	                        this.loadList('GLOBAL');
	                    }
	                },
	                {
	                    xtype  : 'button',
	                    text   : 'Session',
	                    cls    : 'btn',
	                    scope  : this,
	                    margin : '0 0 0 5',
	                    scope  : this,
	                    handler: function(btn) {
	
	                        Ext.invoke(btn.up("grid").query('>>button'), 'toggle', false);
	                        btn.toggle(true);
	
	                        this.loadList('SESSION');
	                    }
	                }
	            ]
	        });
	
	        return this.grid;
	    },
	
	    loadList: function(cmd) {
	
	        var query = typeof cmd == 'undefined' ? 'SHOW_STATUS' : 'SHOW_' + cmd + '_STATUS';
	
	        var app = this.application;
	
	        var node = app.getSelectedNode(true);
	        var db = app.getParentNode(node);
	        app.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery(query, db),
	            success: Ext.Function.bind(function(config, response) {
	
	                var records = this.makeRecords(response.fields, response.records);
	
	                this.grid.store.loadData(records);
	                this.grid.setLoading(false);
	
	            }, this)
	        });
	    },
	
	    makeRecords    : function(fields, records) {
	
	        var tmp = [];
	        Ext.Array.each(records, function(row, ridx) {
	
	            var record = {};
	            Ext.Array.each(fields, function(col, cidx) {
	
	                record[col.name] = row[cidx];
	            });
	            tmp.push(record);
	        });
	
	        return tmp;
	    },
	    makeListColumns: function() {
	
	        return [
	            {text: 'Variable Name', dataIndex: 'Variable_name', width: 300},
	            {text: 'Value', dataIndex: 'Value', flex: 1}
	        ];
	    }
	});

/***/ },
/* 94 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Quick', {
	    extend: 'Ext.app.Controller',
	
	    initWindow: function() {
	
	        var app = this.getApplication();
	            fields = ['name', 'icon', 'value'],
	            win = Ext.create('Ext.window.Window', {
	                id       : 'window-' + this.id,
	                title    : 'Quick Command',
	                layout   : 'fit',
	                width    : 500,
	                border   : false,
	                constrain: true,
	                modal    : true,
	                header   : false,
	                fixed    : true,
	                shadow   : false,
	                items    : [
	                    {
	                        xtype            : 'combo',
	                        id               : 'quick-combo',
	                        typeAhead        : false,
	                        hideLabel        : true,
	                        hideTrigger      : true,
	                        displayField     : 'name',
	                        valueField       : 'value',
	                        queryMode        : 'local',
	                        forceSelection   : true,
	                        anyMatch         : true,
	                        triggerAction    : 'all',
	                        focusOnToFront   : true,
	                        loadingText      : 'Searching...',
	                        valueNotFoundText: 'This command is not found',
	                        fixed            : true,
	                        store            : Ext.create('Ext.data.Store', {
	                            fields: fields,
	                            data  : []
	                        }),
	                        listConfig : {
	
	                            loadingText: 'Search..',
	                            getInnerTpl: function() {
	
	                                return '<div class="quick-command"><span class="quick-icon {icon}"></span> {name}</div>';
	                            }
	                        },
	                        listeners        : {
	                            scope : this,
	                            select: function(combo, records) {
	
	                                var selData = records[0].raw;
	                                selData.method.apply(app, selData.params);
	
	                                try {
	
	                                    combo.reset();
	                                    var panel = combo.up('panel');
	                                    panel.hide();
	                                }
	                                catch (e) {
	
	                                }
	                            }
	                        }
	                    }
	                ],
	                listeners: {
	                    activate : function(win){
	                        var combo = Ext.getCmp('quick-combo'),
	                            task = new Ext.util.DelayedTask();
	
	                        combo.store.loadData(app.getActiveQuickCommands());
	
	                        task.delay(100, function(combo) {
	
	                            combo.focus();
	
	                            task.delay(200, function(combo) {
	
	                                combo.doQuery('');
	
	                            }, this, [combo]);
	
	                        }, this, [combo]);
	                    },
	
	                    close : function(win){
	
	                        win.destroy();
	                    }
	                }
	            });
	
	        win.show();
	        win.setY(100);
	
	        return win;
	    }
	});

/***/ },
/* 95 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Process', {
	    extend: 'Ext.app.Controller',
	    grid : null,
	    initWindow : function () {
	
	        var app = this.getApplication(),
	            api = app.getAPIS(),
	            me  = this,
	            win = null;
	
	        win = Ext.create('Planche.lib.Window', {
	            id : 'window-'+this.id,
	            title : 'Show Process List',
	            bodyStyle:"background-color:#FFFFFF",
	            width : 900,
	            height: 500,
	            items : this.initGrid(),
	            buttons : [{
	                text : 'Kill Process',
	                scope : this,
	                handler : function (btn, e) {
	
	                    var selected = this.grid.selModel.getSelection();
	
	                    if(selected.length == 0){
	
	                        Ext.Msg.alert('info', 'Please select a process id');
	                        return;
	                    }
	
	                    win.setLoading(true);
	
	                    app.tunneling({
	                        db : '',
	                        query : api.getQuery('KILL_QUERY', selected[0].data.Id),
	                        success : function(config, response){
	                            
	                            me.loadList();
	                            win.setLoading(false);                
	                        },
	                        failure : function(config, response){
	
	                            Ext.Msg.alert('error', app.generateError(config.query, response.message));
	                            win.setLoading(false); 
	                        }
	                    });
	                }
	            },{
	                text : 'Close',
	                scope : this,
	                handler : function (btn, e) {
	                    
	                    var win = btn.up('window');
	                    win.destroy();
	                }
	            }],
	            listeners : {
	                scope : this,
	                boxready : function () {
	
	                    this.loadList();
	                }
	            }
	        });
	    },
	
	    initGrid : function () {
	
	        var columns = this.makeListColumns();
	
	        var fields = [];
	        Ext.each(columns, function (obj) {
	
	            fields.push(obj.dataIndex);
	        });
	
	        this.grid = Ext.create('Ext.grid.Panel', {
	            border : false,
	            columnLines: true,
	            width : '100%',
	            flex  : 1,
	            columns : columns,
	            store: Ext.create('Ext.data.Store', {
	                fields: fields
	            }),
	            tbar : [
	                { xtype: 'text',  text : 'Refresh Per Sec', margin : '0 0 0 5'},
	                { xtype: 'textfield', value: 0, scope: this, width : 40, margin : '0 0 0 5', listeners : {
	                    scope : this,
	                    specialkey: function (field, el) {
	
	                        if (el.getKey() == Ext.EventObject.ENTER) {
	
	                            this.loadList();
	                        }
	                    }
	                }},
	                { xtype: 'button', text: 'Refresh', cls : 'btn', scope: this, margin : '0 0 0 5', scope : this, handler : function (btn) {
	
	                    this.loadList();
	                }},
	                { xtype: 'button', text: 'Stop', cls : 'btn', scope: this, margin : '0 0 0 5', scope : this, handler : function (btn) {
	
	                    var textRefreshPerSec = this.grid.down('text[text=Refresh Per Sec]').next();
	
	                    textRefreshPerSec.setValue(0);
	                }}
	            ]
	        });
	
	        return this.grid;
	    },
	
	    loadList : function () {
	
	        var textRefreshPerSec = this.grid.down('text[text=Refresh Per Sec]').next();
	
	        var refreshPerSec = parseFloat(textRefreshPerSec.getValue());
	
	        var app = this.application;
	
	        var node = app.getSelectedNode(true);
	        var db = app.getParentNode(node);
	        app.tunneling({
	            db : db,
	            query : app.getAPIS().getQuery('SHOW_PROCESS_LIST', db),
	            success : Ext.Function.bind(function (config, response) {
	                
	                var records = this.makeRecords(response.fields, response.records);
	
	                this.grid.store.loadData(records);
	                this.grid.setLoading(false);
	
	                if(refreshPerSec > 0) {
	
	                    setTimeout(Ext.Function.bind(this.loadList, this), refreshPerSec * 1000);
	                }
	            }, this)
	        });
	    },
	
	    makeRecords : function (fields, records) {
	
	        var tmp = [];
	        Ext.Array.each(records, function (row, ridx) {
	
	            var record = {};
	            Ext.Array.each(fields, function (col, cidx) {
	
	                record[col.name] = row[cidx];
	            });
	            tmp.push(record);
	        });
	
	        return tmp;
	    },
	    makeListColumns : function () {   
	        
	        return [
	            { text: 'Id', dataIndex: 'Id', width : 100},
	            { text: 'User', dataIndex: 'User', width : 100},
	            { text : 'Host', dataIndex : 'Host', width : 60 },
	            { text : 'Db', dataIndex : 'Db', width : 60 },
	            { text : 'Command', dataIndex : 'Command', width : 60 },
	            { text : 'State', dataIndex : 'State', width : 60 },
	            { text : 'Info', dataIndex : 'Info', flex : 1 }
	        ];
	    }
	});

/***/ },
/* 96 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Flush', {
	    extend: 'Ext.app.Controller',
	    grid : null,
	    initWindow : function () {
	
	        Ext.create('Planche.lib.Window', {
	            id : 'window-'+this.id,
	            title : 'Flush',
	            layout: {
	                type: 'table',
	                columns: 2,
	                tableAttrs: {
	                    style: {
	                        width: '100%'
	                    }
	                },
	                tdAttrs: {
	                   style:{
	                       width: '50%',
	                       'vertical-align' : 'top'
	                   }
	                }
	            },
	            bodyPadding : '5 5 5 5',
	            bodyStyle:"background-color:#FFFFFF",
	            width : 400,
	            height: 300,
	            constrain : true,
	            items : [
	                this.initCheckBox('Use NO_WRITE_TO_BINLOG', 'NO_WRITE_TO_BINLOG', 2),
	                this.initCheckBox('FLUSH ALL', 'ALL', 2),
	                this.initCheckBox('Logs', 'LOGS'),
	                this.initCheckBox('Hosts', 'HOSTS'),
	                this.initCheckBox('Privileges', 'PRIVILEGES'),
	                this.initCheckBox('Status', 'STATUS'),
	                this.initCheckBox('Tables', 'TABLES'),
	                this.initCheckBox('Tables with read lock', 'TABLES WITH READ LOCK'),
	                this.initCheckBox('DES_KEY_FILE', 'DES_KEY_FILE'),
	                this.initCheckBox('QUERY_CACHE', 'QUERY CACHE'),
	                this.initCheckBox('USER_RESOURCES', 'USER_RESOURCES', 2)
	            ],
	            buttons : [{
	                text : 'Flush',
	                scope : this,
	                handler : this.flush
	            },{
	                text : 'Close',
	                scope : this,
	                handler : this.close
	            }]
	        });
	    },
	
	    initCheckBox : function (label, cmd, colspan) {
	
	        var component = {
	            xtype : 'checkbox',
	            boxLabel : label,
	            cmd : cmd,
	            handler : this.hanlderCheckBox
	        };
	
	        if(typeof colspan != "undefined") {
	
	            component.colspan = colspan;
	        }
	
	        return component;
	    },
	
	    hanlderCheckBox : function (checkbox, checked) {
	
	        if(checkbox.cmd == 'ALL') {
	
	            var node = checkbox.nextNode();
	            while(node) {
	
	                node.setValue(checked);
	                node = node.nextNode();
	            }
	            return;
	        }
	    },
	
	    flush : function (btn, e) {
	        
	        var win = btn.up("window");      
	        var checkAll = win.down("checkbox[boxLabel='FLUSH ALL']");
	        var useNoWrite = win.down("checkbox[boxLabel='Use NO_WRITE_TO_BINLOG']");
	
	        if(useNoWrite.checked) {
	
	            useNoWrite = useNoWrite.cmd;
	        }
	        else {
	
	            useNoWrite = '';
	        }
	        
	        var queries = [];
	        var node = win.down("checkbox[boxLabel='Logs']");
	        while(node) {
	
	            if(node.checked) {
	
	                queries.push('FLUSH ' + (useNoWrite ? useNoWrite+' ' : '') + node.cmd);
	            }
	            node = node.nextNode();
	        }
	
	        if(queries.length == 0) {
	
	            Ext.Msg.alert('info', 'Must select any command');
	            return;
	        }
	
	        this.execute(queries, win);
	    },
	
	    close : function (btn, e) {
	        
	        var win = btn.up('window');
	        win.destroy();
	    },
	
	    execute : function (queries, win) {
	            
	        var app  = this.getApplication(),
	            node = app.getSelectedNode(true),
	            db   = app.getParentNode(node);
	
	        win.setLoading(true);
	
	        var tunneling,
	            messages = [];
	        (tunneling = Ext.Function.bind(function () {
	
	            var query = queries.shift();
	
	            if(query) {
	            
	                app.tunneling({
	                    db : db,
	                    query : query,
	                    success : function (config, response) {
	
	                        tunneling();
	                    },
	                    failure : function (config, response) {
	
	                        app.openMessage(app.generateQueryErrorMsg(config.query, response.message));
	                        win.setLoading(false);
	                    }
	                })
	            }
	            else {
	
	                app.openMessage(app.generateSuccessMsg('Information', 'Successfully completed'));
	                win.setLoading(false);
	                win.destroy();
	            }
	
	        }, this))();
	    }
	});

/***/ },
/* 97 */
/***/ function(module, exports) {

	Ext.define('Planche.controller.command.Find', {
	    extend: 'Ext.app.Controller',
	
	    initWindow : function (records) {
	
	        var mainTab = this.application.getConnectTabPanel();
	        var findText = Ext.create('Ext.form.field.Text', {
	            flex : 1, scope: this, listeners : {
	                specialkey: function (field, el) {
	
	                    if (el.getKey() == Ext.EventObject.ENTER) {
	
	                        this.find();
	                    }
	                }
	            }
	        });
	
	        //comment test
	        Ext.create('Planche.lib.Window', {
	            id : 'window-'+this.id,
	            stateful: true,
	            layout: 'hbox',
	            bodyStyle:"background-color:#FFFFFF",
	            width : Ext.getBody().getViewSize().width,
	            height: 40,
	            modal : false,
	            // plain: true,
	            // fixed : true,
	            // frame:true,
	            shadow : false,
	            constrain : true,
	            bodyPadding : '5 5 5 5',
	            headerPosition : 'right',
	            buttonAlign : 'left',
	            defaultAlign : 'bl-bl',
	            defaults : {
	
	                margin : '0 5 0 0'
	            },
	            items : [
	                { xtype: 'button', text: '.*', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                { xtype: 'button', text: 'Aa', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                { xtype: 'button', text: '\"\"', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                { xtype: 'button', text: 'Wrap', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                { xtype: 'button', text: 'In Selection', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                { xtype: 'button', text: 'Highlight', cls : 'btn', scope: this, handler : function (btn) {
	
	                    btn.toggle();
	                }},
	                findText,
	                { xtype: 'button', text: 'Find', cls : 'btn', scope: this, handler : function (btn) {
	
	                    this.find();
	                }},
	                { xtype: 'button', text: 'Find Prev', cls : 'btn', scope: this, handler : function (btn) {
	
	                    this.findPrev();
	                }},
	                { xtype: 'button', text: 'Find All', cls : 'btn', margin : '0 0 0 0', scope: this, handler : function (btn) {
	
	                    this.findAll();
	                }}
	            ]
	        }).showBy(Ext.getBody());
	
	        var pos = { line : 0, ch : 0 };
	        CodeMirror.commands.find = function (cm) {
	
	            var cursor = cm.getCursor();
	            pos = pos.line == cursor.line && pos.ch == cursor.ch ? pos : cm.getCursor();
	
	            var sword = 'e';
	
	            if(!sword) {
	
	                return;
	            }
	            var lastLine = cm.lastLine();
	            var regexp = new RegExp(sword, "gi");
	            var match;
	            var sel = [];
	            var all = false;
	            var index = 0;
	            var from = 0, to = 0;
	            var str = '';
	            var prev = false;
	
	
	            //라인을 검사하여 마지막에 위치해 있는경우 멈춘다.
	            if(pos.line == lastLine && pos.ch) {
	
	            }
	
	            lineLoop:
	            while(typeof (str = cm.getLine(pos.line)) != "undefined") {
	
	                currLine = pos.line;
	
	                // if(prev) {
	
	                //     str = str.slice(0, )
	                // }
	
	                while ((match = regexp.exec(str)) != null) {
	
	                    from = match.index;
	                    to = from + match[0].length;
	
	                    console.log(pos.ch, to);
	                    //debugger;
	                    if(pos.ch >= to) {
	
	                        continue;
	                    }
	
	                    sel.push({
	                        anchor : { line : currLine, ch : from },
	                        head : { line : currLine, ch : to }
	                    });
	
	                    pos = {line : currLine, ch : to };
	
	                    if(all == false) {
	
	                        break lineLoop;
	                    }
	                }
	
	                if(prev) {
	
	                    currLine--;
	
	                    if(currLine < 0) {
	
	                        if(all) {
	
	                            currLine = lastLine;
	                        }
	                        else {
	
	                            currLine = 0;
	                        }
	                    }
	                }
	                else {
	
	                    currLine++;
	
	                    if(currLine > lastLine) {
	
	                        if(all) {
	
	                            currLine = 0;
	                        }
	                        else {
	
	                            currLine = lastLine;
	                        }
	                    }
	                }
	
	                pos = { line : currLine, ch : 0};
	            }
	
	            cm.setSelections(sel);
	        };
	
	
	        CodeMirror.commands.findPrev = function (cm) {
	
	            var cursor = cm.getCursor();
	
	            var line = cm.getLine(cursor.line);
	            var last = cursor.line;
	
	            var sword = findText.getValue();
	
	            if(!sword) {
	
	                return;
	            }
	
	            var regexp = new RegExp(sword, "gi");
	            var match;
	            var sel = [];
	            while(typeof line != "undefined") {
	
	                while ((match = regexp.exec(line)) != null) {
	
	                    sel.push({
	                        anchor : { line : last, ch : match.index },
	                        head : { line : last, ch : match.index + match[0].length }
	                    });
	                }
	
	                last++;
	
	                line = cm.getLine(last);
	            }
	
	            cm.setSelections(sel);
	        };
	
	        CodeMirror.commands.findAll = function (cm) {
	
	            var cursor = cm.getCursor();
	
	            var line = cm.getLine(cursor.line);
	            var last = cursor.line;
	
	            var sword = findText.getValue();
	
	            if(!sword) {
	
	                return;
	            }
	
	            var regexp = new RegExp(sword, "gi");
	            var match;
	            var sel = [];
	            while(typeof line != "undefined") {
	
	                while ((match = regexp.exec(line)) != null) {
	
	                    sel.push({
	                        anchor : { line : last, ch : match.index },
	                        head : { line : last, ch : match.index + match[0].length }
	                    });
	                }
	
	                last++;
	
	                line = cm.getLine(last);
	            }
	
	            cm.setSelections(sel);
	        };
	
	    },
	
	    find : function () {
	
	        var editor = this.application.getActiveEditor();
	        editor.execCommand('find');
	    },
	
	    findPrev : function () {
	
	        var editor = this.application.getActiveEditor();
	        editor.execCommand('findPrev');
	    },
	
	    findAll : function () {
	
	        var editor = this.application.getActiveEditor();
	        editor.execCommand('findAll');
	    }
	});


/***/ },
/* 98 */
/***/ function(module, exports) {

	Ext.define('Planche.Application',{name:'Planche',extend:'Ext.app.Application',requires:["Planche.lib.Base64","Planche.lib.DBUtil","Planche.lib.Menu","Planche.lib.Query","Planche.lib.QueryAlignment","Planche.lib.QueryParser","Planche.lib.QueryTokenType","Planche.lib.SchemaTree","Planche.lib.SchemaUtil","Planche.lib.Window","Planche.lib.QuickCommand","Planche.dbms.mysql","Planche.overrides.FixMenuBug","Planche.overrides.RadioGroup","Planche.lib.setting.Planche-Desktop"],views:["Planche.view.layout.ConnectTab","Planche.view.layout.HistoryTab","Planche.view.layout.InfoTab","Planche.view.layout.MessageTab","Planche.view.layout.QueryEditor","Planche.view.layout.QueryTab","Planche.view.layout.QueryTabPanel","Planche.view.layout.ResultTabPanel","Planche.view.layout.SchemaTree","Planche.view.layout.TableDataTab","Planche.view.layout.Toolbar","Planche.view.layout.Menu","Planche.view.database.CopyDatabaseWindow","Planche.view.database.DatabaseSchemaTree","Planche.view.database.CopyDatabaseTargetList","Planche.view.database.SchemaToHTML","Planche.view.database.DownloadToCSVTargetList","Planche.view.database.DownloadToCSV","Planche.view.table.EditIndexWindow","Planche.view.table.EditSchemaWindow","Planche.view.table.TableIndexesTab","Planche.view.table.TableInfoTab","Planche.view.table.TablePropertiesTab","Planche.view.table.TableSchemaTab","Planche.view.table.TableSQLTab","Planche.view.user.Grant","Planche.view.user.GrantSchemaTree","Planche.view.user.GrantUserList","Planche.view.user.GrantPrivList","Planche.view.user.UserAdd","Planche.view.Viewport","Planche.view.Main"],controllers:["Planche.controller.command.Find","Planche.controller.command.Flush","Planche.controller.command.Process","Planche.controller.command.Quick","Planche.controller.command.Status","Planche.controller.command.Variables","Planche.controller.connection.Connect","Planche.controller.connection.NewConnect","Planche.controller.database.CreateDatabase","Planche.controller.database.CopyDatabaseWindow","Planche.controller.database.SchemaToHTML","Planche.controller.database.DownloadToCSV","Planche.controller.menu.Connection","Planche.controller.menu.Query","Planche.controller.menu.Database","Planche.controller.menu.Edit","Planche.controller.menu.Table","Planche.controller.menu.Export","Planche.controller.menu.Tools","Planche.controller.menu.Help","Planche.controller.query.Token","Planche.controller.menu.bookmark.Planche-Desktop","Planche.controller.layout.SchemaTreeContextMenu","Planche.controller.layout.SchemaTree","Planche.controller.layout.QueryTabPanel","Planche.controller.layout.QueryEditor","Planche.controller.layout.ResultTabPanel","Planche.controller.layout.QueryTab","Planche.controller.layout.MessageTab","Planche.controller.layout.TableDataTab","Planche.controller.layout.InfoTab","Planche.controller.layout.HistoryTab","Planche.controller.layout.ConnectTab","Planche.controller.layout.Toolbar","Planche.controller.table.EditIndexWindow","Planche.controller.table.EditSchemaWindow","Planche.controller.table.AdvancedProperties","Planche.controller.table.EditTextColumn","Planche.controller.table.ReorderColumns","Planche.controller.table.TableSchemaTab","Planche.controller.table.TablePropertiesTab","Planche.controller.table.TableIndexesTab","Planche.controller.table.TableSQLTab","Planche.controller.table.TableInfoTab","Planche.controller.Main","Planche.controller.user.Grant","Planche.controller.user.UserAdd"],stores:["Planche.store.GrantSchemaTree","Planche.store.SchemaTree","Planche.store.DatabaseSchemaTree"]});

/***/ },
/* 99 */
/***/ function(module, exports) {

	Ext.application({
	    name              : 'Planche',
	    extend            : 'Planche.Application',
	    history           : [],
	    taskQueue         : [],
	    onTask            : false,
	    autoCreateViewport: true,
	
	    /**
	     * launch planche
	     *
	     * @class Ext.application
	     * @constructor
	     */
	    launch: function() {
	
	        var app = this;
	
	        // setup the state provider, all state information will be saved to a cookie
	        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
	        //Defense for backspace
	        Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e) {
	
	            if (e.getTarget().type !== 'text' && e.getKey() === '8') {
	
	                e.preventDefault();
	            }
	        });
	
	        //Disable the browser context menu
	        Ext.EventManager.addListener(Ext.getBody(), 'contextmenu', function(e) {
	
	            e.preventDefault();
	        });
	
	        //mapping shortcut
	        app.initKeyMap();
	
	        //init auto connections
	        app.initAutoConnections();
	
	        //open connection window
	        Planche.lib.Setting.isEnableAutoLoadConnectionWindow(function(enable){
	
	            if(enable){
	
	                app.openConnPanel();
	            }
	        });
	
	        //load background tasks
	        app.loadTask();
	
	        //detect event for alter, rename, drop, create table
	        app.detectCRUDEvent();
	
	        //google analaytics
	        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	
	        var analayticsCode = ''
	        if(Planche.platform == 'planche'){
	
	            analayticsCode = 'UA-87997368-1';
	        }
	        else if(Planche.platform == 'planche-wordpress'){
	
	            analayticsCode = 'UA-87997368-2';
	        }
	        else if(Planche.platform == 'planche-desktop'){
	
	            analayticsCode = 'UA-87997368-3';
	        }
	        else if(Planche.platform == 'planche-chrome'){
	
	            analayticsCode = 'UA-87997368-4';
	        }
	
	        if(analayticsCode){
	
	            ga('create', analayticsCode, 'auto');
	            ga('send', 'pageview');
	        }
	    },
	
	    /**
	     /**
	     * Return context menu component of schema tree in left side bar
	     *
	     * @access public
	     * @method getSchemaContextMenu
	     */
	    getSchemaContextMenu: function() {
	
	        return Ext.getCmp('schema-context-menu');
	    },
	
	    /**
	     * Return toolbar component
	     *
	     * @access public
	     * @method getToolBar
	     */
	    getToolBar: function() {
	
	        return Ext.getCmp('planche-toolbar');
	    },
	
	    /**
	     * Return connect tabpanel
	     *
	     * @access public
	     * @method getConnectTabPanel
	     */
	    getConnectTabPanel: function() {
	
	        return Ext.getCmp('connect-tab-panel');
	    },
	
	    /**
	     * Return active connected tab
	     *
	     * @access public
	     * @method getActiveConnectTab
	     */
	    getActiveConnectTab: function() {
	
	        var mainTab = this.getConnectTabPanel();
	        return mainTab.getActiveTab();
	    },
	
	    /**
	     * Return active connected tab's quick command list
	     *
	     * @access public
	     * @method getActiveQuickCommands
	     */
	    getActiveQuickCommands: function() {
	
	        return this.getActiveConnectTab().quickCommand.get();
	    },
	
	    /**
	     * Return footer task progress bar
	     *
	     * @access public
	     * @method getTaskProgressBar
	     */
	    getTaskProgressBar: function() {
	
	        return Ext.getCmp('footer-task-progressbar');
	    },
	
	    updateTaskProgressBar: function(val) {
	
	        var per = Math.ceil(val * 100);
	
	        this.getTaskProgressBar().updateProgress(val, per + '% (Remaining ' + this.getTaskQueue().length + ' task(s))');
	    },
	
	    addTask: function(task, params) {
	
	        this.getTaskQueue().push([task, params]);
	    },
	
	    getTaskQueue: function() {
	
	        return this.taskQueue;
	    },
	
	    getTask: function() {
	
	        return this.getTaskQueue().shift();
	    },
	
	    loadTask: function() {
	
	        var app = this,
	            run;
	
	        (run = function() {
	            setTimeout(function() {
	
	                if (app.onTask) {
	
	                    run();
	                    return;
	                }
	
	                var task = app.getTask();
	
	                if (task) {
	
	                    task[0].apply(app, task[1]);
	                }
	
	                run();
	
	            }, 1000);
	        })();
	
	    },
	
	    /**
	     * Return footer task message
	     *
	     * @access public
	     * @method getTaskMessage
	     */
	    getTaskMessage: function() {
	
	        var el;
	
	        if (el) {
	
	            return el;
	        }
	
	        el = Ext.get('footer-task-message').el;
	        return el;
	    },
	
	    /**
	     * update task message
	     *
	     * @access public
	     * @method updateTaskMessage
	     */
	    updateTaskMessage: function(text) {
	
	        this.getTaskMessage().update(text);
	    },
	
	    /**
	     * Close the active connection tab
	     *
	     * @access public
	     * @method closeActiveConnectionTab
	     */
	    closeActiveConnectionTab: function() {
	
	        var tab = this.getActiveConnectTab();
	        if (!tab) return;
	
	        tab.destroy();
	    },
	
	    /**
	     * Return active query tabpanel in active connect tab
	     *
	     * @access public
	     * @method getQueryTabPanel
	     */
	    getQueryTabPanel: function() {
	        try {
	
	            return this.getActiveConnectTab().down("tabpanel");
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    /**
	     * Return active query tab in active query tabpanel
	     *
	     * @access public
	     * @method getActiveQueryTab
	     */
	    getActiveQueryTab: function() {
	
	        try {
	            return this.getQueryTabPanel().getActiveTab();
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    /**
	     * Return active result tab in active query tab
	     *
	     * @access public
	     * @method getActiveResultTabPanel
	     */
	    getActiveResultTabPanel: function() {
	
	        try {
	
	            return this.getActiveQueryTab().down('tabpanel');
	        }
	        catch (e) {
	
	            return null;
	        }
	    },
	
	    /**
	     * destory active result tab in active result tabpanel
	     *
	     * @access public
	     * @method getActiveResultTabPanel
	     */
	    removeResultTabPanel: function() {
	
	        var tabpanel = this.getActiveResultTabPanel();
	        tabpanel.items.each(function(cmp, idx) {
	            if (idx > 3) cmp.destroy()
	        });
	    },
	
	    /**
	     * Return query editor in active query tab
	     *
	     * @access public
	     * @method getActiveResultTabPanel
	     */
	    getActiveEditor: function() {
	
	        try {
	            return this.getActiveQueryTab().down('query-editor').getEditor();
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    /**
	     * Return query editor's selected sql in active query tab
	     *
	     * @access public
	     * @method getActiveEditorSelection
	     */
	    getActiveEditorSelection: function() {
	
	        try {
	
	            var editor = this.getActiveEditor();
	            if (editor.somethingSelected()) {
	
	                return editor.getSelection();
	            }
	            else {
	
	                return "";
	            }
	        }
	        catch (e) {
	
	            return "";
	        }
	    },
	
	    getActiveTableDataTab: function() {
	
	        try {
	            return this.getActiveQueryTab().down("table-data-tab");
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    getActiveInfoTab: function() {
	
	        try {
	            return this.getActiveQueryTab().down("info-tab");
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    getActiveHistoryTab: function() {
	
	        try {
	            return this.getActiveQueryTab().down("history-tab").getEditor();
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    getActiveMessageTab: function() {
	
	        try {
	            return this.getActiveQueryTab().down("message-tab");
	        }
	        catch (e) {
	            return null;
	        }
	    },
	
	    getAPIS: function() {
	
	        return this.getActiveConnectTab().getAPIS();
	    },
	
	    getSelectedTree: function() {
	
	        return Planche.selectedTree;
	    },
	
	    setSelectedTree: function(tree) {
	
	        Planche.selectedTree = tree;
	    },
	
	    setSelectedNode: function(node) {
	
	        Planche.selectedNode = node;
	    },
	
	    getSelectedNode: function(return_node) {
	
	        if (return_node) {
	
	            return Planche.selectedNode;
	        }
	
	        return Planche.selectedNode.data.text;
	    },
	
	    getSelectedNodeType: function() {
	
	        if (!Planche.selectedNode) {
	
	            return null;
	        }
	
	        return Planche.selectedNode.raw.type;
	    },
	
	    getSelectedDatabase: function(return_node) {
	
	        var node = this.getSelectedNode(true);
	        return this.getParentNode(node, 'database', return_node);
	    },
	
	    getSelectedTable: function(return_node) {
	
	        var node = this.getSelectedNode(true);
	        return this.getParentNode(node, 'table', return_node);
	    },
	
	    getChildNode: function(startNode, path, return_node) {
	
	        if (!path) {
	
	            return null;
	        }
	        if (!startNode) {
	
	            return null;
	        }
	
	        var getNode = function(node, path, return_node) {
	
	            if (node.raw.path == path) {
	
	                return return_node ? node : node.data.text;
	            }
	
	            if (node.childNodes.length == 0) {
	
	                return null;
	            }
	
	            for (var i = 0 ; i < node.childNodes.length ; i++) {
	
	                var n = getNode(node.childNodes[i], path, return_node);
	
	                if (n) {
	
	                    return n;
	                }
	            }
	        };
	
	        return getNode(startNode, path, return_node);
	    },
	
	    getParentNode: function(n, depth_or_type, return_node) {
	
	        if (typeof depth_or_type == "undefined") {
	
	            depth_or_type = 'database';
	        }
	
	        if (!n) {
	
	            return null;
	        }
	
	        var node = null;
	
	        if (typeof depth_or_type == 'string') {
	
	            while (n) {
	
	                if (n.raw.type == depth_or_type) {
	
	                    node = n;
	                    break;
	                }
	
	                n = n.parentNode;
	            }
	        }
	        else {
	
	            if (n.data.depth < depth_or_type) {
	
	                return null;
	            }
	
	            while (n) {
	
	                if (n.data.depth == depth_or_type) {
	
	                    node = n;
	                    break;
	                }
	
	                n = n.parentNode;
	            }
	        }
	
	        if (!node) {
	
	            return null;
	        }
	
	        if (return_node) {
	
	            return node;
	        }
	        else {
	
	            return node.data.text;
	        }
	    },
	
	    reloadTree: function(node) {
	
	        var tree = this.getSelectedTree(),
	            node = node || this.getSelectedNode(true);
	
	        tree.fireEvent('reloadTree', node);
	    },
	
	    reloadNode: function(path) {
	
	        var tree = this.getSelectedTree(),
	            root = tree.getRootNode(),
	            node = this.getChildNode(root, path, true);
	
	        if (node) {
	
	            this.reloadTree(node);
	            node.expand();
	        }
	    },
	
	    reloadTablesNode: function(db) {
	
	        this.reloadNode(['tables', db, 'Tables'].join('`'));
	    },
	
	    checkToolbar: function() {
	
	        var cnt = this.getConnectTabPanel().items.getCount();
	
	        Ext.Array.each(this.getToolBar().items.getRange(1), function(obj, idx) {
	
	            obj[cnt > 0 ? 'enable' : 'disable']();
	        });
	    },
	
	    /**
	     * openWindow
	     *
	     * Open new window in planche
	     *
	     * @access public
	     *
	     * @return
	     */
	    openWindow: function(id) {
	
	        var args = Ext.toArray(arguments),
	            ctrl = this.getController(id),
	            cmp  = Ext.getCmp('window-' + id);
	
	        args.shift();
	
	        if (cmp) {
	
	            cmp.show();
	        }
	        else {
	
	            ctrl.initWindow.apply(ctrl, args);
	        }
	    },
	
	    initAutoConnections : function() {
	
	        var app = this.getApplication();
	
	        Planche.lib.Setting.getHosts(function(hosts){
	
	            Ext.Array.each(hosts, function(host, idx) {
	
	                if (host.autoConnection) {
	
	                    app.initConnectTab(host);
	                }
	            });
	        })
	    },
	
	    initConnectTab: function(connInfo) {
	
	        var main = this.getConnectTabPanel(),
	            tab  = Ext.create('Planche.view.layout.ConnectTab', Ext.Object.merge({
	                title       : connInfo.hostName,
	                quickCommand: Ext.create('Planche.lib.QuickCommand')
	            }, connInfo));
	
	        main.add(tab);
	        main.setActiveTab(tab);
	
	        this.addTask(this.loadQuickCommands, [tab]);
	        return tab;
	    },
	
	    /**
	     * initKeyMap
	     *
	     * initialize key map contents
	     *
	     * @access public
	     *
	     * @return
	     */
	    initKeyMap: function() {
	
	        // map multiple keys to multiple actions by strings and array of codes
	        var map = new Ext.util.KeyMap({
	            target : Ext.getBody(),
	            binding: [{
	                scope: this,
	                key  : Ext.EventObject.F9,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.executeQuery();
	                }
	            }, {
	                scope: this,
	                key  : Ext.EventObject.T,
	                alt  : true,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.openQueryTab();
	                }
	            }, {
	                scope: this,
	                key  : Ext.EventObject.N,
	                alt  : true,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.openConnPanel();
	                }
	            }, {
	                scope: this,
	                key  : [
	                    Ext.EventObject.P,
	                    Ext.EventObject.O
	                ],
	                ctrl : true,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.openQuickPanel();
	                }
	            }, {
	                scope: this,
	                key  : [
	                    Ext.EventObject.P,
	                    Ext.EventObject.O
	                ],
	                alt  : true,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.openQuickPanel();
	                }
	            }, {
	                scope: this,
	                key  : Ext.EventObject.U,
	                alt  : true,
	                fn   : function(keyCode, e) {
	
	                    e.stopEvent();
	                    this.openUserPanel();
	                }
	            }]
	        });
	    },
	
	    pushHistory: function(t, q) {
	
	        q = Ext.String.trim(q);
	        this.history.push('/* ' + Ext.Date.format(new Date(), 'Y-m-d h:i:s') + ' ' + t.toFixed(4) + ' Sec */ ' + q.replace(/[\t\n]+/gi, " "));
	
	        try {
	
	            var editor = this.getActiveHistoryTab();
	            editor.setValue(this.history.join("\n"));
	        }
	        catch (e) {
	
	        }
	    },
	
	    /**
	     * execute query
	     *
	     * @method tunneling
	     * @param {String} config
	     */
	    tunneling: function(config) {
	
	        Ext.Ajax.cors = true;
	        Ext.Ajax.useDefaultXhrHeader = false;
	
	        var app        = this,
	            connection = config.connection || app.getActiveConnectTab();
	
	            // debugger;
	
	        Ext.applyIf(config, {
	            db         : '',
	            type       : 'query',
	            async      : true,
	            timeout    : 1000 * 60 * 5,
	            charset    : 'utf8',
	            port       : 3306,
	            requestType: 'jsonp',
	            method     : 'post',
	            success    : function(config, response) {
	
	                var msg = response.affected_rows + ' row(s) affected<br>';
	                msg += 'Execution Time : 00:00:00:000<br>';
	                msg += 'Transfer Time  : 00:00:00:000<br>';
	                msg += 'Total Time     : 00:00:00:000';
	
	                app.openMessage(msg);
	            },
	            failure    : function(config, response) {
	
	                app.openMessage(app.generateQueryErrorMsg(config.query, response.message));
	            }
	        });
	
	        if (connection) {
	
	            Ext.applyIf(config, {
	                hostName    : connection.getHostName(),
	                host        : connection.getHost(),
	                user        : connection.getUser(),
	                pass        : connection.getPass(),
	                charset     : connection.getCharset(),
	                port        : connection.getPort(),
	                tunnelingURL: connection.getTunnelingURL(),
	                requestType : connection.getRequestType()
	            });
	        }
	
	        this._tunneling(config);
	    },
	
	    _client : function(config){
	
	        var connection = mysql.createConnection({
	          host     : config.host,
	          user     : config.user,
	          password : config.pass,
	          database : config.db,
	          charset  : config.charset,
	          port     : config.port
	        });
	
	        connection.connect();
	
	        connection.query(config.query, function(err, rows, fields) {
	
	          if (err){
	
	              config.failure(config, {
	                  message : err
	              })
	          }
	          else {
	
	              config.success(config, rows)
	          }
	        });
	
	        connection.end();
	    },
	
	    _tunneling : function(config){
	
	        var app = this.getApplication();
	
	        var params = Planche.Base64.encode(Ext.JSON.encode({
	            db     : config.db,
	            host   : config.host,
	            user   : config.user,
	            pass   : config.pass,
	            charset: config.charset,
	            port   : config.port,
	            query  : config.query,
	            type   : config.type
	        }));
	
	        var reqConfig = {
	            url    : config.tunnelingURL,
	            async  : config.async,
	            params : {
	                cmd: params
	            },
	            timeout: config.timeout,
	            success: function(response) {
	
	                if (response.responseText) {
	
	                    response = Ext.JSON.decode(response.responseText);
	                }
	
	                if (response.success === true) {
	
	                    if (config.type == 'query') {
	
	                        app.pushHistory(response.exec_time, config.query);
	                    }
	
	                    config.success.apply(app, [config, response]);
	                }
	                else {
	
	                    config.failure.apply(app, [config, response]);
	                }
	            },
	            failure: function(response) {
	
	                if (response.status === 0) {
	
	                    response = {
	                        success: false,
	                        message: 'Network error : Can\'t connect to tunneling URL'
	                    }
	                }
	
	                if (response.responseText) {
	
	                    response = Ext.JSON.decode(response.responseText);
	                }
	
	                if (response == 'error') {
	
	                    response = {
	                        success: false,
	                        message: 'Network error : Can\'t connect to tunneling URL'
	                    }
	                }
	
	                if (response == 'timeout') {
	
	                    response = {
	                        success: false,
	                        message: 'Can\'t connect to MySQL Server'
	                    }
	                }
	
	                if (response == 'abort') {
	
	                    response = {
	                        success: false,
	                        message: 'This operation was aborted'
	                    }
	                }
	
	                config.failure.apply(app, [config, response]);
	            }
	        };
	
	        var reqType = window.location.protocol == 'file:' ? 'jsonp' : config.requestType;
	
	        if (!config.host || !config.user || !config.pass) {
	
	            reqConfig.failure({
	                success: false,
	                message: 'User connection information is incorrect'
	            });
	
	            return;
	        }
	
	        if (!config.tunnelingURL && Planche.platform != 'planche-desktop') {
	
	            reqConfig.failure({
	                success: false,
	                message: 'Tunneling URL is incorrect'
	            });
	
	            return;
	        }
	
	        if(!config.tunnelingURL && Planche.platform == 'planche-desktop'){
	
	            var result = Planche.tunneling({
	                connnectId : params.host + '@' + params.user,
	                mode       : 'direct',
	                cmd        : reqConfig.params.cmd
	            });
	
	            result.then(
	                function(contents){
	
	                    reqConfig.success({
	                        responseText : contents
	                    });
	                },
	                function(err){
	
	                    reqConfig.failure({
	                        responseText : err
	                    });
	                }
	            )
	        }
	        else {
	
	            if (reqType == 'jsonp') {
	
	                Ext.apply(reqConfig, {
	                    callbackKey: 'callback'
	                });
	
	                Ext.data.JsonP.request(reqConfig);
	            }
	            else {
	
	                Ext.Ajax.request(reqConfig);
	            }
	        }
	    },
	
	    /**
	     * execute mulitple queries and run user callbacks
	     *
	     * @method tunnelings
	     * @param {Object} tunnelings to be tunnneling
	     * @param {Object} config config tunnelings options
	     * @param {Object} scope scope
	     */
	    tunnelings: function(tunnelings, options) {
	
	        var app     = this.getApplication(),
	            options = options || {},
	            execute;
	
	        Ext.applyIf(options, {
	            ignoreFailure: false,
	            start        : function() {},
	            success      : function() {},
	            failure      : function() {}
	        });
	
	        options['start'].apply(app);
	
	        (execute = function() {
	
	            var queue = tunnelings.shift();
	            if (queue) {
	
	                var success = queue['success'],
	                    failure = queue['failure'];
	                app.tunneling(Ext.apply(queue, {
	                    success: function() {
	
	                        if (success) {
	
	                            success.apply(app, arguments);
	                        }
	
	                        execute();
	                    },
	                    failure: function() {
	
	                        if (failure) {
	
	                            failure.apply(app, arguments);
	                        }
	
	                        if (options.ignoreFailure === true) {
	
	                            execute();
	                            return;
	                        }
	
	                        options['failure'].apply(app);
	                    }
	                }));
	            }
	            else {
	
	                //complete all query
	                options['success'].apply(app);
	            }
	        })();
	    },
	
	    pasteSQLStatement: function(db, table, mode) {
	
	        var a    = [], b = [], c = [],
	            app  = this,
	            api  = app.getAPIS(),
	            func = {
	                'insert'          : function(records) {
	
	                    Ext.Array.each(records, function(row) {
	
	                        a.push("`" + row[0] + "`");
	                        b.push("'" + row[0] + "'");
	                    });
	                    return api.getQuery('INSERT_TABLE', db, table, a.join(','), b.join(','));
	                },
	                'duplicate_update': function(records) {
	
	                    Ext.Array.each(records, function(row) {
	
	                        a.push("`" + row[0] + "`");
	                        b.push("'" + row[0] + "'");
	                        if (row[3] != "PRI") {
	
	                            c.push("`" + row[0] + "`= VALUES(" + row[0] + ")");
	                        }
	                    });
	                    return api.getQuery('INSERT_ON_DUPLICATE', db, table, a.join(','), b.join(','), c.join(','));
	                },
	                'update'          : function(records) {
	
	                    Ext.Array.each(records, function(row) {
	
	                        a.push("`" + row[0] + "`='" + row[0] + "'");
	                        if (row[3] == "PRI") { b.push("`" + row[0] + "`='" + row[0] + "'"); }
	                    });
	                    return api.getQuery('UPDATE_TABLE', db, table, a.join(',\n'), b.join(' AND '));
	                },
	                'delete'          : function(records) {
	
	                    Ext.Array.each(records, function(row) {
	
	                        if (row[3] == "PRI") { a.push("`" + row[0] + "`='" + row[0] + "'"); }
	                    });
	                    return api.getQuery('DELETE_TABLE', db, table, a.join(' AND '));
	                },
	                'select'          : function(records) {
	
	                    Ext.Array.each(records, function(row) {
	
	                        a.push("`" + row[0] + "`");
	                    });
	                    return api.getQuery('SELECT_TABLE', db, table, a.join(', '), '');
	                }
	            };
	
	        app.setLoading(true);
	
	        app.tunneling({
	            db     : db,
	            query  : 'DESCRIBE `' + db + '`.`' + table + '`',
	            success: function(config, response) {
	
	                query = app.alignmentQuery(func[mode](response.records));
	                app.setActiveEditorValue(query);
	
	                app.setLoading(false);
	            }
	        });
	    },
	
	    changeTableToType: function(db, table, engine) {
	
	        var app = this;
	
	        app.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('CHANGE_TABLE_TYPE', db, table, engine),
	            success: function(config, response) {
	
	                app.setLoading(false);
	                this.openMessage(this.generateQuerySuccessMsg(config.query, 'Table engine changed to ' + engine));
	            }
	        });
	    },
	
	    createView: function(db) {
	
	        var app = this;
	
	        Ext.Msg.prompt('Create View', 'Please enter new view name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                app.openQueryTab();
	
	                var sql = app.getAPIS().getQuery('CREATE_VIEW', db, name);
	                app.setActiveEditorValue(sql);
	            }
	        }, this);
	    },
	
	    alterView: function(db, view) {
	
	        var app = this;
	
	        app.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_CREATE_VIEW', db, view),
	            success: function(config, response) {
	
	                var query  = app.getAPIS().getQuery('ALTER_VIEW', db, view, response.records[0][1]);
	
	                app.openQueryTab();
	
	                app.setActiveEditorValue(query);
	
	                app.setLoading(false);
	            }
	        });
	    },
	
	    dropView: function(db, view, callback) {
	
	        var app = this;
	        Ext.Msg.confirm('Drop View \'' + view + '\'', 'Do you really want to drop the view?', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : this.getAPIS().getQuery('DROP_VIEW', db, view, ''),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    renameView: function(db, view, callback) {
	
	        var app = this;
	
	        Ext.Msg.prompt('Rename View \'' + view + '\' in \'' + db + '\'', 'Please enter new view name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                app.setLoading(true);
	
	                var messages = [];
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('SHOW_CREATE_VIEW', db, view),
	                    success: function(config, response) {
	
	                        var body       = response.records[0][1],
	                            tunnelings = [{
	                                db     : db,
	                                query  : app.getAPIS().getQuery('DROP_VIEW', db, view, ''),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }, {
	                                db     : db,
	                                query  : body.replace('`' + view + '`', '`' + name + '`'),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }];
	
	                        app.tunnelings(tunnelings, {
	                            success: function() {
	
	                                app.setLoading(false);
	
	                                if (callback) {
	
	                                    callback();
	                                }
	                            },
	                            failure: function() {
	
	                                app.openMessage(messages);
	
	                                app.setLoading(false);
	                            }
	                        });
	                    }
	                });
	            }
	        });
	    },
	
	    createProcedure: function(db) {
	
	        Ext.Msg.prompt('Create Procedure', 'Please enter new procedure name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                this.openQueryTab();
	                var sql = this.getAPIS().getQuery('CREATE_PROCEDURE', db, name);
	                this.setActiveEditorValue(sql);
	            }
	        }, this);
	    },
	
	    alterProcedure: function(db, procedure) {
	
	        var app = this;
	
	        app.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_CREATE_PROCEDURE', db, procedure),
	            success: function(config, response) {
	
	                if (response.records.length == 0) {
	
	                    app.setLoading(false);
	                    return;
	                }
	
	                if (!response.records[0][2]) {
	
	                    Ext.Msg.alert('error', 'Unable to retrieve information. Please check your permission.');
	                    app.setLoading(false);
	                    return;
	                }
	
	                this.openQueryTab();
	
	                var query  = this.getAPIS().getQuery('ALTER_PROCEDURE', db, procedure, response.records[0][2]);
	                this.setActiveEditorValue(query);
	
	                app.setLoading(false);
	            }
	        });
	    },
	
	    dropProcedure: function(db, procedure, callback) {
	
	        var app = this;
	
	        Ext.Msg.confirm('Drop Procedure \'' + procedure + '\'', 'Do you really want to drop the procedure?', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : this.getAPIS().getQuery('DROP_PROCEDURE', db, procedure, ''),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    createFunction: function(db) {
	
	        Ext.Msg.prompt('Create Function', 'Please enter new function name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                this.openQueryTab();
	
	                var sql = this.getAPIS().getQuery('CREATE_FUNCTION', db, name);
	                this.setActiveEditorValue(sql);
	            }
	        }, this);
	    },
	
	    alterFunction: function(db, func) {
	
	        var app = this;
	
	        app.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : app.getAPIS().getQuery('SHOW_CREATE_FUNCTION', db, func),
	            success: function(config, response) {
	
	                if (response.records.length == 0) {
	
	                    return;
	                }
	
	                if (!response.records[0][2]) {
	
	                    Ext.Msg.alert('error', 'Unable to retrieve information. Please check your permission.');
	                    return;
	                }
	
	                app.openQueryTab();
	
	                var query  = app.getAPIS().getQuery('ALTER_FUNCTION', db, func, response.records[0][2]);
	                app.setActiveEditorValue(query);
	
	                app.setLoading(false);
	            }
	        });
	    },
	
	    dropFunction: function(db, func, callback) {
	
	        var app = this;
	
	        Ext.Msg.confirm('Drop Function \'' + func + '\'', 'Do you really want to drop the function?', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('DROP_FUNCTION', db, func, ''),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        });
	    },
	
	    createTrigger: function(db) {
	
	        Ext.Msg.prompt('Create Trigger', 'Please enter new trigger name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                this.openQueryTab();
	
	                var sql = this.getAPIS().getQuery('CREATE_TRIGGER', db, name);
	                this.setActiveEditorValue(sql);
	            }
	        }, this);
	    },
	
	    alterTrigger: function(db, trigger) {
	
	        var app = this;
	
	        app.setLoading(true);
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_CREATE_TRIGGER', db, trigger),
	            success: function(config, response) {
	
	                app.openQueryTab();
	
	                var query  = app.getAPIS().getQuery('ALTER_TRIGGER', db, trigger, response.records[0][2]);
	                app.setActiveEditorValue(query);
	
	                app.setLoading(false);
	            }
	        });
	    },
	
	    dropTrigger: function(db, trigger, callback) {
	
	        var app = this;
	
	        Ext.Msg.confirm('Drop Trigger \'' + trigger + '\'', 'Do you really want to drop the trigger?', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('DROP_TRIGGER', db, trigger, ''),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    renameTrigger: function(db, trigger, callback) {
	
	        var app = this;
	
	        Ext.Msg.prompt('Rename Trigger \'' + trigger + '\' in \'' + db + '\'', 'Please enter new trigger name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                app.setLoading(true);
	
	                var messages = [];
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('SHOW_CREATE_TRIGGER', db, trigger),
	                    success: function(config, response) {
	
	                        var body       = response.records[0][2],
	                            tunnelings = [{
	                                db     : db,
	                                query  : app.getAPIS().getQuery('DROP_TRIGGER', db, trigger, ''),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }, {
	                                db     : db,
	                                query  : body.replace('`' + trigger + '`', '`' + name + '`'),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }];
	
	                        app.tunnelings(tunnelings, {
	                            success: function() {
	
	                                app.setLoading(false);
	
	                                if (callback) {
	
	                                    callback();
	                                }
	                            },
	                            failure: function() {
	
	                                app.setLoading(false);
	                                app.openMessage(messages);
	                            }
	                        });
	                    }
	                });
	            }
	        });
	    },
	
	    createEvent: function(db) {
	
	        Ext.Msg.prompt('Create Event', 'Please enter new event name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                this.openQueryTab();
	
	                var query = this.getAPIS().getQuery('CREATE_EVENT', db, name);
	                this.setActiveEditorValue(query);
	            }
	        }, this);
	    },
	
	    alterEvent: function(db, event) {
	
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_CREATE_EVENT', db, event),
	            success: function(config, response) {
	
	                this.openQueryTab();
	
	                var query  = this.getAPIS().getQuery('ALTER_EVENT', db, event, response.records[0][3]);
	                this.setActiveEditorValue(query);
	            }
	        });
	    },
	
	    dropEvent: function(db, event, callback) {
	
	        var app = this;
	
	        Ext.Msg.confirm('Drop Event \'' + event + '\'', 'Do you really want to drop the event?', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('DROP_EVENT', db, event, ''),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        });
	    },
	
	    renameEvent: function(db, event, callback) {
	
	        var app = this;
	
	        Ext.Msg.prompt('Rename Event \'' + event + '\' in \'' + db + '\'', 'Please enter new event name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                app.setLoading(true);
	
	                var messages = [];
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('SHOW_CREATE_EVENT', db, event),
	                    success: function(config, response) {
	
	                        var body       = response.records[0][3],
	                            tunnelings = [{
	                                db     : db,
	                                query  : app.getAPIS().getQuery('DROP_EVENT', db, event, ''),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }, {
	                                db     : db,
	                                query  : body.replace('`' + event + '`', '`' + name + '`'),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            }];
	
	                        app.tunnelings(tunnelings, {
	                            success: function() {
	
	                                app.setLoading(false);
	
	                                if (callback) {
	
	                                    callback();
	                                }
	                            },
	                            failure: function() {
	
	                                app.setLoading(false);
	                                app.openMessage(messages);
	                            }
	                        });
	                    }
	                });
	            }
	        }, this);
	    },
	
	    openConnPanel: function() {
	
	        this.openWindow('connection.Connect');
	    },
	
	    openFindPanel: function() {
	
	        this.openWindow('command.Find');
	    },
	
	    openUserPanel: function() {
	
	        var app = this;
	
	        app.setLoading(true);
	
	        this.tunneling({
	            db     : 'mysql',
	            query  : this.getAPIS().getQuery('SELECT_ALL_USER'),
	            success: function() {
	
	                app.openWindow('user.Grant');
	                app.setLoading(false);
	            }
	        });
	    },
	
	    openTokenPanel: function(tokens) {
	
	        this.openWindow('query.Token', tokens);
	    },
	
	    openProcessPanel: function() {
	
	        this.openWindow('command.Process');
	    },
	
	    openFlushPanel: function() {
	
	        this.openWindow('command.Flush');
	    },
	
	    openStatusPanel: function() {
	
	        this.openWindow('command.Status');
	    },
	
	    openFlushPanel: function() {
	
	        this.openWindow('command.Flush');
	    },
	
	    openVariablesPanel: function() {
	
	        this.openWindow('command.Variables');
	    },
	
	    openQuickPanel: function() {
	
	        this.openWindow('command.Quick');
	    },
	
	    openAlterTableWindow: function(db, table, openTab) {
	
	        this.openWindow('table.EditSchemaWindow', db, table, openTab);
	    },
	
	    openCreateTableWindow: function(db) {
	
	        this.openWindow('table.EditSchemaWindow', db);
	    },
	
	    openAlterIndexWindow: function(db, table, index) {
	
	        this.openWindow('table.EditIndexWindow', db, table, index);
	    },
	
	    openCreateIndexWindow: function(db, table) {
	
	        this.openWindow('table.EditIndexWindow', db, table);
	    },
	
	    openCreateDatabaseWindow: function(db) {
	
	        this.openWindow('database.CreateDatabase', db);
	    },
	
	    openCopyDatabaseWindow: function(type, name) {
	
	        this.openWindow('database.CopyDatabaseWindow', type, name);
	    },
	
	    openSchemaToHTMLWindow: function() {
	
	        this.openWindow('database.SchemaToHTML');
	    },
	
	    openSchemaToCSVWindow: function() {
	
	        this.openWindow('database.DownloadToCSV');
	    },
	
	    openReorderColumns: function(db, table) {
	
	        var app = this;
	        app.setLoading(true);
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_FULL_FIELDS', db, table),
	            success: function(config, response) {
	
	                app.setLoading(false);
	                this.openWindow('table.ReorderColumns', db, table, response);
	            }
	        });
	    },
	
	    openAdvancedProperties: function(db, table) {
	
	        var app = this;
	
	        app.setLoading(true);
	        this.tunneling({
	            db     : db,
	            query  : this.getAPIS().getQuery('SHOW_ADVANCED_PROPERTIES', db, table),
	            success: function(config, response) {
	
	                app.setLoading(false);
	                this.openWindow('table.AdvancedProperties', db, table, response);
	            }
	        });
	    },
	
	    openQueryTab: function() {
	
	        this.initQueryTab('Query');
	    },
	
	    initQueryTab: function(name, closable) {
	
	        this.getQueryTabPanel().fireEvent('initQueryTab', name, closable);
	    },
	
	    createDatabase: function() {
	
	        this.openCreateDatabaseWindow();
	    },
	
	    alterDatabase: function(db) {
	
	        this.openCreateDatabaseWindow(db);
	    },
	
	    dropDatabase: function(db, callback) {
	
	        var app = this;
	        Ext.Msg.confirm('Drop Database \'' + db + '\'', 'Do you really want to drop the database?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : this.getAPIS().getQuery('DROP_DATABASE', db),
	                    success: function(config, response) {
	
	                        var tree = this.getSelectedTree(),
	                            root = tree.getRootNode();
	                        app.reloadTree(root);
	
	                        app.fireEvent('after_drop_database');
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    truncateDatabase: function(db, callback) {
	
	        var app = this;
	        Ext.Msg.confirm('Truncate Database \'' + db + '\'', 'Do you really want to truncate the database?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                var tunnelings = [], messages = [];
	
	                app.setLoading(true);
	
	                app.tunneling({
	                    db     : db,
	                    query  : app.getAPIS().getQuery('SHOW_DATABASE_TABLES', db),
	                    success: function(config, response) {
	
	                        Ext.Array.each(response.records, function(row, idx) {
	
	                            var table = row[0];
	                            tunnelings.push({
	                                db     : db,
	                                query  : app.getAPIS().getQuery('DROP_TABLE', db, table, ''),
	                                failure: function(config, response) {
	
	                                    messages.push(app.generateQueryErrorMsg(config.query, response.message));
	                                }
	                            });
	                        });
	
	                        app.tunnelings(tunnelings, {
	                            success: function() {
	
	                                app.setLoading(false);
	
	                                if (callback) {
	
	                                    callback();
	                                }
	                            },
	                            failure: function() {
	
	                                app.setLoading(false);
	                                app.openMessage(messages);
	                            }
	                        });
	                    }
	                });
	            }
	        }, this);
	    },
	
	    emptyDatabase: function(db, callback) {
	
	        var app = this;
	
	        Ext.Msg.confirm('Empty Database \'' + db + '\'', 'Do you really want to empty the database?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : 'EMPTY DATABASE `' + db + '`',
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    renameTable: function(db, table, callback) {
	
	        var app = this;
	        Ext.Msg.prompt('Rename Table \'' + table + '\' in \'' + db + '\'', 'Please enter new table name:', function(btn, text) {
	
	            if (btn == 'ok') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : this.getAPIS().getQuery('RENAME_TABLE', db, table, db, text),
	                    success: function(config, response) {
	
	                        app.fireEvent('after_rename_table');
	                        app.reloadTablesNode(db);
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response, text);
	                        }
	                    }
	                });
	            }
	        }, this, false, table);
	    },
	
	    truncateTable: function(db, table, callback) {
	
	        var app = this;
	        Ext.Msg.confirm('Truncate Table \'' + table + '\' in \'' + db + '\'', 'Do you really want to truncate the table?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : this.getAPIS().getQuery('TRUNCATE_TABLE', db, table),
	                    success: function(config, response) {
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this);
	    },
	
	    dropTable: function(db, table, callback) {
	
	        var app = this;
	        Ext.Msg.confirm('Drop Table \'' + table + '\' in \'' + db + '\'', 'Do you really want to drop the table?\n\nWarning: You will lose all data!', function(btn, text) {
	
	            if (btn == 'yes') {
	
	                app.setLoading(true);
	
	                this.tunneling({
	                    db     : db,
	                    query  : 'DROP TABLE `' + db + '`.`' + table + '`',
	                    success: function(config, response) {
	
	                        app.fireEvent('after_drop_table');
	                        app.openMessage(app.generateSuccessMsg(config.query, table + ' table was been removed successfully.'));
	                        app.reloadTablesNode(db);
	
	                        app.setLoading(false);
	
	                        if (callback) {
	
	                            callback(config, response);
	                        }
	                    }
	                });
	            }
	        }, this)
	    },
	
	    duplicateTable: function(db, table, callback) {
	
	        var app = this;
	
	        Ext.Msg.prompt('Duplicate Table \'' + table + '\' in \'' + db + '\'', 'Please enter new table name:', function(btn, name) {
	
	            if (btn == 'ok') {
	
	                app.setLoading(true);
	
	                var messages   = [],
	                    tunnelings = [{
	                        db     : db,
	                        query  : app.getAPIS().getQuery('COPY_TABLE_STRUCTURE', db, table, db, name),
	                        failure: function(idx, query, config, response) {
	
	                            messages.push(app.generateQueryErrorMsg(query, response.message));
	                        }
	                    }, {
	                        db     : db,
	                        query  : app.getAPIS().getQuery('COPY_TABLE_DATA', db, table, db, name),
	                        failure: function(idx, query, config, response) {
	
	                            messages.push(app.generateQueryErrorMsg(query, response.message));
	                        }
	                    }];
	
	                app.tunnelings(tunnelings, {
	                    success: function() {
	
	                        app.setLoading(false);
	
	                        app.fireEvent('after_duplicate_table');
	
	                        if (callback) {
	
	                            callback();
	                        }
	                    },
	                    failure: function() {
	
	                        app.setLoading(false);
	                        app.openMessage(messages);
	                    }
	                });
	            }
	        });
	    },
	
	    setActiveEditorValue: function(v) {
	
	        var editor = this.getActiveEditor();
	        t = editor.getValue();
	        editor.setValue(t ? t + "\n" + v : v);
	    },
	
	
	    parseQuery: function(query) {
	
	        var parser  = Ext.create('Planche.lib.QueryParser', this.getAPIS()),
	            queries = parser.parse(query);
	
	        return queries;
	    },
	
	    alignmentQuery: function(query) {
	
	        if (typeof query == 'string') {
	
	            var queries = this.parseQuery(query);
	
	            if (queries.length == 0) {
	
	                return query;
	            }
	
	            var tmp = [];
	            Ext.Array.each(queries, function(query, idx) {
	
	                tmp.push(Planche.lib.QueryAlignment.alignment(query));
	            });
	
	            tmp = tmp.join('\n');
	
	            return tmp;
	        }
	
	        return Planche.lib.QueryAlignment.alignment(query);
	    },
	
	    formatQuery: function(query) {
	
	        if (query) {
	
	            var queries = query;
	        }
	        else {
	
	            var editor = this.getActiveEditor();
	
	            if (!editor) { return; }
	
	            if (editor.somethingSelected()) {
	
	                var queries = editor.getSelection();
	            }
	            else {
	
	                var queries = editor.getValue();
	            }
	        }
	
	        var parser = Ext.create('Planche.lib.QueryParser', this.getAPIS());
	        queries = parser.parse(queries);
	
	        if (queries.length == 0) {
	
	            return;
	        }
	
	        var tmp = [];
	        Ext.Array.each(queries, function(query, idx) {
	
	            tmp.push(Planche.lib.QueryAlignment.alignment(query));
	        });
	
	        tmp = tmp.join('\n\n');
	
	        if (query) {
	
	            return tmp;
	        }
	        else {
	
	            if (editor.somethingSelected()) {
	
	                editor.replaceSelection(tmp);
	            }
	            else {
	
	                editor.setValue(tmp);
	            }
	        }
	    },
	
	    /**
	     * executeQuery
	     *
	     * 선택된 쿼리를 재귀적으로 실행한다.
	     *
	     * @access public
	     *
	     * @return
	     */
	    executeQuery: function() {
	
	        var app     = this,
	            queries = app.getParsedQuery();
	
	        if (queries.length == 0) {
	
	            app.openMessage(app.generateError(
	                'Query was empty',
	                'No query(s) were executed. Please enter a query in the SQL editor or place the cursor inside a query.'
	            ));
	
	            return;
	        }
	
	        this.removeResultTabPanel();
	
	        var panel = app.getActiveMessageTab(),
	            dom   = Ext.get(panel.getEl().query("div[id$=innerCt]")),
	            db    = app.getSelectedDatabase();
	
	        dom.setHTML('');
	
	        var tunneling;
	        var messages = [];
	
	        app.setLoading(true);
	
	        (tunneling = Ext.Function.bind(function() {
	
	            var query = queries.shift();
	
	            if (query) {
	
	                if (query.isDelimiter() === true) {
	
	                    messages.push(app.generateQuerySuccessMsg(
	                        query.raw,
	                        'Change Delimiter'
	                    ));
	
	                    tunneling();
	                    return;
	                }
	
	                app.tunneling({
	                    db     : db,
	                    query  : query.getSQL(),
	                    success: function(config, response) {
	
	                        if (response.is_result_query === true) {
	
	                            app.initQueryResult({
	                                icon    : 'resources/images/icon_table.png',
	                                closable: true,
	                                title   : 'Result'
	                            }, db, query, response);
	                        }
	                        else {
	
	                            var msg = response.affected_rows + ' row(s) affected<br/><br/>';
	                            msg += 'Execution Time : ' + response.exec_time + '<br/>';
	                            msg += 'Transfer Time  : ' + response.transfer_time + '<br/>';
	                            msg += 'Total Time     : ' + response.total_time;
	                            messages.push(app.generateQuerySuccessMsg(query.getSQL(), msg));
	                        }
	
	                        tunneling();
	                    },
	                    failure: function(config, response) {
	
	                        messages.push(app.generateError(query.getSQL(), response.message));
	
	                        app.setLoading(false);
	
	                        tunneling();
	                    }
	                })
	            }
	            else {
	
	                app.setLoading(false);
	
	                app.afterExecuteQuery(messages);
	                app.reloadTree();
	            }
	
	        }))();
	    },
	
	    afterExecuteQuery: function(messages) {
	
	        if (messages.length == 0) { return; }
	
	        this.openMessage(messages);
	    },
	
	    setLoading: function(loading) {
	
	        var connTab = this.getActiveConnectTab();
	
	        if(connTab){
	
	            connTab.setLoading(loading);
	        }
	
	        var stopBtn = Ext.getCmp('toolbar-stop-operation');
	
	        stopBtn.setDisabled(!loading);
	    },
	
	    stopOperation: function() {
	
	        Ext.data.JsonP.abort();
	        Ext.Ajax.abortAll();
	        this.setLoading(false);
	    },
	
	    /**
	     * Trigger openMessage event with  some messages
	     *
	     * @access public
	     * @method getToolBar
	     */
	    openMessage: function(messages) {
	
	        this.getActiveMessageTab().fireEvent('openMessage', messages);
	    },
	
	    generateQueryErrorMsg: function(query, message) {
	
	        return this.generateError('The Query : ' + query, message);
	    },
	
	    generateQuerySuccessMsg: function(query, message) {
	
	        return this.generateSuccessMsg('The Query : ' + query, message);
	    },
	
	    generateSuccessMsg: function(title, message) {
	
	        message = message || "";
	        return '<div class="query_success">' + title + '<span class="message"> ' + message + '</span></div>';
	    },
	
	    generateError: function(title, message) {
	
	        message = message || "";
	        return '<div class="query_err">' + title + '<span class="message"> ' + message + '</span></div>';
	    },
	
	    getParsedQuery: function() {
	
	        var queries = [];
	
	        var editor = this.getActiveEditor();
	
	        if (!editor) { return queries; }
	
	        var parser = Ext.create('Planche.lib.QueryParser', this.getAPIS());
	
	        if (editor.somethingSelected()) {
	
	            return parser.parse(editor.getSelection());
	        }
	        else {
	
	            var cursor = editor.getCursor();
	
	            queries = parser.parse(editor.getValue());
	            var tmp = [];
	            Ext.Array.each(queries, function(query, idx) {
	
	                if (tmp.length > 0) return;
	
	                if (cursor.line == query.eline[0] && cursor.ch <= query.eline[1]) {
	
	                    tmp.push(query);
	                }
	                else if (cursor.line < query.eline[0]) {
	
	                    tmp.push(query);
	                }
	            });
	            return tmp;
	        }
	    },
	
	    openTable: function(db, table) {
	
	        var tab     = this.getActiveTableDataTab(),
	            parser  = Ext.create('Planche.lib.QueryParser', this.getAPIS()),
	            queries = parser.parse(this.getAPIS().getQuery('SELECT_TABLE', db, table, "*", '')),
	            query   = queries[0];
	
	        this.openMode = 'select';
	
	        this.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : query.getSQL(),
	            tab    : tab,
	            success: function(config, response) {
	
	                this.initQueryResult({openTable: table}, db, query, response);
	                this.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                this.openMessage(this.generateQueryErrorMsg(config.query, response.message));
	                this.setLoading(false);
	            }
	        });
	    },
	
	    countTable: function(db, table) {
	
	        var tab     = this.getActiveTableDataTab(),
	            parser  = Ext.create('Planche.lib.QueryParser', this.getAPIS()),
	            queries = parser.parse(this.getAPIS().getQuery('SELECT_COUNT', db, table, "*", '')),
	            query   = queries[0];
	
	        this.openMode = 'count';
	
	        this.setLoading(true);
	
	        this.tunneling({
	            db     : db,
	            query  : query.getSQL(),
	            tab    : tab,
	            success: function(config, response) {
	
	                this.initQueryResult({openTable: table}, db, query, response);
	                this.setLoading(false);
	            },
	            failure: function(config, response) {
	
	                this.openMessage(this.generateQueryErrorMsg(config.query, response.message));
	                this.setLoading(false);
	            }
	        });
	    },
	
	    makeRecords: function(fields, records) {
	
	        var tmp = [];
	        Ext.Array.each(records, function(row, ridx) {
	
	            if (!row) return;
	
	            var record = {};
	            Ext.Array.each(fields, function(col, cidx) {
	
	                record[col.name] = row[cidx];
	            });
	            tmp.push(record);
	        });
	
	        return tmp;
	    },
	
	    initQueryResult: function(config, db, query, response) {
	
	        this.getActiveResultTabPanel().fireEvent('initQueryResult', config, db, query, response);
	    },
	
	    showMessage: function(msg) {
	
	        Ext.Msg.alert('Message', msg);
	    },
	
	    tokenize: function() {
	
	        var editor = this.getActiveEditor();
	
	        if (!editor) { return; }
	        if (!editor.somethingSelected()) {
	
	            this.showMessage('Query is not selected.');
	            return;
	        }
	
	        var queries = editor.getSelection(),
	            queries = this.parseQuery(queries);
	
	        var tokens = [];
	        Ext.Array.each(queries, function(query, idx) {
	
	            Ext.Array.each(query.getTokens(), function(token, idx) {
	
	                tokens.push(token);
	            });
	        });
	
	        this.openTokenPanel(tokens);
	    },
	
	    loadQuickCommands: function(tab) {
	
	        var app        = this,
	            api        = tab.getAPIS(),
	            tree       = tab.child('schema-tree'),
	            tunnelings = [],
	            messages   = [];
	
	        app.onTask = true;
	
	        app.updateTaskMessage('Start quick command indexing');
	
	        tab.quickCommand.init();
	
	        tab.quickCommand.append({
	            icon  : 'execute-query',
	            name  : 'Run/Execute Query',
	            value : 0,
	            method: app.executeQuery
	        });
	        tab.quickCommand.append({
	            icon  : 'connection',
	            name  : 'New Connection',
	            value : 0,
	            method: app.openConnPanel
	        });
	        tab.quickCommand.append({
	            icon  : 'user',
	            name  : 'User Manager',
	            value : 0,
	            method: app.openUserPanel
	        });
	        tab.quickCommand.append({
	            icon  : 'proc',
	            name  : 'Show process list',
	            value : 0,
	            method: app.openProcessPanel
	        });
	        tab.quickCommand.append({
	            icon  : 'fullscreen',
	            name  : 'Change to fullscreen',
	            value : 0,
	            method: app.changeToFullscreen
	        });
	        tab.quickCommand.append({
	            icon  : 'database',
	            name  : 'Create database',
	            value : 0,
	            method: app.createDatabase
	        });
	        tab.quickCommand.append({
	            icon  : 'vars',
	            name  : 'Show variables',
	            value : 0,
	            method: app.openVariablesPanel
	        });
	        tab.quickCommand.append({
	            icon  : 'status',
	            name  : 'Show status',
	            value : 0,
	            method: app.openStatusPanel
	        });
	        tab.quickCommand.append({
	            icon  : 'flush',
	            name  : 'Flush',
	            value : 0,
	            method: app.openFlushPanel
	        });
	
	        tab.quickCommand.append({
	            icon  : 'stop',
	            name  : 'Stop operation',
	            value : 0,
	            method: app.stopOperation
	        });
	
	        var noIndexing = Planche.config.noIndexing || [];
	
	        app.tunneling({
	            connection: tab,
	            db        : '',
	            query     : api.getQuery('SHOW_DATABASE'),
	            success   : function(config, response) {
	
	                var total  = response.records.length,
	                    jobIdx = 1;
	
	                Ext.Array.each(response.records, function(row) {
	
	                    var db = row[0];
	                    if (noIndexing.indexOf(db) > -1) {
	
	                        jobIdx++;
	                        return;
	                    }
	
	                    tab.quickCommand.append({
	                        icon  : 'table',
	                        name  : 'Create table in ' + db,
	                        value : 0,
	                        method: app.openCreateTableWindow,
	                        params: [db]
	                    });
	
	                    tab.quickCommand.append({
	                        icon  : 'database',
	                        name  : 'Drop ' + db + ' database',
	                        value : 0,
	                        method: app.dropDatabase,
	                        params: [db]
	                    });
	
	                    tab.quickCommand.append({
	                        icon  : 'database',
	                        name  : 'Edit ' + db + ' database',
	                        value : 0,
	                        method: app.alterDatabase,
	                        params: [db]
	                    });
	
	                    tab.quickCommand.append({
	                        icon  : 'database',
	                        name  : 'Truncate ' + db + ' database',
	                        value : 0,
	                        method: app.truncateDatabase,
	                        params: [db]
	                    });
	
	                    tab.quickCommand.append({
	                        icon  : 'database',
	                        name  : 'Empty ' + db + ' database',
	                        value : 0,
	                        method: app.emptyDatabase,
	                        params: [db]
	                    });
	
	                    tunnelings.push({
	                        connection: tab,
	                        db        : db,
	                        query     : api.getQuery('SHOW_ALL_TABLE_STATUS', db),
	                        success   : function(config, response) {
	
	                            Ext.Array.each(response.records, function(row, idx) {
	
	                                var table = row[0];
	
	                                app.updateTaskMessage('Indexing `' + db + '`.`' + table + '`');
	
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Open ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.openTable,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Count ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.countTable,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'sql',
	                                    name  : 'Paste SQL: Select ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.pasteSQLStatement,
	                                    params: [db, table, 'select']
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'sql',
	                                    name  : 'Paste SQL: Update ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.pasteSQLStatement,
	                                    params: [db, table, 'update']
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'sql',
	                                    name  : 'Paste SQL: Delete ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.pasteSQLStatement,
	                                    params: [db, table, 'delete']
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'sql',
	                                    name  : 'Paste SQL: Insert ' + table + ' in ' + db,
	                                    value : 0,
	                                    method: app.pasteSQLStatement,
	                                    params: [db, table, 'insert']
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Edit ' + table + ' table in ' + db,
	                                    value : 0,
	                                    method: app.openAlterTableWindow,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Rename ' + table + ' table in ' + db,
	                                    value : 0,
	                                    method: app.renameTable,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Truncate ' + table + ' table in ' + db,
	                                    value : 0,
	                                    method: app.truncateTable,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Drop ' + table + ' table in ' + db,
	                                    value : 0,
	                                    method: app.dropTable,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'Reorder ' + table + ' table column(s) in ' + db,
	                                    value : 0,
	                                    method: app.openReorderColumns,
	                                    params: [db, table]
	                                });
	                                tab.quickCommand.append({
	                                    icon  : 'table',
	                                    name  : 'View ' + table + ' table advanced properties in ' + db,
	                                    value : 0,
	                                    method: app.openAdvancedProperties,
	                                    params: [db, table]
	                                });
	                            });
	
	                            app.updateTaskProgressBar(jobIdx / total);
	                            jobIdx++;
	                        },
	                        failure   : function(config, response) {
	
	                            messages.push(app.generateQueryErrorMsg(query, response.message));
	                        }
	                    });
	                });
	
	                if (response.records.length == 0) {
	
	                    app.onTask = false;
	                    return;
	                }
	
	                app.tunnelings(tunnelings, {
	                    success: function() {
	
	                        app.updateTaskMessage('Indexing completed');
	                        app.onTask = false;
	                    },
	                    failure: function() {
	
	                        app.updateTaskMessage('Indexing Error');
	                        app.openMessage(messages);
	                        app.onTask = false;
	                    }
	                });
	            },
	            failure   : function(config, response) {
	
	                app.updateTaskMessage(response.message);
	                app.onTask = false;
	            }
	        });
	    },
	
	    changeToFullscreen: function() {
	
	        // mozilla proposal
	        var elem = Ext.getBody().el.dom;
	
	        if (elem.requestFullscreen) {
	
	            elem.requestFullscreen();
	
	        } else if (elem.mozRequestFullScreen) {
	
	            elem.mozRequestFullScreen();
	
	        } else if (elem.webkitRequestFullscreen) {
	
	            elem.webkitRequestFullscreen();
	        }
	        else {
	
	            Ext.Msg.alert('info', 'This browser is not support fullscreen mode');
	        }
	    },
	
	    detectCRUDEvent: function() {
	
	        var app     = this,
	            runTask = function() {
	
	                var tab = app.getActiveConnectTab();
	                app.addTask(app.loadQuickCommands, [tab]);
	            };
	
	        app.on('after_create_table', runTask);
	        app.on('after_alter_table', runTask);
	        app.on('after_rename_table', runTask);
	        app.on('after_drop_table', runTask);
	        app.on('after_create_database', runTask);
	        app.on('after_alter_database', runTask);
	        app.on('after_rename_database', runTask);
	        app.on('after_drop_database', runTask);
	    }
	});


/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map