'use strict';

const BB = require('bluebird');

/**
 * You can register your own code here on startup.
 */
module.exports = function(grasshopper) {
    return new BB(function(resolve) {
        resolve();
    });
}
