//Generic Classes

//we can use the types to fine tune our class methods. We are essentially telling TS to accept only primitives and references for this example.
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); //-1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Chichi");
textStorage.addItem("Cheddars");
textStorage.removeItem("Chichi");

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(3);
numberStorage.addItem(10);
numberStorage.removeItem(3);

console.log(numberStorage.getItems());

//Ah totally forgot that objects are reference types. So for this to work with objects, we would need to store that object inside a variable, and pass that variable.
// const baseball = {
//   hobby: "Baseball",
// };

// const football = {
//   hobby: "Football",
// };

// const objectStorage = new DataStorage<object>();
// // objectStorage.addItem({ hobby: "Baseball" });
// // objectStorage.addItem({ hobby: "Football" });
// // objectStorage.removeItem({ hobby: "Baseball" });
// // console.log(objectStorage.getItems());

// objectStorage.addItem(baseball);
// objectStorage.addItem(football);
// objectStorage.removeItem(baseball);
// console.log(objectStorage.getItems());
