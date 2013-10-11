/*global module, require */
module.exports = function( grunt ) {
    "use strict";

    var requireConfig = {
        baseUrl: 'app/',
        paths: {
            'jquery': '../lib/jquery/jquery-1.9.1',
            'knockout': '../lib/knockout/knockout-2.3.0.debug',
            'text': '../lib/require/text',
            'durandal': '../lib/durandal/js',
            'plugins': '../lib/durandal/js/plugins',
            'transitions': '../lib/durandal/js/transitions'
        }
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            viewmodels: {
                src: 'app/viewmodels/*.js',
                options: {
                    specs: 'test/specs/viewmodels/**/*spec.js',
                    keepRunner: true,
                    // vendor: [],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: requireConfig
                    }
                }
            },
            app: {
                // src: 'app/main.js',
                options: {
                    specs: 'test/specs/app.spec.js',
                    keepRunner: true,
                    vendor: [
                        //'lib/jquery/jquery-1.9.1.js'
                        //'test/_libs/jasmine-jquery-1.5.2.js'
                    ],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: requireConfig
                    }
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            app: {
                files: ['test/specs/app.spec.js'],
                tasks: ['jasmine:app']
            },
            viewmodels: {
                files: ['test/specs/viewmodels/**/*.spec.js'],
                tasks: ['jasmine:viewmodels']
            }
        }
    });

    // Loading the plugin(s)
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Default task(s).
    grunt.registerTask('default', ['jasmine:viewmodels']);
};
