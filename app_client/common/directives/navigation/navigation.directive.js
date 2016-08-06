(function () {
  angular
    .module('forumApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navigation/navigation.template.html',
      controller: 'navCtrl as navvm'
    };
  }

})();