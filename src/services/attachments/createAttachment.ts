import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';
import getStream from 'get-stream';

/**
 * This hook should only be triggered if this is a REST request
 *
 * @param {HookContext} context
 */
const createAttachment: Hook = async (context: HookContext<any>) => {
  checkContext(context, 'before', ['create'], 'createAttachment');

  const { params }= context;

  if (!params.files || params.files.length === 0) return context;

  const attachments = params.files.map(async (file: any) => ({
    filename: file.originalName,
    data: await getStream(file.stream, { encoding: 'base64' }),
    mimetype: file.detectedMimeType,
    size: file.size,
    createdBy: 'joseph',
    createdAt: new Date(),
    updatedBy: 'joseph',
    updatedAt: new Date(),
  }));

  context.data = await Promise.all(attachments);

  return context;
};

export default createAttachment;
