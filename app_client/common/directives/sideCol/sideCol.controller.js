
// moved to pageHeader directive
(function () {
	angular
		.module('forumApp')
		.controller('sideColCtrl', sideColCtrl);

	sideColCtrl.$inject = ['$scope','geolocation'];
	function sideColCtrl ($scope, geolocation) {
		var vm = this;

		vm.list = [

			{
				name: 'BRP',
				url: 'brp'
			},{
				name: 'Church Schedule',
				url: 'events/church'
			},{
				name: 'Where people At!',
				url: 'events/local'

		}];

		vm.message = "Getting location";
		vm.positionData = function(position) {
			$scope.$apply(function() {
				var lat = position.coords.latitude,
        			lng = position.coords.longitude,
        			acc = position.coords.accuracy;
        			// console.log(acc);
				vm.message = "Geolocation is enabled.";
				vm.posOn = true;
				vm.data = {
					location : [lng, lat]
				};
			});
		};
		vm.showError = function(error) {
			$scope.$apply(function() {
				vm.message = error.message;
			});
		};
		vm.noGeo = function () {
			$scope.$apply(function() {
				vm.message = "Geolocation not supported by this browser.";
			});
		};

		geolocation.getPosition(vm.positionData, vm.showError, vm.noGeo);
	}
})();