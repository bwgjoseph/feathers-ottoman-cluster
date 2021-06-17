interface Workspace {
  id: string;
  members: Array<string>;
  owners: Array<string>;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export default Workspace;
