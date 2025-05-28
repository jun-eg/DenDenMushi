import React from "react";
import { item } from "../types/item";
import ThreeConsectiveButton from "./ThreeConsectiveButton";

interface AccodionProps {
  todoItems: item[];
  setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
}

const Accodion: React.FC<AccodionProps> = ({ todoItems, setTodoItems }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
      <div className="hs-accordion-group" data-hs-accordion-always-open="true">
        {todoItems.map((item: item) => (
          <div
            className="hs-accordion"
            id={`hs-unstyled-heading-${item.id}`}
            key={item.id}
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              aria-expanded="true"
              aria-controls="hs-basic-collapse-one"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <svg
                className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
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
                <path d="M5 12h14"></path>
              </svg>
              {item.body}
            </button>
            <div
              id={`hs-basic-collapse-${item.id}`}
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              role="region"
              aria-labelledby="hs-basic-heading-one"
            >
              <ThreeConsectiveButton
                id={item.id}
                setTodoItems={setTodoItems}
                todoItems={todoItems}
              />
              <div className="flex pb- 4 px-6 gap-10">
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
