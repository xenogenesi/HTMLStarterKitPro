/*global jasmine, describe, beforeEach, it, expect, require, waitsFor, runs, define, $ */

// Adding required div container to jasmine test page
$('#applicationHost').remove();
$('body').append('<div id="applicationHost"></div>');

describe('applicationhost', function() {
    "use strict";
    it('should be empty when starting"', function() {
        expect($('#applicationHost').html()).toBe('');
    });
});

    // Ready to start the real tests#
    define([ 'plugins/router', 'main'], function(router) {

        describe('main', function() {
            it('should trigger a "router:navigation:complete" event', function() {
                var ready = false,
                    result;

                runs(function() {
                    router.on('router:navigation:complete').then(function() {
                        result = true;
                        ready = true;
                    });
                });

                waitsFor(function() {
                    return result;
                });

                runs(function() {
                    expect(result).toBeTruthy();
                });
            });
        });
    });

