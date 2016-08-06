(function () {
	angular
		.module('forumApp')
		.directive('sideCol', sideCol);

	function sideCol () {
		return {
			restrict: 'EA',
			templateUrl: '/common/directives/sideCol/sideCol.template.html',
			controller: 'sideColCtrl as scvm'
		};
	}
})();