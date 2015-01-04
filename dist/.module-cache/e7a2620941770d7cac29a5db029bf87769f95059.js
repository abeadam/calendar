var Calendar = Calendar || {};
Calendar.EventItem = Backbone.Model.extend({
    defaults : {
        maxWidth: 600,
        hourPixelMapping: 29*2 // this is the pixels for 1 hour
    },
    initialize: function (){
        this.updateWidth();
        this.set('pixelHeight');
    },
    updateWidth: function (){
        this.set('pixelWidth', this.get(maxWidth)/this.get('sharedItems'));
    }
});