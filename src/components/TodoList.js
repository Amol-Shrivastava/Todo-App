import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoList({ todos, setTodos, filteredArr }) {
  //******************************* */
  // const [finalList, setFinalList] = useState(filteredArr);
  //************************************** */

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    setLocalTodos();
  }, [todos]);

  const setLocalTodos = () => {
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todo") === null) {
      localStorage.setItem("todo", JSON.stringify([]));
    } else {
      let savedTodos = JSON.parse(localStorage.getItem("todo"));
      setTodos(savedTodos);
    }
  };

  const deleteHandler = (e) => {
    let targetedTodo = e.target.parentElement;
    //filter existing todos without targetedTodo
    let revisedTodos = todos.filter((todo) => todo.id !== targetedTodo.id);
    //display new array on the screen
    setTodos(revisedTodos);
  };

  const crossHandler = (e) => {
    let targetedElement = e.target;
    let targetElementId = targetedElement.parentElement.id;
    setTodos(
      todos.map((item) => {
        if (item.id === targetElementId) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  //****************************************************** */
  // const dragEndHandler = (result) => {
  //   const items = Array.from(finalList);
  //   const [reorderedItems] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index,0, reorderedItems);

  //   setFinalList(items);
  // }
  //****************************************************** */

  return (
    <div>
      <div className="todo-list-box">
        {/* <DragDropContext onDragEnd={dragEndHandler}>  */}
        {/* <DragDropContext>
          <Droppable droppableId="todos-list">
            {(provided) => (
              <ul
                className="todos-list-ul"
                {...provided.droppableProps}
                ref={provided.innerRef} */}
        {/* > */}
        {/* {finalList.map({text, id, completed}, index) => } */}
        {/* {filteredArr.map(({ text, id, completed }, index) => (
                  <Draggable draggableId={text} key={id} id={id} index={index}>
                    {(provided) => (
                      <li
                        className="todo-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className={`circle ${
                            completed ? "checked" : "unchecked"
                          }`}
                        >
                          {completed ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 11.522l1.578-1.626 7.734 4.619 13.335-12.526 1.353 1.354-14 18.646z" />
                            </svg>
                          ) : (
                            ""
                          )}
                        </div>

                        <span
                          className={`text ${completed ? "line_over" : ""}`}
                          onClick={crossHandler}
                        >
                          {text}
                        </span>

                        <button className="todo-delBtn" onClick={deleteHandler}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                          </svg>
                        </button>
                      </li>
                    )} */}
        {/* </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext> */}

        <ul className="todos-list-ul">
          {filteredArr.map(({ text, id, completed }) => (
            <li className="todo-item" key={id} id={id}>
              <div className={`circle ${completed ? "checked" : "unchecked"}`}>
                {completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 11.522l1.578-1.626 7.734 4.619 13.335-12.526 1.353 1.354-14 18.646z" />
                  </svg>
                ) : (
                  ""
                )}
              </div>

              <span
                className={`text ${completed ? "line_over" : ""}`}
                onClick={crossHandler}
              >
                {text}
              </span>

              <button className="todo-delBtn" onClick={deleteHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
