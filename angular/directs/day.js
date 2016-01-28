/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
            scope: {
                date: '=' // дата этого дня
            },
            templateUrl: 'angular/htmls/day.html',
            controller: ['$scope', 'data', function($scope, data) {
                //номера событий в этот день
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);
            }],
            link: function() {
                /*Да, говнокод, но я не знаю, как по-другому достучатся до создания последнего из
                 7-ми одинаковых дней, а отловить окончательную компиляцию
                 у меня не получилось ни на уровне недели, ни на всём документе.
                 */

                //этот кусок кода нужен для создания "плавающих" дат дней
                var footer = document.getElementsByClassName('dayFooter');
                if ( footer.length == 7 ) {
                    //начальная позиция номера дня относительно самого дня
                    var footerInitialTop = parseInt(getComputedStyle(footer[0]).top);

                    //начальная высота номера дня относительно СТРАНИЦЫ. Берется высота обертки (все, что выше )
                    //отступ блока "контент" и догоняеться числом из-за неучтённой толщины границ
                    var footerInitialHeight = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+
                        parseInt(getComputedStyle(document.getElementById('wrapper')).height)+8;


                    console.log(footerInitialHeight);
                    function Ascroll(e) {
                        //на сколько прокрутил пользователь
                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                        //сколько краю экрана до заголовка
                        var distance = scrolled - footerInitialHeight+6;

                        //когда экран подошел вплотную к первоначальной позиции...
                        if (distance>0) {

                            //... просто передвинуть блок с номером чуток вниз. Слава абсолютному позиционированию.
                            for ( var i = 0; i < footer.length; i++ ) {
                                footer[i].style.top = footerInitialTop + distance + 'px';
                            }
                        }
                        else {
                            for (var i = 0; i < footer.length; i++ ) {
                                footer[i].style.top = footerInitialTop + 'px';
                            }
                        }
                    }
                    window.addEventListener('scroll', Ascroll, false);
                }



            }
        }
    });


