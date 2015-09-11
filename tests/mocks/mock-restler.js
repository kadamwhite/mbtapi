'use strict';

var sinon = require( 'sinon' );

// Permits infinite chaining to simulate restler API
function basicOn() {
  return {
    on: basicOn
  };
}

module.exports = {
  make: function( fireOnEvent, data ) {
    return {
      get: sinon.stub().returns({
        on: basicOn
      })
    };
  }
};
