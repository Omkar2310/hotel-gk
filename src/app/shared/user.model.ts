export class User {
  email: string | null;
  name: string | null;
  uid: string;
  constructor(emailID: string, nameUser: string, id: string) {
    this.email = emailID;
    this.name = nameUser;
    this.uid = id;
  }
}
