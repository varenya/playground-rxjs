import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
import fs from 'fs';

const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);

console.log(typeof readdir$("./src-server"));

readdir$("./src-server")
        .timer(500)
        .mergeMap(files => Rx.Observable.from(files))
        .map( file =>  file.toUpperCase() )
        .subscribe(createSubscriber('readdir'))
