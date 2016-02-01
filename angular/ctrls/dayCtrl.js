/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('dayCtrl', ['$scope', 'data', 'schedule', function($scope, data, schedule) {

        $scope.dayFooterTopC = '0px';

        //номера событий в этот день
        $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

        //расписание на этот день
        $scope.schedule = schedule.createSchedule($scope.eventNumb);



        //этот код нужен для создания "плавающих" номеров дней недели
        var dayFooters = document.getElementsByClassName('dayFooter');
        if (dayFooters.length == 7) { //когда создались все 7 заголовков
            function Ascroll(e) {
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;  //на сколько прокрутил пользователь
                var distance = dayFooters[0].getBoundingClientRect().top; //сколько краю экрана до начального положения заголовка
                if ( distance < 0 ) {  //когда экран подошел вплотную к первоначальной позиции...

                }
                else {
                }
            }

           // window.addEventListener('scroll', Ascroll, false);
        }
    }]);