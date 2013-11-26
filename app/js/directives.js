'use strict';

/* Directives */


angular.module('ccd3.directives', [])
.directive('ccBar', [function(){
    // Runs during compile
    return {
         restrict: 'E',
         replace: true,
         transclude: false,
         scope: {
            bind: "=",
            onClick: "=",
            width: "=",
            height: "=",
            duration: '@'
         },
         link: function(scope, element, attrs) {

            var html = "<div id='" + attrs.id + "'class='" + attrs.class + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem);
        }
    }
}])

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

