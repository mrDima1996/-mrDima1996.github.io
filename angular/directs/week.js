/**
 * Created by mrDima on 25.01.2016.
 */
angular.module("app")
    .directive('week', function(){
        return {
            link: ['$scope', '$rootScope', function($scope,$rootScope){
                // создает семь дивов (дней), в каждом инкапсулирует его номер
            }],
            template: '<day class="day" date="day.id" ng-repeat="day in daysList" ></day>'
        }
    });