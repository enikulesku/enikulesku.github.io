(function() {

  'use strict';

  angular
    .module('powerApp')
    .factory('Power', PowerService);

  function PowerService($firebaseArray) {
    var ref = new Firebase("https://vygoda.firebaseio.com/power");
    return $firebaseArray(ref.orderByChild("date"));
  }

})();
