(function () {
	angular
	.module('forumApp')
	.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location'];
	function registerCtrl ($location) {
		var vm = this;

		vm.mainContent = {
			head: 'Create a new account'
		};

		vm.credentials = {
			firstName : null,
			lastName : null,
			email : null,
			password : null
		};
		vm.formError = null;
		vm.returnPage = $location.search().page || '/';

		// do validation checks
		vm.onSubmit = function () {
			if (!vm.credentials.firstName || !vm.credentials.lastName ||
				!vm.credentials.email || !vm.credentials.password) {
				vm.formError = "All fields required, try again";
				return false;
			} else {
				vm.doRegister();
			}
			vm.formError = null;
		};

		vm.doRegister = function () {
			// authentication service here
			console.log(vm.credentials);
		};
	}
})();