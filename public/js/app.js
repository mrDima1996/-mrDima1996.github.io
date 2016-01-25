/**
 * Created by mrDima on 09.01.2016.
 */
//alert(Date(2016,0,10,0,0,0));

angular
    .module("app", [])

    .controller('mainCtrl', [ '$scope', '$rootScope', function($scope,$rootScope) {
        $rootScope.year = 2015; //текущий год
        $rootScope.daysList = [  //—писок всех дней
            {id: '1', events: [1, 2, 3,4,5,6]},
            {id: '2', events: [1]},
            {id: '3', events: []},
            {id: '4', events: [3]},
            {id: '5', events: []},
            {id: '6', events: [4]},
            {id: '7', events: []}
        ];
        $rootScope.eventList = { //список всех событий
            1: {
                name: 'Test',
                describe: 'ololol'
            },
            2: {
                name: 'Test2',
                describe: 'ololol2'
            },
            3: {
                name: 'Test2',
                describe: 'ololol2'
            },
            4: {
                name: 'Test',
                describe: 'ololol'
            },
            5: {
                name: 'Test2',
                describe: 'ololol2'
            },
            6: {
                name: 'Test2',
                describe: 'ololol2'
            }
        };

        $scope.addEvent = function() {
            $rootScope.daysList[0].events.push(2);
            alert( $rootScope.daysList[0].events);
        }

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




