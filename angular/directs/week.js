/**
 * Created by mrDima on 25.01.2016.
 */
angular.module("app")
    .directive('week', function(){
        return {
            controller: 'weekCtrl',
            templateUrl: 'angular/htmls/week.html'
        }
    });