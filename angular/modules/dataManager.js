/**
 * Created by mrDima on 25.01.2016.
 */
angular.module('dataManager', ['dataSourse'])
.factory('data',['getData', function(getData){
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
                 days.push({id: dayOfTheWeek, date: new Date(day)});
                 day.setDate(day.getDate()+1);
                 dayOfTheWeek = day.getDay();
             } while(dayOfTheWeek!=1);
             console.log(days);
         },

         /**
          * возвращает данные о днях текущей недели
          * @returns {Array}
          */
         getCurrentWeek: function(){
             daysInWeek = getData.daysList;
             return daysInWeek;
         },

         /**
          * возвращает список с вообще всеми событиями в программе
          * @returns {getData.eventList|{1, 2, 3, 4, 5, 6}}
          */
         getAllEvents: function(){ //
             return getData.eventList;
         },
         getYear: function(){ //возвращает год. (Тестовая)
             return getData.year;
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
             return getData.eventList[id];
         }
     }
    }]);