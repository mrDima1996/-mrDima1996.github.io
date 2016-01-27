/**
 * Created by mrDima on 25.01.2016.
 */

angular.module('app')

    .directive('event',['schedule', function(schedule) {
        return {
            scope: {
                number: '='
            },
            controller: ['$scope', 'data', function($scope, data) {
                //�������� ������ �� ����� �������
                //��� ��������, �� �������� ���� ��� �����
                var eventData = data.getEvent($scope.number);

                $scope.name = eventData.name; //���������
                $scope.content = eventData.content; //�������

                $scope.displayContent = $scope.content;
                //if ($scope.content.length>42) $scope.displayContent = $scope.content.slice(0,42)+'...';
                //else $scope.displayContent = $scope.content; //�������� �������, ���� ������� �������

                //������ ����� �������. ������������� ������ �� ������� ������ � �����.
                $scope.aHeight = schedule.getHeight(eventData.time.begin,eventData.time.end);
                if (!$scope.aHeight) $scope.aHeight = '0px';
                else $scope.aHeight += 'px';

                //���������� ������ ����� ������� �� ������� ������� ����� ���.
                // ���������� ������. ������������� �� ������� ������.
                $scope.topCoord = schedule.getTopCoord(eventData.time.begin);
                if ($scope.topCoord === false) $scope.topCoord = '-200px';
                else  $scope.topCoord +='px';

                var element = angular.element;


            }],
            templateUrl: 'angular/htmls/event.html'
    }
    }])


.factory('schedule', function(){
        //��� ��� � ������� ����������� ������ ������� �� ���� ���.
        // ��� ��� ��� ����� ���� �������� � ����� ����������� ���������� ��� �� ������
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {basicH = 70; alert('������ ����� �� ����������. ����������� �������� �� ���������')};
        return {
            //�������� ������ �����
            getHeight: function(begin, end){
                //�������� �� ������������ ���������� �������
                if (end<begin) return false;
                if ((end>24) || (begin<0)) return false;

                return (end-begin)*basicH-5;
            },
            //�������� ��������� �������� �����, ������������ ������ ������� ����� "���"
            getTopCoord: function(begin){
                //�������� �� ������������ ���������� �������
                if (begin<0) return false;
                return begin*basicH+46;
            }
        }
    });
