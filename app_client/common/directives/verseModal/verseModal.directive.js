(function () {
	angular
		.module('forumApp')
		.directive('verseModal', verseModal);

	function verseModal () {
		return {
			restrict: 'EA',
			scope: {
				entry: '=entry'
			},
			templateUrl: '/common/directives/verseModal/verseModal.template.html'
		};
	}
})();