import React, { Fragment, useState, useEffect } from "react";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // useEffect hook to fetch todos from server
    useEffect(() => {
        getTodos();
    }, []);

    // Function to fetch todos from server
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos"); // Corrected URL with port number
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            });

            // Update todos state after deletion
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <h2 className="text-center mt-5">List of Todos</h2>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.discription}</td>
                            <td><button className="btn">Edit</button></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
