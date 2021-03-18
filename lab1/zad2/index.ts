interface Person {
  // TODO: dodać pola: imię (string), nazwisko (string), wiek (number) oraz rola (string)
  name: string;
  surname: string;
  age: number;
  role: string;
}

const users: Person[] = [
  { name: "John", surname: "Smith", age: 25, role: "user" },
  { name: "Adam", surname: "Johnson", age: 35, role: "user" },
  { name: "Andy", surname: "Cole", age: 18, role: "user" },
];

const admins: Person[] = [
  { name: "Matthew", surname: "Ryan", age: 43, role: "admin" },
  { name: "Adam", surname: "Terry", age: 24, role: "admin" },
];

function logPerson(person: Person) {
  console.log(`${person.name} ${person.surname} ${person.age} ${person.role}`);
}

function filterPersons(persons: Person[], criteria: any): Person[] {
  let filteredPeople = persons.filter((el) => Object.values());

  // TODO: zaimplementować funkcję, która przefiltruje tablicę persons za pomocą predykatu criteria
  return filteredPeople;
}

// TODO:
// 1. Przy pomocy funkcji logPerson wypisać osoby z tablicy users i admins (patrz foreach)

users.forEach((person) => logPerson(person));
admins.forEach((person) => logPerson(person));

// 2. Złączyć tablice users i admins i wypisać zawartość złączonej tablicy na konsoli (patrz operator spread)

let persons = [...admins, ...users];
persons.forEach((el) => logPerson(el));

// 3. Wypisać osoby powyżej 25 lat (patrz operator filter)

console.log(persons.filter((person) => person.age > 25));

// 4. Wypisać osoby o imieniu Adam (zaimplementować funkcję filterPersons) -> const filtered = filterPersons(persons, { name: 'Adam' });

filterPersons(persons, { name: "Adam" });
