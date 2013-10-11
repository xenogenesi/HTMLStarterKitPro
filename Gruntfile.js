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
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/specs/**/*.js']
        },
        // todo: grunt-requirejs doesn't take Durandal specifics into account
        // custom almong
        // include app/**/*.html files
        // include lib/durandal/js/**/*
        requirejs: {
            compile: {
                options: {
                    almond: true,
                    optimize: 'none',
                    baseUrl: requireConfig.baseUrl,
                    paths: requireConfig.paths,
                    include: ['main'],
                    exclude: ['jquery', 'knockout'],
                    out: 'build/app/main.js',
                    wrap: true
                }
            }
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
        clean: {
            build: ['build/*']
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

    // Loading plugin(s)

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Default task(s).
    grunt.registerTask('default', ['jasmine:viewmodels']);
    grunt.registerTask('build', ['jshint', 'jasmine', 'clean', 'copy', 'requirejs', 'uglify']);
};
