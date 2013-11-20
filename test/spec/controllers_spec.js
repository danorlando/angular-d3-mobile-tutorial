'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  describe('settings', function() {
  	 var $scope = {};
  	 var ctrl1 = $controller('MyCtrl1', {$scope : $scope});

  	 expect($scope.data).toEqual([1, 2, 3, 4];);

  })

});
