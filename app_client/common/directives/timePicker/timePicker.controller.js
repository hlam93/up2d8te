(function () {
	angular
		.module('forumApp')
		.controller('timePickerCtrl', timePickerCtrl);

	timePickerCtrl.$inject = ['$scope', '$log'];	
	function timePickerCtrl ($scope, $log) {
	  $scope.mytime = new Date().now;

	  $scope.hstep = 1;
	  $scope.mstep = 1;

	  $scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  $scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };

	  $scope.changed = function () {
	    $log.log('Time changed to: ' + $scope.mytime);
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };

	  $scope.openTime = function() {
			$scope.popupTime.opened = true;
	  };

	  $scope.popupTime = {
			opened: false
	  };
	}
})();