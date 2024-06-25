interface IAmoUser {
  id: number;
  name: string;
  email: string;
}

export interface IUsersAmoResponse {
  _embedded: {
    users: IAmoUser[];
  };
}
