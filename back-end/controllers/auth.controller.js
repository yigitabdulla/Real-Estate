import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

export const register = async (req, res) => {

    const { username, email, password } = req.body

    try {
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create new user and save it to db
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: "User created succesfully" })
    } catch (error) {
        res.status(500).json({message:"Failed to create user!"})
    }



}

export const login = async (req, res) => {
    const {username, password} = req.body;

    
    try {

        //check if user exists
        const user = await prisma.user.findUnique({
            where: {username}
        })

        if(!user) {
            res.status(401).json({message:'Invalid credentials!'})
        }

        //check user password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            res.status(401).json({message:'Invalid credentials!'})
        }

        //generate token
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Failed to login!'})
    }
}

export const logout = (req, res) => {
    console.log('router works')
}