(function () {
	angular
		.module('forumApp')
		.controller('mainBodyCtrl', mainBodyCtrl);

	mainBodyCtrl.$inject = ['$scope', '$uibModal', 'events', 'bible', 'authentication'];
	function mainBodyCtrl ($scope, $uibModal, events, bible, authentication) {
		var vm = this;
		vm.content = $scope.content.body;
		vm.path = $scope.path;
		vm.isLoggedIn = authentication.isLoggedIn();

		vm.popupAddEventForm = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/addEventModal/addEventModal.view.html',
				controller: 'addEventModalCtrl as vm',
				resolve : {
					path : vm.path
				}
			});

			modalInstance.result.then(function (data) {
				$scope.events.push(data);
			});
		};

		vm.popupViewEvent = function (event) {
			var modalInstance = $uibModal.open({
				templateUrl: '/viewEventModal/viewEventModal.view.html',
				controller: 'viewEventModalCtrl as emcvm',
				resolve : {
					event: event
				}
			});

			// adjust the list if we make a change
			modalInstance.result.then(function (data) {
				var index = 0;
				if (data) {
					for (var i = 0; i < $scope.events.length; i++){
						if ($scope.events[i]._id === event._id){
							index = i;
							break;
						}
					}
					if(data.delete)
						$scope.events.splice(index, 1);
					else if(data.edit) {
						$scope.events[index].name = event.name;
						$scope.events[index].info = event.info;
						$scope.events[index].time = event.time;
						$scope.events[index].location = event.location;
					}
				}
			});
		};
	}
})();