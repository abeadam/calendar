var Calendar = Calendar || {};
// this will represent a single list item 
Calendar.EventItem = Backbone.Model.extend({
    initialize: function() {
        var self = this,
            timeSpan = self.get('end') - self.get('start');
        self.set('pixelHeight', timeSpan * Calendar.EventItem.hourPixelMapping);
        self.set('y', self.get('start') * Calendar.EventItem.hourPixelMapping);
    },
    updateWidth: function() {
        var self = this;
        self.set('pixelWidth', Calendar.EventItem.maxWidth / self.get('sharedItems'));
        self.set('x', self.get('itemNumber') * self.get('pixelWidth'));
    },
    updateShared: function(shared, number) {
        var self = this;
        self.set('itemNumber', number);
        self.set('sharedItems', shared);
        self.updateWidth();
    }
}, {
    maxWidth: 600,
    hourPixelMapping: (30 * 2) / 60 // this is the pixels for 1 minute
});