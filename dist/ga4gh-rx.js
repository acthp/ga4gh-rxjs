(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("rx"), require("rx-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "rx", "rx-dom"], factory);
	else if(typeof exports === 'object')
		exports["ga4gh"] = factory(require("underscore"), require("rx"), require("rx-dom"));
	else
		root["ga4gh"] = factory(root["_"], root["Rx"], root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*global require: false, module: false */
	'use strict';

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	var _ = __webpack_require__(1);
	var Rx = __webpack_require__(2);
	__webpack_require__(3);

	function assertAll(arr) {
		_.each(arr, function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2);

			var assertion = _ref2[0];
			var msg = _ref2[1];

			if (!assertion) {
				throw new Error(msg);
			}
		});
	}

	// immutable 'merge' method for plain js objects.
	function merge() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _.extend.apply(null, [{}].concat(args));
	}

	//  XXX check rx versions. It's weird that it's modifying this header.
	//	headers: {'Content-Type': 'application/json' },
	function post(url, body) {
		return Rx.DOM.ajax({
			url: url,
			body: body,
			method: 'POST'
		}).pluck('response').map(JSON.parse);
	}

	var methods = {
		variantSets: {
			selector: function selector(r) {
				return r.variantSets;
			},
			defaults: { datasetIds: [] },
			validate: function validate(_ref3) {
				var datasetIds = _ref3.datasetIds;

				assertAll([[_.isArray(datasetIds), 'datasetIds is not array']]);
			},
			query: function query(url, body) {
				return post('' + url + '/variantsets/search', body);
			}
		},
		variants: {
			selector: function selector(r) {
				return r.variants;
			},
			defaults: { callSetIds: [] },
			validate: function validate(_ref4) {
				var start = _ref4.start;
				var end = _ref4.end;
				var callSetIds = _ref4.callSetIds;
				var referenceName = _ref4.referenceName;
				var variantSetIds = _ref4.variantSetIds;

				assertAll([[_.isNumber(start), 'start position is not number'], [_.isNumber(end), 'end position is not number'], [_.isArray(callSetIds), 'callSetsIds is not array'], [_.isString(referenceName), 'referenceName is not string'], [_.isArray(variantSetIds), 'variantSetIds is not array'], [start >= 0, 'start position is negative'], [end >= 0, 'end position is negative'], [end > start, 'end is not greater than start']]);
			},
			query: function query(url, body) {
				return post('' + url + '/variants/search', body);
			}
		},
		referenceSets: {
			selector: function selector(r) {
				return r.referenceSets;
			},
			defaults: { md5checksums: [], accessions: [] },
			validate: function validate(_ref5) {
				var md5checksums = _ref5.md5checksums;
				var accessions = _ref5.accessions;
				var assemblyId = _ref5.assemblyId;

				assertAll([[_.isArray(md5checksums), 'md5checksums is not array'], [_.isArray(accessions), 'accessions is not array'], [!assemblyId || _.isString(assemblyId), 'assemblyId is not string']]);
			},
			query: function query(url, body) {
				return post('' + url + '/referencesets/search', body);
			}
		},
		references: {
			selector: function selector(r) {
				return r.references;
			},
			defaults: { md5checksums: [], accessions: [] },
			validate: function validate(_ref6) {
				var md5checksums = _ref6.md5checksums;
				var accessions = _ref6.accessions;

				assertAll([[_.isArray(md5checksums), 'md5checksums is not array'], [_.isArray(accessions), 'accessions is not array']]);
			},
			query: function query(url, body) {
				return post('' + url + '/references/search', body);
			}
		},
		reads: {
			selector: function selector(r) {
				return r.alignments;
			},
			defaults: { readGroupIds: [] },
			validate: function validate(_ref7) {
				var readGroupIds = _ref7.readGroupIds;
				var referenceName = _ref7.referenceName;
				var referenceId = _ref7.referenceId;
				var start = _ref7.start;
				var end = _ref7.end;

				assertAll([[_.isArray(readGroupIds), 'readGroupIds is not array'], [!referenceName || _.iString(referenceName), 'referenceName is not string'], [!referenceId || _.iString(referenceId), 'referenceId is not string'], [_.isNumber(start), 'start position is not number'], [start >= 0, 'start position is negative'], [_.isNumber(end), 'end position is not number'], [end >= 0, 'end position is negative'], [end > start, 'end is not greater than start']]);
			},
			query: function query(url, body) {
				return post('' + url + '/reads/search', body);
			}
		},
		readGroupSets: {
			selector: function selector(r) {
				return r.readGroupSets;
			},
			defaults: { datasetIds: [] },
			validate: function validate(_ref8) {
				var datasetIds = _ref8.datasetIds;
				var name = _ref8.name;

				assertAll([[_.isArray(datasetIds), 'datasetIds is not array'], [!name || _.isString(name), 'name is not string']]);
			},
			query: function query(url, body) {
				return post('' + url + '/readgroupsets/search', body);
			}
		},
		callSets: {
			selector: function selector(r) {
				return r.callSets;
			},
			defaults: { variantSetIds: [] },
			validate: function validate(_ref9) {
				var variantSetIds = _ref9.variantSetIds;
				var name = _ref9.name;

				assertAll([[_.isArray(variantSetIds), 'variantSetIds is not array'], [!name || _.isString(name), 'name is not string']]);
			},
			query: function query(url, body) {
				return post('' + url + '/callsets/search', body);
			}
		}
	};

	function onePageQuery(method) {
		return function (url, props) {
			var body = merge(method.defaults, props);
			method.validate(body);
			return method.query(url, body);
		};
	}

	function allPagesQuery(method) {
		return function (url, props) {
			var body = merge(method.defaults, props);
			method.validate(body);
			return method.query(url, body).expand(function (r) {
				return r.nextPageToken ? method.query(url, merge(body, { pageToken: r.nextPageToken })) : Rx.Observable.empty();
			}).map(method.selector).toArray().map(function (a) {
				return _.flatten(a, true);
			}); // XXX ob.reduce would be faster
		};
	}

	module.exports = merge(_.mapObject(methods, onePageQuery), { all: _.mapObject(methods, allPagesQuery) });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;