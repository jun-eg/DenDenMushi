import React from "react";
import type { DeleteItemDto, item } from "../types/item";
import { DeleteTodoItem } from "../api/DeleteTodoItem";
interface ThreeconsectiveButtonProps {
  id: DeleteItemDto["id"];
  setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
  todoItems: item[];
}

const ThreeConsectiveButton: React.FC<ThreeconsectiveButtonProps> = ({
  id,
  setTodoItems,
  todoItems,
}) => {
  return (
    <div className="mb-3 ml-6 inline-flex rounded-lg shadow-sm">
      <button
        type="button"
        className="-ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        onClick={() => {
          DeleteTodoItem({ id });
          setTodoItems(todoItems.filter((item) => item.id !== id));
        }}
      >
        消去
      </button>
      <button
        type="button"
        className="-ms-px inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        編集
      </button>
    </div>
  );
};

export default ThreeConsectiveButton;
