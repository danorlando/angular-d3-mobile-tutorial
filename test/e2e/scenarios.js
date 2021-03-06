'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000/app/index.html');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser().navigateTo('#/view1');
    });


    it('should render Area Chart when user navigates to /view1', function() {
      expect(element('[ng-view] h1:first').getText()).
        toEqual('Area Chart');
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render Date Histogram when user navigates to /view2', function() {
      expect(element('[ng-view] h1:first').getText()).
        toEqual('Date Histogram');
    });

  });

    describe('view3', function() {

    beforeEach(function() {
      browser().navigateTo('#/view3');
    });


    it('should render Pie & Donut Chart when user navigates to /view3', function() {
      expect(element('[ng-view] h1:first').getText()).
        toEqual('Pie & Donut Chart');
    });

  });

    describe('view4', function() {

    beforeEach(function() {
      browser().navigateTo('#/view4');
    });


    it('should render Bar Chart when user navigates to /view4', function() {
      expect(element('[ng-view] h1:first').getText()).
        toEqual('Reusable Vertical Bar Chart');
    });

  });
});
