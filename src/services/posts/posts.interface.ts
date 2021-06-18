interface Context {
  ids: Array<string>;
  owner: string;
  type: string;
}

interface Post {
  id: string;
  title: string;
  contexts: Array<Context>;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export default Post;
