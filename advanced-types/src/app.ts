//Nullish Coalescing

const userInput = null;

//just like in regular JS. If value is null, go to the second value or 'DEFAULT' in this case. Thats only if the value is null, not undefined or an empty string, but null
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
