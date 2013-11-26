var BivariateChart = Class.create({
      initialize: function(datajson,yaxisName,yaxisPos,d3Format) {
		this.datajson = datajson;
		this.yaxisName = yaxisName;
		this.yaxisPos = yaxisPos;
		this.d3Format = d3Format;
	  },
	  workOnElement: function(element) {
		this.element = element;
	  },
	  generateGraph: function() {
		//d3 specific coding

                var margin = {
                          top: 20, right: 20, bottom: 30, left: 40},
                          width = 960 - margin.left - margin.right,
                          height = 500 - margin.top - margin.bottom;
                          
              		 var parseDate = d3.time.format(this.d3Format).parse;
                     
					 var x = d3.time.scale()
                        .range([0, width]);
                        
                      var y = d3.scale.linear()
                            .range([height, 0]);
                            
                      var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                            
                     var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left");
                            
                      var area = d3.svg.area()
                            .x(function(d) { return x(d.date); })
                            .y0(function(d) { return y(d.low); })
                            .y1(function(d) { return y(d.high); });
                            
                     var svg = d3.select(this.element).append("svg")
                            .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                            
                    d3.json(this.datajson, function(error, data) {
                          data.forEach(function(d) {
                            d.date = parseDate(d.date);
                            d.low = +d.low;
                            d.high = +d.high;
                          });
                          
                           if (error) return console.warn(error);
                                             
                          x.domain(d3.extent(data, function(d) { return d.date; }));
                          y.domain([d3.min(data, function(d) { return d.low; }), d3.max(data, function(d) { return d.high; })]);
                          
                    svg.append("path")
                              .datum(data)
                              .attr("class", "area")
                              .attr("d", area)
                              .style("stroke", "black")
                              .style("fill", "green");
                              
                    svg.append("g")
                              .attr("class", "x axis")
                              .attr("transform", "translate(0," + height + ")")
                              .call(xAxis);
                              
                    svg.append("g")
                              .attr("class", "y axis")
                              .call(yAxis)
                              .append("text")
                              .attr("transform", "rotate(-90)")
                              .attr("y", this.yaxisPos)
                              .attr("dy", ".71em")
                              .style("text-anchor", "end")
                              .text(this.yaxisName);  

                
                                         		    
            }.bind(this));
	 }
});