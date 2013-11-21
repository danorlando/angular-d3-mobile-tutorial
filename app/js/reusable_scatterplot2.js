d3.custom = {};

d3.custom.scatterPlot = function module() {
	var margin = {top: 20, right: 20, bottom: 40, left: 40},
		width = 500,
		height = 500,
		padding = 20,
		gap = 0,
		ease = 'cubic-in-out';
	var svg, duration = 500;

	var dispatch = d3.dispatch('customHover');
	

   function exports(_selection) {

   		_selection.each(function(_data) {

		   	var plotW = width - margin.left - margin.right,
				plotH = height - margin.top - margin.bottom;

			var xScale = d3.scale.linear()
		             .domain([0, d3.max(_data, function(d) { return d[0]; })])
		             .range([padding, width - padding * 2]);
		          
		    var yScale = d3.scale.linear()
		             .domain([0, d3.max(_data, function(d) { return d[1]; })])
		             .range([height - padding, padding]);

		    var rScale = d3.scale.linear()
								 .domain([0, d3.max(_data, function(d) { return d[1]; })])
								 .range([2, 5]);    

			//data and vars for random cirlces when user clicks on graph
			var dataset2 = [];					//Initialize empty array
			var numDataPoints = 50;				//Number of dummy data points to create
			var xRange2 = Math.random() * 1000;	//Max range of new x values
			var yRange2 = Math.random() * 1000; //Max range of new y values
			for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * xRange2);	//New random integer
				var newNumber2 = Math.floor(Math.random() * yRange2);	//New random integer
				dataset2.push([newNumber1, newNumber2]);					//Add new number to array
			}
			//Create scale functions for dataset2
			var xScale2 = d3.scale.linear()
								 .domain([0, d3.max(dataset2, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);

			var yScale2 = d3.scale.linear()
								 .domain([0, d3.max(dataset2, function(d) { return d[1]; })])
								 .range([h - padding, padding]);

			var rScale2 = d3.scale.linear()
								 .domain([0, d3.max(dataset2, function(d) { return d[1]; })])
								 .range([2, 5]);					      

	     //Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(5);

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(5);
		 					  
	     //Create SVG element
			if(!svg) { 
				svg = d3.select(this)
						.append("svg")
						.classed('plot', true);
						var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
					//	.attr("width", width)
					//	.attr("height", height);
			}

			svg.transition().duration(duration).attr({width: width, height: height})
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({transform: 'translate(0,' + (plotH) + ')'})
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);

            var circles = svg.select('.chart-group')
                .selectAll('.circle')
                .data(_data)
			   	.enter()
			    .append("circle")
			    .classed('circle', true)
			    .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", function(d) {
			   		return rScale(d[1]);
			   })
			   .on('mouseover', dispatch.customHover);
				circles.transition()
				.duration(duration)
				.ease(ease)
				.attr("cx", function(d) {
			   		return xScale2(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale2(d[1]);
			   })
			   .attr("r", function(d) {
			   		return rScale2(d[1]);
			   });
			bars.exit().transition().style({opacity: 0}).remove();	   
			
			duration = 500;	   
			});

			svg.selectAll("circle")
			   .data(_data)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", function(d) {
			   		return rScale(d[1]);
			   });

			svg.selectAll("text")
			   .data(_data)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d[0] + "," + d[1];
			   })
			   .attr("x", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("y", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "red");

			//Create X axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (height - padding) + ")")
				.call(xAxis);
			
			//Create Y axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);   
				

		})

	}
	d3.rebind(exports, dispatch, 'on');
    return exports;
};