import React from 'react';
import '../styles/CompletedTodos.css';

const CompletedTodos = ({ todos, onDelete, onToggleComplete }) => {
    return (
        <div>
            <h2>Completed Todos</h2>
            <ul className="completed-todo-list">
                {todos.filter(todo => todo.completed).map(todo => (
                    <li key={todo.id} className="completed-todo-item">
                        <h3>{todo.title}</h3>
                        <div>
                            <button onClick={() => onToggleComplete(todo.id, false)}>Undo</button>
                            <button onClick={() => onDelete(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTodos;
