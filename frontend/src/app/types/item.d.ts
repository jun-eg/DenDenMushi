export type item = {
  id: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type itemProps = {
  items: item[];
};
