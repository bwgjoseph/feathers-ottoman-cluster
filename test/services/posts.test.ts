import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import Post from '../../src/services/posts/posts.interface';

const post = {
  title: 'post',
  contexts: [
    {
      ids: ['a', 'b'],
      owner: 'a',
      type: 'workspace'
    }
  ],
  createdBy: 'joseph',
  createdAt: new Date(),
  updatedBy: 'joseph',
  updatedAt: new Date(),
};

describe('\'posts\' service', () => {
  const service = app.service('posts');

  beforeEach(async () => {
    await service._remove(null);
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  describe('create', () => {
    it('should create new doc', async () => {
      const created = await service.create(post);
      assert.strictEqual(created.title, 'post');
    });

    it('should not create doc', async () => {
      assert.rejects(service.create({}));
    });
  });

  describe('patch', () => {
    it('should patch existing doc', async () => {
      const created = await service._create(post) as Post;
      assert.strictEqual(created.title, 'post');

      const patched = await service.patch(created.id, { title: 'post2' });
      assert.strictEqual(patched.title, 'post2');
    });
  });

  describe('update', () => {
    it('should update existing doc', async () => {
      const created = await service._create(post) as Post;
      assert.strictEqual(created.title, 'post');

      const updated = await service.update(created.id, { ...post, id: created.id, title: 'hello3' });
      assert.strictEqual(updated.title, 'hello3');
    });
  });

  describe('remove', () => {
    it('should remove existing doc', async () => {
      const created = await service._create(post) as Post;
      assert.strictEqual(created.title, 'post');

      const removed = await service.remove(created.id);
      assert.strictEqual(removed.title, 'post');

      const find = await service.find() as Paginated<Post>;
      assert.strictEqual(find.total, 0);
    });
  });
});
