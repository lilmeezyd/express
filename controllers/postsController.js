const posts = [{id: 1, name: 'I am me'}, 
{id: 2, name: 'I am superfly'}, {id: 3, name: 'I am that guy'}]

//@desc Get Posts
//@route /api/posts
export const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit))
    }
    res.status(200).json(posts)
    
}

//@desc Get Post
//@route /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)
    if(!post) {
        //return res.status(404).json({message: 'Post not found!'})
        const error = new Error('Post not found!')
        error.status = 404
        return next(error)
    }
    res.status(200).json(post)
    
}

//@desc Create Posts
//@route /api/posts
export const createPost = (req, res, next) => {
    const NewId = Math.max(...(posts.map(post => post.id))) + 1
    if(!req.body.name) {
        const error = new Error('Please add title')
        error.status = 400
        return next(error)
    }
    posts.push({id: NewId, name: req.body.name})
    res.status(201).json(posts)
}

//@desc Update Post
//@route /api/posts/:id
export const updatePost = (req, res, next) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))
    if(!req.body.name) {
        const error = new Error('Please add title')
        error.status = 400
        return next(error)
    }
    if(!post) {
        const error = new Error('Post not found')
        error.status = 404
        return next(error)
    }
    post.name = req.body.name
    res.status(200).json(posts)
}

//@desc Delete Posts
//@route /api/posts/:id
export const deletePost = (req, res, next) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))
    if(!post) {
        const error = new Error('Post not found')
        error.status = 404
        return next(error)
    }
    res.status(200).json(posts.filter(post => post.id !== parseInt(req.params.id)))
}

