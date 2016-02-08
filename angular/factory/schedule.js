/**
 * Created by mrDima on 28.01.2016.
 */

//этот модуль необходим для всех расчетов относительно отображения событий на расписании
//Сюда входят:
//-расчет высоты события, в зависимости от его продолжительности
//-И составление очередности событий, исходя из их номеров.
angular.module('app')
    .factory('schedule', ['data', function(data){

        function MoveToNextWeek(date) {
            var newData = new Date(date);
            newData.setDate(newData.getDate() + 7);
            return newData;
        }

        function MoveToPrevWeek(date) {
            var newData = new Date(date);
            newData.setDate(newData.getDate() - 7);
            return newData;

        }

        //вот тут я получаю стандартную высоту события на один час.
        // Так как оно может быть изменено я решил динамически подгружать его из стилей
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {
            basicH = 70;
            alert('Ошибка определения базовой высоты одного часа. Убедитесь, что класс timeContainer имеет характеристику marginBottom');
        }
        /**
         *
         * @param duration - {number}
         * @returns {number}
         */
        function getHeight(duration){
            return duration*basicH;
        }

        function getDayEventData(eventNumb) {
            var singleEventNumb;
            var dayEvents = [];

            //берем данные о времени событий (начало, продолжительность, конец)
            for (var event in  eventNumb){
                singleEventNumb = eventNumb[event]; //берем событие
                dayEvents.push({eNumber: singleEventNumb, timeData: data.getEventTimeData(singleEventNumb)})
            }
            singleEventNumb = null;
            return dayEvents;
        }

        /**
         * формирует объект с событиями типа {id события, {начало, конец}} и сортирует по "началу"
         * @param events
         * @returns {*}
         */
        function sortEvents(dayEvents) {

            dayEvents.sort(function(a, b) {
                if(a.timeData.begin == b.timeData.begin) return 0;
                if(a.timeData.begin > b.timeData.begin) return 1;
                if(a.timeData.begin < b.timeData.begin) return -1;
                return 0; // o_O в независимости от других свойств считаем что объекты равны
            });
            return dayEvents;
        }

        /**
         * проверяет совместимо ли новое событие с существующим расписанием
         * @param eventNumb
         * @param newEvent
         * @returns {boolean} - true, если новое событие никак не налазит на остальые
         */
        function СheckCompNewEvent(eventNumb, newEvent) {
            var dayEvents = getDayEventData(eventNumb);
            dayEvents = sortEvents(dayEvents);
            var localEvent;
            var bBeginDiff;
            var eEndDiff;
            var eBeginDiff;
            var bEndDiff;
            for (event in dayEvents) {
                localEvent = dayEvents[parseInt(event)];
                if ( localEvent !== null ) { // мало ли.
                    if ( localEvent.eNumber != newEvent.number ) {
                        // все разницы между координатами должны быть одного знака (либо больше, либо меньше)
                        //тогда события гарантированно не пересекаются.

                        bBeginDiff = (localEvent.timeData.begin < newEvent.time.begin);
                        eEndDiff = (localEvent.timeData.end < newEvent.time.end);
                        if ( bBeginDiff != bBeginDiff ) return false;


                        //если событие начинается, когда заканчивается другое, то одна проверка не проводится.
                        if ( localEvent.timeData.end == newEvent.time.begin ) {
                            bEndDiff = (localEvent.timeData.begin < newEvent.time.end);
                            if ( bEndDiff != bBeginDiff ) return false;
                        }
                        // то же самое, если событие заканчивается и сразу после него начинается другое.
                        else if ( localEvent.timeData.begin == newEvent.time.end ) {
                            eBeginDiff = (localEvent.timeData.end < newEvent.time.begin);
                            if ( eBeginDiff != bBeginDiff ) return false;
                        }
                        else {
                            eBeginDiff = (localEvent.timeData.end < newEvent.time.begin);
                            bEndDiff = (localEvent.timeData.begin < newEvent.time.end);


                            if ( (bBeginDiff != eEndDiff) || (eBeginDiff != bEndDiff) || (bBeginDiff != bEndDiff) ) {
                                /* console.log(localEvent.eNumber + ' ' + newEvent.number);
                                 console.log(localEvent.timeData.end + '  ' + newEvent.time.begin);
                                 console.log('bB: ' + bBeginDiff + ' eE: ' + eEndDiff + ' eB: ' + eBeginDiff + ' bE: ' + bEndDiff);*/
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }

        /**
         * функция расчитывает расписания дня (где есть событие, а где - пустое место)
         * @param eventNumb {Array} - массив с номерами событий в этот день
         * @returns {Array}
         */
        function createSchedule(eventNumb){

            var dayEvents = getDayEventData(eventNumb);
            dayEvents = sortEvents(dayEvents);

            var singleEvent;
            var pointer = 0;

            var schedule = []; //собственно, расписание
            //оно должно иметь столько элементов, сколько потенциальных "tr" в таблице
            // и он должен содержать длительность каждого элемента, чтобы я смог высчитать его высоту

            for (event in dayEvents){
                singleEvent = dayEvents[parseInt(event)];//событие

                if (pointer != singleEvent.timeData.begin) { //если указатель не совпадает с началом очередного события...
                    //...то мы вставляем пустое поле до самого начала очередного события
                    schedule.push({event: 0, duration: dayEvents[parseInt(event)].timeData.begin-pointer});
                    pointer = dayEvents[parseInt(event)].timeData.begin;

                    // и добавляем само событие
                    schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                    pointer = singleEvent.timeData.end;
                }else {
                    // ... то добавить его "как есть"
                    schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                    pointer = singleEvent.timeData.end;
                }
            }
            if (pointer<24) schedule.push({event: 0, duration: 24-pointer});
            pointer = null;
            singleEvent = null;

            return schedule;
        }


        return {
            moveToNextWeek: MoveToNextWeek,
            moveToPrevWeek: MoveToPrevWeek,
            //получить высоту блока события
            getHeight: getHeight,
            //Создать очередность пустных и заполненных событий для корректного расмещения
            createSchedule:createSchedule,
            checkCompNewEvent: СheckCompNewEvent
        }
    }]);