'use strict';

/* Directives */


angular.module('ccd3.directives', [])
.directive('', ['', function(){
    // Runs during compile
    return {
         restrict: 'E',
         replace: true,
         transclude: false,
         scope: {
            onClick: "=",
            width: "=",
            height: "=",
            datajson: "=",
            yaxisName: "=",
            yaxisPos: "=",
         },  // {} = isolate, true = child, false/undefined = no change
        
        
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            var html = "<div id='" + attrs.id + "'class='" + attrs.class + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem);

            var width = $scope.width || 960;
            var height = $scope.height || 500;
            var margin = {top: 5, right: 40, bottom: 20, left: 20};

            //an example of harmonizing colors between visualizations
            //observe that Consumer Discretionary and Consumer Staples have 
            //been flipped in the second chart
            var colors = d3.scale.category20();
            keyColor = function(d, i) {return colors(d.key)};

            var chart;
            nv.addGraph(function() {
              chart = nv.models.stackedAreaChart()
                .width(width - margin.right - margin.left)
                .height(height - margin.top - margin.bottom)
                .useInteractiveGuideline(true)
                .x(function(d) { return d[0] })
                .y(function(d) { return d[1] })
                .color(keyColor)
                .transitionDuration(300);

          /*  d3.json(this.datajson, function(error, data) {
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
                              .attr("d", area);
                              
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
            }*/

                chart.xAxis
                      .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

                  chart.yAxis
                      .tickFormat(d3.format(',.2f'));

                  d3.select('#'+attrs.id)
                    .selectAll("svg")
                    .datum($scope.data)
                    .transition().duration(0)
                    .call(chart);

                  nv.utils.windowResize(chart.update);

                  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

                  return chart;
                });

        }
    };
}]);
.directive('ccMultilinechart', function () { // Angular Directive
    return {
        restrict: 'E', // Directive Scope is Element
        replace: true, // replace original markup with template 
        transclude: false, // not to copy original HTML DOM
        scope: {
            onClick: "=",
            width: "=",
            height: "=",
            datajson: "=",
            yaxisName: "=",
            yaxisPos: "=",
            d3Format: "@"
        },

        compile: function (element, attrs) {// the compilation of DOM is done here.
            // It is responsible for produce HTML DOM or it returns a combined link function
            // Further Docuumentation on this - http://docs.angularjs.org/guide/directive

            var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem); // Replacement of the element.
             var ourGraph = new MultilineChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
            ourGraph.workOnElement('#'+attrs.id); // Work on particular element
            ourGraph.generateGraph();  // generate the actual graph
       }
   }
    
}) 
.directive('ccBulletchart', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            data: "=chartData",
            onClick: "=",
            width: "=",
            height: "=",
            datajson: "=",
            yaxisName: "=",
            yaxisPos: "=",
        },
        link: function(scope, element, attrs) {
            var html = "<div id='" + attrs.id + "'class='" + attrs.class + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem);

            var width = scope.width || 960;
            var height = scope.height || 100;
            var margin = {top: 5, right: 40, bottom: 20, left: 120};

            var chart = nv.models.bulletChart()
                .width(width - margin.right - margin.left)
                .height(height - margin.top - margin.bottom);

              //TODO: to be consistent with other models, should be appending a g to an already made svg, not creating the svg element
              
              var vis = d3.select('#'+attrs.id).selectAll("svg")
                  .data(scope.data)
                  .enter().append("svg")
                  .attr('preserveAspectRatio', 'xMinYMin meet')
                  .attr('viewBox', '0 0 ' + (width) + ' ' + (height))
                  .attr("class", "bullet nvd3")
                  .attr("width", width)
                  .attr("height", height);

               vis.transition()
                  .duration(1000)
                  .call(chart);

              window.transition = function() {
                vis.datum(randomize)
                  .transition()
                  .duration(1000)
                  .call(chart);
              };

            function randomize(d) {
              if (!d.randomizer) d.randomizer = randomizer(d);
              d.ranges = d.ranges.map(d.randomizer);
              d.markers = d.markers.map(d.randomizer);
              d.measures = d.measures.map(d.randomizer);
              return d;
            }

            function randomizer(d) {
              var k = d3.max(d.ranges) * .2;
              return function(d) {
                return Math.max(0, d + k * (Math.random() - .5));
              };
            }
            d3.select('body').on('click', window.transition);
        }
    }
})

.directive('ccBivariatechart', function () { 
    return {
        restrict: 'E', // Directive Scope is Element
        replace: true, // replace original markup with template 
        transclude: false, // do not copy original HTML DOM
        scope: {
            onClick: "=",
            width: "=",
            height: "=",
            datajson: "=",  //attr to pass in path to json data file that will be parsed
            yaxisName: "=",
            yaxisPos: "=",
            d3Format: "@"   //pass in a string to tell d3 how to format dates 
        },
        compile: function(element, attrs) { // the compilation of DOM is done here.
            var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem); // Replacement of the element.
            var ourGraph = new BivariateChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
            ourGraph.workOnElement('#'+attrs.id); // Work on particular element
            ourGraph.generateGraph(); // function that creates the actual graph
         }
     }
});

