//unknown types

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Me";
if (typeof userInput === "string") {
  //need to do an extra type check to be able to assign the uknown to string var
  userName = userInput;
}

//cant do this
// userName = userInput;
