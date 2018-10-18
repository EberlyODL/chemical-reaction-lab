import { use, create } from 'microstates';
import { from } from "rxjs";

// Selected Items
let selectedItems = create(Array, []);

export const addSelectedItem = (item:string) => {
  if (!selectedItems.state.includes(item)) {
    selectedItems.state.push(item)
  }
}

export const selectedItemsSubscription = from(selectedItems)

// Collisions
const collisionsState = create(Array, [])
export const collisionsObservable = from(collisions)
collisionsObservable.subscribe(next => {
  colli
})
const loggingMiddleware = next => (microstate, transition, args) => {
  console.log(`before ${transition.name} value is`, microstate.valueOf());
  let result = next(microstate, transition, args);
  console.log(`after ${transition.name} value is`, result.valueOf());
  return result;
}
export const collisions = use(loggingMiddleware, collisionsState)