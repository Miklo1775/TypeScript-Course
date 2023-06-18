//Property Decorators

//adding decorator for a property in a class
// function Log(target: any, propertyName: string | Symbol) {
//   console.log("Property Decorator");
//   //returns the prototype and the name of the property
//   console.log(target, propertyName);
// }

// class Product {
//   // property decorator runs when the property is defined in JS
//   @Log
//   title: string;
//   private _price: number;

//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("Invalid price; Should be greater than 0.");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   getPriceWithTax(tax: number) {
//     return this._price * (1 + tax);
//   }
// }
