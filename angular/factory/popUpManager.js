/**
 * Created by mrDima on 04.02.2016.
 */
angular.module('app')

.service('popUpManager',['data' ,'schedule', function(data,schedule){
        var popUp;
        var popUpScope;

        /**
         * привязка модуля к конкретному всплывающему окну
         * @param DOMonject - объект на который надо ссылатся
         * @constructor
         */
        function SetPopUp(DOMonject) {
            popUp = DOMonject;
            popUpScope = angular.element(DOMonject).scope();
        }


        function actionHandler(targetScope, dayScope) {

        }

        /**
         * Передать данные для вывода во всплывающем окне
         * @param targetScope - $scope объекта, который надо передать всплывающему окну
         * @param dayScope - $scope того дня, в котором находится объект.
         * @constructor
         */
        function PushEvent(targetScope, dayScope) {
            //Передаю данные во всплывающее окно
            if (targetScope.number === undefined) popUpScope.pushBlankEvent(dayScope.date);
            else popUpScope.pushEvent({
                day: dayScope.date,
                number: targetScope.number,
                time: {
                    begin: targetScope.begin.toString(),
                    end: targetScope.end.toString()
                },
                name: targetScope.name,
                content: targetScope.content
            });
            popUpScope.status='open';
            //показываю окно
            popUp.toggleClass('hidden');

            //ловлю закрытие всплывающего окна
            var listener = popUpScope.$watch('status', function(){
                //обработка возможных ложных срабатываний
                if (popUpScope.status!='open') {
                    switch (popUpScope.userAction) {
                        case 'save':
                            // если новое событие не накладывается на другие
                            var compatible = schedule.checkCompNewEvent(dayScope.eventNumb, popUpScope.source);
                            if (compatible) {
                                data.setEvent(targetScope.number, popUpScope.source);
                                targetScope.updateEvent();
                                dayScope.updateDay();
                                listener(); //сбрасываю watcher.
                                popUp.toggleClass('hidden'); // все в порядке, закрываю всплывающее окно.
                            }
                             else {
                                console.log('mistake schedule'); //если ошибка, то не закрываю окно
                                popUpScope.status = 'open';
                            }

                            break;
                        case 'delete':
                            var agree = confirm('Вы хотите удалить событие "' + targetScope.name +'"?');
                            if (agree) {
                                data.deleteEventFromDay(dayScope.date, targetScope.number);
                                data.deleteEvent(targetScope.number);
                                dayScope.updateDay();
                                listener(); //сбрасываю watcher.
                                popUp.toggleClass('hidden');// все в порядке, закрываю всплывающее окно.
                            }
                            else {
                                console.log('abort delete'); //если пользователь передумал, то не закрываю окно
                                popUpScope.status = 'open';
                            }
                            break;
                        case 'none':
                            console.log('none');
                            listener(); //сбрасываю watcher.
                            popUp.toggleClass('hidden'); // все в порядке, закрываю всплывающее окно.
                            break;
                    }

                }
            });
        };


        return {
            setPopUp: SetPopUp,
            pushEvent: PushEvent
        }
    }]);