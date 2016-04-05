# MBTAPI

[![Build Status](https://travis-ci.org/kadamwhite/mbtapi.svg)](https://travis-ci.org/kadamwhite/mbtapi)

A Node.js library for interacting with the Massachusetts Bay Transit Authority's MBTA-Realtime v2 API

*Note: This library is neither maintained by nor affiliated with the MBTA*

-------------

Quick Links: [Installation](https://github.com/kadamwhite/mbtapi#installation) &bull; [Usage](https://github.com/kadamwhite/mbtapi#usage) &bull; [Available Methods](https://github.com/kadamwhite/mbtapi#available-api-requests) &bull; [Resources](https://github.com/kadamwhite/mbtapi#api-resources) &bull; [License & Credits](https://github.com/kadamwhite/mbtapi#license--credits)

-------------

## Installation

To use MBTAPI in your project, install it with NPM:
```bash
npm install --save mbtapi
```

## Usage

In your Node application code, you can then require the `mbtapi` module. Before you can make API requests, you must use the module to create the API client using your own API key:
```js
var mbtapi = require('mbtapi').create({
  apiKey: 'yourAPIkeyGoesHere'
});
```
Once you have required and created the MBTAPI client, you can make requests against the API using any of the available request methods.

MBTAPI is a Promise-based library, so each method returns a JavaScript [Promise object](https://www.promisejs.org/). The results of the API request can be accessed throuh the `.then` method:
```js
mbtapi.routes().then(function( results ) {
  results.mode.forEach(function( mode ) {
    var modeName = mode.mode_name;
    var routeCount = mode.route.length;
    console.log( routeCount + ' ' + modeName + ' routes' );
  });
});
```
This logs out
```
5 Subway routes
3 Subway routes
12 Commuter Rail routes
189 Bus routes
3 Boat routes
```

### Available API Requests

```js
// Return a complete list of routes for which data can be requested.
mbtapi.routes().then(function( routes ) {
  // ...
});

// Return a list of routes that serve a particular stop, specified by a
// stop_id value e.g. "Back Bay" or "70065".
mbtapi.routesByStop( '70065' ).then(function( routes ) {
  // ...
});

// Returns a list of all stops served by a route, specified by a route_id
// value such as "Orange" or "88"
mbtapi.stopsByRoute( 'Orange' ).then(function( stops ) {
  // ...
});

// Returns a list of all stops near a specified latitude & longitude
mbtapi.stopsByLocation( 42.352913, -71.064648 ).then(function( stops ) {
  // ...
});

// Returns scheduled arrivals and departures at a particular stop
mbtapi.scheduleByStop( 2681 ).then(function( schedule ) {
  // ...
});

// Returns scheduled arrivals and departures for a particular route
mbtapi.scheduleByRoute( 'CR-Providence' ).then(function( schedule ) {
  // ...
});

// Returns scheduled arrivals and departures for a particular trip
mbtapi.scheduleByTrip( '25385462' ).then(function( schedule ) {
  // ...
});

// Returns arrival/departure predictions, plus vehicle locations and alert
// headers, for a stop
mbtapi.predictionsByStop( '70099' ).then(function( predictions ) {
  // ...
});

// Returns arrival/departure predictions, plus vehicle locations and alert
// headers, for a route
mbtapi.predictionsByRoute( 'Green-D' ).then(function( predictions ) {
  // ...
});

// Returns arrival/departure predictions, plus vehicle location, for a trip
mbtapi.predictionsByTrip( '28192827' ).then(function( predictions ) {
  // ...
});

// Returns vehicle locations for a route
mbtapi.vehiclesByRoute( 'Red' ).then(function( vehicles ) {
  // ...
});

// Returns vehicle location for a trip
mbtapi.vehiclesByTrip( 'CR-Providence-CR-Weekday-807' ).then(function( vehicles ) {
  // ...
});

// Returns a list of all alerts, with all details
mbtapi.alerts().then(function( alerts ) {
  // ...
});

// Returns a list of all alerts applicable to a route, with all details
mbtapi.alertsByRoute( '90' ).then(function( alerts ) {
  // ...
});

// Returns a list of all alerts for a stop, with all details
mbtapi.alertsByStop( 'place-portr' ).then(function( alerts ) {
  // ...
});

// Returns the full alert object for a given alert ID
mbtapi.alertById( 2579 ).then(function( alert ) {
  // ...
});

// Returns a list of all alert headers, with all details
mbtapi.alertHeaders().then(function( alerts ) {
  // ...
});

// Returns a list of all alert headers for a route, with all details
mbtapi.alertHeadersByRoute( '90' ).then(function( alerts ) {
  // ...
});

// Returns a list of all alert headers for a stop, with all details
mbtapi.alertHeadersByStop( 'place-portr' ).then(function( alerts ) {
  // ...
});

// Returns the current server time on the MBTA API server
mbtapi.serverTime().then(function( serverTime ) {
  console.log( serverTime.server_dt ); // e.g. "1459895929"
});
```

## API Resources

For more information about the MBTA Realtime v2 API, see the [MBTA Realtime developer portal](http://realtime.mbta.com/portal)

In order to use the API, you need to [register for an API key](http://realtime.mbta.com/Portal/Account/Register). Also check out the [Realtime API v2 documentation](http://realtime.mbta.com/Portal/Home/Documents), which has in-depth information about each API endpoint's parameters and response.

## License & Credits

This library's code &copy; 2015 K. Adam White, released under the [MIT License](LICENSE)

Use of the MBTA API is subject to the [Mass DoT Developers License Agreement](http://www.massdot.state.ma.us/Portals/0/docs/developers/develop_license_agree.pdf)

Contributions to the library are welcome: please open an issue if you encounter any problems!
