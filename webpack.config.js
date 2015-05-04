/*global module: false, __dirname: false */
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
		"rx.experimental": {
			root: "Rx",
			commonjs: "rx.experimental",
			commonjs2: "rx.experimental",
			amd: "rx.experimental"
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
