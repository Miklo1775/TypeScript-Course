//Generics give us flexibility along with type safety.

//Generic Utility Types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date) {
  //patial makes all the properties in the beginning optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

//the readonly tells TS that the array is immutable and you can add or remove anything on it in this example
const names: Readonly<string[]> = ["Chichi", "Cheddar"];
// names.push("Sylvestre"); //wont work because array is readonly
