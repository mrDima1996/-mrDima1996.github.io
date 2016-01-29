/**
 * Created by mrDima on 28.01.2016.
 */

//
angular.module('app')
    .factory('schedule', [function(){
        //��� ��� � ������� ����������� ������ ������� �� ���� ���.
        // ��� ��� ��� ����� ���� �������� � ����� ����������� ���������� ��� �� ������
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {basicH = 70; alert('������ ����� �� ����������. ����������� �������� �� ���������')};
        var footerInitialTop;
        return {
            //�������� ������ ����� �������
            getHeight: function(duration){
                return duration*basicH;
            },
            //�������� ��������� �������� �����, ������������ ������ ������� ����� "���"
            getTopCoord: function(begin){
                footerInitialTop = parseInt(getComputedStyle(document.getElementById('content')).paddingTop)+1;
                //�������� �� ������������ ���������� �������
                if (begin<0) return false;
                return begin*basicH + 16 + footerInitialTop;
            }
        }
    }]);