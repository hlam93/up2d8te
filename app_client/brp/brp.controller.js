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
		
		vm.bibleData = bible.getVerses();
	}
})();