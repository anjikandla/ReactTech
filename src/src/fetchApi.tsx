import React, { useEffect, useState } from 'react';


interface TodoListData{
    userId:string,
    id:string,
    title:string,
    completed:boolean
}
const Fetch = () => {
    const [ToDoList, SetList] = useState<any[]>([]);
    const ClickHandler = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(data => SetList(data));
    }
    useEffect(() => {
        console.log(ToDoList.length);
    })
    return (

        <>
            <button className='btn btn-primary' onClick={ClickHandler}>View Data</button>
            <div className='row'>
            {                
                ToDoList.map((value, index) => (index < 20 ? 
                    <div className='col-md-3'>
                        <div className={`card my-3 ${(value.completed === false ? "border-danger":"border-success")}`}>
                            <div className='card-header'>
                                <span className='badge text-bg-primary'>{value.id}</span> {value.title}
                            </div>
                            <div className='card-body'>
                                { }
                            </div>
                        </div>
                    </div> : ""))
            }
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ToDoList.map((value, index) => (index < 20 ? 
                            <tr className={`${(value.completed === false ? "bg-danger":"bg-success")}`}>
                                <td>{value.id}</td>
                                <td>{value.title}</td>
                                <td>{(value.completed === false ? "Failed":"Passed")}</td>
                            </tr> : ""))

                    }
                </tbody>
            </table>
        </>
    )
}

export default Fetch;