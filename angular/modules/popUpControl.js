/**
 * Created by mrDima on 28.01.2016.
 */
angular.module('popUpControl', ['dataManager'])
.service('popUp', function(){
        return {
            changePopUpLogo: function() {
                var popUp = angular.element(document.getElementById('popup1'));
                var scope = popUp.scope();
                scope.message = 'It work';
            }
        }
    });