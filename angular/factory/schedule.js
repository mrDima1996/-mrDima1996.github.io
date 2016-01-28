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

        return {
            //�������� ������ ����� �������
            getHeight: function(begin, end){
                //�������� �� ������������ ���������� �������
                if (end<begin) return false;
                if ((end>24) || (begin<0)) return false;

                return (end-begin)*basicH-5;
            },
            //�������� ��������� �������� �����, ������������ ������ ������� ����� "���"
            getTopCoord: function(begin){
                //�������� �� ������������ ���������� �������
                if (begin<0) return false;
                return begin*basicH+46;
            }
        }
    }]);