(function () {
	angular
		.module('forumApp')
		.service('bible', bible);

	bible.$inject = ['$http'];
	function bible ($http) {
		var getEntries = function () {
			return $http.get('/api/brp');
		};

		var getEntryById = function (entryid) {
			return $http.get('/api/brp/' + entryid);
		};

		var createEntry = function (data) {
			return $http.post('/api/brp', data);
		};

		var updateEntry = function (entryid, data) {
			return $http.put('/api/brp/' + entryid, data);
		};

		var deleteEntry = function (entryid) {
			return $http.delete('/api/brp/' + entryid);
		};

		var getReadings = function (entryid) {
			return $http.get('/api/brp/' + entryid + '/readings');
		};

		var getReadingById = function (entryid, readingid) {
			return $http.get('/api/brp/' + entryid + '/readings/' + readingid);
		};

		var createReading = function (entryid, data) {
			return $http.post('/api/brp/' + entryid + '/readings', data);
		};

		var updateReading = function (entryid, readingid, data) {
			return $http.put('/api/brp/' + entryid + '/readings/' + readingid, data);
		};

		var deleteReading = function (entryid, readingid) {
			return $http.delete('/api/brp/' + entryid + '/readings/' + readingid);
		};

		return {
			getEntries : getEntries,
			getEntryById : getEntryById,
			createEntry : createEntry,
			updateEntry : updateEntry,
			deleteEntry : deleteEntry,
			getReadings : getReadings,
			getReadingById : getReadingById,
			createReading : createReading,
			updateReading : updateReading,
			deleteReading : deleteReading
		};
	}
})();
