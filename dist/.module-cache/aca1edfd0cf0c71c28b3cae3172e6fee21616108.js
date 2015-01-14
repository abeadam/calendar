var Calendar = Calendar || {};
Calendar.utils = {
    addComponentWidthClass: function(obj, width) {
        if (width) {
            obj[width] = true
        }
    }
}
Calendar.LeftRail = React.createClass({displayName: "LeftRail",
            render: function() {
                var defaults = this.props.defaults,
                    classes = {
                        'railContainer': true
                    };
                Calendar.utils.addComponentWidthClass(classes, this.props.widthClass);
                const flipPoint = defaults.halfDay? 12: 24,
                      originalStart = defaults.startHour - 1; // we will add one before rendering it
                
                var leftRail = [],
                    count = 0,
                    flip = false, // changes between AM and PM, starting at AM
                    start = originalStart,
                    currentHour;
                
                for (; count <= flipPoint; count++, start++) {
                    if (!(start % flipPoint )) {
                        flip = true;
                    }

                    // mode 12 because we are using AM , PM calendar, add one because we start at 1 not zero
                    currentHour = start%12+1
                    // main line
                    leftRail.push( React.createElement("div", {className: "timeBlock"}, " ", React.createElement("span", {className: "pull-right"}, React.createElement("span", {className: "h4"}, " ", 
                            currentHour, 
                        " "), React.createElement("span", {className: "h6"}, flip?"PM" : "AM"))));
                    // sub line only added if we are not in the final line
                    if (!(flip && start % flipPoint == originalStart)) {
                            leftRail.push( React.createElement("div", {className: "timeBlock"}, " ", React.createElement("span", {className: "h6 pull-right"}, " ", 
                                currentHour, 
                            ": 30 ")) );
                        }
                    }
                    return ( React.createElement("div", {className: React.addons.classSet(classes)}, " ", 
                            leftRail, 
                        " "));
                    }
                });
Calendar.EventContainer = React.createClass({displayName: "EventContainer",
    getInitialState: function() {
        return {items: this.props.items};
    },
    componentDidMount: function() {
        var self = this;
        self.props.items.on('reset', function() {
            console.log(self.props.items);
            self.setState({items: self.props.items});
        });
    },
    render: function() {
        var classes = {
            'eventContainer' : true
        },
        timeBlocks = [];
        this.state.items.each(function (timeBlock) {
            timeBlocks.push(React.createElement(Calendar.ItemContainer, {blockStyle: timeBlock.toJSON()}));
        });
        Calendar.utils.addComponentWidthClass(classes, this.props.widthClass);
        return (React.createElement("div", {className: React.addons.classSet(classes)}, " ", timeBlocks))
    }
});
Calendar.ItemContainer = React.createClass({displayName: "ItemContainer",
    render: function() {
        var info = this.props.blockStyle,
            itemStyle = {
                width: info.pixelWidth,
                height: info.pixelHeight,
                marginTop: info.y,
                marginLeft: info.x
            };
        return (React.createElement("div", {style: itemStyle, className: "singleTimeBlock"}, 
                    React.createElement("h4", null, " ", info.id, " "), 
                    React.createElement("h6", null, " Sample Location ")
                ));
    }
})
Calendar.MainContainer = React.createClass({displayName: "MainContainer",
    render: function() {
        return (React.createElement("div", {className: "calendarContainer row"}, 
                React.createElement(Calendar.LeftRail, {widthClass: "col-md-1", defaults: this.props.railDefaults}), 
                React.createElement(Calendar.EventContainer, {widthClass: "col-md-11", items: this.props.items})
            ));
    }
});
