import React, {useEffect, useState } from 'react'
const Card =(props)=>{
    return(
        <div className='card'>
            <h1 className='heading'>{props.title}</h1>
            <div className='content'><p>{props.description}</p>
            <button onClick={()=>props.deletefunc(props.index)} className='add remove'>-</button></div>
        </div>
    )
}
function Form() {
    const localarr = localStorage.getItem("task")?JSON.parse(localStorage.getItem("task")):[]
    const [task,setTask]=useState(localarr)
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const deletetask=(index)=>{
        const filter = task.filter((val,i)=>{
            return i!==index
        })
        console.log(filter)
        setTask(filter)
    }

const submithandler=(e)=> {
        e.preventDefault()
        console.log(title,description)
        setTask([...task,{title:title,description:description}])
    }
    useEffect(() => {
      localStorage.setItem("task",JSON.stringify(task))
      setDescription('')
      setTitle('')
    }, [task])
    

  return (

    <div className='container'>
        <h1>daily goals</h1>
        <form onSubmit={submithandler}>

            <input required className='title' placeholder='Title' type="text" value={title}  onChange={(e)=>{setTitle(e.target.value)}}  />

            <textarea required className='description'placeholder='description' value={description}onChange={(e)=>{setDescription(e.target.value)}}/>

            <button type="submit" className='add' >Add</button>

        </form>
        {task.map((value,index)=>(<Card key={index} title={value.title} description={value.description} index={index} deletefunc={deletetask}/>))}
        
    </div>
  )
}

export default Form