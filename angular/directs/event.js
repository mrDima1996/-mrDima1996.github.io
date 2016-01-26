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
                var eventData = data.getEvent($scope.number);

                $scope.name = eventData.name;
                $scope.content = eventData.content;
                if ($scope.content.length>42) $scope.displayContent = $scope.content.slice(0,42)+'...';
                else $scope.displayContent = $scope.content;

                //������ ����� �������. ������������� ������ �� ������� ������ � �����.
                $scope.height = schedule.getHeight(eventData.time.begin,eventData.time.end);
                if (!$scope.height) $scope.height = '0px';
                else $scope.height += 'px';

                //������ ����� �������. ������������� �� ������� ������.
                $scope.topCoord = schedule.getTopCoord(eventData.time.begin);
                if (!$scope.topCoord) $scope.topCoord = '-200px';
                else  $scope.topCoord +='px';



            }],
            templateUrl: 'angular/htmls/event.html'
    }
    }])


.factory('schedule', function(){
        //��� ��� � ������� ����������� ������ ������� �� ���� ���.
        // ��� ��� ��� ����� ���� �������� � ����� ����������� ���������� ��� �� ������
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).paddingBottom)+20;

        if (basicH === undefined) {basicH = 70; alert('������ ����� �� ����������. ����������� �������� �� ���������')};
        return {
            getHeight: function(begin, end){
                //�������� �� ������������ ���������� �������
                if (end<begin) return false;
                if ((end>24) || (begin<0)) return false;

                return (end-begin)*basicH-5;
            },
            getTopCoord: function(begin){
                //�������� �� ������������ ���������� �������
                if (begin<0) return false;

                return begin*basicH;
            }
        }
    });
