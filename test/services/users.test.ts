import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import User from '../../src/services/users/users.interface';

const user = {
  id: 'joseph',
  password: 'hello',
  roles: ['admin'],
  createdBy: 'joseph',
  createdAt: new Date(),
  updatedBy: 'joseph',
  updatedAt: new Date(),
};

describe('\'users\' service', () => {
  const service = app.service('users');

  beforeEach(async () => {
    await service._remove(null);
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  describe('create', () => {
    it('should create new doc', async () => {
      const created = await service.create(user);
      assert.strictEqual(created.id, 'joseph');
    });

    it('should not create doc', async () => {
      assert.rejects(service.create({}));
    });
  });

  describe('patch', () => {
    it('should patch existing doc', async () => {
      const created = await service.create(user) as User;
      assert.strictEqual(created.id, 'joseph');
      assert.deepStrictEqual(created.roles, ['admin']);

      const patched = await service.patch(created.id, { roles: ['admin', 'moderator'] });
      assert.deepStrictEqual(patched.roles, ['admin', 'moderator']);
    });
  });

  describe('update', () => {
    it('should update existing doc', async () => {
      const created = await service.create(user) as User;
      assert.strictEqual(created.id, 'joseph');

      const updated = await service.update(created.id, { ...user, roles: ['admin', 'moderator'] });
      assert.deepStrictEqual(updated.roles, ['admin', 'moderator']);
    });
  });

  describe('remove', () => {
    it('should remove existing doc', async () => {
      const created = await service.create(user) as User;
      assert.strictEqual(created.id, 'joseph');

      const removed = await service.remove(created.id);
      assert.strictEqual(removed.id, 'joseph');

      const find = await service.find() as Paginated<User>;
      assert.strictEqual(find.total, 0);
    });
  });
});
