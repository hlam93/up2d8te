(function () {
	angular
	.module('forumApp')
	.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location'];
	function loginCtrl ($location) {
		var vm = this;

		vm.mainContent = {
			head: 'Sign into UP2D8TE!'
		};

		vm.credentials = {
			email : null,
			password : null
		};
		vm.formError = null;
		vm.returnPage = $location.search().page || '/';

		// do validation checks
		vm.onSubmit = function () {
			vm.formError = "";
			if (!vm.credentials.email || !vm.credentials.password){
				vm.formError = "All fields required, try again";
				return false;
			} else {
				vm.doLogin();	
			}
			vm.formError = null;
		};

		vm.doLogin = function () {
			// authentication service here
			console.log(vm.credentials);
		};
	}
})();