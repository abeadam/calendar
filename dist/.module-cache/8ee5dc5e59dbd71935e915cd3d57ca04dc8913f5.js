var Calendar = Calendar || {};
Calendar.MainView = Backbone.View.extend({
    render: function() {
        React.render( React.createElement(Calendar.MainContainer, {railDefaults: {halfDay: true, startHour: 9}}),
            this.el
        );
    }
});