/**
 * Created by mrDima on 25.01.2016.
 */

angular.module('app')
    .directive('event',['schedule', function() {
        return {
            scope: {
                number: '=',
                duration: '='
            },
            controller: 'eventCtrl',
            templateUrl: 'angular/htmls/event.html'
    }
    }]);

