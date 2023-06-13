//Optional Chaining

type FetchedUserData = {
  id: string;
  name: string;
  job?: { title: string; description: string };
};

const fetchedUserData: FetchedUserData = {
  id: "u1",
  name: "ChiChi",
  //   job: { title: "ChiChi", description: "chichi" },
};

console.log(fetchedUserData?.job?.title);

// if ("job" in fetchedUserData) {
// }

//summary, im assuming in TS 4.5.7, we would have to create a type for the object to be able to use the optional chaining operator. In Max's 3.7 example, he didnt create a type for the object. Here I had to because it wasnt working. But essentially optional chaining is the same thing as regular JS
