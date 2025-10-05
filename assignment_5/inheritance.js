class Person {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    // Get user Infor 
    getUserInfor() {
        return {
            name: this.name,
            country: this.country,
        }
    }
}

class Employee extends Person {
    constructor(name, country, jobTitle, salary) {
        super(name, country);
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

    // Get Employee Infor 
    getEmployee() {
        return {
            ...this.getUserInfor(), // merge object from parent class
            jobTitle: this.jobTitle,
            salary: this.salary
        }
    }

    notification() {
        return (`Employee ${this.name} is hired as ${this.jobTitle} with salary ${this.salary} from ${this.country}`)
    }

}

const emp = new Employee("John", "Chicago", "Developer", 3000);
console.log(emp.getEmployee());
console.log(emp.notification());
