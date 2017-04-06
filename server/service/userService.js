var express = require('express');
const uuid4 = require('uuid');


var uuid = require('uuid/v4');

var router = express.Router();
module.exports = router;

// var config = require('../config');
var Mongo = require('../mongoConfig');

// db = Mongo.database.Db
// config.database.openDatabase

var userService = require('.././service/userService');

module.exports.newUserRegistration = function(req, callback) {
	console.log('newUserRegistration');
	
	var username = req.body.first_name.concat(String(Math.floor(Math.random()*90000) + 10000));
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email_id = req.body.email_id;
	var password = req.body.password;

	var callbackUserSession = function(success, response) {
		console.log("callbackUserSession");

		if (success) {
			var resp = JSON.parse(response);
			var res = {
				'success': true,
				'user_id': resp.user_id,
				'session_id': resp._id
			}

			callback(true, JSON.stringify(res));
		} else {
			console.log("Error creating session");
			throw new Error('Error creating session');
		}
	}

	var callbackCreateSession = function(success, response) {
		console.log("callbackCreateSession");

		var resp = JSON.parse(response);
		if (success) {
			var session = {
				'user_id': resp._id,
				'created_date': new Date()
			}

			Mongo.insert('T_USER_SESSION', session, callbackUserSession);
		} else {
			var resp = {
				'success': false,
				'reason': 'User Registration Failed'
			};

			callback(false, resp);
		}
	}

	var callbackCheckUserExistence = function(success, response) {
		console.log("callbackCheckUserExistence");

		if (success) {
			var resp = {
				'success': false,
				'reason': 'User already Exists'
			};

			callback(false, JSON.stringify(resp));
		} else {
			var json = {
				'username': username,
				'first_name': first_name,
				'last_name': last_name,
				'email_id': email_id,
				'password': password,
				'created_date': new Date(),
				'last_modified_date': new Date()
			}

			Mongo.insert('T_USER', json, callbackCreateSession);
		}
	}

	Mongo.retrieve('T_USER', {'email_id': email_id}, callbackCheckUserExistence);
};



module.exports.login = function(req, callback) {
	console.log('login');

	email_id = req.body.email_id;
	password = req.body.password;
	session_id = req.body.session_id;

	var callbackUserSession = function(success, response) {
		console.log("callbackUserSession");

		if (success) {
			var resp = JSON.parse(response);

			var res = {
				'success': true,
				'user_id': resp.user_id,
				'session_id': resp._id
			}

			callback(true, JSON.stringify(res));
		} else {
			console.log("Error creating new session");
			throw new Error('Error creating new session');
		}
	}

	var callbackCreateUserSession = function(success, response) {
		console.log("callbackCreateUserSession");

		if (success) {
			var resp = JSON.parse(response);
			var res = {
				'user_id': resp._id,
				'created_date': new Date()
			}

			Mongo.insert('T_USER_SESSION', res, callbackUserSession);
		} else {
			var resp = {'reason': 'Login failed'};
			callback(false, resp);
		}

	}

	var callbackCheckPreviousUserSession = function(success, response) {
		console.log("callbackCheckPreviousUserSession");

		if (success) {
			var resp = JSON.parse(response);
			Mongo.retrieve('T_USER', {'_id': mongo.ObjectID(resp.user_id)}, callbackCreateUserSession);
		} else {
			var resp = {'reason': 'Login Failure'};
			callback(false, resp);
		}
	}

	if (session_id == null) {
		console.log("1");
		Mongo.retrieve('T_USER', {'email_id': email_id, 'password': password}, callbackCreateUserSession);
	} else {
		console.log("2");
		Mongo.retrieve('T_USER_SESSION', {'_id': mongo.ObjectID(session_id)}, callbackCheckPreviousUserSession);
	}
};



module.exports.updateProfile = function(req, callback) {
	console.log("updateProfile");

	session_id = req.body.session_id;
	var callbackUserId = function(success, response) {
		console.log("callbackUserId");

		if (success) {
			var resp = JSON.parse(response);
			var res = {
				
			}
			callback(true, JSON.stringify(resp));
		} else {
			var resp = {'reason': 'Failure updating profile'};
			callback(false, resp);
		}
	}

	var callbackId = function(success, response) {
		console.log("callbackId");

		if (success) {
			var resp = JSON.parse(response);
			var user_id = resp.user_id;

			Mongo.retrieve('T_USER', {'_id': mongo.ObjectID(user_id)})
		} else {
			vsr resp = {'reason': 'session not valid'}
			callback(false, resp);
		}
	}

	Mongo.retrieve('T_USER_SESSION', {'_id': mongo.ObjectID(session_id)}, callbackId);
};



module.exports.getProfile = function(req, callback) {
	console.log("getProfile");

	user_id = req.body.user_id;
	var callbackGetUserProfile = function(success, response) {
		console.log("callbackGetUserProfile");

		if (success) {
			var resp = JSON.parse(response);
			var res = {

			}
			callback(true, JSON.stringify(resp));
		} else {
			var resp = {'reason': 'Failure retrieving profile'};
			callback(false, resp);
		}
	}

	Mongo.retrieve('T_USER_PROFILE', {'user_id': mongo.ObjectID(user_id)}, callbackGetUserProfile);
};


