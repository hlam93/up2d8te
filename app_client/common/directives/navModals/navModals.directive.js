(function () {
  angular
    .module('forumApp')
    .directive('navModals', navModals);

  function navModals () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navModals/navModals.template.html',
      controller: 'navModalCtrl as navmvm'
    };
  }

})();