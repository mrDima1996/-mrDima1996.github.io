/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
            scope: {
                date: '=' // дата этого дня в формате Date
            },
            templateUrl: 'angular/htmls/day.html',
            controller: 'dayCtrl',
            link: function(scope, element){
                element.on('click', function(e){
                    var target = angular.element(event.target);
                    alert(target.scope().name);
                });
            }
        }
    });




