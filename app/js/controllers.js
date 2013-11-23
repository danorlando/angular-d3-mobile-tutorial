'use strict';

/* Controllers */

angular.module('ccd3.controllers', [])
  .controller('MyCtrl1', ['$scope', function AppCtrl ($scope) {
            $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
            $scope.data = [1, 2, 3, 4];
            $scope.hovered = function(d){
                $scope.barValue = d;
                $scope.$apply();
            };
            $scope.barValue = 'None';

  }])
  .controller('ScatterCtrl', ['$scope', function ScatterPlotCtrl ($scope) {
            $scope.options = {width: 500, height: 500, 'bar': 'aaa'};
            $scope.data = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];
            $scope.hovered = function(d){
                $scope.plotValue = d;
                $scope.$apply();
            };
            $scope.plotValue = 'None';

  }])
  .controller('MultilineCtrl', ['$scope', function MultilineCtrl ($scope) {
     
  }])
  .controller('BivariateCtrl', ['$scope', function BivariateCtrl ($scope) {
        
  }])
  .controller('BulletCtrl', ['$scope', function BulletCtrl ($scope) {
        $scope.data = [
              {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220],"markers":[250]}
            ];
  }])
   .controller('StackedAreaCtrl', ['$scope', function ColumnCtrl ($scope) {
        
  }])
  .controller('MyCtrl2', function($scope) {
        var resultsA = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
      					term : "Prod-C",
      					count : 62
      				}]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				},{
        				term : "Female",
        				count : 148
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}, {
	        			time : 1349049600000,
	        			count : 45
	      			}, {
	        			time : 1351728000000,
	        			count : 134
	      			}]
        		}
        	}
        };

        var resultsB = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
                        term : "Prod-C",
                        count : 0
                    }]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}]
        		}
        	}
        };

        $scope.filterSearchA = function(type, term) {
            switch(currentResults) {
                case 'A':
                    $scope.results = resultsB;
                    currentResults = 'B';
                    break;
                case 'B':
                    $scope.results = resultsA;
                    currentResults = 'A';
                    break;
            }
        };

        $scope.results = resultsA;
        var currentResults = 'A';

    });