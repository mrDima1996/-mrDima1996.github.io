/**
 * Created by mrDima on 11.01.2016.
 */
angular.module("app")
    .controller('mainCtrl', [ '$scope','schedule', function($scope, schedule) {
        $scope.currentDate =  new Date(2016, 0, 30);
        $scope.year = $scope.currentDate.getFullYear();
        $scope.getNextWeek = function() {
            return schedule.moveToNextWeek($scope.currentDate);
        };
        $scope.getPrevWeek = function(){
            return schedule.moveToPrevWeek($scope.currentDate);
        };

        $scope.$watch('currentDate.getFullYear()', function(){
            $scope.year = $scope.currentDate.getFullYear();
        })
    }]);