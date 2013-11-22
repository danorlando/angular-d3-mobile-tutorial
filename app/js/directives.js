'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('barChart', function(){
            var chart = d3.custom.barChart();
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="chart"></div>',
                scope:{
                    height: '=height',
                    data: '=data',
                    hovered: '&hovered'
                },
                link: function(scope, element, attrs) {
                    var chartEl = d3.select(element[0]);
                    chart.on('customHover', function(d, i){
                        scope.hovered({args:d});
                    });

                    scope.$watch('data', function (newVal, oldVal) {
                        chartEl.datum(newVal).call(chart);
                    });

                    scope.$watch('height', function(d, i){
                        chartEl.call(chart.height(scope.height));
                    })
                }
            };
        })
    .directive('chartForm', function(){
        return {
            restrict: 'E',
            replace: true,
            controller: function AppCtrl ($scope) {
                $scope.update = function(d, i){ $scope.data = randomData(); };
                function randomData(){
                    return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
                }
            },
            template: '<div class="form">' +
                    'Height: {{options.height}}<br />' +
                    '<input type="range" ng-model="options.height" min="100" max="800"/>' +
                    '<br /><button ng-click="update()">Update Data</button>' +
                    '<br />Hovered bar data: {{barValue}}</div>'
        };
    })
    .directive('scatterPlot', function(){
        var plot = d3.custom.scatterPlot();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="plot"></div>',
            scope:{
                    data: '=data',
                    hovered: '&hovered'
                },
            link: function(scope, element, attrs) {
                var chartEl = d3.select(element[0]);
                scope.$watch('data', function(newVal, oldVal) {
                    chartEl.datum(newVal).call(plot);
                })

            }
            
        };
    })
   .directive('doMultilinechart', function () { // Angular Directive
        return {
            restrict: 'E', // Directive Scope is Element
            replace: true, // replace original markup with template 
            transclude: false, // not to copy original HTML DOM
            scope: {
                onClick: "=",
                width: "=",
                height: "=",
              //  datajson: "=",
                yaxisName: "=",
                yaxisPos: "=",
             //   d3Format: "="
            },

            link: function (scope, element, attrs) {// the compilation of DOM is done here.
                // It is responsible for produce HTML DOM or it returns a combined link function
                // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
                console.log(attrs.id);
                console.log(attrs.datajson);
           //  var viewport = angular.element(document.querySelector('#container'))
             // console.log(viewport[0].offsetWidth);
               //console.log(viewport[0].offsetHeight);

                var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
                var newElem = $(html);
                element.replaceWith(newElem); // Replacement of the element.
                 var ourGraph = new MultilineChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
                ourGraph.workOnElement('#'+attrs.id); // Work on particular element
                ourGraph.generateGraph(scope);  // generate the actual graph

           }
       }
           /*     var margin = { top: 20, right: 80, bottom: 30, left: 50 };
                var w = scope.width - margin.left - margin.right;   
                var h = scope.height - margin.top - margin.bottom; 
                var parseDate = d3.time.format(scope.d3Format).parse;
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
                

            var data = d3.json(attrs.datajson, function(error, data) { 
                        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
                        data.forEach(function(d) {
                        d.date = parseDate(d.date);
                        });
                    });
            scope.data = data;
                var cities = color.domain().map(function(name) {
                                return {
                                name: name,
                                values: data.map(function(d) {
                                return {date: d.date, temperature: +d[name]};
                            })
                        };
                    });
                    
                if (error) return console.warn(error);
                //console.log(this.xaxisName); 
                
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
                              .attr("class", "line")
                              .attr("d", function(d) { return line(d.values); })
                              .style("stroke", function(d) { return color(d.name); });
                              
                city.append("text")
                     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
                     .attr("x", 3)
                     .attr("dy", ".35em")
                     .text(function(d) { return d.name; }); *?
               // var ourGraph = new MultilineChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
                 //   ourGraph.workOnElement('#'+attrs.id); // Work on particular element
                //ourGraph.generateGraph($scope);  // generate the actual graph
             } */
        
    }) 
