class Department {
  // private id: string;
  // private name: string;
  // we can use the private keyword to ensure that employee arrays are only available within the class
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.name = n;
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

const vetServices = new Department("d1", "Veteran services");

vetServices.addEmployee("Me");
vetServices.addEmployee("You");

// vetServices.employees[2] = "not you";

vetServices.describe();
vetServices.printEmployeeInfo();
// const accountingCopy = { name: "s", describe: vetServices.describe };

// accountingCopy.describe();
