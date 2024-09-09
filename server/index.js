const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

app.use(cors())
app.use(express.json())



app.post("/todos", async (req,res)=>
{
    try {
        const {discription } = req.body
        const  newtodo = await pool.query("insert into todo (discription) values($1)",[discription])
        res.json(newtodo.rows[0])
        
        console.log(req.body)
    } catch (error) {
        console.log(error.message);
        
    }

})

// GET all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);  // Return all todos as JSON array
    } catch (error) {
        console.error("Error getting todos:", error.message);  // Log error message to console
        
    }
});

// GET a single todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // Extract 'id' from request parameters
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        if (todo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found." });  // Handle case where todo is not found
        }
        res.json(todo.rows[0]);  // Return the single todo as JSON
    } catch (error) {
        console.error("Error getting todo:", error.message);  // Log error message to console
       
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // Extract 'id' from request parameters
        const { discription } = req.body;  // Extract 'discription' from req.body
        const updatedTodo = await pool.query(
            "UPDATE todo SET discription = $1 WHERE todo_id = $2 RETURNING *",
            [discription, id]
        );
        if (updatedTodo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found." });  // Handle case where todo is not found
        }
        res.json(updatedTodo.rows[0]);  // Return the updated todo as JSON
    } catch (error) {
        console.error("Error updating todo:", error.message);  // Log error message to console
        
    }
});

// DELETE a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;  // Extract 'id' from request parameters
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);
        if (deletedTodo.rows.length === 0) {
            return res.status(404).json({ message: "Todo not found." });  // Handle case where todo is not found
        }
        res.json({ message: "Todo deleted successfully." });  // Return success message
    } catch (error) {
        console.error("Error deleting todo:", error.message);  // Log error message to console
        res.status(500).json({ error: "An error occurred while deleting the todo." });  // Send error response
    }
});


app.listen(5000, ()=>{
    console.log("server is stared on post 5000")
})