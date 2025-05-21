import React from "react";
import { DeleteTodoItem } from "../api/DeleteTodoItem";
import { ThreeconsectiveButtonProps } from "../types/ThreeConsecttiveButtonProps";

const ThreeConsectiveButton: React.FC<ThreeconsectiveButtonProps> = ({
  id,
}) => {
  return (
    <div className="ml-6 mb-3 inline-flex rounded-lg shadow-sm">
      <button
        type="button"
        className="py-1 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        onClick={() => {
          DeleteTodoItem(id);
          console.log("delete", id);
        }}
      >
        消去
      </button>
      <button
        type="button"
        className="py-1 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        編集
      </button>
    </div>
  );
};

export default ThreeConsectiveButton;
