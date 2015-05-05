/* global ga4gh: false, console: false, document: false, window: false */
window.onload = function () {
	'use strict';
	var url = "http://ec2-54-148-207-224.us-west-2.compute.amazonaws.com/ga4gh/v0.5.1";

	ga4gh.variantSets(url).subscribe(function (d) {
		var output = document.getElementById('output1');
		output.value = JSON.stringify(d, null, 4);
		var stats = document.getElementById('stats1');
		stats.innerHTML = "rows: " + d.variantSets.length;
	});
	ga4gh.all.variantSets(url).subscribe(function (d) {
		var output = document.getElementById('output2');
		output.value = JSON.stringify(d, null, 4);
		var stats = document.getElementById('stats2');
		stats.innerHTML = "rows: " + d.length;
	});

	ga4gh.variants(url, {
			start: 41215898,
			end: 41415899,
			referenceName: "17",
			variantSetIds: ['Clinvar']
	}).subscribe(function (d) {
		var output = document.getElementById('output3');
		output.value = JSON.stringify(d, null, 4);
		var stats = document.getElementById('stats3');
		stats.innerHTML = "rows: " + d.variants.length;
	});

	ga4gh.all.variants(url, {
			start: 41215898,
			end: 41415899,
			referenceName: "17",
			pageSize: 50,
			variantSetIds: ['Clinvar']
	}).subscribe(function (d) {
		var max = 200;
		var output = document.getElementById('output4');
		output.value = JSON.stringify(d.slice(0, max), null, 4);
		var stats = document.getElementById('stats4');
		stats.innerHTML = "rows: " + d.length + " (output limited to " + max + ")";
	});
};
