(function () {
	angular
		.module('forumApp')
		.controller('navModalCtrl', navModalCtrl);

	navModalCtrl.$inject = ['$location', 'authentication'];
	function navModalCtrl ($location, authentication) {
	    var vm = this;
	    vm.currentUser = authentication.currentUser();

	    vm.currentPath = $location.path();
	}
})();