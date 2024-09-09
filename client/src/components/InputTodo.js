
import React,{Fragment,useState} from "react";



const InputTodo =()=>{

    const [discription,setdescription] = useState("")
    const onsumitform  = async(e)=>{
        e.preventDefault()
        try {
            const body = {discription}
            const response = await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            });
            
            window.location="/";
        } catch (error) {
            console.log(error.message)
            
        }

    }

    return <Fragment>
        <h1 className="text-center mt-5"> Pern Input Todo</h1>
        <form className="d-flex mt-5" onSubmit={onsumitform}>
            <input type="text" className="form-control" value={discription} onChange={e =>
            {setdescription( e.target.value)
               
            }} />
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
}

export default InputTodo;