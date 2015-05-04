/*global require: false, module: false, __dirname: false */
'use strict';

module.exports = {
	entry: "./js/index",
	output: {
		path: "./dist",
		publicPath: "/",
		filename: "ga4gh-rx.js",
		library: "ga4gh-rxjs",
		libraryTarget: "umd"
	},
	externals: {
		"underscore": "_",
		"rx": "Rx",
		"rx.experimental": "rx-experimental",
		"rx-dom": "rx-dom"
	},
	module: {
		loaders: [
			{ test: /rx-dom/, loader: "imports?define=>false" },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?cacheDirectory=true'}
		]
	},
	plugins: [],
	resolve: {
		alias: {
			rx$: 'rx/dist/rx',
			'rx.binding$': 'rx/dist/rx.binding',
			'rx.async$': 'rx/dist/rx.async',
			'rx.experimental$': 'rx/dist/rx.experimental',
			'rx.coincidence$': 'rx/dist/rx.coincidence'
		},
		extensions: ['', '.js', '.json', '.coffee'],
		root: __dirname + "/js"
	}
};
