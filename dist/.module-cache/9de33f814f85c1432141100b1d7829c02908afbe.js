var Calendar = Calendar || {};
Calendar.LeftRail = React.createClass({displayName: "LeftRail",
            render: function(argument) {
                const flipPoint = 13;
                var leftRail = [],
                    count = 0,
                    flip = false, // changes between AM and PM, starting at AM
                    originalStart = 9,
                    start = originalStart;
                for (; count < flipPoint; count++, start++) {
                    if (!(start % (flipPoint - 1))) {
                        flip = true;
                    }
                    leftRail.push( React.createElement("div", null, " ", React.createElement("span", {className: "h4"}, " ", 
                            start % 13, 
                        " "), React.createElement("span", {className: "h6"}, flip?"PM" : "AM"), " "));
                        if (!(flip && start % 12 == originalStart)) {
                            leftRail.push( React.createElement("div", null, " ", React.createElement("span", {className: "h6"}, " ", 
                                start % 12, 
                            ": 30 ")) );
                        }
                    }
                    return ( React.createElement("div", null, " ", 
                            leftRail, 
                        " "));
                    }
                });