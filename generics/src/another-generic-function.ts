//Another generic function

interface Lengthy {
  length: number;
}

//We set the return type to be a tuple with 2 values. The first value will have a type of T, and the second value will have a type string.
//We are also telling TS that T will have a length property with a type of number.
//Okay, so what we have done is we dont really care if the values passed will be an array, or string or anything with a length property. So if it has that length propery, we can use it. Numbers wont work.
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let printText = "Got no value!";
  if (element.length === 1) {
    printText = "Got 1 element.";
  } else if (element.length > 1) {
    printText = `Got ${element.length} elements.`;
  }
  return [element, printText];
}

console.log(countAndPrint({ length: 1000 }));
