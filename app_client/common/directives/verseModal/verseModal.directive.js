(function () {
	angular
		.module('forumApp')
		.directive('verseModal', verseModal);

	function verseModal () {
		return {
			restrict: 'EA',
			scope: {
				ref : '=ref',
				id : '=id',
				text : '=text'
			},
			templateUrl: '/common/directives/verseModal/verseModal.template.html'
		};
	}
})();