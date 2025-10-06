const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Student = require('../models/student');
const router = express.Router();

const validate = (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({success:false,errors:errors.array()});
  next();
};

// Create
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('age').optional().isInt({min:1}),
  body('parentEmail').optional().isEmail()
], validate, async (req,res,next)=>{
  try{
    const student = new Student(req.body);
    const saved = await student.save();
    res.json({success:true,student:saved});
  }catch(err){ next(err); }
});

// Read all
router.get('/', async (req,res,next)=>{
  try{
    const q=req.query.q;
    const filter=q?{$or:[
      {name:new RegExp(q,'i')},
      {className:new RegExp(q,'i')},
      {phone:new RegExp(q,'i')},
      {parentEmail:new RegExp(q,'i')}
    ]}:{};
    const students = await Student.find(filter).sort({createdAt:-1}).limit(100);
    res.json({success:true,students});
  }catch(err){next(err);}
});

// Read one
router.get('/:id', param('id').isMongoId(), validate, async (req,res,next)=>{
  try{
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).json({success:false,message:'Not found'});
    res.json({success:true,student});
  }catch(err){next(err);}
});

// Update
router.put('/:id', [
  param('id').isMongoId(),
  body('name').optional().trim().isLength({min:2}),
  body('age').optional().isInt({min:1}),
  body('parentEmail').optional().isEmail()
], validate, async (req,res,next)=>{
  try{
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true});
    if(!updated) return res.status(404).json({success:false,message:'Not found'});
    res.json({success:true,student:updated});
  }catch(err){next(err);}
});

// Delete
router.delete('/:id', param('id').isMongoId(), validate, async (req,res,next)=>{
  try{
    const removed = await Student.findByIdAndDelete(req.params.id);
    if(!removed) return res.status(404).json({success:false,message:'Not found'});
    res.json({success:true,message:'Deleted'});
  }catch(err){next(err);}
});

module.exports = router;
