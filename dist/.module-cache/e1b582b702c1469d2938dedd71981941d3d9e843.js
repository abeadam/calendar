var Calendar = Calendar || {};
Calendar.MainView = Backbone.View.extend({
    render: function() {
        var self = this;
        React.render( React.createElement(Calendar.MainContainer, {items: self.collection, railDefaults: {halfDay: true, startHour: 9}}),
            self.el
        );
    },
    updateCollection: function(items) {
        this.collection.reset(items);
    }
});