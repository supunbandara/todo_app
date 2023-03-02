import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";
import TodoStyles from "./todo.module.scss";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // function to fetch the todo list from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // function to handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  // calculate the index of the first and last item on the current page
  const itemsPerPage = 10;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = (pageNumber + 1) * itemsPerPage;

  // get the current page of todos
  const currentTodos = todos.slice(startIndex, endIndex);

  // function to handle todo item click
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  // function to handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={TodoStyles.table}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo) => (
            <tr key={todo.id} onClick={() => handleTodoClick(todo)}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={Math.ceil(todos.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel="< previous"
        nextLabel="next >"
        onPageChange={handlePageChange}
        containerClassName={TodoStyles.pagination}
        activeClassName={TodoStyles.active}
      />
      {modalOpen && <Modal todo={selectedTodo} onClose={handleModalClose} />}
    </div>
  );
};

export default Todo;
