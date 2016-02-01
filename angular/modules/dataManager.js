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
            return JSON.parse(localStorage.dateList)[year][month][day].events;
        }

        /**
         * вернуть событие по айдишнику
         * @param id - номер события
         * @returns {*}
         */
        function GetEvent(id) {
            return JSON.parse(localStorage.eventList)[id];
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

        function SetEvent(id, eventData) {
            var localData = JSON.parse(localStorage.eventList);
            localData[id] = eventData;
            console.log(id + '   '+ localData);
            localStorage.eventList = JSON.stringify(localData);

        }

     return {
         getCurrentWeek: GetCurrentWeek,
         getNumbEventsOfTheDay: GetNumbEventsOfTheDay,
         getEvent: GetEvent,
         getEventTimeData: GetEventTimeData,
         setEvent: SetEvent
     }
    }]);