var Calendar = Calendar || {};
$(function() {
    var calendarContainer = new Calendar.MainView({
        el: $('.calendarContainer')
    });
    calendarContainer.render();
});