import { CreateItemDto, item } from "../types/item";

export const CreateTodoItem = async (
  createItem: CreateItemDto
): Promise<item> => {
  const res = await fetch(`/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createItem),
  });

  return (await res.json()) as item;
};
