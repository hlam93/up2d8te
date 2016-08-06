(function () {
	angular
	.module('forumApp')
	.controller('editEventModalCtrl', editEventModalCtrl);

	editEventModalCtrl.$inject = ['event', 'modal', '$uibModalInstance'];
	function editEventModalCtrl (event, modal, $uibModalInstance) {
		var vm = this;
		modal = { show : false };
		vm.modal = modal;

		vm.event = event;
		console.log(event);
	}
})();