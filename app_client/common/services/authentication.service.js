(function () {
	angular
	.module('forumApp')
	.service('authentication');

	authentication.$inject = ['$http', '$window'];
	function authentication ($http, $window) {
		var vm = this;
		test = function () {
			return true;
		};
		
		return {
			test : test
		};
	}
})();