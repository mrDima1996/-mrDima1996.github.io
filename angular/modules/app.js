/**
 * Created by mrDima on 09.01.2016.
 */

angular.module("app", ['dataManager', 'ui.router'])

    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('next', {
                url: '/next',
                templateUrl: 'template/week.html'
            })

            .state('home', {
                url: '/',
                templateUrl: 'template/week.html'
            })

            .state('prev', {
                url: '/prev',
                templateUrl: 'template/week.html'
            })
    }]);












