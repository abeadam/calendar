var Calendar = Calendar || {};

$(function(external) {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer')
    });
    calendarContainer.render();
    external.layOutDay = function () {

    }
});