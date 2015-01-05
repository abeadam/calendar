var Calendar = Calendar || {};
// this will represent a single list item 
Calendar.EventItem = Backbone.Model.extend({
    initialize: function (){
        var self = this,
            timeSpan = self.get('end') - self.get('start');
        self.updateWidth();
        self.set('pixelHeight', timeSpan * Calendar.EventItem.hourPixelMapping);
        self.set('y', self.get('start') * Calendar.EventItem.hourPixelMapping);
    },
    updateWidth: function (){
        this.set('pixelWidth', Calendar.EventItem.maxWidth/this.get('sharedItems'));
        self.set('x', self.get('itemNumber') * self.get('pixelWidth'));
    },
    updateShared: function(shared) {
        var self = this;
        self.set('sharedItems', shared);
        self.updateWidth();
    }
}, {
    maxWidth: 600,
    hourPixelMapping: (29*2)/60 // this is the pixels for 1 minute
});