import React, { useState } from 'react';
import { createTodo, getUserId } from '../api';
import '../styles/TodoForm.css';

const TodoForm = ({ onTodoCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {
            title,
            description,
            completed: false,
            user_id: getUserId()
        };
        const createdTodo = await createTodo(newTodo);
        onTodoCreated(createdTodo);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
