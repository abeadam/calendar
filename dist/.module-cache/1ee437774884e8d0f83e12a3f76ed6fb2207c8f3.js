var Calendar = Calendar || {};

function layOutDay () {
    if (Calender.setUp) {
        calender.setUp(arguments);
    } else {
        // will be hard to come here but just in case this is called before render
        $(function () {
            // we need this function to make sure it's second in the ready stack
            _.defer(function () {
                calender.setUp(arguments);
            });
        });
    }
}

$(function() {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer')
    });
    calendarContainer.render();
    calender.setUp = function(dates) {
        var bundleList = []; // list of collections, each collection is list of items that share width
            dates = Array.prototype.slice(dates);
        /*
         * our  bundleList will always be sorted by the earliest start date
         * each time we do an insert of new date, we will check if it belongs to an existing collection,
         * if it belongs to existing collection, add it and update end and start date appropriately,
         * else create a new collection for our new item and add it to the bundleList in the correct location
         */ 
        _.each(dates, function(date){

        });
    }
});
