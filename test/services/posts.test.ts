import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import { Post } from '../../src/services/posts/posts.class';

const doc = {
  text: 'hello',
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
      const created = await service.create(doc);
      assert.strictEqual(created.text, 'hello');
    });

    it('should not create doc', async () => {
      assert.rejects(service.create({}));
    });
  });

  describe('patch', () => {
    it('should patch existing doc', async () => {
      const created = await service._create(doc) as Post;
      assert.strictEqual(created.text, 'hello');

      const patched = await service.patch(created.id, { text: 'hello2' });
      assert.strictEqual(patched.text, 'hello2');
    });
  });

  describe('update', () => {
    it('should update existing doc', async () => {
      const created = await service._create(doc) as Post;
      assert.strictEqual(created.text, 'hello');

      const updated = await service.update(created.id, { id: created.id, text: 'hello3' });
      assert.strictEqual(updated.text, 'hello3');
    });
  });

  describe('remove', () => {
    it('should remove existing doc', async () => {
      const created = await service._create(doc) as Post;
      assert.strictEqual(created.text, 'hello');

      const removed = await service.remove(created.id);
      assert.strictEqual(removed.text, 'hello');

      const find = await service.find() as Paginated<Post>;
      assert.strictEqual(find.total, 0);
    });
  });
});
