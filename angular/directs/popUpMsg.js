/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')

.directive('popup', function(){
        return {
            templateUrl: 'angular/htmls/popUpMsg.html',
            controller: 'popUpCtrl'
        }
    });