/**
 * Created by mrDima on 25.01.2016.
 */

angular.module('app')

    .directive('event',['schedule', function(schedule) {
        return {
            scope: {
                number: '='
            },
            controller: ['$scope', 'data', function($scope, data) {
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

                var element = angular.element;


            }],
            templateUrl: 'angular/htmls/event.html'
    }
    }])


.factory('schedule', function(){
        //вот тут я получаю стандартную высоту события на один час.
        // Так как оно может быть изменено я решил динамически подгружать его из стилей
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {basicH = 70; alert('Высота блока не определена. Выставленно значение по умолчанию')};
        return {
            //получить высоту блока
            getHeight: function(begin, end){
                //проверка на корректность введенного времени
                if (end<begin) return false;
                if ((end>24) || (begin<0)) return false;

                return (end-begin)*basicH-5;
            },
            //получить начальные координа блока, относительно верхнй границы блока "дня"
            getTopCoord: function(begin){
                //проверка на корректность введенного времени
                if (begin<0) return false;
                return begin*basicH+46;
            }
        }
    });
