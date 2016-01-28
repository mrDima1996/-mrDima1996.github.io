/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('dayCtrl', ['$scope', 'data', function($scope, data) {
        //номера событий в этот день
        $scope.dayFooterTopC = '0px';
        $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

        //этот код нужен для создания "плавающих" номеров дней недели

        //начальная позиция номера дня (dayFooter)относительно самого блока дня (day) + border
        var footerInitialTop = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+1;

        //начальная высота номера дня относительно СТРАНИЦЫ. Берется высота обертки (wrapper - все, что выше content-a)
        //отступ блока "контент" и догоняеться числом из-за неучтённой толщины границ
        var footerInitialHeight = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+
            parseInt(getComputedStyle(document.getElementById('wrapper')).height)+8;

        $scope.dayFooterTopC = footerInitialTop+'px';
        function Ascroll(e) {
            //на сколько прокрутил пользователь
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;

            //сколько краю экрана до начального положения заголовка
            var distance = scrolled - footerInitialHeight+6;

            //когда экран подошел вплотную к первоначальной позиции...
            if (distance>0) {
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + distance + 'px';});
            }
            else {
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + 'px';});
            }
        }
        window.addEventListener('scroll', Ascroll, false);
    }]);