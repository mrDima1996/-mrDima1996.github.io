/**
 * Created by mrDima on 11.01.2016.
 */
var app = angular.module('app');
    app.directive('day', function(){
        return {
            scope: {
                date: '=' // ���� ����� ��� � ������� Date
            },
            templateUrl: 'angular/htmls/day.html',
            controller: 'dayCtrl',
            link: function(){}
        }
    });




