/**
 * Created by mrDima on 25.01.2016.
 */

/*
���������� ������ ���������:

���� ������, �������� �������� - ����, ������, ���. ������: date.year.month.day
� ������� ��� ���� ������ �������, ������� ���������� � ���.

������� ������������ ��������, ��� ���� � ������� - ��� ���������� id.
� ������� ���� ��������� "name" � ������� 'content'
 */
angular.module('dataSourse', [])
.factory('getData', function(){
        return {
            year: 2015, //������� ���
            daysList: [  //������ ���� ����
            {id: '0', events: [1, 2, 3,4,5,6]},
            {id: '1', events: [1]},
            {id: '2', events: []},
            {id: '3', events: [3]},
            {id: '4', events: []},
            {id: '5', events: [4]},
            {id: '6', events: []}
            ],

            dateList: {
                2016: {
                    0:{
                        25: [1, 2, 3,4,5,6],
                        26: [1],
                        27: [],
                        28: [3],
                        29: [],
                        30: [4],
                        31: []
                    }
                }
            },
       eventList: { //������ ���� �������
            1: {
                name: 'Test',
                content: 'ololol'
            },
            2: {
                name: 'Test2',
                content: 'ololol2'
            },
            3: {
                name: 'Test2',
                content: 'ololol2'
            },
            4: {
                name: 'Test',
                content: 'ololol'
            },
            5: {
                name: 'Test2',
                content: 'ololol2'
            },
            6: {
                name: 'Test2',
                content: 'ololol2'
            }
        }

        }
    });