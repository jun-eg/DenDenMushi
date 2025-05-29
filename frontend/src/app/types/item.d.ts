export type item = {
  id: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateItemDto = {
  body: string;
};

export type DeleteItemDto = {
  id: string;
};
