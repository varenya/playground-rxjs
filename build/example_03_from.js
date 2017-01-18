'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readdir$ = _Rx2.default.Observable.bindNodeCallback(_fs2.default.readdir);

console.log(_typeof(readdir$("./src-server")));

readdir$("./src-server").timer(500).mergeMap(function (files) {
        return _Rx2.default.Observable.from(files);
}).map(function (file) {
        return file.toUpperCase();
}).subscribe((0, _util.createSubscriber)('readdir'));