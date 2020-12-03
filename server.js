const express = require('express')
const path = require ('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const enforce = require('express-sslify')
const adminRouter = require('./routes/admin')
const studentRouter = require('./routes/student')
const questionRouter = require('./routes/question')
const courseRouter = require('./routes/courses')
const teacherRouter = require('./routes/teacher')
const reviewRouter = require('./routes/reviews')

const compression = require('compression')


const app = express()

app.use(compression({level:9}))

app.use(cors())
if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({trustProtoHeader:true}))
  }

app.use(bodyParser.json())

const dbKey = 'YsXvVHB1KVR3kyZE'

const port = process.env.PORT || 3000

let url = `mongodb+srv://Oleksiy:${dbKey}@cluster0-xox72.mongodb.net/mil-pasos?retryWrites=true&w=majority`


mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connected to mongo db'))
.catch((err)=>console.log('db is not connected', err))

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

app.use(adminRouter)
app.use(studentRouter)
app.use(questionRouter)
app.use(courseRouter)
app.use(teacherRouter)
app.use(reviewRouter)




app.listen(port, ()=>{
    console.log("Server is listening on port 3000")
})


