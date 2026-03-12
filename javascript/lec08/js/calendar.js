var calendar;

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        fixedWeekCount: false,
        selectable: true,
        events: [],
        dayMaxEvents: true,
        aspectRatio: 1.5,
        expandRows: true,

        dateClick: function (info) {
            console.log('Clicked event occurs : date = ' + info.dateStr);

            setCurrentDate(info.dateStr);
            loadcurrentTodo();
            //   addEventToCalendar({ start: info.dateStr });
            //   removeEventFromCalendar(info.dateStr);
        },
    });

    loadTodoInit();
    calendar.render();
});

function addEventToCalendar(event) {
    calendar.addEvent(event);
}

function removeEventFromCalendar(id) {
    var calendarEvent = calendar.getEventById();
    if (calendarEvent) {
        calendarEvent.remove();
    }
}

function syncCalendar() {
    if (!calendar) return;
    calendar.removeAllEvents(); // 기존 이벤트 삭제

    DBLists.forEach((list) => {
        if (list.todos.length > 0) {
            list.todos.forEach((todoObj) => {
                calendar.addEvent({
                    id: todoObj.id,
                    title: todoObj.text,
                    start: list.date,
                    allDay: true,
                    display: 'block',
                    backgroundColor: 'rgba(177, 94, 245, 0.9)',
                    borderColor: 'rgb(177, 94, 245, 0.9)',
                });
            });
        }
    });
}

// eventDisplay: 'list-item',
// | 옵션                     | 의미         | 언제 쓰는지            |
// | ---------------------- | ---------- | ----------------- |
// | `'auto'`               | 기본값        | FullCalendar가 알아서 |
// | `'block'`              | 일반 일정 블록   | 보통 일정             |
// | `'background'`         | 날짜 배경 강조   | “이 날 일정 있음” 표시용   |
// | `'list-item'`          | 점(●) 스타일   | 간단 표시             |
// | `'inverse-background'` | 선택 영역처럼 표시 | 특정 기간 강조          |
