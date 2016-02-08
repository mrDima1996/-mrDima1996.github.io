/**
 * Created by mrDima on 25.01.2016.
 */
angular.module('dataManager', ['dataSourse'])
.service('data',['getData', function(getData){
        function moveDataToLocalStorage(){
            function supports_html5_storage() {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            }
            //Передаю все данные в localStorage
            if(supports_html5_storage){
                var localStorage = window.localStorage;
                localStorage.clear();
                for (key in getData) {
                    localStorage[key] = JSON.stringify(getData[key]);
                }


            }
            else alert('Ваш браузер не поддерживает localStorage');
        }
        moveDataToLocalStorage();
        var localStorage = window.localStorage;
        var daysInWeek = []; //тут хранятся данные о текущей неделе

        /**
         * возвращает данные о днях текущей недели
         * @returns {Array}
         */
        function GetCurrentWeek(date){
            var days = [];

            //нам надо получить даты текущей недели. Так как в js неделя начинаеться с воскресения, а не с понедельника...
            var day = new Date(date);

            //... то я сначала "откатываю" дату до понедельника этой недели...
            var dayOfTheWeek = day.getDay();
            while(dayOfTheWeek!=1) {
                day.setDate(day.getDate()-1);
                dayOfTheWeek = day.getDay();
            }

            //... а потом перебираю ее до следующего понедельника...
            do {
                days.push({id: new Date(day), events: this.getNumbEventsOfTheDay(day)});
                day.setDate(day.getDate()+1);
                dayOfTheWeek = day.getDay();
            } while(dayOfTheWeek!=1);
            daysInWeek = days;
            return daysInWeek;
        }
        /**
         * вернуть номера событий дня
         * @param date Date- дата дня
         * @returns {Array|events|{}|*}
         */
        function GetNumbEventsOfTheDay(date){
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var data;
            try {
                data = JSON.parse(localStorage.dateList)[year][month][day].events;
            }
            catch(e) {
                //А если такого дня нету, то вернуть пустой список
                data = [];
            }
            return data;
        }

        /**
         * вернуть событие по айдишнику
         * @param id - номер события
         * @returns {*}
         */
        function GetEvent(id) {
            var data;
            try {
                data = JSON.parse(localStorage.eventList)[id];
            }
            catch(e) {
                //если такого события нет, то вернуть пустое событие
                console.log('Нет такого события ' + id);
                data = {
                    type: '',
                    color: '',
                    name: '',
                    content: '',
                    time: {begin: 0, end: -1}
                }
            }
            return data;
        }

        /**
         * вернуть продолжительность события
         * @param id - номер события
         */
        function GetEventTimeData(id){
            var event = JSON.parse(localStorage.eventList)[id];
            var eBegin = event.time.begin;
            var eEnd = event.time.end;
            var eDuration = eEnd - eBegin;
            return {begin: eBegin, duration: eDuration, end: eEnd}
        }

        /**
         * обновить информацию про событие
         * @param id - номер события
         * @param eventData
         * @constructor
         */
        function SetEvent(id, eventData) {
            eventData.time.begin = parseInt(eventData.time.begin);
            eventData.time.end = parseInt(eventData.time.end);
            var localData = JSON.parse(localStorage.eventList);
            localData[id] = eventData;
            //console.log(id + '   '+ localData);
            localStorage.eventList = JSON.stringify(localData);
        }

        function SetDayEvents(date, newData) {
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var localData = JSON.parse(localStorage.dateList);
            try {
                localData[year][month][day].events = newData;
            }
            catch(e) {
                //если добавляем событие в пустой день, то сначала создать этот день.
                if ( !localData[year] ) { //если не существует такой год, то создаем его.
                    localData[year] = {};
                }
                if ( !localData[year][month] ) { //если не существует записей о таком месяце в таком году, то создаем его.
                    localData[year][month] = {};
                }
                if ( !localData[year][month][day] ) { //если не существует записей о таком дне в таком месяце в таком году, то создаем его.
                    localData[year][month][day] = {};
                }
                localData[year][month][day].events = newData;

            }
            localStorage.dateList = JSON.stringify(localData);
        }

        /**
         * Удалить данные про событие
         * @param id - номер события
         * @constructor
         */
        function DeleteEvent(id) {
            var localData = JSON.parse(localStorage.eventList);
            localData[id] = null;
            localStorage.eventList = JSON.stringify(localData);
        }

        /**
         * удаляет событие из дня
         * @param dayDate - Date дата дня
         * @param eventId - номер удаляемого события
         * @constructor
         */
        function DeleteEventFromDay(dayDate, eventId){
            var events = GetNumbEventsOfTheDay(dayDate);
            var eventNumb;
            for (var i =0; i<=events.length; i++) {
                if (events[i] == eventId) eventNumb = i;
            }
            events.splice(eventNumb, 1);
            SetDayEvents(dayDate, events);
        }

        function GetEventsAmount() {
            var localData = JSON.parse(localStorage.eventList);
            return localData.eventAmount;
        }

        function SetEventsAmount(numb) {
            var localData = JSON.parse(localStorage.eventList);
            localData.eventAmount = numb;
            localStorage.eventList = JSON.stringify(localData);
        }

        function CreateNewEvent(eventData) {
            var numb = GetEventsAmount();
            eventData.number = numb;
            SetEvent(numb, eventData);
            numb++;
            SetEventsAmount(numb);
        }

        function PushEventToDay(dayDate, eventId){
            var dayEvents = GetNumbEventsOfTheDay(dayDate);
            dayEvents.push(eventId);
            SetDayEvents(dayDate, dayEvents);
        }

     return {
         getCurrentWeek: GetCurrentWeek,
         getNumbEventsOfTheDay: GetNumbEventsOfTheDay,
         getEvent: GetEvent,
         getEventTimeData: GetEventTimeData,
         setEvent: SetEvent,
         deleteEvent: DeleteEvent,
         deleteEventFromDay: DeleteEventFromDay,
         createNewEvent: CreateNewEvent,
         pushEventToDay: PushEventToDay
     }
    }]);