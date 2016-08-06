(function (){
	angular
	.module('forumApp')
	.controller('pageHeaderCtrl', pageHeaderCtrl);

	function pageHeaderCtrl () {
		var vm = this;
		vm.list = [
			// left : [
			{
				name: 'BRP',
				url: 'brp'
			},{
				name: 'Organization Schedule',
				url: 'events/org'
			},{
				name: 'Where people At!',
				url: 'events/local'
			// ]
			// right : 'Where people are at!'
		}];
		vm.content = {
			title: 'Up2D8TE',
			strapline: 'What\'s going on?'
		};
	}

})();