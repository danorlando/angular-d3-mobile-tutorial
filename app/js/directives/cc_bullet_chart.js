angular.module('ccd3.directives', [])
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
