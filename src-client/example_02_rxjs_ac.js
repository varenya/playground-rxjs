import $ from 'jquery';
import Rx from 'rxjs/Rx';

const $title = $('#title');
const $results = $('#results');

const keyUps$ = Rx.Observable.fromEvent($title,'keyup');
const queries$ = keyUps$
                  .map( e => e.target.value)
                  .distinctUntilChanged()
                  .debounceTime(500)
                  .switchMap( query => getItems(query) );

queries$.subscribe( items => {
          $results.empty();
          $results.append( items.map( (item) => $('<li />').text(item)) );
});


const getItems = (title) => {
    console.log(`Querying for ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, 'text', `Another ${Math.random()}`])
        }, 500 + (Math.random() * 1000))
    })
}
