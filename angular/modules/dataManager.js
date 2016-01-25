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
            if(supports_html5_storage){
                var localStorage = window.localStorage;
                for (key in getData){
                    localStorage[key] = getData[key];
                }
            }
            else alert('��� ������� �� ������������ localStorage');
        }
        moveDataToLocalStorage();

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
                 days.push({id: dayOfTheWeek, date: new Date(day)});
                 day.setDate(day.getDate()+1);
                 dayOfTheWeek = day.getDay();
             } while(dayOfTheWeek!=1);
             //console.log(days);
         },

         /**
          * ���������� ������ � ���� ������� ������
          * @returns {Array}
          */
         getCurrentWeek: function(){
             daysInWeek = getData.daysList;
             return daysInWeek;
         },

         /**
          * ���������� ������ � ������ ����� ��������� � ���������
          * @returns {getData.eventList|{1, 2, 3, 4, 5, 6}}
          */
         getAllEvents: function(){ //
             return getData.eventList;
         },
         getYear: function(){ //���������� ���. (��������)
             return getData.year;
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
             return getData.eventList[id];
         }
     }
    }]);