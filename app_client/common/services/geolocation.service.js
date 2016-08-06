(function () {

  angular
    .module('forumApp')
    .service('geolocation', geolocation);

  function geolocation () {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {enableHighAccuracy: true, timeout: 27000, maximumAge: 30000});
      }
      else {
        cbNoGeo();
      }
    };
    return {
      getPosition : getPosition
    };
  }

})();