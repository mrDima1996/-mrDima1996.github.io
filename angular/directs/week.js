/**
 * Created by mrDima on 25.01.2016.
 */
angular.module("app")
    .directive('week', function(){
        return {
            link: ['$scope', '$rootScope', function($scope,$rootScope){
                // ������� ���� ����� (����), � ������ ������������� ��� �����
            }],
            template: '<day class="day" date="day.id" ng-repeat="day in daysList" ></day>'
        }
    });