import SendTextArea from "./SendTextArea";

const Header = () => {
  return (
    <header className="w-full h-15 bg-blue-200 text-sm py-3 dark:bg-white">
      <nav className="grid grid-cols-3 w-full h-full px-4 items-center">
        <div className="text-left">
          <a
            className="text-xl font-semibold text-white focus:outline-hidden hover:text-gray-400 dark:text-neutral-800"
            href="#"
          >
            Todo
          </a>
        </div>
        <div className="h-full items-center text-center">
          <SendTextArea />
        </div>
        <div className="sm:hidden text-right flex justify-end">
          <button
            type="button"
            className="hs-collapse-toggle size-7 flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-2xs align-middle hover:bg-gray-700/50 focus:outline-hidden text-sm dark:bg-white dark:hover:bg-gray-100 dark:border-gray-200 dark:text-gray-600 dark:focus:bg-gray-100"
            id="hs-navbar-dark-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-dark"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-dark"
          >
            <svg
              className="hs-collapse-open:hidden shrink-0 size-4"
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
              className="hs-collapse-open:block hidden shrink-0 size-4"
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
          className="hidden sm:text-right max-sm:col-start-3 max-sm:row-start-2 py-1 hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-dark-collapse"
        >
          <div className="flex text-right flex-col gap-1 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <a
              className="block text-end font-medium text-white hover:text-gray-400 focus:outline-hidden dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
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
