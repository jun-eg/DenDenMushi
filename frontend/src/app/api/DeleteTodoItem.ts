import type { DeleteItemDto } from "../types/item";

export const DeleteTodoItem = async (DeleteItemDto: DeleteItemDto) => {
  const res = await fetch(`/item/${DeleteItemDto.id}`, { method: "DELETE" });
  return res;
};
