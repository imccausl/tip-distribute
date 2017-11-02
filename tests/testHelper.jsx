import React from 'react';
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

// Create a browser-like environment for testing
// use jsdom to set up the testing environment to run like a browser in the commandline
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView; // fake a browser-like window object.

// attach jquery to jsdom DOM
const $ = jquery(global.window);

// renderComponent to render a given react class for testing
// need to add react-redux provider
function renderComponent(ComponentClass, props) {
  const componentInstance = TestUtils.renderIntoDocumenet(<ComponentClass {...props} />);

  return $(ReactDOM.findDOMNode(componentInstance)); // produces the HTML of element as rendered to the DOM
}

// simulate DOM events
jquery.fn.simulate = (eventName, value) => {
  // add value to element if included as an argument
  if (value) {
    this.val(value);
  }

  TestUtils.Simulate[eventName](this[0]);
};

chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
