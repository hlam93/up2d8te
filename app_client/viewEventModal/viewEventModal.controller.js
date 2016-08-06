(function () {
	angular
		.module('forumApp')
		.controller('viewEventModalCtrl', viewEventModalCtrl);

	// viewEventModalCtrl.$inject = ['$uibModalInstance'];
	viewEventModalCtrl.$inject = ['event', '$uibModal', '$uibModalInstance', 'events'];
	function viewEventModalCtrl (event, $uibModal, $uibModalInstance, events) {
		var vm = this;
		vm.event = event;
		vm.readOnly = true;
		// console.log(vm.event);
		// vm.popupEditEventForm = function (event) {
		// 	var modalInstance = $uibModal.open({
		// 		templateUrl: '/editEventModal/editEventModal.view.html',
		// 		controller: 'editEventModalCtrl as eemcvm',
		// 		resolve: {
		// 			event : event,
		// 			modal : this
		// 		}
		// 	});

		// 	modalInstance.result.then(function (data) {
		// 		console.log("do updaet");
		// 		var index = 0;
		// 		for (var i = 0; i < $scope.events.length; i++){
		// 			if ($scope.events[i]._id === event._id)
		// 			{	
		// 				index = i;
		// 				break;
		// 			}
		// 		} // inplace update
		// 			$scope.events[index].name = event.name;
		// 			$scope.events[index].info = event.info;
		// 			$scope.events[index].time = event.time;
		// 			$scope.events[index].location = event.location;
		// 			$scope.events.push(data);
		// 		});
		// };

		vm.toggleReadOnly = function () {
			if (vm.readOnly) {
				vm.readOnly = false;
				vm.edit = true;
			}
			else {
				vm.edit = false;
				vm.readOnly = true;
			}
		};


		vm.doDelete = function (eventId){
			events
			.deleteEvent(eventId)
			.success(function(data) {
				data.delete = true;
				vm.modal.close(data);
			})
			.error(function() {
				console.log("Could not delete event, try again.");
			});
		};

	    vm.onSubmit = function () {
	      vm.formError = "";
	      if (!vm.formData.name || !vm.formData.info) {
	        vm.formError = "All fields required, please try again";
	        return false;
	      } else {
	        vm.doEdit(vm.event._id, vm.formData);
	      }
	    };

		vm.doEdit = function (eventId, formData) {
			formData.doEdit = true;
			events
			.updateEventById(eventId, formData)
			.success(function(data) {
				data.edit = true;
				vm.modal.close(data);
			})
			.error(function() {
				console.log("Could not save changes, try again.");
			});


		};

		vm.modal = {
			close : function (result) {
				$uibModalInstance.close(result);
			},
			cancel : function () {
				$uibModalInstance.dismiss('cancel');
			}
		};
	}
})();