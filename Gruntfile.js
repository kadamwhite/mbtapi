var _ = require( 'lodash' );

module.exports = function( grunt ) {
  'use strict';

  // Reusable file globbing
  var files = {
    grunt: [ 'Gruntfile.js' ],
    lib: [
      'api.js',
      'lib/*.js'
    ],
    tests: [ 'tests/**/*.js' ]
  };

  // Reusable JSHintRC options
  var jshintrc = grunt.file.readJSON( '.jshintrc' );

  // Load tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-jscs' );

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require( 'jscs-stylish' ).path
      },
      grunt: {
        src: files.grunt
      },
      lib: {
        src: files.lib
      },
      tests: {
        src: files.tests
      }
    },

    jshint: {
      options: {
        reporter: require( 'jshint-stylish' )
      },
      grunt: {
        options: jshintrc,
        src: files.grunt
      },
      lib: {
        options: jshintrc,
        src: files.lib
      },
      tests: {
        options: _.merge({
          mocha: true
        }, jshintrc ),
        src: files.tests
      }
    },

    watch: {
      lib: {
        files: files.lib,
        tasks: [ 'jscs:lib', 'jshint:lib' ]
      },
      tests: {
        files: files.tests,
        tasks: [ 'jscs:tests', 'jshint:tests' ]
      }
    }

  });

  grunt.registerTask( 'lint', [ 'jshint', 'jscs' ] );
  grunt.registerTask( 'default', [ 'lint' ] );
};
