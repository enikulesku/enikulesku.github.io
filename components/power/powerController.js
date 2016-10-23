(function() {

	'use strict';

	angular
		.module('powerApp')
		.controller('PowerController', PowerController);

	function PowerController($rootScope, Power, md5) {

		var vm = this;

		vm.addStatus = addStatus;
		vm.deleteStatus = deleteStatus;
		vm.md5 = md5;
		vm.statusData = Power;

		function addStatus() {
			if(vm.statusText) {

				// Add the status data to Firebase
				vm.statusData.$add({
					date: Firebase.ServerValue.TIMESTAMP,
					text: vm.statusText,
					user: {
						username: "",
						email: "jjj"
					}
				});
				vm.statusText = '';
			}
		}

		function deleteStatus(status) {

			// Remove the status that was passed in
			// from the views
			vm.statusData.$remove(status);
		}
	}

})();