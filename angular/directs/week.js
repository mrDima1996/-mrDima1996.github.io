/**
 * Created by mrDima on 25.01.2016.
 */
angular.module("app")
    .directive('week', function(){
        return {
            controller: ['$scope', 'data', function($scope,data){
                // ������� ���� ����� (����), � ������ ������������� ��� �����
                $scope.daysList = data.getCurrentWeek($scope.currentDate);

            }],
            template: '<day class="day" date="day.id" ng-repeat="day in daysList" ></day>'
        }
    });