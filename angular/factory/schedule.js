/**
 * Created by mrDima on 28.01.2016.
 */

//
angular.module('app')
    .factory('schedule', [function(){
        //вот тут € получаю стандартную высоту событи€ на один час.
        // “ак как оно может быть изменено € решил динамически подгружать его из стилей
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {basicH = 70; alert('¬ысота блока не определена. ¬ыставленно значение по умолчанию')};
        var footerInitialTop;
        return {
            //получить высоту блока событи€
            getHeight: function(begin, end){
                //проверка на корректность введенного времени
                if (end<begin) return false;
                if ((end>24) || (begin<0)) return false;

                return (end-begin)*basicH-5;
            },
            //получить начальные координа блока, относительно верхнй границы блока "дн€"
            getTopCoord: function(begin){
                footerInitialTop = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+1;
                //проверка на корректность введенного времени
                if (begin<0) return false;
                return begin*basicH + 26 + footerInitialTop;
            }
        }
    }]);