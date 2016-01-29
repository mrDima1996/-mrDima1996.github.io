/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('weekCtrl', ['$scope', 'data', function($scope,data){


         // создает семь дивов (дней), и каждому передает его номер
        $scope.daysList = data.getCurrentWeek($scope.currentDate);
    }]);