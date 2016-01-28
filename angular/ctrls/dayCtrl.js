/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('dayCtrl', ['$scope', 'data', function($scope, data) {
        //������ ������� � ���� ����
        $scope.dayFooterTopC = '0px';
        $scope.eventNumb = data.getNumbEventsOfTheDay($scope.date);

        //���� ��� ����� ��� �������� "���������" ������� ���� ������

        //��������� ������� ������ ��� (dayFooter)������������ ������ ����� ��� (day) + border
        var footerInitialTop = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+1;

        //��������� ������ ������ ��� ������������ ��������. ������� ������ ������� (wrapper - ���, ��� ���� content-a)
        //������ ����� "�������" � ����������� ������ ��-�� ��������� ������� ������
        var footerInitialHeight = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+
            parseInt(getComputedStyle(document.getElementById('wrapper')).height)+8;

        $scope.dayFooterTopC = footerInitialTop+'px';
        function Ascroll(e) {
            //�� ������� ��������� ������������
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;

            //������� ���� ������ �� ���������� ��������� ���������
            var distance = scrolled - footerInitialHeight+6;

            //����� ����� ������� �������� � �������������� �������...
            if (distance>0) {
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + distance + 'px';});
            }
            else {
                $scope.$apply(function(){$scope.dayFooterTopC = footerInitialTop + 'px';});
            }
        }
        window.addEventListener('scroll', Ascroll, false);
    }]);