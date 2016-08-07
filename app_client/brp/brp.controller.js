(function () {
	angular
		.module('forumApp')
		.controller('brpCtrl', brpCtrl);

	brpCtrl.$inject = ['bible'];
	function brpCtrl (bible) {
		var vm = this;
		vm.isHome = false;
		vm.mainContent = {
			head: 'Bible Reading Plan',
			body: 'Check out our reading plan',
			link: '#'
		};
		
		bible.getEntries()
		.success(function(entries) {
			vm.message = entries.length > 0 ? "" : "No entries available";
			vm.entries = entries;
		})
		.error(function (e) {
			vm.message = 'Sorry, something\'s wrong';
			console.log(e);
		});

	}
})();