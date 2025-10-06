import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({fetchNotes}) => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await axios.post('http://localhost:5000/api/notes', {title, content});
    setTitle(''); setContent('');
    fetchNotes();
  }

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
      <input type="text" placeholder="Note Title" value={title} onChange={e=>setTitle(e.target.value)} required style={{width:'100%', padding:'8px', marginBottom:'8px'}}/>
      <textarea placeholder="Note Content" value={content} onChange={e=>setContent(e.target.value)} style={{width:'100%', padding:'8px', marginBottom:'8px'}}/>
      <button type="submit" style={{padding:'8px 16px', background:'#111', color:'#fff', border:'none', borderRadius:'4px'}}>Add Note</button>
    </form>
  )
}

export default NoteForm;
