/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('eventCtrl', ['$scope', 'data','schedule', function($scope, data, schedule) {
   // �������� ������ �� ����� �������
    //��� ��������, �� �������� ���� ��� �����

        $scope.updateEvent = function() {
            var eventData = data.getEvent($scope.number);

            if ( $scope.number ) $scope.show = 'visible';
            else $scope.show = 'hidden';
            $scope.name = eventData.name; //���������
            $scope.content = eventData.content; //�������
            $scope.begin = eventData.time.begin;
            $scope.end = eventData.time.end;

            $scope.displayContent = $scope.content;
            //������ ����� �������. ������������� ������ �� ������� ������ � �����.
            $scope.aHeight = schedule.getHeight($scope.duration);
            if ( !$scope.aHeight ) $scope.aHeight = '0px';
            else $scope.aHeight += 'px';
        };

        $scope.updateEvent();

}]);