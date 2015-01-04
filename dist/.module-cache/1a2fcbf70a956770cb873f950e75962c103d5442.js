var Calendar = Calendar || {};

function layOutDay () {
    if (Calender.setUp) {
        calender.setUp(arguments);
    } else {
        // will be hard to come here but just in case this is called before render
        $(function () {
            // we need this function to make sure it's second in the ready stack
            _.defer(function () {
                calender.setUp(arguments);
            });
        });
    }
}

$(function() {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer')
    });
    calendarContainer.render();
    window.layOutDay = function() {

    }
});

