const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {type:String, required:true, trim:true},
  content: {type:String, trim:true},
  tasks: [{
    task: String,
    done: {type:Boolean, default:false},
    reminder: Date
  }],
  createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Note', NoteSchema);
