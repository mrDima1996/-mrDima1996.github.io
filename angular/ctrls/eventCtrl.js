/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('eventCtrl', ['$scope', 'data','schedule', function($scope, data, schedule) {
   // получаем данные по этому событию
    //при создании, мы передали сюда его номер

        $scope.updateEvent = function() {
            var eventData = data.getEvent($scope.number);

            if ( $scope.number ) $scope.show = 'visible';
            else $scope.show = 'hidden';
            $scope.name = eventData.name; //заголовок
            $scope.content = eventData.content; //контент
            $scope.begin = eventData.time.begin;
            $scope.end = eventData.time.end;

            $scope.displayContent = $scope.content;
            //высота блока события. Расчитывается исходя из времени начала и конца.
            $scope.aHeight = schedule.getHeight($scope.duration);
            if ( !$scope.aHeight ) $scope.aHeight = '0px';
            else $scope.aHeight += 'px';
        };

        $scope.updateEvent();

}]);