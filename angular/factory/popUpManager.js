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

        /**
         * Обрабатывает нажатие пользователем на любую кнопку
         * и вызывает соответствующие функции для изменения данных
         * @returns {boolean} - возвращает true, если окно можно закрывать и
         * false, если пользователь набаранил и что-то надо поменять.
         */
        function actionHandler() {
            var dayDate =  popUpScope.source.day;
            var dayEvents = data.getNumbEventsOfTheDay(dayDate);
            switch (popUpScope.userAction) {
                case 'save':
                    // если новое событие не накладывается на другие
                    var compatible = schedule.checkCompNewEvent(dayEvents, popUpScope.source);
                    if (compatible) {
                        if (popUpScope.source.number != 0) {
                            data.setEvent(popUpScope.source.number, popUpScope.source);
                            return true;
                        }
                        else {
                            data.createNewEvent(popUpScope.source);
                            data.pushEventToDay(popUpScope.source.day, popUpScope.source.number);
                            return true;
                        }
                    }
                    else {
                        alert('В это время уже что-то запланировано!');
                        return false;
                    }

                    break;
                case 'delete':
                    var agree = confirm('Вы хотите удалить событие "' + popUpScope.source.name +'"?');
                    if (agree) {
                        data.deleteEventFromDay(dayDate, popUpScope.source.number);
                        data.deleteEvent(popUpScope.source.number);
                        return true;
                    }
                    else {
                        console.log('delete denied')
                        return false;
                    }
                    break;
                case 'none':
                    console.log('none');
                    return true;
                    break;
            }
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
                if (popUpScope.status!='open') { //обработка возможных ложных срабатываний
                    if (actionHandler(targetScope, dayScope.date)){
                        listener(); //сбрасываю watcher.
                        popUp.toggleClass('hidden'); // все в порядке, закрываю всплывающее окно.
                        dayScope.updateDay();
                        //targetScope.updateEvent();
                    }
                    else {
                        console.log('mistake schedule'); //если ошибка, то не закрываю окно
                        popUpScope.status = 'open';
                    }

                }
            });
        }


        return {
            setPopUp: SetPopUp,
            pushEvent: PushEvent
        }
    }]);