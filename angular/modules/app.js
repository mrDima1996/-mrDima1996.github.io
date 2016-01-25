/**
 * Created by mrDima on 09.01.2016.
 */
//alert(Date(2016,0,10,0,0,0));

angular.module("app", ['dataManager'])

    .controller('mainCtrl', [ '$scope', 'data', function($scope, data) {



        $scope.currentDate = new Date(2016, 0,30);
        $scope.year = $scope.currentDate.getFullYear();
        data.getNumbEventsOfTheDayUns($scope.currentDate);


    }]);






//.directive('day', function(){
//    return {
//        scope: {
//            dayValue: '='
//        },
//        template: '<div>{{dayValue}}</div>'
//    }
//})
//
//.directive('outerDirective', function(){
//    return {
//        link: function($scope){
//            $scope.days = [1,2,3];
//            $scope.change = function() {
//                $scope.days = [4,5,6];
//            }
//        },
//        template: '<day day-value="day" ng-repeat="day in days"></day> <button ng-click="change()">try Me</button>'
//    }
//})




