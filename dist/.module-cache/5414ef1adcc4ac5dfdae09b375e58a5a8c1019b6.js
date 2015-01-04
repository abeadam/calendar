var Calendar = Calendar || {};

function layOutDay() {
    if (Calender.setUp) {
        calender.setUp(arguments);
    } else {
        // will be hard to come here but just in case this is called before render
        $(function() {
            // we need this function to make sure it's second in the ready stack
            _.defer(function() {
                calender.setUp(arguments);
            });
        });
    }
}

$(function() {
    var calendarContainer = new Calendar.MainView({
            el: $('.appContainer')
        }),
        ItemCollection = Backbone.collection.extend({
            model: Calendar.EventItem
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
        _.each(dates, function(date) {
            // we will do binary search for the correct item collection
            var expectedLocation = _.sortedIndex(bundleList, date.start, function(obj) {
                    return obj.minStart;
                }),
                currentBundle = null,
                startBundle = null,
                endBundle = null;
            // we check possible collection for start and end, and merge them if needed
            // check for a special case where are all the way at the end
            if (expectedLocation === bundleList.length) {
                currentBundle = new ItemCollection(
                    new Calendar.EventItem(_.extend(obj, {
                        sharedItems: 1
                    }))
                );
                currentBundle.minStart = obj.start;
                currentBundle.maxEnd = obj.end;
                bundleList.add(currentBundle);
            } else {
                // check if we interest any starting item collection
                if (expectedLocation > 0 && bundleList[expectedLocation - 1].maxEnd > obj.start) {
                    startBundle = bundleList[expectedLocation - 1];
                    if (startBundle.maxEnd < obj.end) {
                        startBundle.maxEnd = obj.end;
                    }
                }
                // check if we interest any end item collection
                if (bundleList[expectedLocation].minStart < obj.end) {
                    endBundle = bundleList[expectedLocation];
                    if (endBundle.minStart > obj.start) {
                        endBundle.minStart = obj.start;
                    }
                }
            }
            if (startBundle && endBundle) {


                // if they are both the same and push into the start bundle, this happens if the event completely overlaps the list
                // else we need to merge the two lists
                if (startBundle === endBundle) {
                    // update the width of all the existing items
                    startBundle.each(function(model) {
                        model.updateShared(startBundle.length);
                    });
                    startBundle.add(
                        new Calendar.EventItem(_.extend(obj, {
                            sharedItems: startBundle.length
                        }))
                    );
                } else {
                    startBundle.add(endBundle.models);
                    startBundle.each(function(model) {
                        model.updateShared(startBundle.length);
                    });
                    startBundle.add(
                        new Calendar.EventItem(_.extend(obj, {
                            sharedItems: startBundle.length
                        }))
                    );
                    startBundle.maxEnd = endBundle.maxEnd;
                    startBundle.add(endBundle);
                    // delete the end bundle that was merged to the start one
                    bundleList.splice(expectedLocation, 1);
                }
            } else if (startBundle) {
                startBundle.add(
                    new Calendar.EventItem(_.extend(obj, {
                        sharedItems: startBundle.length
                    }))
                );
            } else if (endBundle) {
                endBundle.add(
                    new Calendar.EventItem(_.extend(obj, {
                        sharedItems: endBundle.length
                    }))
                );
            }
        });
    }
});