import Cookies from 'js-cookie';
import axios from 'axios';

// Base URL for the API
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Helper function to get the cached user_id from cookies.
 * @returns {string | undefined} - The cached user_id, or undefined if not set.
 */
export const getUserId = () => {
    return Cookies.get('user_id');
};

/**
 * Fetches all todos for the specific user.
 * @returns {Promise<Array>} - A promise that resolves to an array of todos.
 * @throws {Error} - Throws an error if the Axios request fails.
 */
export const getTodos = async () => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('User ID is not available');
        }


        console.log(userId);

        const response = await axios.get(`${API_URL}`, {
            params: { user_id: userId }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        throw error; // Re-throw error to be handled by the caller
    }
};

/**
 * Creates a new todo.
 * @param {Object} todo - The todo object to be created.
 * @returns {Promise<Object>} - A promise that resolves to the created todo.
 * @throws {Error} - Throws an error if the Axios request fails.
 */
export const createTodo = async (todo) => {
    try {
        const response = await axios.post(API_URL, todo, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error.message);
        throw error; // Re-throw error to be handled by the caller
    }
};

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the deletion was successful, false otherwise.
 * @throws {Error} - Throws an error if the Axios request fails.
 */
export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${API_URL}${id}/`);
        return true;
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        throw error; // Re-throw error to be handled by the caller
    }
};

/**
 * Partially updates a todo (e.g., toggling completion status).
 * @param {string} id - The ID of the todo to be updated.
 * @param {Object} updates - The updates to apply to the todo.
 * @returns {Promise<Object>} - A promise that resolves to the updated todo.
 * @throws {Error} - Throws an error if the Axios request fails.
 */
export const partialUpdateTodo = async (id, updates) => {
    try {
        const response = await axios.patch(`${API_URL}${id}/`, updates, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error.message);
        throw error; // Re-throw error to be handled by the caller
    }
};
