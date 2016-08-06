(function () {
	angular
		.module('forumApp')
		.controller('navCtrl', navCtrl);

	navCtrl.$inject = ['$location'];
	function navCtrl ($location) {
	    var vm = this;
	    
	    vm.currentPath = $location.path();
	}
})();