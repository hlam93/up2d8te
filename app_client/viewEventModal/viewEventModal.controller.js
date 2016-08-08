(function () {
	angular
		.module('forumApp')
		.controller('viewEventModalCtrl', viewEventModalCtrl);

	viewEventModalCtrl.$inject = ['event', '$uibModal', '$uibModalInstance', 'events'];
	function viewEventModalCtrl (event, $uibModal, $uibModalInstance, events) {
		var vm = this;
		vm.event = event;
		vm.readOnly = true;
		vm.hasGuests = event.guestList.length > 0 ? true : false;

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
			.error(function(data) {
				console.log("Could not save changes, try again.");
			});
			return false;
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