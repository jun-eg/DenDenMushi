"use client";

import { useEffect, useState } from "react";
import Accodion from "./Accordion";
import Header from "./Header";
import { item } from "../types/item";
import { FetchTodoItems } from "../api/FetchTodoItems";

const TodoContainer = () => {
  const [todoItems, setTodoItems] = useState<item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await FetchTodoItems();
      setTodoItems(items);
    };
    fetchItems();
  });
  return (
    <div>
      <Header />
      <Accodion todoItems={todoItems} setTodoItems={setTodoItems} />
    </div>
  );
};

export default TodoContainer;
