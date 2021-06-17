import { Application } from '../declarations';
import posts from './posts/posts.service';
import comments from './comments/comments.service';
import attachments from './attachments/attachments.service';
import workspaces from './workspaces/workspaces.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(posts);
  app.configure(comments);
  app.configure(attachments);
  app.configure(workspaces);
}
