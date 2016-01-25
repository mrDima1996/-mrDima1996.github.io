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
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {


                //����� ������ � �������� ����� ���.

                //������ ������� � ���� ����
                $scope.eventNumb = $rootScope.daysList[$scope.date-1].events;

                //������ ����� ������� ����� ���
                $scope.localEvents = [];

                var eventAmount = $scope.eventNumb.length;
                if (eventAmount>0) { //���� ���� �����-������ ������� �������
                   for (var i=0; i< eventAmount; i++) {
                       $scope.localEvents.push($rootScope.eventList[$scope.eventNumb[i]]); //�� ����� ������ � �� � ������ ���� �������
                       //�� ��� ������
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


