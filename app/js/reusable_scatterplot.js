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
					//	.attr("width", width)
					//	.attr("height", height);
			}

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