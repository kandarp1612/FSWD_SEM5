import React from 'react';
import axios from 'axios';

const NoteList = ({notes, fetchNotes}) => {

  const deleteNote = async (id)=>{
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  }

  return (
    <div>
      {notes.map(note=>(
        <div key={note._id} style={{border:'1px solid #ccc', padding:'12px', marginBottom:'10px', borderRadius:'8px'}}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={()=>deleteNote(note._id)} style={{padding:'4px 8px', background:'#ef4444', color:'#fff', border:'none', borderRadius:'4px'}}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default NoteList;
