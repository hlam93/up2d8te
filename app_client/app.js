// ExpressJS delegates the rest of routing to AngularJS app
// good practice to wrap in IIFE, limit global vars

(function () {
	angular
		.module('forumApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

	/*
	Each view, controller, service, and filter should be contained
	in a separate file. The files should have a consistent naming convention,
	and be grouped together in functional folders.
	*/
	
	// angular routing through $routeProvider via ngRoute
	// $locationProvider native to node
	function config ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'common/views/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/brp', {
				templateUrl: 'common/views/home.view.html',
				controller: 'brpCtrl',
				controllerAs: 'vm'
			})
			.when('/events/org', {
				templateUrl: 'common/views/home.view.html',
				controller: 'eventsCtrl',
				controllerAs: 'vm'
			})
			.when('/events/local', {
				templateUrl: 'common/views/home.view.html',
				controller: 'eventsCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});

		// Turn ON html5Mode for SPA, removes # from URL
		$locationProvider.html5Mode(true);
	}

	angular
		.module('forumApp')
		.config(['$routeProvider', '$locationProvider', config]);

})();