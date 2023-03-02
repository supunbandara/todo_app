import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ModalStyles from "./modal.module.scss";

const Modal = ({ todo, onClose }) => {
  const [details, setDetails] = useState(null);

  // function to fetch the details of the selected todo item from the API
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`
      );
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedTodos = useMemo(() => {
    return details;
  }, [details]);

  console.log(memoizedTodos);
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className={ModalStyles.modal}>
      <div className={ModalStyles.modal_content}>
        <span className={ModalStyles.close} onClick={onClose}>
          &times;
        </span>
        {memoizedTodos ? (
          <div>
            <h2>{memoizedTodos.title}</h2>
            <p>User ID: {memoizedTodos.userId}</p>
            <p>ID: {memoizedTodos.id}</p>
            <p>Completed: {memoizedTodos.completed ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
