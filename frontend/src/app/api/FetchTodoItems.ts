import type { item } from "../types/item";

export const FetchTodoItems = async (): Promise<item[]> => {
  const res = await fetch(`/item`, {
    method: "GET",
    // Next.js プロキシ経由でキャッシュしない場合
    cache: "no-store",
  });
  const data: item[] = await res.json();
  return data;
};
