(function () {
	angular
	.module('forumApp')
	.service('authentication', authentication);

	authentication.$inject = ['$http', '$window'];
	function authentication ($http, $window) {
		
		var saveToken = function (token) {
			$window.localStorage['up2d8te-token'] = token;
		};
		var getToken = function () {
			return $window.localStorage['up2d8te-token'];
		};

		register = function (user) {
			return $http.post('/api/register', user).success(function(data) {
				saveToken(data.token);
			});
		};

		login = function (user) {
			return $http.post('/api/login', user).success(function(data) {
				saveToken(data.token);
			});
		};

		logout = function (user) {
			$window.localStorage.removeItem('up2d8te-token');
		};

		var isLoggedIn = function () {
			var token = getToken();
			if (token) {
				// decode payload and parse to JSON
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				// validate whether expiry date has passed
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var currentUser = function () {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email : payload.email,
					firstName : payload.firstName,
					lastName : payload.lastName
				};
			}
		};
		
		return {
			saveToken : saveToken,
			getToken : getToken,
			login : login,
			logout : logout,
			register : register,
			isLoggedIn : isLoggedIn,
			currentUser : currentUser
		};
	}
})();