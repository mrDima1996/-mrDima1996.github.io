/**
 * Created by mrDima on 11.01.2016.
 */
angular.module("app")
    .controller('mainCtrl', [ '$scope', function($scope) {
        $scope.currentDate = new Date(2016, 0,30);
        $scope.year = $scope.currentDate.getFullYear();
    }]);