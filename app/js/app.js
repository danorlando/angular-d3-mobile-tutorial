'use strict';


// Declare app level module which depends on filters, and services
angular.module('ccd3', [
  'ngRoute',
  'ngAnimate',
  'ccd3.filters',
  'ccd3.services',
  'ccd3.directives',
  'ccd3.controllers',
  'elasticjs.service',
  'dangle'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html',
                                 controller: 'MyCtrl2'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', 
                                  controller: 'MyCtrl2'});
  $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', 
                                  controller: 'MyCtrl2'});
  $routeProvider.when('/view4', {templateUrl: 'partials/partial4.html', 
                                  controller: 'MyCtrl1'});
  $routeProvider.when('/view5', {templateUrl: 'partials/partial5.html', 
                                  controller: 'ScatterCtrl'});
  $routeProvider.when('/view6', {templateUrl: 'partials/partial6.html', 
                                  controller: 'MultilineCtrl'});
  $routeProvider.when('/view7', {templateUrl: 'partials/partial7.html', 
                                  controller: 'BivariateCtrl'});
  $routeProvider.when('/view8', {templateUrl: 'partials/partial8.html', 
                                  controller: 'StackedAreaCtrl'});
  $routeProvider.when('/view9', {templateUrl: 'partials/partial9.html', 
                                  controller: 'BulletCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
