(function() {

	'use strict';

	angular
		.module('powerApp')
		.controller('PowerController', PowerController);

	function PowerController($scope, $rootScope, Power, md5) {
		var vm = this;

        $scope.total = "?";
        $scope.nightTotal = "?";
        $scope.dayTotal = "?";
        $scope.limit = 3600;
        $scope.expectedTotal = "?";
        $scope.firstTariff = 0.714;
        $scope.secondTariff = 1.638;

        $scope.formData = {
            date: new Date(),
            night: 0,
            day: 0,
            reset: false
        };

        Power.$watch(function(event) {
            var preLastReset = null;
            var lastReset = null;
            var last = null;
            Power.forEach(function(item, i, arr) {
               if (item.reset || lastReset == null) {
                 preLastReset = lastReset;
                 lastReset = item;
               }
               last = item;
            });

            if (preLastReset != null && lastReset == last) {
                lastReset = preLastReset;
            }

            $scope.dayTotal = last.day - lastReset.day;
            $scope.nightTotal = last.night - lastReset.night;

            $scope.total = $scope.dayTotal + $scope.nightTotal;

            var hours = getHours(last.date - lastReset.date);
            $scope.avg = $scope.total / hours;

            var firstDayOfNextMonth = new Date();
            var lastDate = new Date(lastReset.date);
            if (lastDate.getMonth() == 11) {
                firstDayOfNextMonth = new Date(lastDate.getFullYear() + 1, 0, 1);
            } else {
                firstDayOfNextMonth = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1);
            }

            var hoursLeft = getHours(firstDayOfNextMonth.getTime() - last.date);
            $scope.expectedTotal = $scope.total + hoursLeft * $scope.avg;

            var dayPart = $scope.dayTotal / $scope.total;

            var expectedDay = $scope.expectedTotal * dayPart;
            var expectedNight = $scope.expectedTotal * (1 - dayPart);

            $scope.totalPrice = $scope.firstTariff * expectedDay + $scope.firstTariff * expectedNight / 2;

        });

		vm.addPower = addPower;
		vm.deletePower = deletePower;
		vm.md5 = md5;
		vm.powerData = Power;

		function addPower() {
				// Add the status data to Firebase
				vm.powerData.$add({
				    night: parseInt($scope.formData.night),
				    day: parseInt($scope.formData.day),
				    reset: $scope.formData.reset,
				    date: $scope.formData.date.getTime()
				});
		}

		function deletePower(item) {
			// Remove the status that was passed in
			// from the views
			vm.powerData.$remove(item)
		}

		function getHours(millis) {
		    return millis / 1000 / 60 / 60;
		}
	}

})();