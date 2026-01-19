var calendar;

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],

        dateClick: function (info) {
            console.log('Clicked event occurs : date = ' + info.dateStr);

            setCurrentDate(info.dateStr);
            loadcurrentTodo();
            //   addEventToCalendar({ start: info.dateStr });
            //   removeEventFromCalendar(info.dateStr);
        },
    });
    calendar.render();
});

function addEventToCalendar(event) {
    calendar.addEvent(event);
}

function removeEventFromCalendar(id) {
    var calendarEvent = calendar.getEventById();
    calendarEvent.remove();
}
