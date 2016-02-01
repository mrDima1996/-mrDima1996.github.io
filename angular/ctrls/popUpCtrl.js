/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')
.controller('popUpCtrl', ['$scope', function($scope){
        $scope.source = {day: '??', number: 0, begin: '??', end: '??', name: '??', content: '??'};
        $scope.status = 'closed';
        $scope.userAction = 'none';

        if ( $scope.source.number == 0)$scope.title = 'Добавить';
        else $scope.title = 'Редактировать';

        $scope.update = function() {
            $scope.source ={
                    type: 'text',
                    color: 'default',
                    name: 'TestOLOLOL',
                    content: 'Dat shi workzzzz',
                    time: {begin: 0, end: 3}
            };
        }
    }]);