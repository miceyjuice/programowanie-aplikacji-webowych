const personName = "John";
document.body.innerHTML = `<h1>Hello ${personName}`;

class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  Show() {
    document.body.innerHTML = `Witaj ${this.firstName} i ${this.lastName} mam ${this.age} lat`;
  }
}

let p = new Person("John", "Blake", 11);

p.Show();
