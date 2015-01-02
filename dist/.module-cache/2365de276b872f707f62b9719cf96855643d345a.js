var Calendar = Calendar || {};
Calendar.MainContainer = Backbone.View.extend({
    render: function() {
        React.render( React.createElement(Calendar.LeftRail, {defaults: {halfDay: true, statHour: 9}}),
            document.querySelector('.calendarContainer')
        );
    }
});