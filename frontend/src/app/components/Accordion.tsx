"use client";

import React, { useEffect } from "react";
import type { item } from "../types/item";
import ThreeConsectiveButton from "./ThreeConsectiveButton";

interface AccodionProps {
  todoItems: item[];
  setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
}

const Accodion: React.FC<AccodionProps> = ({ todoItems, setTodoItems }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.HSStaticMethods?.autoInit) {
      window.HSStaticMethods.autoInit();
    }
  }, [todoItems]);

  return (
    <div className="w-full rounded-lg bg-white shadow-md dark:bg-neutral-800">
      <div className="hs-accordion-group" data-hs-accordion-always-open="true">
        {todoItems.map((item: item) => (
          <div
            className="hs-accordion"
            id={`hs-unstyled-heading-${item.id}`}
            key={item.id}
          >
            <button
              className="hs-accordion-toggle inline-flex w-full items-center gap-x-3 rounded-lg px-6 py-3 text-start text-sm font-semibold text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 hs-accordion-active:text-blue-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 dark:hs-accordion-active:text-blue-500"
              aria-expanded="true"
              aria-controls={`hs-basic-collapse-${item.id}`}
            >
              <svg
                className="block size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <svg
                className="hidden size-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
              {item.body}
            </button>
            <div
              id={`hs-basic-collapse-${item.id}`}
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              role="region"
              aria-labelledby={`hs-basic-heading-${item.id}`}
            >
              <ThreeConsectiveButton
                id={item.id}
                setTodoItems={setTodoItems}
                todoItems={todoItems}
              />
              <div className="pb- 4 flex gap-10 px-6">
                <div className="text-sm text-gray-600 dark:text-neutral-200">
                  {`状態: ${item.status}`}
                </div>
                <div className="text-sm text-gray-600 dark:text-neutral-200">
                  {`作成日時: ${item.createdAt}`}
                </div>
                <div className="text-sm text-gray-600 dark:text-neutral-200">
                  {`更新日時: ${item.updatedAt}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accodion;
