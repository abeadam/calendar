var Calendar = Calendar || {};
Calendar.utils = {
    addComponentWidthClass: function(obj, width) {
        if (width) {
            obj[width] = true
        }
    }
}
Calendar.LeftRail = React.createClass({
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
                    leftRail.push( <div className="timeBlock"> <span className="pull-right"><span className = "h4" > {
                            currentHour
                        } </span><span className="h6">{flip?"PM" : "AM"}</span ></span>< /div>);
                    // sub line only added if we are not in the final line
                    if (!(flip && start % flipPoint == originalStart)) {
                            leftRail.push( < div className="timeBlock"> < span className = "h6 pull-right" > {
                                currentHour
                            }: 30 < /span></div > );
                        }
                    }
                    return ( < div className={React.addons.classSet(classes)} > {
                            leftRail
                        } < /div>);
                    }
                });
Calendar.EventContainer = React.createClass({
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
            timeBlocks.push(<Calendar.ItemContainer blockStyle={timeBlock.toJSON()} />);
        });
        Calendar.utils.addComponentWidthClass(classes, this.props.widthClass);
        return (<div className={React.addons.classSet(classes)}> {timeBlocks}</div>)
    }
});
Calendar.ItemContainer = React.createClass({
    render: function() {
        var info = this.props.blockStyle,
            itemStyle = {
                width: info.pixelWidth,
                height: info.pixelHeight,
                marginTop: info.y,
                marginLeft: info.x
            };
        return (<div style={itemStyle} className="singleTimeBlock">
                    <h4> Sample Item </h4>
                    <h6> Sample Location </h6>
                </div>);
    }
})
Calendar.MainContainer = React.createClass({
    render: function() {
        return (<div className="calendarContainer row">
                <Calendar.LeftRail widthClass="col-md-1" defaults={this.props.railDefaults} /> 
                <Calendar.EventContainer  widthClass="col-md-11" items={this.props.items} />
            </div>);
    }
});
