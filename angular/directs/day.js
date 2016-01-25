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


                //����� ������ � �������� ����� ���.



                //������ ������� � ���� ����
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

                //������ ����� ������� ����� ���
                $scope.localEvents = [];

                //����������� ������� � ���� ����
                var eventAmount = $scope.eventNumb.length;
                if (eventAmount>0) { //���� ���� �����-������ ������� �������
                   for (var i=0; i< eventAmount; i++) {
                       $scope.localEvents.push(data.getEvent($scope.eventNumb[i])); //�� ����� ������ � ��� � ������ ������� �������
                       //�� ������ �������
                   }
                }
                else { //���� ���� - ������� ������ ���������
                    $scope.localEvents =   {
                            name: '',
                            describe: []};
                }


            }]
        }
    });


