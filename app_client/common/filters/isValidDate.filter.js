(function () {
    angular
    .module('forumApp')
    .filter('isValidDate', isValidDate);

    function isValidDate(dateEvent) {
    	console.log(dateEvent);
    	return false;
    }
})();