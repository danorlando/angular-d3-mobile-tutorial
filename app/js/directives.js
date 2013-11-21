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
            
          //  link: function($scope, iElm, iAttrs, controller) 
        };
    })
     .directive('multilinechart', function () { // Angular Directive
        return {
            restrict: 'E', // Directive Scope is Element
            replace: true, // replace original markup with template 
            transclude: false, // not to copy original HTML DOM
            compile: function (elem, attrs) {// the compilation of DOM is done here.
                // It is responsible for produce HTML DOM or it returns a combined link function
                // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
            console.log(attrs.id);
            console.log(attrs.datajson);
                var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
                var newElem = $(html);
                elem.replaceWith(newElem); // Replacement of the element.
                var ourGraph = new MultilineChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
                    ourGraph.workOnElement('#'+attrs.id);
                // Work on particular element
                ourGraph.generateGraph();  // generate the actual bar graph
             } 
        }
    })
    .directive('bivariatechart', function () { // Angular Directive
        return {
            restrict: 'E', // Directive Scope is Element
            replace: true, // replace original markup with template 
            transclude: false, // not to copy original HTML DOM
            compile: function (elem, attrs) {// the compilation of DOM is done here.
                // It is responsible for produce HTML DOM or it returns a combined link function
                // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
            console.log(attrs.id);
            console.log(attrs.datajson);
                var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
                var newElem = $(html);
                elem.replaceWith(newElem); // Replacement of the element.
                var ourGraph = new BivariateChart(attrs.datajson,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
                    ourGraph.workOnElement('#'+attrs.id);
                // Work on particular element
                ourGraph.generateGraph();  // generate the actual bar graph
         } 
     }
});

