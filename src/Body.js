import React, { useEffect, useState } from "react";
import './Header.css'

export default function Body(){

    const getLocalItem = ()=> {
        let list = localStorage.getItem("lists");
        if(list){
            return JSON.parse(list);
        }else{
            return [];
        }
    }

    const [task, setTask] = useState("");
    const [arr, setArr] = useState(getLocalItem);
    const [showEdit, setShowEdit] = useState(-1);
    const [ updatedText, setUpadatedText] = useState("");

    function addTask(){
        if(!task){
            alert("Please enter a task");
            return;
        }
        const item = {
            id: Math.floor(Math.random()*1000),
            value: task,
        }

        setArr(oldList => [...oldList,item]);
        

        setTask("")
    }

    function deleteItem(id){
        const newArr = arr.filter((i)=>i.id!==id)
        setArr(newArr)         
    }

    function editItem(id, newTask){
        console.log(updatedText)
        const newItem = {
            id: id,
            value: newTask,
        }

        deleteItem(id);

        setArr((oldList)=> [...oldList, newItem]);

        setUpadatedText("");
        setShowEdit(-1);

    }

    useEffect(()=>{
        localStorage.setItem("lists", JSON.stringify(arr));
    }, [arr])

    return(
        <React.Fragment>
            <div className="input">
                <input className="taskHolder" type="text" onChange={(e)=>{setTask(e.target.value)}} placeholder="Enter Task" value={task}></input>
                <br />
            <button className="btn" onClick={addTask} >Add Task</button>
            </div>
           
            <div className="tasks">
            <ol>
                    {arr.map((t) => {
                        return(<>
                            <li key = {t.id} onClick={()=> setShowEdit(t.id)}>{t.value} 
                            <button className="delete" onClick={()=>deleteItem(t.id)}>Remove Task</button> </li> 
                            {showEdit === t.id? (
                                <div>
                                    <input type="text" value={updatedText} onChange={(e)=>setUpadatedText(e.target.value)}></input>
                                    <button onClick={()=> editItem(t.id, updatedText)} >Update Task</button>
                                </div>
                            ): null}
                            </>
                            
                            
                        )
                    })}
            </ol>
            </div>
            
            <div className="danger">
                <button className="btn" onClick={()=>setArr([])}>All Task Completed (all task will be delted)</button>
            </div>
        </React.Fragment>
    );
}