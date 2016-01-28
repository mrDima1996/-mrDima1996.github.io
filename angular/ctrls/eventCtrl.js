/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
    .controller('eventCtrl', ['$scope', 'data','schedule', function($scope, data, schedule) {
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
}]);