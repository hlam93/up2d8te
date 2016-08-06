(function () {
	angular
		.module('forumApp')
		.directive('datePicker', datePicker);

	// datePicker.$inject = [''];
	function datePicker() {
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/datePicker/datePicker.template.html',
			controller: 'datePickerCtrl as dpcvm'
		};
	}
})();