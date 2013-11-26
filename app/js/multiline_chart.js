var MultilineChart = Class.create({
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

                var margin = { top: 20, right: 80, bottom: 30, left: 50 };
                var w = 960 - margin.left - margin.right;
                var h = 500 - margin.top - margin.bottom;
                            
                var parseDate = d3.time.format(this.d3Format).parse;
                
                var x = d3.time.scale()
                    	.range([0, w]);
                        
                var y = d3.scale.linear()
                        .range([h, 0]);
                        
                var color = d3.scale.category10();
                
                var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                            
                var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left");
                            
                var line = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.temperature); });  
                    
                var svg = d3.select(this.element).append("svg").attr("preserveAspectRatio", "xMinYMin")
                            .attr("viewBox", "0 0 " + (w + margin.left + margin.right) + " " + (h + margin.top + margin.bottom))
                            .attr("width", w + margin.left + margin.right)
                            .attr("height", h + margin.top + margin.bottom)
                            .append("g")
                    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
              /* parsing the json data: Note that we use d3's native capabilities instead of doing this in
                 a controller with angular because it keeps this class decoupled from requiring the presence
                 of angular and d3 has very powerful built-in binding capabilites. */ 
                d3.json(this.datajson, function(error, data) { 
                        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
                        data.forEach(function(d) {
                        d.date = parseDate(d.date);
                        });
                        
                var cities = color.domain().map(function(name) {
                                return {
                                name: name,
                                values: data.map(function(d) {
                                return {date: d.date, temperature: +d[name]};
                            })
                        };
                    });
                    
                if (error) return console.warn(error);
                
                x.domain(d3.extent(data, function(d) { return d.date; }));
                
                y.domain([
                        d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
                        d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
                        ]);
                        
        		 svg.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + h + ")")
                          .call(xAxis);
                          
    			   svg.append("g")
                             
                            .attr("class", "y axis")
                            .call(yAxis)
                            .append("text")
                            .transition()
                            .duration(1000)
                            .ease("cubic-in-out")
                            .attr("transform", "rotate(-90)")
                            .attr("y", this.yaxisPos)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text(this.yaxisName);
                            
                var city = svg.selectAll(".city")
                              .data(cities)
                              .enter().append("g")
                              .attr("class", "city");

                            city.append("path")
                              .transition()
                              .duration(1000)
                              .ease("cubic-in-out")
                              .attr("class", "line")
                              .attr("d", function(d) { return line(d.values); })
                              .style("stroke", "black")
                              .style("fill", function(d) { return color(d.name); })
                              .style("opacity", ".5");
                              
                city.append("text")
                     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                     .transition()
                     .duration(1000)
                     .ease("circle")
                     .delay(function(d, i) { return i * 100; })
                     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
                     .attr("x", 3)
                     .attr("dy", ".35em")
                     .text(function(d) { return d.name; });   
           
              		    
          }.bind(this));
	 }
});