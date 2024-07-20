import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, onDelete, onToggleComplete }) => {
    return (
        <ul className="todo-list">
            {todos.filter(todo => !todo.completed).map(todo => (
                <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            ))}
        </ul>
    );
};

export default TodoList;
