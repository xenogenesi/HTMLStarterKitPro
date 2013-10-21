/*global module, require */
module.exports = function( grunt ) {
    "use strict";
    var mixIn = require('mout/object/mixIn');
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
            },
            test: {
                options: {
                    port: 8889,
                    base: './',
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
            }
        },
        durandal: {
            main: {
                src: ['app/**/*.*', 'lib/durandal/**/*.js'],
                options: {
                    name: '../lib/require/almond-custom',
                    baseUrl: requireConfig.baseUrl,
                    mainPath: 'app/main',
                    paths: mixIn({}, requireConfig.paths, { "almond": "../lib/require/almond-custom.js" }),
                    exclude: [],
                    optimize: "none",
                    out: 'build/app/main.js'
                }
            }
        },
        jasmine: {
            modules: {
                src: 'app/viewmodels/*.js',
                options: {
                    specs: 'test/specs/modules/**/*spec.js',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: requireConfig
                    }
                }
            },
            app: {
                options: {
                    specs: 'test/specs/app/**/*spec.js',
                    keepRunner: true,
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
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> YourName/YourCompany \n' +
                    '* Available via the MIT license.\n' +
                    '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
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
                files: ['test/specs/app/**/*spec.js'],
                tasks: ['jasmine:app']
            },
            modules: {
                files: ['test/specs/modules/**/*spec.js'],
                tasks: ['jasmine:modules']
            }
        }
    });

    // Loading plugin(s)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-durandal");

    // Default task(s).
    grunt.registerTask('build', ['jshint', 'jasmine', 'clean', 'copy', 'durandal:main', 'uglify', 'connect:build']);
    grunt.registerTask('default', 'start web server for jasmine tests in browser', function() {
        grunt.task.run('jshint');
        grunt.task.run('jasmine:modules');

        grunt.event.once('connect.test.listening', function( host, port ) {
            var specRunnerUrl = 'http://' + host + ':' + port + '/_SpecRunner.html';
            grunt.log.writeln('Jasmine specs available at: ' + specRunnerUrl);
            require('open')(specRunnerUrl);
        });

        grunt.task.run('connect:test:keepalive');
    });
};
