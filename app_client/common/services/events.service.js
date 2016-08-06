(function (){

	// talk with events API
	events.$inject = ['$http'];
	function events($http) {
		var eventById = function (eventid) {
			return $http.get('/api/events/' + eventid);
		};

		var eventsOrg = function () {
			return $http.get('/api/events/org');
		};

		var eventsLocal = function () {
			return $http.get('/api/events/local');
		};

		var addEvent = function (data) {
			// console.log(data);
			return $http.post('/api/events', data);
		};

		var deleteEvent = function (eventid) {
			return $http.delete('/api/events/' + eventid);
		};

		var updateEventById = function (eventid, formData) {
			return $http.put('/api/events/' + eventid, formData);
		};

		var show = false;
		var currentPath = "";
		
		return {
			addEvent : addEvent,
			getEventById : eventById,
			getOrgEvents : eventsOrg,
			getLocalEvents : eventsLocal,
			deleteEvent : deleteEvent,
			updateEventById : updateEventById,
			currentPath : currentPath,
			show : show
		};
	}

	angular
		.module('forumApp')
		.service('events', events);

})();