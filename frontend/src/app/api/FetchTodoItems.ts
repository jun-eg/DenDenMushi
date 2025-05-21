import { item } from "../types/item";

export const FetchTodoItems = async () => {
  const res = await fetch(`/item`, {
    method: "GET",
    // Next.js プロキシ経由でキャッシュしない場合
    cache: "no-store",
  });
  const data: item[] = await res.json();
  return data;
};
