(function () {
	angular
		.module('forumApp')
		.controller('navModalCtrl', navModalCtrl);

	navModalCtrl.$inject = ['$location'];
	function navModalCtrl ($location) {
	    var vm = this;
	    
	    vm.currentPath = $location.path();
	}
})();