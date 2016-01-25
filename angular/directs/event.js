/**
 * Created by mrDima on 25.01.2016.
 */

angular.module('day')

    .directive('event', function() {
        return {
            scope: {
                name: '=',
                describe: '='
            },
            template: '{{name}}   {{describe}}'
        }
    });