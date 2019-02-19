// --------------------------------------------------------------------------
//
// required Node JS modules
//
// --------------------------------------------------------------------------

var path = require('path');

var $bodyParser = require('body-parser');
var $express = require('express');
var $q = require('q');

var app_base = require('./utils/app_base.js');
var RouteSetter = require('./utils/RouteSetter.js');

var cors = require('./utils/CORS.js')({
	'origin': [
		'http://localhost',
		'http://localhost:3000'
	]
});

// --------------------------------------------------------------------------
//
// private variables
//
// --------------------------------------------------------------------------

var routes = RouteSetter([
	path.join(__dirname, '/routes/ConfigRoute.js'),
	/*
	{
		route: express.Router() require('...'),
		baseUrl: '/whatever', //optional
		shutdown: function() {
			
			console.log('shutdown for this route');
			return $q.resolve();
			
		}
	}
	*/
]);

// --------------------------------------------------------------------------
//
// stuff
//
// --------------------------------------------------------------------------

var appObj = app_base('app_base, app.js:', {
	appSettings: [
		{
			name: 'views',
			value: path.join(__dirname, 'utils/hbs_views')
		},
		{
			name: 'view engine',
			value: 'hbs'
		}
	],
	middleware: [
		$bodyParser.json({
			limit: '1mb'
		}),
		$bodyParser.urlencoded({
			parameterLimit: 100000,
			limit: '1mb',
			extended: true
		}),
		//cors.allow,
		$express.static(path.join(__dirname, 'public'))
	],
	routeSetterDef: routes,
	//baseUrl: CONFIG.API.path
	serverPort: 3000,//CONFIG.API.port_internal,
});

module.exports = {
	app: appObj.app,
	shutdown: function() {
		// do necessary shutdown stuff here
		return appObj.shutdown();
	}
}