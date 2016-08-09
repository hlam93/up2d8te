(function () {
	angular
	.module('forumApp')
	.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl ($location, authentication) {
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
			authentication
				.register(vm.credentials)
				.error(function (err) {
					vm.formError = err;
				})
				.then(function () {
					$location.search('page', null);
					$location.path(vm.returnPage);
				});
			vm.formError = null;
		};
	}
})();