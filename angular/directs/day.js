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
                    if (targetScope.number === undefined) popUpScope.pushBlankEvent(scope.date);
                    else popUpScope.pushEvent({
                        day: scope.date,
                        number: targetScope.number,
                        begin: targetScope.begin.toString(),
                        end: targetScope.end.toString(),
                        name: targetScope.name,
                        content: targetScope.content
                    });

                   //показываю окно
                    popUp.toggleClass('hidden');

                    //ловлю закрытие всплывающего окна
                    var listener = popUpScope.$watch('status', function(newValue){
                       //data.setEvent(targetScope.number, popUpScope.source);
                        //targetScope.updateEvent();
                        listener(); //сбрасываю watcher.
                    });
                });

            }


        }
    }]);




