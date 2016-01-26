/**
 * Created by mrDima on 09.01.2016.
 */

angular.module("app", ['dataManager'])

    .controller('mainCtrl', [ '$scope', 'data', function($scope) {
        $scope.currentDate = new Date(2016, 0,30);
        $scope.year = $scope.currentDate.getFullYear();
    }]);









