/**
 * MBTAPI module
 * @module mbtapi
 */
'use strict';

var _ = require( 'lodash' );

var methods = require( './lib/api-methods' );
var makeQueryHandler = require( './lib/make-query-handler' );

/**
 * Create and return an MBTAPI interface object
 *
 * @method create
 * @param {Object} config           Configuration object
 * @param {String} config.apiKey    A developer.mbta.com API key
 * @param {String} [config.apiRoot] An alternative API endpoint to query
 * @return {MBTAPI} A configured MBTAPI instance
 */
function makeMBTAPI( config ) {
  if ( ! config.apiKey || typeof config.apiKey !== 'string' ) {
    throw new Error( 'An MBTA API key must be provided' );
  }
  config.apiRoot = config.apiRoot || 'http://realtime.mbta.com/developer/api/v2/';

  return _.mapValues( methods, function( args, key ) {
    // makeQueryHandler's third argument is a config object: add it when applying
    return makeQueryHandler.apply( null, args.concat( config ) );
  });
}

module.exports = {
  create: makeMBTAPI
};
