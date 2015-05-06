/*global module: false, __dirname: false */
'use strict';

module.exports = {
	entry: "./js/index",
	output: {
		path: "./dist",
		publicPath: "/",
		filename: "ga4gh-rx.js",
		library: "ga4gh",
		libraryTarget: "umd"
	},
	externals: {
		"underscore": {
			root: "_",
			commonjs: "underscore",
			commonjs2: "underscore",
			amd: "underscore"
		},
		"rx": {
			root: "Rx",
			commonjs: "rx",
			commonjs2: "rx",
			amd: "rx"
		},
		"rx-dom": {
			root: "Rx",
			commonjs: "rx-dom",
			commonjs2: "rx-dom",
			amd: "rx-dom"
		}
	},
	module: {
		loaders: [
			{ test: /rx-dom/, loader: "imports?define=>false" },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory=true'}
		]
	},
	plugins: [],
	resolve: {
		extensions: ['', '.js', '.json', '.coffee'],
		root: __dirname + "/js"
	}
};
