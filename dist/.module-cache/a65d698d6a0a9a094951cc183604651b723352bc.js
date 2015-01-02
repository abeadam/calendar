var Calendar = Calendar || {};
Calendar.LeftRail = React.createClass({displayName: "LeftRail",
            render: function(argument) {
                var leftRail = [],
                    counter = 0,
                    flip = false, // changes between AM and PM, starting at AM
                    originalStart = 9,
                    start = originalStart;
                for (; count < 12; count++, stat++) {
                    if (!(start % 12)) {
                        flip = true;
                    }
                    leftRail.push('<div><span class="h4">{ start % 12}</span><span class="h5">{flip?"PM" : "AM"}</span></div>');
                    if (!(flip && start % 12 == originalStart)) {
                        leftRail.push('<div><span class="h5">{start%12}:30</span></div>');
                    }
                }
                return ( React.createElement("div", null, " ", 
                        leftRail, 
                    " "));
                }
            });