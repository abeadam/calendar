var Calendar = Calendar || {};
Calendar.MainContainer = Backbone.View.extend({
    render: function() {
        React.render( React.createElement(Calendar.LeftRail, null),
            document.querySelector('.calendarContainer')
        );
    }
});