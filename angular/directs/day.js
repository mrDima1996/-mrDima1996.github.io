/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', ['data', function(data){
        return {
            scope: {
                date: '=' // дата этого дня в формате Date
            },
            templateUrl: 'angular/htmls/day.html',
            controller: 'dayCtrl',
            link: function(scope, element){
                var popUp = angular.element(document.getElementById('popUpWrapper'));
                var popUpScope = popUp.scope();
                element.on('click', function(event){
                    var target = angular.element(event.target);
                    var targetScope = target.scope();
                    //Передаю данные во всплывающее окно
                    popUpScope.$apply(function(){
                        popUpScope.source = {
                            day: scope.date,
                            number: targetScope.number,
                            begin: targetScope.begin,
                            end: targetScope.end,
                            name: targetScope.name,
                            content: targetScope.content
                        };
                        popUpScope.status = 'open';

                    });
                    //ловлю закрытие всплывающего окна
                    popUp.toggleClass('hidden');
                    var listener = popUpScope.$watch('status', function(newValue){
                       //data.setEvent(targetScope.number, popUpScope.source);
                        //targetScope.updateEvent();
                        listener(); //сбрасываю watcher.
                    });
                });

            }


        }
    }]);




