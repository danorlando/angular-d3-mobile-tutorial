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
      browser.get('http://localhost:8000/app/index.html#/view1');
    });


    it('should render Area Chart when user navigates to /view1', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Area Chart');
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/app/index.html#/view2');
    });


    it('should render Date Histogram when user navigates to /view2', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Date Histogram');
    });

  });

    describe('view3', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/app/index.html#/view3');
    });


    it('should render Pie & Donut Chart when user navigates to /view3', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Pie & Donut Chart');
    });

  });

    describe('view4', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/app/index.html#/view4');
    });


    it('should render Bar Chart when user navigates to /view4', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Reusable Vertical Bar Chart');
    });

  });

    describe('view5', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/app/index.html#/view5');
    });


    it('should render Scatter Plot when user navigates to /view5', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Reusable Scatter Plot');
    });

  });

    describe('view6', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/app/index.html#/view6');
    });


    it('should render multiline graph when user navigates to /view6', function() {
      expect(element(by.id('partialTitle')).getText()).
        toEqual('Multiline Graph');
    });
});
