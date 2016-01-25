/**
 * Created by mrDima on 25.01.2016.
 */

angular.module('app')

    .directive('event', function() {
        return {
            scope: {
                number: '='
            },
            controller: ['$scope', 'data', function($scope, data) {
                var eventData = data.getEvent($scope.number);

                $scope.name = eventData.name;
                $scope.content = eventData.content;
            }],
            template: '<p>{{name}} {{content}}</p>'
        }
    });
