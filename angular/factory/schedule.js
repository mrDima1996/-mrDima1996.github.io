/**
 * Created by mrDima on 28.01.2016.
 */

//���� ������ ��������� ��� ���� �������� ������������ ����������� ������� �� ����������
//���� ������:
//-������ ������ �������, � ����������� �� ��� �����������������
//-� ����������� ����������� �������, ������ �� �� �������.
angular.module('app')
    .factory('schedule', ['data', function(data){
        //��� ��� � ������� ����������� ������ ������� �� ���� ���.
        // ��� ��� ��� ����� ���� �������� � ����� ����������� ���������� ��� �� ������
        var basicH = parseInt(getComputedStyle(document.getElementsByClassName('timeContainer')[0]).marginBottom)+20;
        if (basicH === undefined) {basicH = 70; alert('������ ����� �� ����������. ����������� �������� �� ���������')};
        var footerInitialTop;

        /**
         *
         * @param duration - {number}
         * @returns {number}
         */
        function getHeight(duration){
            return duration*basicH;
        }

        /**
         * ������� ����������� ���������� ��� (��� ���� �������, � ��� - ������ �����)
         * @param eventNumb {Array} - ������ � �������� ������� � ���� ����
         * @returns {Array}
         */
        function createSchedule(eventNumb){
            //����� ������ � ������� ������� (������, �����������������, �����)
            var dayEvents = [];
            var singleEventNumb;
            for (var event in  eventNumb){
                singleEventNumb = eventNumb[event]; //����� �������
                dayEvents.push({eNumber: singleEventNumb, timeData: data.getEventTimeData(singleEventNumb)})
            }
            singleEventNumb = '';

            //��������� ������� � ������� ����������� ������� ������
            dayEvents.sort(function(a, b) {
                if(a.timeData.begin == b.timeData.begin) return 0;
                if(a.timeData.begin > b.timeData.begin) return 1;
                if(a.timeData.begin < b.timeData.begin) return -1;
                return 0; // o_O � ������������� �� ������ ������� ������� ��� ������� �����
            });

            var singleEvent;
            var pointer = 0;

            var schedule = []; //����������, ����������
            //��� ������ ����� ������� ���������, ������� ������������� "tr" � �������
            // � �� ������ ��������� ������������ ������� ��������, ����� � ���� ��������� ��� ������


            for (event in dayEvents){
                singleEvent = dayEvents[parseInt(event)]; //�������

                if (pointer != singleEvent.timeData.begin) { //���� ��������� �� ��������� � ������� ���������� �������...
                    //...�� �� ��������� ������ ���� �� ������ ������ ���������� �������
                    schedule.push({event: 0, duration: dayEvents[parseInt(event)].timeData.begin-pointer});
                    pointer = dayEvents[parseInt(event)].timeData.begin;

                    // � ��������� ���� �������
                    schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                    pointer = singleEvent.timeData.end;
                }else {
                    // ... �� �������� ��� "��� ����"
                    schedule.push({event: singleEvent.eNumber, duration: singleEvent.timeData.duration});
                    pointer = singleEvent.timeData.end;
                }
            }
            if (pointer<24) schedule.push({event: 0, duration: 24-pointer});
            pointer = null;
            singleEvent = null;

            return schedule;
        }
        return {
            //�������� ������ ����� �������
            getHeight: getHeight,
            //������� ����������� ������� � ����������� ������� ��� ����������� ����������
            createSchedule:createSchedule
        }
    }]);