(function() {

  'use strict';

  angular
    .module('statusApp')
    .factory('Auth', AuthService);

  function AuthService($firebaseAuth) {
    var ref = new Firebase("https://statusangularapp.firebaseio.com");
    return $firebaseAuth(ref);
  }

})();
