import Rx from 'rxjs/Rx';

const simple$ = new Rx.Observable(observer => {
    console.log("Generating Observable");
    setTimeout(() => {
        observer.next("An item");
        setTimeout(() => {
            observer.next("Another item");
            observer.complete();
        }, 1000)
    }, 1000);
});

const error$ = new Rx.Observable(observer => {
    observer.error(new Error("Whoa!"));
})

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

const createSubscriber = (tag) => ({
    next: (item) => console.log(`${tag}.next ${item}`),
    error: (error) => console.log(`${tag}.error ${error.stack || error}`),
    complete: () => console.log(`${tag}.complete`)
});

const createInterval$ = (time) => {
    return new Rx.Observable(observer => {
        let index = 0;
        let interval = setInterval(() => {
            observer.next(index++);
        }, time);

        return () => clearTimeout(interval)
    });
}

const take$ = (sourceObservable$, amount) => {
    let count = 0;
    return new Rx.Observable(observer => {
        const subscription = sourceObservable$.subscribe({
            next(item) {
                observer.next(item);
                if (++count >= amount)
                    observer.complete()
            },
            error(msg) {
                observer.error(msg);
            },
            complete() {
                observer.complete()
            }
        })
        // return () => subscription.unsubscribe()
    })
}

const everySecond$ = createInterval$(1000);
const first5seconds$ = take$(everySecond$,5);

// const newSub = everySecond$.subscribe(createSubscriber('one'));
 first5seconds$.subscribe(createSubscriber('three'));
