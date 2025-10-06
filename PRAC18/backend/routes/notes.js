const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req,res)=>{
  try{
    const notes = await Note.find().sort({createdAt:-1});
    res.json({success:true, notes});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
});

// Create a note
router.post('/', async (req,res)=>{
  try{
    const {title, content, tasks} = req.body;
    const note = new Note({title, content, tasks});
    const saved = await note.save();
    res.json({success:true, note:saved});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
});

// Update note
router.put('/:id', async (req,res)=>{
  try{
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({success:true, note:updated});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
});

// Delete note
router.delete('/:id', async (req,res)=>{
  try{
    await Note.findByIdAndDelete(req.params.id);
    res.json({success:true,message:'Note deleted'});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
});

module.exports = router;
