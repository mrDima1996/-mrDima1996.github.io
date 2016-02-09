/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', ['popUpManager', function(popUpManager){
        return {
            scope: {
                date: '=', // дата этого дня в формате Date
                today: '=' // boolean - этот день - сегодняшний или нет?
            },
            templateUrl: 'angular/htmls/day.html',
            controller: 'dayCtrl',
            link: function(scope, element){
                //Тут я обрабатываю нажание на событие в дне, вызываю всплывающее окно и
                // обрабатываю действия пользователя в нём

                element.on('click', clickHandler);
                function clickHandler(event){
                    var target = angular.element(event.target);
                    var targetScope = target.scope();

                    //передаю в сервис данные об нажатом событии и данные про день, в котором событие произошло
                    popUpManager.pushEvent(targetScope, scope);
                }
            }
        }
    }]);




