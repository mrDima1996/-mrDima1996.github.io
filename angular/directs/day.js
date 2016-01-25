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
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {


                //берем данные о событиях этого дня.

                //номера событий в этот день
                $scope.eventNumb = $rootScope.daysList[$scope.date-1].events;

                //массив самих событий этого дня
                $scope.localEvents = [];

                var eventAmount = $scope.eventNumb.length;
                if (eventAmount>0) { //если есть какие-нибудь события сегодня
                   for (var i=0; i< eventAmount; i++) {
                       $scope.localEvents.push($rootScope.eventList[$scope.eventNumb[i]]); //то кидаю данные о нём в массив всех событий
                       //по его номеру
                   }
                }
                else {
                    $scope.localEvents =   {
                            name: '',
                            describe: []};
                }


            }]
        }
    });


