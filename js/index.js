/*global require: false, module: false, console: false */
'use strict';

var _ = require('underscore');
var Rx = require('rx-dom');
require('rx.experimental');

var jQuery = require('jquery');
function assertAll(arr) {
	_.each(arr, ([assertion, msg]) => {
		if (!assertion) {
			throw new Error(msg);
		}
	});
}

// immutable 'merge' method for plain js objects.
function merge(...args) {
	return _.extend.apply(null, [{}].concat(args));
}

// immutable 'set' method for plain js objects.
function assoc(o, ...args) {
	return merge(o, _.object.apply(null,
				_.partition(args, (a, i) => i % 2 === 0)));
}

//  XXX check rx versions. It's weird that it's modifying this header.
//	headers: {'Content-Type': 'application/json' },
function post(url, body) {
	return Rx.DOM.ajax(merge({
		url: url,
		body: body
	}, {method: 'POST'})).pluck('response').map(JSON.parse);
}

var methods = {
	variantSets: {
		selector: r => r.variantSets,
		defaults: {datasetIds: []},
		validate: function ({datasetIds}) {
			assertAll([
				[_.isArray(datasetIds), "datasetIds is not array"]
			]);
		},
		query: (url, body) => post(`${url}/variantsets/search`, body)
	},
	variants: {
		selector: r => r.variants,
		defaults: {callSetIds: []},
		validate: function ({start, end, callSetIds, referenceName, variantSetIds}) {
			assertAll([
				[_.isNumber(start), "start position is not number"],
				[_.isNumber(end), "end position is not number"],
				[_.isArray(callSetIds), "callSetsIds is not array"],
				[_.isString(referenceName), "referenceName is not string"],
				[_.isArray(variantSetIds), "variantSetIds is not array"],
				[start >= 0, "start position is negative"],
				[end >= 0, "end position is negative"],
				[end > start, "end is not greater than start"]
			]);
		},
		query: (url, body) => post(`${url}/variants/search`, body)
	},
	referenceSets: {
		selector: r => r.referenceSets,
		defaults: {md5checksums: [], accessions: []},
		validate: function ({md5checksums, accessions, assemblyId}) {
			assertAll([
				[_.isArray(md5checksums), "md5checksums is not array"],
				[_.isArray(accessions), "accessions is not array"],
				[!assemblyId || _.isString(assemblyId), "assemblyId is not string"]
			]);
		},
		query: (url, body) => post(`${url}/referencesets/search`, body)
	},
	references: {
		selector: r => r.references,
		defaults: {md5checksums: [], accessions: []},
		validate: function ({md5checksums, accessions}) {
			assertAll([
				[_.isArray(md5checksums), "md5checksums is not array"],
				[_.isArray(accessions), "accessions is not array"]
			]);
		},
		query: (url, body) => post(`${url}/references/search`, body)
	},
	reads: {
		selector: r => r.alignments,
		defaults: {readGroupIds: []},
		validate: function ({readGroupIds, referenceName, referenceId, start, end}) {
			assertAll([
				[_.isArray(readGroupIds), "readGroupIds is not array"],
				[!referenceName || _.iString(referenceName), "referenceName is not string"],
				[!referenceId || _.iString(referenceId), "referenceId is not string"],
				[_.isNumber(start), "start position is not number"],
				[start >= 0, "start position is negative"],
				[_.isNumber(end), "end position is not number"],
				[end >= 0, "end position is negative"],
				[end > start, "end is not greater than start"]
			]);
		},
		query: (url, body) => post(`${url}/reads/search`, body)
	},
	readGroupSets: {
		selector: r => r.readGroupSets,
		defaults: {datasetIds: []},
		validate: function ({datasetIds, name}) {
			assertAll([
				[_.isArray(datasetIds), "datasetIds is not array"],
				[!name || _.isString(name), "name is not array"]
			]);
		},
		query: (url, body) => post(`${url}/readgroupsets/search`, body)
	},
	callSets: {
		selector: r => r.callSets,
		defaults: {variantSetIds: []},
		validate: function ({variantSetIds, name}) {
			assertAll([
				[_.isArray(variantSetIds), "variantSetIds is not array"],
				[!name || _.isString(name), "name is not array"]
			]);
		},
		query: (url, body) => post(`${url}/callsets/search`, body)
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
		return method.query(url, body).expand(
			r => r.nextPageToken ?
				method.query(url, assoc(body, 'pageToken', r.nextPageToken)) :
				Rx.Observable.empty()
		).map(method.selector).toArray().map(a => _.flatten(a, true)); // XXX ob.reduce would be faster
	};
}

module.exports = assoc(_.mapObject(methods, onePageQuery),
		'all', _.mapObject(methods, allPagesQuery));
