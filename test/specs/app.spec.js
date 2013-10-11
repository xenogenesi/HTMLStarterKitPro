/*global jasmine, describe, beforeEach, it, expect, require, waitsFor, runs, define, $ */
// Adding required 'applicationHost' container via jQuery
require(['jquery'], function( $ ) {
    "use strict";

    $('#applicationHost').remove();
    $('body').append('<div id="applicationHost"></div>');

    describe('div#applicationhost', function() {

        it('should be empty when starting"', function() {
            expect($('#applicationHost').html()).toBe('');
        });
    });

// Ready to start the real tests#
    define([ 'plugins/router', 'durandal/system', 'main'], function( router, system ) {

        describe('main', function() {
            it('should trigger a "router:navigation:complete" event with two arguments', function() {
                var ready = false,
                    result;

                runs(function() {
                    router.on('router:navigation:complete').then(function() {
                        result = arguments;
                        ready = true;
                    });
                });

                waitsFor(function() {
                    return result;
                });

                runs(function() {
                    system.log('runs', result);
                    expect(result.length).toBeTruthy(2);
                });
            });

            it('after "router:navigation:complete" "viewmodels/shell" should be loaded', function() {
                var shell = require('viewmodels/shell');

                expect(shell.__moduleId__).toBeTruthy('viewmodels/shell');
            });
        });
    });

});

