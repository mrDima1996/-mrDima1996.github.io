/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
                scope: {
                date: '=' //инкапсуляция даты для этого дня
            },
            templateUrl: 'angular/htmls/day.html',
            controller: ['$scope', 'data', function($scope, data) {


                //берем данные о событиях этого дня.



                //номера событий в этот день
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

                //массив самих событий этого дня
                $scope.localEvents = [];

                //колличество событий в этот день
                var eventAmount = $scope.eventNumb.length;
                if (eventAmount>0) { //если есть какие-нибудь события сегодня
                   for (var i=0; i< eventAmount; i++) {
                       $scope.localEvents.push(data.getEvent($scope.eventNumb[i])); //то кидаю данные о них в массив дневных событий
                       //по номеру события
                   }
                }
                else { //если нету - передаю пустую заготовку
                    $scope.localEvents =   {
                            name: '',
                            describe: []};
                }


            }]
        }
    });


