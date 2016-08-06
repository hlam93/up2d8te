(function () {
  angular
  .module('forumApp')
  .controller('toolTipCtrl', toolTipCtrl);

  toolTipCtrl.$inject = ['$scope', '$sce'];
  function toolTipCtrl ($scope, $sce) {

    $scope.placement = {
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'left-top',
        'left-bottom',
        'right',
        'right-top',
        'right-bottom'
      ],
      selected: 'top'
    };
  }
})();