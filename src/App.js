import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./styles/app.scss";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState("light");
  const [status, setStatus] = useState("all");
  const [filteredArr, setFilteredArr] = useState([]);

  //show mode according to previous mode
  useEffect(() => {
    getmodeLocal();
  }, []);

  //set local mode to light
  useEffect(() => {
    setmodeLocal();
  }, [mode]);

  //show content according to the btn
  useEffect(() => {
    filterHandler();
  }, [status, todos]);

  const completedArr = todos.filter((item) => item.completed === true);
  const activeArr = todos.filter((item) => item.completed === false);

  const clearCompletedHandler = () => {
    setFilteredArr(todos.filter((item) => item.completed !== true));
  };

  const filterHandler = () => {
    switch (status) {
      case "all":
        setFilteredArr(todos.filter((item) => item));
        break;
      case "active":
        setFilteredArr(todos.filter((item) => item.completed === false));
        break;
      case "completed":
        setFilteredArr(todos.filter((item) => item.completed === true));
        break;
      default:
        setFilteredArr(todos.filter((item) => item));
        break;
    }
  };

  const setmodeLocal = () => {
    localStorage.setItem("mode", mode);
  };

  const getmodeLocal = () => {
    if (localStorage.getItem(mode) === "") {
      localStorage.setItem("mode", "light");
    } else {
      let currentMode = localStorage.getItem("mode");
      setMode(currentMode);
    }
  };

  const toggleHandler = () => {
    {
      mode === "light" ? setMode("dark") : setMode("light");
    }
  };

  return (
    <div className={`App ${mode === "dark" ? "dark_class" : ""}`}>
      <div className="top_section">
        <div className="heading_part">
          <h1 className="heading">Todo</h1>
          <span className="toggle_btn" onClick={toggleHandler}>
            {mode === "light" ? (
              <svg className="moon_svg" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
            ) : (
              <svg className="sun_svg" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                />
              </svg>
            )}
          </span>
        </div>
      </div>

      <div className="todo_form">
        <TodoForm
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
        />
      </div>

      <div className="todo-content">
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setFilteredArr={setFilteredArr}
          filteredArr={filteredArr}
        />

        <div className="todo-details">
          <span className="todo-active">
            {activeArr.length}
            {` ${activeArr.length <= 1 ? "item" : "items"}`} left
          </span>

          <span
            className={`todo-clear-completed ${
              completedArr.length !== 0 && status !== "completed"
                ? "activeBtn"
                : "deactiveBtn"
            }`}
            onClick={clearCompletedHandler}
          >
            Clear Completed
          </span>
        </div>

        <div className="todos-btns">
          <button
            className={`all_btn ${status === "all" ? "active" : ""}`}
            onClick={() => setStatus("all")}
          >
            All
          </button>
          <button
            className={`active_btn ${status === "active" ? "active" : ""}`}
            onClick={() => setStatus("active")}
          >
            Active
          </button>
          <button
            className={`completed_btn ${
              status === "completed" ? "active" : ""
            }`}
            onClick={() => setStatus("completed")}
          >
            Completed
          </button>
        </div>
        <span className="drag_text"> Drag and drop to reorder list</span>
      </div>
    </div>
  );
}

export default App;
