class Department {
  static fiscalYear = 2023;
  // private id: string;
  // private name: string;
  // we can use the private keyword to ensure that employee arrays are only available within the class
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  static createEmployee(name: string) {
    return {
      name,
    };
  }

  describe(this: Department) {
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this, this.employees.length);
    console.log(this.employees);
  }
}

//remember, you can only inherit from one class and not multiple classes

class ITDepartment extends Department {
  //remember, we can also declare identifiers in the constructor using the private or public keywords. Here we are doing it the long way to emphasize thst super() needs to be invoke before anything.
  admins: string[];
  //whenever we use our own constructor from an inherited class, we need to invoke super(). This calls the constructor from the base class.
  //If we dont use our own constructor, we dont need to use the constructor function.
  //We need to invoke it before we declare the this keywords
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  //getters need to return something
  //you can access this like a property and not a method.
  //so in this case it would be vetAccounting.mostRecentReport
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("That is an invalid value");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.reports = [];
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "Me") {
      return;
    }
    //since employees is private inside of the class Department, we still can't access it even a inherited class.
    //To work around this, we can use the protected keyword instead of private. Its similar to private but allows the property to be accessed in inherited classes.
    console.log(vetAccounting);
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const vetServices = new ITDepartment("IT", ["Chichi", "Myrvester"]);

vetServices.addEmployee("Me");
vetServices.addEmployee("You");

// vetServices.employees[2] = "not you";

vetServices.describe();
vetServices.name = "IT VETS";
vetServices.printEmployeeInfo();
// const accountingCopy = { name: "s", describe: vetServices.describe };

// accountingCopy.describe();
// console.log(vetServices);

//here i realized i can use an empty array since i dont have any reports at thet moment to create the instance of AccountingDepartment
const vetAccounting = new AccountingDepartment("accounts", []);

//below is how we use the setter, it can also be used as an alternative to the addReport method
vetAccounting.mostRecentReport = "Latest Report";
//below is how we use the getter
// console.log(vetAccounting.mostRecentReport);

vetAccounting.addReport("This is a dummy report"); //and here i can add the report

vetAccounting.addEmployee("Me");
vetAccounting.addEmployee("Mrvester");
vetAccounting.printEmployeeInfo();
vetAccounting.printReports();
vetAccounting.addReport("This is working");
// console.log(vetAccounting.mostRecentReport);

//static methods and properties
//you cant access static methods or properties on nonstatic properties and methods.
//one reason is because of this keyword refers to the INSTANCE of the class
//if you did want to access the static properties or methods, you would have to use the class name and not this.
const employee1 = Department.createEmployee("Victor");
console.log(employee1, Department.fiscalYear);
