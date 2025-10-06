import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes,setNotes] = useState([]);

  const fetchNotes = async ()=>{
    const res = await axios.get('http://localhost:5000/api/notes');
    if(res.data.success) setNotes(res.data.notes);
  }

  useEffect(()=>{ fetchNotes(); },[]);

  return (
    <div style={{maxWidth:'900px', margin:'20px auto', padding:'10px'}}>
      <h1 style={{textAlign:'center'}}>Notes & To-Do App</h1>
      <NoteForm fetchNotes={fetchNotes}/>
      <NoteList notes={notes} fetchNotes={fetchNotes}/>
    </div>
  );
}

export default App;
