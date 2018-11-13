import { Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';
import { initialState as video } from './video'

let initialState = {
  video
}

export const state = new Subject()

export const store$ = state.asObservable().pipe(
  scan((acc, newVal) => {
    // create a new object
    return { ...acc, ...newVal };
  }, initialState),
  startWith(initialState),
  shareReplay(1)
);

