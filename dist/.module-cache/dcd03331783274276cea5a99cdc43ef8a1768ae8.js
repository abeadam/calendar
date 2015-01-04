var Calendar = Calendar || {};
Calendar.ItemCollection = Backbone.collection.extend({
    model: Calendar.EventItem
});