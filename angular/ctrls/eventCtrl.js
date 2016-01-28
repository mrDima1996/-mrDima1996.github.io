/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('eventCtrl', ['$scope', 'data','schedule', function($scope, data, schedule) {
    //получаем данные по этому событию
    //при создании, мы передали сюда его номер
    var eventData = data.getEvent($scope.number);

    $scope.name = eventData.name; //заголовок
    $scope.content = eventData.content; //контент

    $scope.displayContent = $scope.content;
    //if ($scope.content.length>42) $scope.displayContent = $scope.content.slice(0,42)+'...';
    //else $scope.displayContent = $scope.content; //обрезаем контент, если слишком большой

    //высота блока события. Расчитывается исходя из времени начала и конца.
    $scope.aHeight = schedule.getHeight(eventData.time.begin,eventData.time.end);
    if (!$scope.aHeight) $scope.aHeight = '0px';
    else $scope.aHeight += 'px';

    //координаты начала блока события от верхней границы блока дня.
    // Абсолютная высота. Расчитывается из времени начала.
    $scope.topCoord = schedule.getTopCoord(eventData.time.begin);
    if ($scope.topCoord === false) $scope.topCoord = '-200px';
    else  $scope.topCoord +='px';
}]);