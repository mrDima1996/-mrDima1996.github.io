/**
 * Created by mrDima on 11.01.2016.
 */
angular.module('app')
    .directive('day', function(){
        return {
            scope: {
                date: '=' // ���� ����� ���
            },
            templateUrl: 'angular/htmls/day.html',
            controller: ['$scope', 'data', function($scope, data) {
                //������ ������� � ���� ����
                $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);
            }],
            link: function() {
                /*��, ��������, �� � �� ����, ��� ��-������� ���������� �� ���������� ��
                 7-�� ���������� ����, � �������� ������������� ����������
                 � ���� �� ���������� �� �� ������ ������, �� �� ��� ���������.
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


