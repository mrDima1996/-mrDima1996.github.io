/**
 * Created by mrDima on 25.01.2016.
 */
angular.module('dataManager', ['dataSourse'])
.factory('data',['getData', function(getData){
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
                for (key in getData) {
                    localStorage[key] = JSON.stringify(getData[key]);
                }


            }
            else alert('Ваш браузер не поддерживает localStorage');
        }
        moveDataToLocalStorage();
        var localStorage = window.localStorage;
        var daysInWeek = []; //тут хранятся данные о текущей неделе

     return {



         getCurrentWeekUns: function(date){
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
                 days.push({id: dayOfTheWeek, events: this.getNumbEventsOfTheDayUns(day)});
                 day.setDate(day.getDate()+1);
                 dayOfTheWeek = day.getDay();
             } while(dayOfTheWeek!=1);
             daysInWeek = days;
             return daysInWeek;
         },

         /**
          * возвращает данные о днях текущей недели
          * @returns {Array}
          */
         getCurrentWeek: function(){
             daysInWeek = JSON.parse(localStorage.daysList);
             return daysInWeek;
         },

         /**
          * возвращает список с вообще всеми событиями в программе
          */


         getNumbEventsOfTheDayUns: function(date){
             var year = date.getFullYear();
             var month = date.getMonth();
             var day = date.getDate();
             return JSON.parse(localStorage.dateList)[year][month][day];
         },


         /**
          * вернуть номера событий дня
          * @param day - номер дня в неделе
          * @returns {Array|events|{}|*}
          */
         getNumbEventsOfTheDay: function(day){
            return daysInWeek[day].events;
        },
         /**
          * вернуть событие по айдишнику
          * @param id - номер события
          * @returns {*}
          */
         getEvent: function(id) {
             return JSON.parse(localStorage.eventList)[id];
         }
     }
    }]);