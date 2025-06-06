import type { item } from "../types/item";
import SendTextArea from "./SendTextArea";

type HeaderProps = {
  setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
  todoItems: item[];
};

const Header: React.FC<HeaderProps> = ({ setTodoItems, todoItems }) => {
  return (
    <header className="h-15 w-full bg-blue-200 py-3 text-sm dark:bg-white">
      <nav className="grid h-full w-full grid-cols-3 items-center px-4">
        <div className="text-left">
          <a
            className="focus:outline-hidden text-xl font-semibold text-white hover:text-gray-400 dark:text-neutral-800"
            href="#"
          >
            Todo
          </a>
        </div>
        <div className="h-full items-center text-center">
          <SendTextArea setTodoItems={setTodoItems} todoItems={todoItems} />
        </div>
        <div className="flex justify-end text-right sm:hidden">
          <button
            type="button"
            className="hs-collapse-toggle shadow-2xs focus:outline-hidden flex size-7 items-center justify-center gap-2 rounded-lg border border-white bg-blue-200 align-middle text-sm font-medium text-white hover:bg-gray-400 dark:border-gray-200 dark:bg-white dark:text-gray-600 dark:hover:bg-gray-100 dark:focus:bg-gray-100"
            id="hs-navbar-dark-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-dark"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-dark"
          >
            <svg
              className="size-4 shrink-0 hs-collapse-open:hidden"
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
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              className="hidden size-4 shrink-0 hs-collapse-open:block"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Toggle</span>
          </button>
        </div>

        <div
          id="hs-navbar-dark"
          className="hs-collapse hidden grow basis-full overflow-hidden py-1 transition-all duration-300 max-sm:col-start-3 max-sm:row-start-2 sm:block sm:text-right"
          aria-labelledby="hs-navbar-dark-collapse"
        >
          <div className="flex flex-col gap-1 text-right sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
            <a
              className="focus:outline-hidden block text-end font-medium text-white hover:text-gray-400 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              href="#"
            >
              ログイン
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
