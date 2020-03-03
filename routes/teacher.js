const express = require('express')
const Teacher = require('../models/teacher-model')
const checkAuth = require('../midelware/check-auth')
const multer = require('multer')
const sharp = require('sharp')

const router = express.Router()

const upload = multer({
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/teachers/create', upload.single('upload'), checkAuth, async (req, res, next)=>{
   
    try{
        const image = await sharp(req.file.buffer).png().toBuffer()
      
        const teacher = new Teacher({
            name:req.body.name,
            description:req.body.description,
        })

        const newTeacher = await teacher.save()
        newTeacher.avatar = image
        await newTeacher.save()
        res.status(201).send()

    }catch(err){
        res.status(400).send()
    }

})

router.get('/teachers', (req, res, next)=>{
    Teacher.find()
    .then(teachers=>{
        res.status(200).send(teachers)
    })
})

router.delete('/teachers/:id',checkAuth, (req, res, next)=>{
    Teacher.deleteOne({_id: req.params.id})
    .then(result=>{
        if (result.n > 0){
            res.status(200).json({message:"Teacher deleted"})
            }else{
                res.status(401).json({message:"Not authorised"})
            }
       
        })
})

router.get('/teacher/:id', checkAuth, (req,res,next)=>{
    Teacher.findById(req.params.id)
    .then(teacher=>{
       
        res.status(200).json(teacher)
    }).catch(err=>{
        res.status(404).send()
    })
})

router.put('/teachers/update/:id', checkAuth, async (req,res,next)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const teacher = await Teacher.findById(req.params.id)

        updates.forEach((update) => teacher[update] = req.body[update])
        await teacher.save()

        if (!teacher) {
            return res.status(404).send()
        }

        res.send(teacher)
    } catch (e) {
        res.status(400).send(e)
    }
} )

router.post('/teachers/update-avatar/:id',upload.single('upload'),checkAuth, async (req, res, next)=>{
  
    try{

       
        const image = await sharp(req.file.buffer).png().toBuffer()
        
        const teacher = await Teacher.findById(req.params.id)
              
        teacher.avatar = image
        await teacher.save()
             
        res.status(201).send()

    }catch(err){
        res.status(400).send()
    }
})

module.exports = router