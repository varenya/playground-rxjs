"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simple$ = new _Rx2.default.Observable(function (observer) {
    console.log("Generating Observable");
    setTimeout(function () {
        observer.next("An item");
        setTimeout(function () {
            observer.next("Another item");
            observer.complete();
        }, 1000);
    }, 1000);
});

var error$ = new _Rx2.default.Observable(function (observer) {
    observer.error(new Error("Whoa!"));
});

// error$.subscribe(
//   item => console.log(`one.next ${item}`),
//   error => console.log(`one.error ${error.stack}`),
//   () => console.log('one.complete')
// )

// setTimeout( () => {
//   simple$.subscribe({
//     next : (item) => console.log(`two.next ${item}`),
//     error : (error) => console.log(`two.error ${error}`),
//     complete : () => console.log(`two.complete`)
//   })
// },3000)

var createSubscriber = function createSubscriber(tag) {
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

var createInterval$ = function createInterval$(time) {
    return new _Rx2.default.Observable(function (observer) {
        var index = 0;
        var interval = setInterval(function () {
            observer.next(index++);
        }, time);

        return function () {
            return clearTimeout(interval);
        };
    });
};

var take$ = function take$(sourceObservable$, amount) {
    var count = 0;
    return new _Rx2.default.Observable(function (observer) {
        var subscription = sourceObservable$.subscribe({
            next: function next(item) {
                observer.next(item);
                if (++count >= amount) observer.complete();
            },
            error: function error(msg) {
                observer.error(msg);
            },
            complete: function complete() {
                observer.complete();
            }
        });
        // return () => subscription.unsubscribe()
    });
};

var everySecond$ = createInterval$(1000);
var first5seconds$ = take$(everySecond$, 5);

// const newSub = everySecond$.subscribe(createSubscriber('one'));
first5seconds$.subscribe(createSubscriber('three'));