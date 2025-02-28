import { item } from "../types/item";

export const FetchTodoItems = async () => {
  const res = await fetch("http://host.docker.internal:5000/item");
  const data: item[] = await res.json();
  return data;
};
