import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
    return (
        <li className="todo-item">
            <h3>{todo.title}</h3>
            <div>
                <button onClick={() => onToggleComplete(todo.id, !todo.completed)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </li>
    );
};

export default TodoItem;
