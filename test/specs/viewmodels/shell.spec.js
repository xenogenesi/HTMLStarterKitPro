/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/shell', function() {
    "use strict";
    var sut = require('viewmodels/shell');

    it('should have a "router" property', function() {
        expect(sut.router).toBeDefined();
    });

    it('should have a "search" property of type function', function() {
        expect(sut.search).toBeDefined();
    });

    describe('activate', function() {

        it('should be a property of type function', function() {
            expect(sut.activate).toBeDefined();
        });

        it('should return a promise  ', function() {
            expect(sut.activate().then).toBeDefined();
        });

    });

});
