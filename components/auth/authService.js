(function() {

  'use strict';

  angular
    .module('powerApp')
    .factory('Auth', AuthService);

  function AuthService($firebaseAuth) {
    var ref = new Firebase("https://vygoda.firebaseio.com");
    return $firebaseAuth(ref);
  }

})();
