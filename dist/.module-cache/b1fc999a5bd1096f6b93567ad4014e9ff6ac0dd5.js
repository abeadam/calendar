var Calendar = Calendar || {};
$(function() {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer')
    });
    calendarContainer.render();
});