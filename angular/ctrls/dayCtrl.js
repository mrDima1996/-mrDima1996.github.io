/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('dayCtrl', ['$scope', 'data', function($scope, data) {
        //колличество часов в дне o_o

        $scope.number = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];


        //номера событий в этот день
        $scope.dayFooterTopC = '0px';
        $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

        //берем данные о времени событий (начало, продолжительность, конец)
        $scope.dayEvents = [];
        var singleEventNumb;
        for (var event in  $scope.eventNumb){
            singleEventNumb = $scope.eventNumb[event]; //номер события
            $scope.dayEvents.push({eNumber: singleEventNumb, timeData: data.getEventTimeData(singleEventNumb)})
        }
        singleEventNumb = '';

        //сортируем события в порядке возрастания времени начала
        $scope.dayEvents.sort(function(a, b) {
            if(a.timeData.begin == b.timeData.begin) return 0;
            if(a.timeData.begin > b.timeData.begin) return 1;
            if(a.timeData.begin < b.timeData.begin) return -1;
            return 0; //в независимости от других свойств считаем что объекты равны
        });

        var singleEvent;
        var pointer = 0;

        $scope.schedule = []; //собственно, расписание
        //оно должно иметь столько элементов, сколько потенциальных "тд" в таблице
        // и он должен содержать длительность каждого элемента, чтобы я смог засунуть его в rowspan


        for (event in $scope.dayEvents){
            singleEvent = $scope.dayEvents[parseInt(event)]; //событие

            if (pointer != singleEvent.timeData.begin) { //если указатель не совпадает с началом очередного события...
                //...но у нас события еще есть
                //if (parseInt(event)<=$scope.dayEvents.length-1) {
                    //то мы вставляем пустое поле до самого начала очередного события
                    $scope.schedule.push({event: 0, duration: $scope.dayEvents[parseInt(event)].timeData.begin-pointer});
                    pointer = $scope.dayEvents[parseInt(event)].timeData.begin;

                    // и добавляем само событие
                    $scope.schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                    pointer = singleEvent.timeData.end;

                //}
                //если же у нас было последнее событие, но еще осталось место, то заполняем пустотой до упора
                //else $scope.schedule.push({event: 0, duration: 24-pointer});
            }else {
                // ... то добавить его "как есть"
                $scope.schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                pointer = singleEvent.timeData.end;
            }
        }
        if (pointer<24) $scope.schedule.push({event: 0, duration: 24-pointer});
        pointer = '';
        singleEvent = '';


        //этот код нужен для создания "плавающих" номеров дней недели

        //начальная позиция номера дня (dayFooter)относительно самого блока дня (day) + border
        var footerInitialTop = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+1;

        //начальная высота номера дня относительно СТРАНИЦЫ. Берется высота обертки (wrapper - все, что выше content-a)
        //отступ блока "контент" и догоняеться числом из-за неучтённой толщины границ
        var footerInitialHeight = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+
            parseInt(getComputedStyle(document.getElementById('wrapper')).height)+8;

        $scope.dayFooterTopC = footerInitialTop+'px';
        function Ascroll(e) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;  //на сколько прокрутил пользователь
            var distance = scrolled - footerInitialHeight+6; //сколько краю экрана до начального положения заголовка
            if (distance>0) {  //когда экран подошел вплотную к первоначальной позиции...
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + distance + 'px';});
            }
            else {
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + 'px';});
            }
        }
        window.addEventListener('scroll', Ascroll, false);
    }]);