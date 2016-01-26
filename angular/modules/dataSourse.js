/**
 * Created by mrDima on 25.01.2016.
 */

/*
Устройство данных следующее:

Есть объект, атрибуты которого - годы, месяцы, дни. Пример: date.year.month.day
у каждого дня есть список событий, которые происходят в нем.

События представлены объектом, где ключ к событию - его уникальный id.
У события есть заголовок "name" и контент 'content'
 */
angular.module('dataSourse', [])
.factory('getData', function(){
        return {
            dateList:
            {2016: {
                0: {
                    25:[1,2,3,4,5,6],
                    26:[1],
                    27:[],
                    28:[2],
                    29:[],
                    30:[4],
                    31:[5]
                }

            }},
       eventList: { //список всех событий
            1: {
                type: 'text',
                color: 'default',
                name: 'Test',
                content: 'ololol',
                time: {begin: 2, end: 3}
            },
            2: {
                type: 'text',
                color: 'default',
                name: 'Test2',
                content: '1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0',
                time: {begin: 5, end: 7}
            },
            3: {
                type: 'text',
                color: 'default',
                name: 'Test3',
                content: 'ololol2',
                time: {begin: 8, end: 9}
            },
            4: {
                type: 'text',
                color: 'default',
                name: 'Test4',
                content: 'ololol',
                time: {begin: 11, end: 15}
            },
            5: {
                name: 'Test5',
                color: 'default',
                content: 'ololol2',
                time: {begin: 17, end: 18}
            },
            6: {
                type: 'text',
                color: 'default',
                name: 'Test6',
                content: 'ololol2',
                time: {begin: 19, end: 24}
            }
        }

        }
    });