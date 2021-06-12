import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import Comment from '../../src/services/comments/comments.interface';

const comment = {
  review: 'comment',
  comment: '12345',
  createdBy: 'joseph',
  createdAt: new Date(),
  updatedBy: 'joseph',
  updatedAt: new Date(),
};

describe('\'comments\' service', () => {
  const service = app.service('comments');

  beforeEach(async () => {
    await service._remove(null);
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  describe('create', () => {
    it('should create new doc', async () => {
      const created = await service.create(comment);
      assert.strictEqual(created.review, 'comment');
    });

    it('should not create doc', async () => {
      assert.rejects(service.create({}));
    });
  });

  describe('patch', () => {
    it('should patch existing doc', async () => {
      const created = await service._create(comment) as Comment;
      assert.strictEqual(created.review, 'comment');

      const patched = await service.patch(created.id, { review: 'comment2' });
      assert.strictEqual(patched.review, 'comment2');
    });
  });

  describe('update', () => {
    it('should update existing doc', async () => {
      const created = await service._create(comment) as Comment;
      assert.strictEqual(created.review, 'comment');

      const updated = await service.update(created.id, { ...comment, id: created.id, review: 'hello3' });
      assert.strictEqual(updated.review, 'hello3');
    });
  });

  describe('remove', () => {
    it('should remove existing doc', async () => {
      const created = await service._create(comment) as Comment;
      assert.strictEqual(created.review, 'comment');

      const removed = await service.remove(created.id);
      assert.strictEqual(removed.review, 'comment');

      const find = await service.find() as Paginated<Comment>;
      assert.strictEqual(find.total, 0);
    });
  });
});

