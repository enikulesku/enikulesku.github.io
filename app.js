(function() {

	'use strict';

	angular
		.module('powerApp', ['firebase', 'ngMaterial', 'angular-md5', 'ui.router', 'mdPickers'])
		.config(function($stateProvider, $urlRouterProvider) {

		// If a route other than status is requested,
		// go to the auth route
		$urlRouterProvider.otherwise('/auth');

		$stateProvider
			.state('auth', {
				url: '/auth',
				templateUrl: 'components/auth/authView.html',
				controller: 'AuthController as auth'
			})
			.state('power', {
				url: '/power',
				templateUrl: 'components/power/powerView.html',
				controller: 'PowerController as power'
			});
		})
		.run(function($rootScope, $state, User) {

			// Listen for changes to the state and run the code
			// in the callback when the change happens
			$rootScope.$on('$stateChangeStart', function() {

				// Use the User service to get the currently
				// logged-in user from local storage
				var loggedInUser = User.getLoggedInUser();

				// Check that we actually have a logged-in user
				// saved in local storage
				if(loggedInUser) {

					// Use the getUserData method on the User service
					// to grab the data from the /users endpoint in
					// Firebase for the logged-in user
					$rootScope.loggedInUserData = User.getUserData(loggedInUser.uid);
				}
			});
		});

	})();