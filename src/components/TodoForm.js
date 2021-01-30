import React from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm({ inputText, setInputText, todos, setTodos }) {
  const submitHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,
        completed: false,
        id: uuidv4(),
      },
    ]);
    setInputText("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="inputText"
        className="todo_input"
        value={inputText}
        placeholder="Create a new todo..."
        onChange={(e) => setInputText(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
