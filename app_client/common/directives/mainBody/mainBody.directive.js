(function () {
	angular
	.module('forumApp')
	.directive('mainBody', mainBody);

	function mainBody () {
		return {
			restrict: 'EA',
			scope: {
				content : '=content',
				message : '=message',
				path : '=path',
				events : '=events',
				entries : '=entries',
				home : '=home'
			},
			templateUrl: '/common/directives/mainBody/mainBody.template.html',
			controller: 'mainBodyCtrl as mbcvm'
		}
	}
})();