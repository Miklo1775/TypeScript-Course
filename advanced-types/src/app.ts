//Index Types

interface ErrorContainer {
  //lets say if we dont know what properties we might have. Here we are saying that the propery or key must be of type string which will hold a string.
  //We can also add predefined properties to index properties, but they must all be of the same type as that index property
  [prop: string]: string;
}

const errorBolsa: ErrorContainer = {
  //the reason we can still user a number is because the number as a property can be interpreted as a string.
  email: "Not a valid email address",
  username: "Must start with a capital letter",
};
