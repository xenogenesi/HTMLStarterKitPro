/*global jasmine, describe, beforeEach, it, expect, require */
describe('main', function() {
    "use strict";

    var sut = require('main');

    it('should return a title', function() {
        expect(sut.title).toBeDefined();
    });


});
