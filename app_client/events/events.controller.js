(function () {
	angular
		.module('forumApp')
		.controller('eventsCtrl', eventsCtrl);

	eventsCtrl.$inject = ['events', '$location'];
	function eventsCtrl (events, $location) {
		var vm = this;
		vm.isHome = false;
		vm.isEvent = true;
		vm.currentDate = Date.now();
		events.currentPath = $location.path();
		vm.message = "Getting schedule";

		if ($location.path() === '/events/local') {
			vm.path = 1;
			vm.mainContent = {
				head: 'Informal Events',
			};
			events.getLocalEvents()
				.success(function(data) {
					vm.message = data.length > 0 ? "" : "No events available";
					vm.events = data;
				})
				.error(function (e) {
					vm.message = "Sorry, something's wrong";
					console.log(e);
				});
		} else {
			vm.path = 0;
			vm.mainContent = {
				head: 'Organization Schedule',
			};
			events.getOrgEvents()
				.success(function(data) {
					vm.message = data.length > 0 ? "" : "No events available";
					vm.events = data;
				})
				.error(function (e) {
					vm.message = "Sorry, something's wrong";
					console.log(e);
				})
		}

		// To do
		vm.isValidDate = function() {
			console.log(currentDate);
		}
	}
})();