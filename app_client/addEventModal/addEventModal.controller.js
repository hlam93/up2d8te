(function () {
	angular
		.module('forumApp')
		.controller('addEventModalCtrl', addEventModalCtrl);

	addEventModalCtrl.$inject = ['$uibModalInstance', 'events', 'path', 'authentication'];
	function addEventModalCtrl ($uibModalInstance, events, path, authentication) {
		var vm = this;

		vm.onSubmit = function () {
			vm.formError = "";
			// Validation check
			if (!vm.formData || !vm.formData.eventName || !vm.formData.dateTime 
				|| !vm.formData.eventLocation || !vm.formData.eventInfo) {
				vm.formError = "All fields required, please try again";
				return false;
			} else if (Number(vm.formData.dateTime) <= Number(Date.now())) {
				vm.formError = "Please pick a valid date";
				return false;
			} else {
				vm.formData.firstName = authentication.currentUser().firstName;
				vm.doAddEvent(vm.formData);
			}
		};

		vm.doAddEvent = function (formData) {
			console.log(formData);
			events
			.addEvent({
				cat: path,
				name: formData.eventName,
				createdBy : formData.firstName,
				time: formData.dateTime,
				location : formData.eventLocation,
				info: formData.eventInfo
			})
			.success(function(data) {
				vm.modal.close(data);
			})
			.error(function(data) {
				vm.formError = "Could not create your event, try again."
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