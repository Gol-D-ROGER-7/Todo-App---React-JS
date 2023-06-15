import React, { useEffect, useState } from 'react'
import "./style.css"

const Todo = () => {

    const getLocalData = () => {
        const lists = localStorage.getItem("Todo List")
        if (lists) {
            return JSON.parse(lists)
        } else {
            return [];
        }
    }

    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false);
    
    const addItem = () => {
        if(!inputdata) {
            alert("Please add your TODOS")
        }else if (inputdata && toggleButton ) {
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem) {
                        return {...curElem, name: inputdata}
                    }
                    return curElem;
                })
            );
            setInputData("")
        setIsEditItem(null);
        setToggleButton(false)
        } else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items, newInputData])
            setInputData("");
        }
    }

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem)=> {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true)
    }

    const deleteItem = (index => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItem)
    })

    const removeAll = () => {
       
        setItems([]);
    }

    useEffect(()=> {
        localStorage.setItem("Todo List", JSON.stringify(items))
    }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.png" alt="todologo"/>
                <figcaption>Add your TODOS here</figcaption>
            </figure>
                <div className="addItems">
                    <input type="text"
                    placeholder='✍ Add Todos' 
                    className='form-control'
                    value={inputdata}
                    onChange={(event) => setInputData(event.target.value)}/>
                    {toggleButton ? <i className="fa fa-edit add-btn" onClick={addItem}></i> :
                    <i className="fa fa-plus add-btn" onClick={addItem}></i> }
                    
                </div>

                <div className="showItems">
                    {
                        items.map((curElem)=> {
                            return (
                                <div className="eachItem" key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className="todo">
                        <i className="far fa-edit add-btn"
                        onClick={()=> editItem(curElem.id)}></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                        </div>
                    </div>
                            )
                        })
                    }
                </div>
                    

            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All"
                onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
