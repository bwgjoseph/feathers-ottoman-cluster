interface User {
  id: string;
  password: string;
  roles: Array<string>;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export default User;
