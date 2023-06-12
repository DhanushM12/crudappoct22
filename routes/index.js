const express = require('express');
const router = express.Router();

const Student = require('../models/student');

// create a student
router.post('/create', async (req, res) => {
    const student = new Student({
      name: req.body.name,
      company: req.body.company  
    })
    try {
        const newStudent = await student.save();
        res.status(201).json({newStudent})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all data
router.get('/list', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.get('/:id', getStudentDetails, async (req, res) => {
    res.status(200).json(res.student)
})

router.patch('/:id', getStudentDetails, async (req, res) => {
    if(req.body.name != undefined){
        res.student.name = req.body.name;
    }
    if(req.body.company != undefined){
        res.student.name = req.body.company;
    }
    try {
        const updated = await res.student.save();
        res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.delete('/:id', getStudentDetails, async (req, res) => {
    let name = res.student.name;
    try {
        await res.student.deleteOne();
        res.json({message: `${name} student has been deleted`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

async function getStudentDetails(req, res, next){
    let student;
    try {
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(404).json({message: "Cannot find student"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.student =student;
    next();
}

module.exports = router;