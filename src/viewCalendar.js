var Calendar = Calendar || {};
Calendar.MainContainer = Backbone.View.extend({
    render: function() {
        React.render( < Calendar.LeftRail defaults={{halfDay: true, startHour: 9}}/>,
            document.querySelector('.calendarContainer')
        );
    }
});