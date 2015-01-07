var Calendar = Calendar || {};

function layOutDay() {
    if (Calendar.setUp) {
        Calendar.setUp.apply(this, arguments);
    } else {
        // will be hard to come here but just in case this is called before render
        $(function() {
            // we need this function to make sure it's second in the ready stack
            _.defer(function() {
                Calendar.setUp.apply(this, arguments);
            });
        });
    }
}

Calendar._setupHelper = function(dates) {
    var bundleList = [],
        outputList = []; // list of collections, each collection is list of items that share width
    // here I am assuming stable sort which underscore provides
    // we will end up with a list sorted by start date -> end date
    dates = _.sortBy(dates, function(date) {
        return date.end;
    });
    dates = _.sortBy(dates, function(date) {
        return date.start;
    });
    var startPointer = 0;
    var endPointer = 0;
    var counter = 0;
    while (startPointer < dates.length) {
        if (dates[startPointer].start >= dates[endPointer].end) {
            console.log(dates[endPointer].start + ' ' + dates[startPointer].end + ' ' + counter);
            counter = 0;
            endPointer++;
        } else {
            startPointer++;
            counter++;
        }
    }
    /*
     * our  bundleList will always be sorted by the earliest start date
     * each time we do an insert of new date, we will check if it belongs to an existing collection,
     * if it belongs to existing collection, add it and update end and start date appropriately,
     * else create a new collection for our new item and add it to the bundleList in the correct location
     */
    _.each(dates, function(date) {
        // we will do binary search for the correct item collection
        var expectedLocation = _.sortedIndex(bundleList, {
                minStart: date.start
            }, function(obj) {
                return obj.minStart;
            }),
            currentBundle = null,
            startBundle = null,
            endBundle = null,
            addToExistingBundle = function(bundle, obj) {
                var len = bundle.length;
                // update the width of all the existing items
                bundle.each(function(model) {
                    model.updateShared(len + 1);
                });
                bundle.add(
                    new Calendar.EventItem(_.extend(obj, {
                        sharedItems: len + 1,
                        itemNumber: len
                    }))
                );
            };
        // we check possible collection for start and end, and merge them if needed
        // check for a special case where are all the way at the end
        if (false && expectedLocation === bundleList.length) {
            currentBundle = new Calendar.ItemCollection();
            addToExistingBundle(currentBundle, date);
            currentBundle.minStart = date.start;
            currentBundle.maxEnd = date.end;
            bundleList.push(currentBundle);
        } else {
            // check if we interest any starting item collection
            if (expectedLocation > 0 && bundleList[expectedLocation - 1].maxEnd > date.start) {
                startBundle = bundleList[expectedLocation - 1];
                if (startBundle.maxEnd < date.end) {
                    startBundle.maxEnd = date.end;
                }
            }
            // check if we interest any end item collection
            if (bundleList[expectedLocation] && bundleList[expectedLocation].minStart < date.end) {
                endBundle = bundleList[expectedLocation];
                if (endBundle.minStart > date.start) {
                    endBundle.minStart = date.start;
                }
            }

            if (startBundle && endBundle) {
                // if they are both the same and push into the start bundle, this happens if the event completely overlaps the list
                // else we need to merge the two lists
                if (startBundle === endBundle) {
                    // update the width of all the existing items
                    addToExistingBundle(startBundle, date);
                } else {
                    startBundle.add(endBundle.models);
                    addToExistingBundle(startBundlem, date);
                    startBundle.maxEnd = endBundle.maxEnd;
                    // delete the end bundle that was merged to the start one
                    bundleList.splice(expectedLocation, 1);
                }
            } else if (startBundle) {
                addToExistingBundle(startBundle, date);
            } else if (endBundle) {
                addToExistingBundle(endBundle, date);
            } else {
                // no current bundle so add one for the item
                currentBundle = new Calendar.ItemCollection();
                addToExistingBundle(currentBundle, date);
                currentBundle.minStart = date.start;
                currentBundle.maxEnd = date.end;
                bundleList.splice(expectedLocation, 0, currentBundle);
            }
        }
    });
    // how we need to go through them one more time to create a pure list of all the models 
    _.each(bundleList, function(bundle) {
        bundle.each(function(model) {
            outputList.push(model);
        });
    });
    return outputList;
}
var DEFAULT_VALUES = [{
    start: 30,
    end: 150
}, {
    start: 540,
    end: 600
}, {
    start: 560,
    end: 620
}, {
    start: 610,
    end: 670
}];
$(function() {
    var calendarContainer = new Calendar.MainView({
        el: $('.appContainer'),
        collection: new Calendar.ItemCollection()
    });
    calendarContainer.render();
    Calendar.setUp = function(dates) {
        var datesObjects = Calendar._setupHelper(dates);
        calendarContainer.updateCollection(datesObjects);
    }
    layOutDay([{
        start: 30,
        end: 150
    }, {
        start: 540,
        end: 600
    }, {
        start: 560,
        end: 620
    }, {
        start: 610,
        end: 670
    }]);
});