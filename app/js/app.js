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
  $routeProvider.when('/multiline', {templateUrl: 'partials/multiline.html', 
                                  controller: 'MultilineCtrl'});
  $routeProvider.when('/bivariate', {templateUrl: 'partials/bivariate.html', 
                                  controller: 'BivariateCtrl'});
  $routeProvider.when('/bullet', {templateUrl: 'partials/bullet.html', 
                                  controller: 'BulletCtrl'});
  $routeProvider.when('/bar', {templateUrl: 'partials/bar.html', 
                                  controller: 'BarCtrl'});
  $routeProvider.when('/area', {templateUrl: 'partials/area.html',
                                 controller: 'AreaHistoPieCtrl'});
  $routeProvider.when('/date-histo', {templateUrl: 'partials/date-histo.html', 
                                  controller: 'AreaHistoPieCtrl'});
  $routeProvider.when('/pie-dohnut', {templateUrl: 'partials/pie-dohnut.html', 
                                  controller: 'AreaHistoPieCtrl'});
  $routeProvider.otherwise({redirectTo: '/multiline'});
}]);
