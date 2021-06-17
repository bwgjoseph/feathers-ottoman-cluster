interface Attachment {
  id: string;
  filename: string;
  data: string;
  mimetype: string;
  size: number;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export default Attachment;
