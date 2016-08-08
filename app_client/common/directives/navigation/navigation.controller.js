(function () {
	angular
		.module('forumApp')
		.controller('navCtrl', navCtrl);

	navCtrl.$inject = ['$location', 'authentication'];
	function navCtrl ($location, authentication) {
	    var vm = this;
	    
	    vm.currentPath = $location.path();
	    vm.isLoggedIn = authentication.isLoggedIn();
	    vm.currentUser = authentication.currentUser();

	    vm.logout = function () {
	    	authentication.logout();
	    	$location.path('/');
	    };
	}
})();