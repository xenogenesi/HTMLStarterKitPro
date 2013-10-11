/*global jasmine, describe, beforeEach, it, expect, require, waitsFor, runs, define, $ */

// Adding required 'applicationHost' container via jQuery
$('#applicationHost').remove();
$('body').append('<div id="applicationHost"></div>');

// By requiring main all 'defined' dependencies will be available for testing
define(['main'], function() {
    "use strict";
    var sut;

    describe('div#applicationhost', function() {
        it('should be empty when starting"', function() {
            expect($('#applicationHost').html()).toBe('');
        });
    });

    describe('app', function() {
        sut = require('durandal/app');
        it('should have a title property', function() {
            expect(sut.title).toBeDefined();
        });
    });
});


