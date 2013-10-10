/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/flickr', function() {
    "use strict";

    var sut = require('viewmodels/flickr');
    var ko = require('knockout');


    it('should return a displayName', function() {
        expect(sut.displayName).toBeDefined();
    });

    it('should return "images" as ko.observableArray ', function() {
            expect(ko.isObservable(sut.images)).toBeTruthy();
            expect(ko.unwrap(sut.images).length).toBeDefined();
        });


    it('should have a "activate" property of type function', function() {
        expect(typeof sut.activate).toBe('function');
    });

    it('should have a "select" property of type function', function() {
        expect(typeof sut.select).toBe('function');
    });

    it('should have a "canDeactivate" property of type function', function() {
        expect(typeof sut.canDeactivate).toBe('function');
    });
});
