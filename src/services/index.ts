import { Application } from '../declarations';
import posts from './posts/posts.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(posts);
}
