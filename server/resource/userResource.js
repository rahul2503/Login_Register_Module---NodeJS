var express = require('express');

var router = express.Router();
module.exports = router;

var mongoConfig = require('../mongoConfig');

var userService = require('.././service/userService');

module.exports.registerUser = function(req, res) {
	console.log("registerUser");

	userService.newUserRegistration(req, function(success, newUser) {
		if (success) {
			var user = JSON.parse(newUser);
			console.log('registration successful');
			res.send(user);
		} else {
			console.log('registration unsuccessful');
			res.send(user);
		}
	});
};


module.exports.loginUser = function(req, res) {
	console.log("loginUser");

	userService.login(req, function(success, user) {
		if (success) {
			var loginUser = JSON.parse(user);
			console.log('login successful');
			res.send(loginUser);
		} else {
			console.log('login unsuccessful');
			res.send({'success': false, 'error': 'login Failed'});
		}
	});
};


module.exports.updateUserProfile = function(req, res) {
	console.log("updateUserProfile");

	userService.updateProfile(req, function(success, user) {
		if (success) {
			var userProfile = JSON.parse(user);
			console.log('updateProfile success');
			res.send(userProfile);
		} else {
			console.log('updateProfile unsuccessful');
			res.send({'success': false, 'error': 'Failed to update profile'});
		}
	});
};


module.exports.getUserProfile = function(req, res) {
	console.log("getUserProfile");

	userService.getProfile(req, function(success, user) {
		if (success) {
			var userProfile = JSON.parse(user);
			console.log('getProfile success');
			res.send(userProfile);
		} else {
			console.log('getProfile unsuccessful');
			res.send({'success': false, 'error': 'Failed to retrieve profile'});
		}
	});
};

