var Calendar = Calendar || {};
Calendar.LeftRail = React.createClass({displayName: "LeftRail",
            render: function(argument) {
                const flipPoint = 12;
                var leftRail = [],
                    count = 0,
                    flip = false, // changes between AM and PM, starting at AM
                    originalStart = 8, // we will add one before rendering it 
                    start = originalStart,
                    currentHour;
                for (; count <= flipPoint; count++, start++) {
                    if (!(start % flipPoint )) {
                        flip = true;
                    }

                    // mode 12 because we are using AM , PM calendar, add one because we start at 1 not zero
                    currentHour = start%12+1
                    // main line
                    leftRail.push( React.createElement("div", null, " ", React.createElement("span", {className: "h4"}, " ", 
                            currentHour, 
                        " "), React.createElement("span", {className: "h6"}, flip?"PM" : "AM"), " "));
                    // sub line only added if we are not in the final line
                    if (!(flip && start % flipPoint == originalStart)) {
                            leftRail.push( React.createElement("div", null, " ", React.createElement("span", {className: "h6"}, " ", 
                                currentHour, 
                            ": 30 ")) );
                        }
                    }
                    return ( React.createElement("div", null, " ", 
                            leftRail, 
                        " "));
                    }
                });