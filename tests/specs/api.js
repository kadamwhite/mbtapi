'use strict';

/*jshint -W106 */// Disable underscore_case warnings in this file
var chai = require( 'chai' );
var expect = chai.expect;
chai.use( require( 'sinon-chai' ) );
chai.use( require( 'chai-as-promised' ) );
var proxyquire = require( 'proxyquire' );

var mockRestler = require( '../mocks/mock-restler' );

describe( 'mbtapi', function() {

  var restler;
  var mbtapi;

  beforeEach(function() {
    // Default stub behavior: always succeed
    restler = mockRestler.make( 'success' );

    mbtapi = proxyquire( '../../api', {
      // Mock out the deps for the module api-query uses to create endpoint handlers
      './lib/make-query-handler': proxyquire( '../../lib/make-query-handler', {
        'restler': restler
      })
    });

  });

  describe( '.create', function() {
    it( 'exists', function() {
      expect( mbtapi ).to.have.property( 'create' );
    });

    it( 'is a function', function() {
      expect( mbtapi.create ).to.be.a( 'function' );
    });

    it( 'requires a config object with an apiKey', function() {
      expect(function() {
        mbtapi.create({});
      }).to.throw;
      expect(function() {
        mbtapi.create({
          apiKey: 'key'
        });
      }).not.to.throw;
    });

    it( 'returns an API client object', function() {
      expect( mbtapi.create({
        apiKey: 'key'
      })).to.be.an( 'object' );
    });
  });

  describe( 'client object', function() {
    var mbtapiClient;

    beforeEach(function() {
      mbtapiClient = mbtapi.create({
        apiRoot: 'apiroot/v2/',
        apiKey: 'apikey'
      });
    });

    describe( '.routes', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'routes' );
        expect( mbtapiClient.routes ).to.be.a( 'function' );
      });

      it( 'creates a request against the routes endpoint', function() {
        mbtapiClient.routes();
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/routes?api_key=apikey&format=json' );
      });

    });

    describe( '.routesByStop', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'routesByStop' );
        expect( mbtapiClient.routesByStop ).to.be.a( 'function' );
      });

      it( 'creates a request against the routesbystop endpoint', function() {
        mbtapiClient.routesByStop( 'stopID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/routesbystop?stop=stopID&api_key=apikey&format=json' );
      });

      it( 'requires the "stop" parameter to be specified', function() {
        expect( mbtapiClient.routesByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( '.stopsByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'stopsByRoute' );
        expect( mbtapiClient.stopsByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the stopsbyroute endpoint', function() {
        mbtapiClient.stopsByRoute( 'routeID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/stopsbyroute?route=routeID&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.stopsByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.stopsByLocation', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'stopsByLocation' );
        expect( mbtapiClient.stopsByLocation ).to.be.a( 'function' );
      });

      it( 'creates a request against the stopsbylocation endpoint', function() {
        mbtapiClient.stopsByLocation( 42, -71 );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/stopsbylocation?lat=42&lon=-71&api_key=apikey&format=json' );
      });

      it( 'requires the "lat" parameter to be specified', function() {
        expect( mbtapiClient.stopsByLocation() ).to.be
          .rejectedWith( 'missing required parameter: lat' );
      });

      it( 'requires the "lon" parameter to be specified', function() {
        expect( mbtapiClient.stopsByLocation( 42.352913 ) ).to.be
          .rejectedWith( 'missing required parameter: lon' );
      });

    });

    describe( '.scheduleByStop', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'scheduleByStop' );
        expect( mbtapiClient.scheduleByStop ).to.be.a( 'function' );
      });

      it( 'creates a request against the schedulebystop endpoint', function() {
        mbtapiClient.scheduleByStop( 'stopID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/schedulebystop?stop=stopID&api_key=apikey&format=json' );
      });

      it( 'requires the "stop" parameter to be specified', function() {
        expect( mbtapiClient.scheduleByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( '.scheduleByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'scheduleByRoute' );
        expect( mbtapiClient.scheduleByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the schedulebyroute endpoint', function() {
        mbtapiClient.scheduleByRoute( 'routeID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/schedulebyroute?route=routeID&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.scheduleByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.scheduleByTrip', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'scheduleByTrip' );
        expect( mbtapiClient.scheduleByTrip ).to.be.a( 'function' );
      });

      it( 'creates a request against the schedulebytrip endpoint', function() {
        mbtapiClient.scheduleByTrip( 'tripId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/schedulebytrip?trip=tripId&api_key=apikey&format=json' );
      });

      it( 'requires the "trip" parameter to be specified', function() {
        expect( mbtapiClient.scheduleByTrip() ).to.be
          .rejectedWith( 'missing required parameter: trip' );
      });

    });

    describe( '.predictionsByStop', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'predictionsByStop' );
        expect( mbtapiClient.predictionsByStop ).to.be.a( 'function' );
      });

      it( 'creates a request against the predictionsbystop endpoint', function() {
        mbtapiClient.predictionsByStop( 'stopID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/predictionsbystop?stop=stopID&api_key=apikey&format=json' );
      });

      it( 'requires the "stop" parameter to be specified', function() {
        expect( mbtapiClient.predictionsByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( '.predictionsByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'predictionsByRoute' );
        expect( mbtapiClient.predictionsByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the predictionsbyroute endpoint', function() {
        mbtapiClient.predictionsByRoute( 'routeID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/predictionsbyroute?route=routeID&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.predictionsByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.predictionsByTrip', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'predictionsByTrip' );
        expect( mbtapiClient.predictionsByTrip ).to.be.a( 'function' );
      });

      it( 'creates a request against the predictionsbytrip endpoint', function() {
        mbtapiClient.predictionsByTrip( 'tripId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/predictionsbytrip?trip=tripId&api_key=apikey&format=json' );
      });

      it( 'requires the "trip" parameter to be specified', function() {
        expect( mbtapiClient.predictionsByTrip() ).to.be
          .rejectedWith( 'missing required parameter: trip' );
      });

    });

    describe( '.vehiclesByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'vehiclesByRoute' );
        expect( mbtapiClient.vehiclesByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the vehiclesbyroute endpoint', function() {
        mbtapiClient.vehiclesByRoute( 'routeID' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/vehiclesbyroute?route=routeID&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.vehiclesByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.vehiclesByTrip', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'vehiclesByTrip' );
        expect( mbtapiClient.vehiclesByTrip ).to.be.a( 'function' );
      });

      it( 'creates a request against the vehiclesbytrip endpoint', function() {
        mbtapiClient.vehiclesByTrip( 'tripId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/vehiclesbytrip?trip=tripId&api_key=apikey&format=json' );
      });

      it( 'requires the "trip" parameter to be specified', function() {
        expect( mbtapiClient.vehiclesByTrip() ).to.be
          .rejectedWith( 'missing required parameter: trip' );
      });

    });

    describe( '.alerts', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alerts' );
        expect( mbtapiClient.alerts ).to.be.a( 'function' );
      });

      it( 'creates a request against the alerts endpoint', function() {
        mbtapiClient.alerts( 'tripId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alerts?api_key=apikey&format=json' );
      });

    });

    describe( '.alertsByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertsByRoute' );
        expect( mbtapiClient.alertsByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertsByRoute endpoint', function() {
        mbtapiClient.alertsByRoute( 'routeId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertsbyroute?route=routeId&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.alertsByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.alertsByStop', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertsByStop' );
        expect( mbtapiClient.alertsByStop ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertsByStop endpoint', function() {
        mbtapiClient.alertsByStop( 'stopId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertsbystop?stop=stopId&api_key=apikey&format=json' );
      });

      it( 'requires the "stop" parameter to be specified', function() {
        expect( mbtapiClient.alertsByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( '.alertHeaders', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertHeaders' );
        expect( mbtapiClient.alertHeaders ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertHeaders endpoint', function() {
        mbtapiClient.alertHeaders();
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertheaders?api_key=apikey&format=json' );
      });

    });

    describe( '.alertHeadersByRoute', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertHeadersByRoute' );
        expect( mbtapiClient.alertHeadersByRoute ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertHeadersByRoute endpoint', function() {
        mbtapiClient.alertHeadersByRoute( 'routeId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertheadersbyroute?route=routeId&api_key=apikey&format=json' );
      });

      it( 'requires the "route" parameter to be specified', function() {
        expect( mbtapiClient.alertHeadersByRoute() ).to.be
          .rejectedWith( 'missing required parameter: route' );
      });

    });

    describe( '.alertHeadersByStop', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertHeadersByStop' );
        expect( mbtapiClient.alertHeadersByStop ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertHeadersByStop endpoint', function() {
        mbtapiClient.alertHeadersByStop( 'stopId' );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertheadersbystop?stop=stopId&api_key=apikey&format=json' );
      });

      it( 'requires the "stop" parameter to be specified', function() {
        expect( mbtapiClient.alertHeadersByStop() ).to.be
          .rejectedWith( 'missing required parameter: stop' );
      });

    });

    describe( '.alertById', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'alertById' );
        expect( mbtapiClient.alertById ).to.be.a( 'function' );
      });

      it( 'creates a request against the alertById endpoint', function() {
        mbtapiClient.alertById( 87 );
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/alertbyid?id=87&api_key=apikey&format=json' );
      });

      it( 'requires the "id" parameter to be specified', function() {
        expect( mbtapiClient.alertById() ).to.be
          .rejectedWith( 'missing required parameter: id' );
      });

    });

    describe( '.serverTime', function() {

      it( 'is a function', function() {
        expect( mbtapiClient ).to.have.property( 'serverTime' );
        expect( mbtapiClient.serverTime ).to.be.a( 'function' );
      });

      it( 'creates a request against the serverTime endpoint', function() {
        mbtapiClient.serverTime();
        expect( restler.get ).to.have.been
          .calledWith( 'apiroot/v2/servertime?api_key=apikey&format=json' );
      });

    });

  });

});
