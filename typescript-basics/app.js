// //unknown types
// let userInput: unknown; //could technically hold any value
// let userName: string;
// userInput = 5;
// userInput = "Me";
// if (typeof userInput === "string") {
//   //need to do an extra type check to be able to assign the uknown to string var
//   userName = userInput;
// }
// //cant do this
// // userName = userInput;
//the never type
var userInput;
var userName;
userInput = 5;
userInput = "Me";
if (typeof userInput === "string") {
    userName = userInput;
}
function generateErr(message, code) {
    throw {
        message: message,
        errorCode: code
    };
    //infinite loops also never return anything
    //while(true) {}
}
//this function never returns anything and will crash script unless used with try/catch
generateErr("uh oh spaghettios!", 500);
