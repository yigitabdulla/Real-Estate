import express from 'express'
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'

const app = express()
app.use(express.json())

app.use("/api/test", (req,res) => {
    res.send('it works')
})

app.use('/api/post', postRoute)
app.use('/api/auth', authRoute)

app.listen(8800, () => {
    console.log('Server is running!')
})