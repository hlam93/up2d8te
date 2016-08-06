(function () {

  angular
    .module('forumApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/pageHeader/pageHeader.template.html',
      controller: 'pageHeaderCtrl as phcvm'
    };
  }

})();