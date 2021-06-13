import { Schema } from 'ottoman';

const baseSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  }
});

export default baseSchema;
