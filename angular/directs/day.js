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
                /*Да, говнокод, но я не знаю, как по-другому достучатся до последнего из
                 7-ми одинаковых дней, а отловить окончательную компиляцию
                 у меня не получилось ни на уровне недели, ни на всём документе.
                 */
                var footer = document.getElementsByClassName('dayFooter');
                if ( footer.length == 7 ) {
                    for ( var i = 0; i < footer.length; i++ ) {
                        function Ascroll(e){
                            if (footer[0].getBoundingClientRect().top <= 0) {
                                for ( var i = 0; i < footer.length; i++ ) {
                                        footer[i].style.position = 'fixed';
                                        footer[i].style.top = '0px';
                                }
                            }
                            else {
                                for (i = 0; i < footer.length; i++ ) {
                                    footer[i].style.position = 'absolute';
                                    //footer[i].style.top = '0px';
                                }
                            }
                        }

                        window.addEventListener('scroll', Ascroll, false);
                    }
                }
            }
        }
    });


