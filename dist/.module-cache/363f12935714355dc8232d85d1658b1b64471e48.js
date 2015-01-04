var Calendar = Calendar || {};
Calendar.EventBundle = Backbone.Model.extend({
    initialize: function (){
        this.updateWidth();
        this.set('pixelHeight', this.get('timeSpan') * Calendar.EventItem.hourPixelMapping);
    },
    updateWidth: function (){
        this.set('pixelWidth', Calendar.EventItem.maxWidth/this.get('sharedItems'));
    }
}, {
    maxWidth: 600,
    hourPixelMapping: 29*2 // this is the pixels for 1 hour
});