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
                name: 'Test3',
                content: 'ololol2'
            },
            4: {
                name: 'Test4',
                content: 'ololol'
            },
            5: {
                name: 'Test5',
                content: 'ololol2'
            },
            6: {
                name: 'Test6',
                content: 'ololol2'
            }
        }

        }
    });