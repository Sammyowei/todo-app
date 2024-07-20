import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { getTodos, deleteTodo, partialUpdateTodo } from './api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import CompletedTodos from './components/CompletedTodos';
import './App.css'; // Ensure the styles are correctly referenced

const App = () => {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(Cookies.get('user_id'));
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (!userId) {
      const newUserId = uuidv4();
      Cookies.set('user_id', newUserId);
      setUserId(newUserId);
    }
  }, [userId]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();


      console.log(todos)
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const handleTodoCreated = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = async (id) => {
    const success = await deleteTodo(id);
    if (success) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedTodo = await partialUpdateTodo(id, { completed });
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm onTodoCreated={handleTodoCreated} />
      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide Completed' : 'Show Completed'}
      </button>
      {showCompleted ? (
        <CompletedTodos todos={todos} onDelete={handleDelete} onToggleComplete={handleToggleComplete} />
      ) : (
        <TodoList todos={todos} onDelete={handleDelete} onToggleComplete={handleToggleComplete} />
      )}
    </div>
  );
};

export default App;
