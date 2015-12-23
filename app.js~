// app.js

(function() {
  'use strict';

  angular
    .module('statusApp', ['firebase', 'ngMaterial', 'angular-md5', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

    
    $urlRouterProvider.otherwise('/auth');

    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'components/auth/authView.html',
        controller: 'AuthController as auth'
      })
      .state('status', {
        url: '/status',
        templateUrl: 'components/status/statusView.html',
        controller: 'StatusController as status'
      });
    });
})();
