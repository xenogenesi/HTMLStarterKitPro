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
        clean: {
            build: ['build/*']
        },

        connect: {
            build: {
                options: {
                    port: 9001,
                    base: 'build',
                    open: true,
                    keepalive: true
                }
            }
        },
        copy: {
            lib: {
                src: 'lib/**/**',
                dest: 'build/'
            },
            index: {
                src: 'index.html',
                dest: 'build/'
            },
            css: {
                src: 'css/**',
                dest: 'build/'
            },
            //todo: remove once requirejs works correctly
            app: {
                src: 'app/**',
                dest: 'build/'
            }
        },
        durandal: {
            allInOne: {
                src: ['app/**/*.*', 'lib/durandal/**/*.js'],
                options: {
                    name: '../lib/require/almond-custom',
                    baseUrl: 'app',
                    mainPath: 'app/main',
                    paths: {
                        "almond": "../lib/require/almond-custom.js",
                        "jquery": "../lib/jquery/jquery-1.9.1",
                        "knockout": "../lib/knockout/knockout-2.3.0.debug",
                        "text": "../lib/require/text",
                        "durandal": "../lib/durandal/js",
                        "plugins": "../lib/durandal/js/plugins",
                        "transitions": "../lib/durandal/js/transitions"
                    },
                    exclude: [],
                    optimize: "none",
                    out: 'build/app/main.js'
                }
            },
            exclude: {
                src: ['app/**/*.*', 'lib/durandal/**/*.js'],
                options: {
                    name: '../lib/require/almond-custom',
                    baseUrl: 'app',
                    mainPath: 'app/main',
                    paths: {
                        "almond": "../lib/require/almond-custom.js",
                        "jquery": "../lib/jquery/jquery-1.9.1",
                        "knockout": "../lib/knockout/knockout-2.3.0.debug",
                        "text": "../lib/require/text",
                        "durandal": "../lib/durandal/js",
                        "plugins": "../lib/durandal/js/plugins",
                        "transitions": "../lib/durandal/js/transitions"
                    },
                    exclude: ['jquery', 'knockout'],
                    optimize: "none",
                    out: 'build/app/main.js'
                }
            }
        },
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
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/specs/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> Spirit EDV-Beratung AG \n' +
                    '* Available via the MIT license.\n' +
                    '* see: https://github.com/RainerAtSpirit/HTMLStarterKitPro for details.\n' +
                    '*/\n'
            },
            build: {
                src: 'build/app/main.js',
                dest: 'build/app/main-built.js'
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

    // Loading plugin(s)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-durandal");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask('default', ['jasmine:viewmodels']);
    grunt.registerTask('build', ['jshint', 'jasmine', 'clean', 'copy', 'durandal:allInOne', 'uglify', 'connect:build']);
};
