export const DeleteTodoItem = async (id: string) => {
  const res = await fetch(`/item/${id}`, { method: "DELETE" });
  return res;
};
