/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
                scope: {
                date: '=' //инкапсул€ци€ даты дл€ этого дн€
            },
            templateUrl: 'angular/htmls/day.html',
            controller: ['$scope', 'data', function($scope, data) {
                //номера событий в этот день
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);
            }]
        }
    });


