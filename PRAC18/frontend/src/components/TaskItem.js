import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({task, noteId, fetchNotes}) => {
  const [done, setDone] = useState(task.done);

  const toggleDone = async ()=>{
    await axios.put(`http://localhost:5000/api/notes/${noteId}`, {
      tasks: [{...task, done: !done}]
    });
    setDone(!done);
    fetchNotes();
  }

  return (
    <div style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
      <input type="checkbox" checked={done} onChange={toggleDone} style={{marginRight:'8px'}}/>
      <span style={{textDecoration: done ? 'line-through' : 'none'}}>{task.task}</span>
      {task.reminder && <small style={{marginLeft:'auto', color:'#777'}}>Remind: {new Date(task.reminder).toLocaleString()}</small>}
    </div>
  )
}

export default TaskItem;
