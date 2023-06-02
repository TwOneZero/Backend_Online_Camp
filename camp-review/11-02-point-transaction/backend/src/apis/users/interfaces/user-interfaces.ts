export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}
