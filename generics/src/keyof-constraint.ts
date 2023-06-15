//keyof contraints

//what we are telling TS is that type U will be a key of type T which is an object
function extractAndConvert<T extends {}, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extractAndConvert({ name: "chich" }, "name"));
