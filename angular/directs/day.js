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
                /*��, ��������, �� � �� ����, ��� ��-������� ���������� �� �������� ���������� ��
                 7-�� ���������� ����, � �������� ������������� ����������
                 � ���� �� ���������� �� �� ������ ������, �� �� ��� ���������.
                 */

                //���� ����� ���� ����� ��� �������� "���������" ��� ����
                var footer = document.getElementsByClassName('dayFooter');
                if ( footer.length == 7 ) {
                    //��������� ������� ������ ��� ������������ ������ ���
                    var footerInitialTop = parseInt(getComputedStyle(footer[0]).top);

                    //��������� ������ ������ ��� ������������ ��������. ������� ������ ������� (���, ��� ���� )
                    //������ ����� "�������" � ����������� ������ ��-�� ��������� ������� ������
                    var footerInitialHeight = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+
                        parseInt(getComputedStyle(document.getElementById('wrapper')).height)+8;


                    console.log(footerInitialHeight);
                    function Ascroll(e) {
                        //�� ������� ��������� ������������
                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                        //������� ���� ������ �� ���������
                        var distance = scrolled - footerInitialHeight+6;

                        //����� ����� ������� �������� � �������������� �������...
                        if (distance>0) {

                            //... ������ ����������� ���� � ������� ����� ����. ����� ����������� ����������������.
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


