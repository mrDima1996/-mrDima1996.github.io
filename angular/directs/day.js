/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
                scope: {
                date: '=' //������������ ���� ��� ����� ���
            },
            templateUrl: 'angular/htmls/day.html',
            controller: ['$scope', 'data', function($scope, data) {
                //������ ������� � ���� ����
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);
            }]
        }
    });


