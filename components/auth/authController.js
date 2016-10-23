(function() {

	'use strict';

	angular
		.module('powerApp')
		.controller('AuthController', AuthController);

	function AuthController(Auth, User, $state) {

		var vm = this;

		vm.createUser = createUser;
		vm.login = login;

		function createUser() {

			// If there is already a user logged in,
			// log them out before proceeding
			Auth.$unauth();

			Auth.$createUser({
				email: vm.email,
				password: vm.password
			}).then(function(userData) {
				saveUser(userData);
				login()
			}).catch(function(error) {
				vm.error = error;
			});
		}

		function saveUser(userData) {

			var user = User.newUserRef(userData);
			user.username = vm.username;
			user.email = vm.email;

			user.$save().then(function(success) {
				vm.username = null;
				vm.email = null;
				vm.password = null;

				$state.go('power');
			}, function(error) {
				console.log("there was an error! " + error);
			});
		}

		function login() {

			Auth.$authWithPassword({

				email: vm.email,
				password: vm.password
			}).then(function(data) {
				vm.email = null;
				vm.password = null;
				$state.go('power');
			}).catch(function(error) {
				console.log(error);
			});
		}
	}

})();