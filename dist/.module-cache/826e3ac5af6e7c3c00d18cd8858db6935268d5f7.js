var Calendar = Calendar || {};

$(function(window) {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer')
    });
    calendarContainer.render();

})(this);