var Calendar = Calendar || {};
Calendar.ItemCollection = Backbone.Collection.extend({
    model: Calendar.EventItem
});