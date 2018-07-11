import { from } from "rxjs";
import { create } from "microstates";

class Person {
  firstName = String;
  lastName = String;

  initialize({ firstname, lastname } = {}) {
    let initialized = this;

    if (firstname) {
      initialized = initialized.firstName.set(firstname);
    }

    if (lastname) {
      initialized = initialized.lastName.set(lastname);
    }

    return initialized;
  }
}

window.homer = create(Person, { firstName: "Homer", lastName: "Simpson" });

let observable = from(window.homer);

// let last;
let subscription = observable.subscribe(next => {
  // capture the next microstate coming through the stream
  console.log(next)
  // last = next;
});

// last.firstName.set("Homer J");

// last.valueOf();
//> { firstName: 'Homer J', lastName: 'Simpson' }