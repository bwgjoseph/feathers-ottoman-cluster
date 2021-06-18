import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import app from '../../src/app';
import Workspace from '../../src/services/workspaces/workspaces.interface';

const workspace = {
  members: ['joseph', 'ryan'],
  owners: ['joseph'],
  createdBy: 'joseph',
  createdAt: new Date(),
  updatedBy: 'joseph',
  updatedAt: new Date(),
};

describe('\'workspaces\' service', () => {
  const service = app.service('workspaces');

  beforeEach(async () => {
    await service._remove(null);
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  describe('create', () => {
    it('should create new doc', async () => {
      const created = await service.create(workspace);
      assert.deepStrictEqual(created.members, ['joseph', 'ryan']);
    });

    it('should not create doc', async () => {
      assert.rejects(service.create({}));
    });
  });

  describe('patch', () => {
    it('should patch existing doc', async () => {
      const created = await service._create(workspace) as Workspace;
      assert.deepStrictEqual(created.members, ['joseph', 'ryan']);

      const patched = await service.patch(created.id, { members: [...workspace.members, 'joshua'] });
      assert.deepStrictEqual(patched.members, [...workspace.members, 'joshua']);
    });
  });

  describe('update', () => {
    it('should update existing doc', async () => {
      const created = await service._create(workspace) as Workspace;
      assert.deepStrictEqual(created.members, ['joseph', 'ryan']);

      const updated = await service.update(created.id, { ...workspace, id: created.id, members: [...workspace.members, 'joshua'] });
      assert.deepStrictEqual(updated.members, [...workspace.members, 'joshua']);
    });
  });

  describe('remove', () => {
    it('should remove existing doc', async () => {
      const created = await service._create(workspace) as Workspace;
      assert.deepStrictEqual(created.members, ['joseph', 'ryan']);

      const removed = await service.remove(created.id);
      assert.deepStrictEqual(removed.members, ['joseph', 'ryan']);

      const find = await service.find() as Paginated<Workspace>;
      assert.strictEqual(find.total, 0);
    });
  });
});
