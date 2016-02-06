/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('app')

.directive('popup', ['popUpManager', function(popUpManager){
        return {
            templateUrl: 'angular/htmls/popUpMsg.html',
            controller: 'popUpCtrl',
            link: function(scope, element) {
                popUpManager.setPopUp(element);
                element.on('click', function(event){
                    //закрыть при нажатии на определенные элементы. Ничего интересного. Листай дальше.
                    var target = angular.element(event.target);
                    if (target.hasClass('closeTrigger'))  {
                        scope.$apply(function(){scope.status = 'closed'});
                    }
                })
            }
        }
    }]);