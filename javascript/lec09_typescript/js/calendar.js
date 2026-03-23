// import { Calendar, EventInput } from '@fullcalendar/core';
// import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { setCurrentDate, loadcurrentTodo, loadTodoInit, DBLists, } from './todolist.js';
let calendar = null;
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl)
        return;
    calendar = new FullCalendar.Calendar(calendarEl, {
        // plugins: [interactionPlugin, dayGridPlugin],
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
    if (!calendar)
        return;
    calendar.addEvent(event);
}
function removeEventFromCalendar(id) {
    if (!calendar)
        return;
    const calendarEvent = calendar.getEventById(id);
    if (calendarEvent) {
        calendarEvent.remove();
    }
}
export function syncCalendar() {
    if (!calendar)
        return;
    calendar.removeAllEvents(); // 기존 이벤트 삭제
    DBLists.forEach((list) => {
        if (list.todos.length > 0) {
            list.todos.forEach((todoObj) => {
                calendar.addEvent({
                    id: String(todoObj.id),
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
//# sourceMappingURL=calendar.js.map