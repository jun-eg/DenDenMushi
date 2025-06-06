import { IoIosSend } from "react-icons/io";
import { CreateTodoItem } from "../api/CreateItem";
import type { CreateItemDto, item } from "../types/item";
import { useState } from "react";

type SendTextAreaProps = {
  setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
  todoItems: item[];
};

const SendTextArea: React.FC<SendTextAreaProps> = ({
  setTodoItems,
  todoItems,
}) => {
  const [body, setBody] = useState<CreateItemDto["body"]>("");

  const SendNewTodoItem = async () => {
    const NewItem = await CreateTodoItem({ body });
    setTodoItems([...todoItems, NewItem]);
    setBody("");
  };

  return (
    <div className="relative h-full max-w-sm">
      <textarea
        className="absolute flex h-7 w-full resize-none overflow-y-auto text-balance rounded-lg border-gray-200 p-0 text-center placeholder:text-center focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
        placeholder="タスクを入力..."
        rows={1}
        value={body}
        onChange={(e) => setBody(e.target.value)}
       />

      <div className="absolute end-3 top-1 z-10 transform">
        <button
          type="button"
          className="focus:outline-hidden inline-flex items-center justify-center rounded-lg text-sm font-medium hover:bg-gray-500 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => (body === "" ? null : SendNewTodoItem())}
        >
          <IoIosSend color="#1f2937 " />
        </button>
      </div>
    </div>
  );
};

export default SendTextArea;
