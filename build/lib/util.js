"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createSubscriber = exports.createSubscriber = function createSubscriber(tag) {
    return {
        next: function next(item) {
            return console.log(tag + ".next " + item);
        },
        error: function error(_error) {
            return console.log(tag + ".error " + (_error.stack || _error));
        },
        complete: function complete() {
            return console.log(tag + ".complete");
        }
    };
};