.directive('doBulletchart', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
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

            scope.data = [
              {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220],"markers":[250]}
            ];

              //TODO: to be consistent with other models, should be appending a g to an already made svg, not creating the svg element
              
              var vis = d3.select('#'+attrs.id).selectAll("svg")
                  .data(scope.data)
                  .enter().append("svg")
                  .attr('preserveAspectRatio', 'xMinYMin meet')
                  .attr('viewBox', '0 0 ' + (width) + ' ' + (height))
                  .attr("class", "bullet nvd3")
                  .attr("width", width)
                  .attr("height", height);

              vis
                  .transition()
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
 .directive('multilinechart', function () { // Angular Directive
        return {
            restrict: 'E', // Directive Scope is Element
           // replace: true, // replace original markup with template 
          //  transclude: false, // not to copy original HTML DOM
           scope: {
                fontSize: "=",
                onClick: "=",
                width: "=",
                height: "=",
                bind: "=",
                datajson: "=",
                yaxisName: "=",
                yaxisPos: "=",
                d3Format: "="
            },
            link: function (scope, element, attrs) {// the compilation of DOM is done here.
                // It is responsible for produce HTML DOM or it returns a combined link function
                // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
            console.log(attrs.id);
            console.log(attrs.datajson);

             var viewport = angular.element(document.querySelector('#container'))
              console.log(viewport[0].offsetWidth);
               console.log(viewport[0].offsetHeight);


                var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
                var newElem = $(html);
                elem.replaceWith(newElem); // Replacement of the element.
                var ourGraph = new MultilineChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
                    ourGraph.workOnElement('#'+attrs.id); // Work on particular element
                ourGraph.generateGraph();  // generate the actual graph
             } 
        }
    }) 
.directive("doColumnchart", [function() {
        return {
            restrict: 'E',

            // set up the isolate scope so that we don't clobber parent scope
            scope: {
                fontSize: '=',
                onClick: '=',
                width: '=',
                height: '=',
                bind: '='
            },
            link: function(scope, element, attrs) {

                var margin = {top:20, right: 20, bottom: 30, left: 40};
                var width = scope.width || 960;
                var height = scope.height || 500;
                var color = attrs.color || 'steelblue';
                var fontColor = attrs.fontColor || '#000';
                var fontSize = scope.fontSize || 14;
                var label = attrs.label || 'Frequency';

                // if no field param is set, use the facet name but normalize the case
                if (attrs.field == undefined) {
                    attrs.field = attrs.bind.split('.').pop().toLowerCase();
                }

                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

                var svg = d3.select(element[0])
                    .append('svg')
                        .attr('preserveAspectRatio', 'xMinYMin meet')
                        .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                        .append('g')
                            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


                scope.$watch('bind', function(data) {

                    if (data) {
                        d3.json(data, function(error, data) { 
                            color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
                            data.forEach(function(d) {
                                d.date = parseDate(d.date);
                            });
                        })

                        var cities = color.domain().map(function(name) {
                                return {
                                name: name,
                                values: data.map(function(d) {
                                return {date: d.date, temperature: +d[name]};
                                })
                            };
                        });

                    
                    if (error) return console.warn(error);
                    //console.log(this.xaxisName); 
                    
                    svg.selectAll('*').remove();

                    x.domain(d3.extent(data, function(d) { return d.date; }));
                    
                    y.domain([
                            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
                            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
                            ]);

                     //       data = data.terms || [];
                           

                    //    x.domain(data.map(function(d) { return d.term; }));
                    //    y.domain([0, d3.max(data, function(d) { return d.count; })]);

                        svg.append('g')
                            .attr('fill', fontColor)
                            .attr('font-size', fontSize)
                            .attr('class', 'x axis')
                            .attr('transform', 'translate(0,' + height + ')')
                            .call(xAxis);

                        svg.append('g')
                            .attr('class', 'y axis')
                            .attr('font-size', fontSize)
                            .attr('fill', fontColor)
                            .call(yAxis)
                            .append('text')
                                .attr('transform', 'rotate(-90)')
                                .attr('y', 6)
                                .attr('dy', '.51em')
                                .style('text-anchor', 'end')
                                .text(label);

                        svg.selectAll('.bar')
                            .data(data)
                            .enter()
                                .append('rect')
                                    .attr('fill', color)
                                    .attr('x', function(d) { return x(d.term); })
                                    .attr('width', x.rangeBand())
                                    .attr('y', function(d) { return y(d.count); })
                                    .attr('height', function(d) { return height - y(d.count); })
                                    .on('mousedown', function(d) {
                                        scope.$apply(function() {
                                        (scope.onClick || angular.noop)(attrs.field, d.term);
                                    });
                                });
                    }
                })
            }
        };
    }])

.directive('doBivariatechart', function () { // Angular Directive
    return {
        restrict: 'E', // Directive Scope is Element
        replace: true, // replace original markup with template 
        transclude: false, // not to copy original HTML DOM
        scope: {},
        link: function(scope, element, attrs) {
            // the compilation of DOM is done here.
            // It is responsible for produce HTML DOM or it returns a combined link function
            // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
        console.log(attrs.id);
        console.log(attrs.datajson);
            var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
            var newElem = $(html);
            element.replaceWith(newElem); // Replacement of the element.
            var ourGraph = new BivariateChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
            ourGraph.workOnElement('#'+attrs.id); // Work on particular element
             ourGraph.generateGraph();
         }
     }
});

