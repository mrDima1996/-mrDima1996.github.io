/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
.controller('popUpCtrl', ['$scope', function($scope){
        $scope.source = {day: '??', number: 0, time: {begin: '0', end: '0'}, name: 'Название', content: 'Комментарий'};
        $scope.status = 'closed';
        $scope.userAction = 'none';

        /**
         * вывести всплвающее окно для готового события
         * @param data
         */
        $scope.pushEvent = function(data) {
            $scope.$apply(function(){
                //перевожу время в строку, чтобы подвязать с select
                data.time.begin = data.time.begin.toString();
                data.time.end = data.time.end.toString();
                $scope.source = data;
                $scope.userAction = 'none';
            })

        };
        /**
         * Вывести всплывающее окно для пустого события
         * @param day
         */
        $scope.pushBlankEvent = function(day) {
            $scope.$apply(function(){
                $scope.source = {
                    day: day,
                    number: 0,
                    time: {
                        begin: '0',
                        end: '1'
                    },
                    name: 'Название',
                    content: 'Комментарий'
                };
                $scope.userAction = 'none';
            })
        };
        /**
         * возвращает название дня по его номеру
         * @param dayNumb -номер дня в неделе. (В js неделя начинается с воскресенья)
         */
        $scope.convertDay = function(dayNumb){
            switch (dayNumb) {
                case 0:
                    return 'Воскресенье';
                    break;
                case 1:
                    return 'Понедельник';
                    break;
                case 2:
                    return 'Вторник';
                    break;
                case 3:
                    return 'Среда';
                    break;
                case 4:
                    return 'Четверг';
                    break;
                case 5:
                    return 'Пятница';
                    break;
                case 6:
                    return 'Суббота';
                    break;
                default:
                    return '';
                    break;
            }
        };

        $scope.$watch('source.time.begin', function(newValue, oldValue){
           if (parseInt(newValue)>=parseInt($scope.source.time.end)) $scope.source.time.begin = oldValue;
        });

        $scope.$watch('source.time.end', function(newValue, oldValue){
            if (parseInt(newValue)<=parseInt($scope.source.time.begin)) $scope.source.time.end = oldValue;
        });
    }]);