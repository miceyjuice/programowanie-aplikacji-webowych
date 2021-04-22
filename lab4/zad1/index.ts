enum Role {
  Standard,
  Moderator,
  Administrator,
}

class User {
  firstName!: string;
  lastName!: string;
  role!: Role;
}

function StandardAccess(constructorFN: Function): void {
  constructorFN.prototype.role = Role.Standard;
}

function ModeratorAccess(constructorFN: Function): void {
  constructorFN.prototype.role = Role.Moderator;
}

function AdministratorAccess(constructorFN: Function): void {
  constructorFN.prototype.role = Role.Administrator;
}

function watch(target: object, propKey: string, descriptor: PropertyDescriptor){
    const originalFn = target[propKey];
    descriptor.value = function(param){
        console.log(`User ${param} calls ${propKey}`)
        return originalFn.call(this, param);
    }
}

@StandardAccess
class StandardUser extends User {
  constructor(firstName: string, lastName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

@ModeratorAccess
class ModeratorUser extends User {
  constructor(firstName: string, lastName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

@AdministratorAccess
class AdmministratorUser extends User {
  constructor(firstName: string, lastName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Resource {
  private resourceValue!: string;

  constructor() {
    this.resourceValue = "secret value";
  }
  public read(user: User): void {
    if (user.role === Role.Moderator || user.role === Role.Administrator) {
      this.resourceValue = "modified secret value";
      console.log(`I see: ${this.resourceValue}`);
    }
  }
  public modify(user: User): void {
    if (user.role === Role.Administrator) {
      this.resourceValue = "modified secret value";
      console.log(`I see modified: ${this.resourceValue}`);
    }
  }
}

const user1 = new StandardUser('pawel', 'szumiec');
const user2 = new StandardUser('amanda', 'collar');
const user3 = new StandardUser('jerry', 'jordan');

const res = new Resource();

res.modify(user1);
res.read(user2);

