import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getPosts = async (req,res) => {

    const query = req.query

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000000000,
                }
            }
        });
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Failed to return posts!'})
    }
}

export const getPost = async (req,res) => {
    const id = req.params.id
    const post = await prisma.post.findUnique({
        where: {id},
        include: {
            postDetail: true,
            user: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        }
    });

    //Check if the post saved by the logged in user

    let userId;
    const token = req.cookies?.token;

    if(!token) {
        userId = null
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err,payload) => {
            if(err) {
                userId = null
            } else {
                userId = payload.id
            }
        })
    }

    const saved = await prisma.savedPost.findUnique({
        where: {
            postId: id,
            userId
        }
    })

    res.status(200).json({...post, isSaved: saved ? true:false})
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Failed to return post!'})
    }
}

export const addPost = async (req,res) => {

    const body = req.body
    const tokenUserId = req.userId

    try {

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                }
            }
        })

        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Failed to add post!'})
    }
}

export const updatePost = async (req,res) => {
    

    try {

        

        res.status(200).json("hi")
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Failed to update user!'})
    }
}

export const deletePost = async (req,res) => {

    const id = req.params.id
    const tokenUserId = req.userId

    try {

        const post = await prisma.post.findUnique({
            where:{id}
        })

        if(post.userId !== tokenUserId) {
            return res.status(403).json({message:'Not authorized!'})
        }

        await prisma.post.delete({
            where: {id}
        })

        res.status(200).json({message:"Post deleted!"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Failed to delete post!'})
    }
}