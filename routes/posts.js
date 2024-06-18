//const express = require('express')
import express from 'express'

const router = express.Router()

import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postsController.js'
//Get all posts
router.get('/', getPosts)

//Get a single post
router.get('/:id', getPost)

//Create new post
router.post('/', createPost)

//Update a post
router.put('/:id', updatePost)

// Delete a post
router.delete('/:id', deletePost)

//module.exports = router

export default router