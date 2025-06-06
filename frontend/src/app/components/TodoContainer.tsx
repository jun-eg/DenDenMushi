"use client";

import React, { useEffect, useState } from "react";
import Accodion from "./Accordion";
import Header from "./Header";
import type { item } from "../types/item";
import { FetchTodoItems } from "../api/FetchTodoItems";

const TodoContainer = ():React.JSX.Element => {
  const [todoItems, setTodoItems] = useState<item[]>([]);

  console.log("TodoContainer rendered");
  console.log(todoItems);


  useEffect(() => {
    const fetchItems = async () => {
      const items = await FetchTodoItems();
      setTodoItems(items);
    };

    fetchItems();
  }, []);
  return (
    <div>
      <Header setTodoItems={setTodoItems} todoItems={todoItems} />
      <Accodion todoItems={todoItems} setTodoItems={setTodoItems} />
    </div>
  );
};

export default TodoContainer;
