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
            //������� ��� ������ � localStorage
            if(supports_html5_storage){
                var localStorage = window.localStorage;
                for (key in getData) {
                    localStorage[key] = JSON.stringify(getData[key]);
                }


            }
            else alert('��� ������� �� ������������ localStorage');
        }
        moveDataToLocalStorage();
        var localStorage = window.localStorage;
        var daysInWeek = []; //��� �������� ������ � ������� ������

     return {



         getCurrentWeekUns: function(date){
             var days = [];

             //��� ���� �������� ���� ������� ������. ��� ��� � js ������ ����������� � �����������, � �� � ������������...
             var day = new Date(date);

             //... �� � ������� "���������" ���� �� ������������ ���� ������...
             var dayOfTheWeek = day.getDay();
             while(dayOfTheWeek!=1) {
                 day.setDate(day.getDate()-1);
                 dayOfTheWeek = day.getDay();
             }

             //... � ����� ��������� �� �� ���������� ������������...
             do {
                 days.push({id: dayOfTheWeek, events: this.getNumbEventsOfTheDayUns(day)});
                 day.setDate(day.getDate()+1);
                 dayOfTheWeek = day.getDay();
             } while(dayOfTheWeek!=1);
             daysInWeek = days;
             return daysInWeek;
         },

         /**
          * ���������� ������ � ���� ������� ������
          * @returns {Array}
          */
         getCurrentWeek: function(){
             daysInWeek = JSON.parse(localStorage.daysList);
             return daysInWeek;
         },

         /**
          * ���������� ������ � ������ ����� ��������� � ���������
          */


         getNumbEventsOfTheDayUns: function(date){
             var year = date.getFullYear();
             var month = date.getMonth();
             var day = date.getDate();
             return JSON.parse(localStorage.dateList)[year][month][day];
         },


         /**
          * ������� ������ ������� ���
          * @param day - ����� ��� � ������
          * @returns {Array|events|{}|*}
          */
         getNumbEventsOfTheDay: function(day){
            return daysInWeek[day].events;
        },
         /**
          * ������� ������� �� ���������
          * @param id - ����� �������
          * @returns {*}
          */
         getEvent: function(id) {
             return JSON.parse(localStorage.eventList)[id];
         }
     }
    }]);