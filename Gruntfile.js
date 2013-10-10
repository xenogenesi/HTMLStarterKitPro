/*global module, require */
module.exports = function( grunt ) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            viewmodels: {
                src: 'app/viewmodels/*.js',
                options: {
                    specs: 'test/specs/viewmodels/**/*spec.js',
                    keepRunner: true,
                    vendor: [
                        'lib/jquery/jquery-1.9.1.js',
                        'test/_libs/jasmine-jquery-1.5.2.js'
                    ],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'app/',
                            paths: {
                                'jquery': '../lib/jquery/jquery-1.9.1',
                                'knockout': '../lib/knockout/knockout-2.3.0.debug',
                                'text': '../lib/require/text',
                                'durandal': '../lib/durandal/js',
                                'plugins': '../lib/durandal/js/plugins',
                                'transitions': '../lib/durandal/js/transitions'
                            }
                        }
                    }
                }
            },
            app: {
                // src: 'app/main.js',
                options: {
                    specs: 'test/specs/app.spec.js',
                    keepRunner: true,
                    vendor: [
                        'lib/jquery/jquery-1.9.1.js',
                        'test/_libs/jasmine-jquery-1.5.2.js'
                    ],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'app/',
                            paths: {
                                'jquery': '../lib/jquery/jquery-1.9.1',
                                'knockout': '../lib/knockout/knockout-2.3.0.debug',
                                'text': '../lib/require/text',
                                'durandal': '../lib/durandal/js',
                                'plugins': '../lib/durandal/js/plugins',
                                'transitions': '../lib/durandal/js/transitions'
                            }
                        }
                    }
                }
            }
        }
    });

    // Loading the plugin(s)
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jasmine:viewmodels']);
};
