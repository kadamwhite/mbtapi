'use strict';

var mbtapi = require( '../api' ).create({
  // Default API key, FOR DEMO USE ONLY
  apiKey: 'wX9NwuHnZU2ToO7GmGR9uw'
});

// mbtapi.scheduleByRoute( '88' ).then(function)
mbtapi.routes().then(function(results) {
  console.log(results);
});
