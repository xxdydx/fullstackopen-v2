const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username:1, name:1})
  response.json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogRouter.post('/', async (request, response, next) => {

  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (!body.likes) {
    body.likes = 0
  }
  if (!body.title) {
    return response.status(400).json({
      error: 'title is required'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'url is required'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author:body.author,
    url: body.url,
    likes:body.likes,
    user: user._id
 }
 )
 try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    }

  catch (exception) {
    next(exception)
  }

 



  })


  
blogRouter.delete('/:id', async (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)
  if (!user._id.toString() === blogToDelete.user._id.toString()) {
    return response.status(401).json({ error: `Unauthorized` })
  }


  try {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  }
  
  catch(error) {
    next(error)
  } 
})


blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body[0].title,
    author:body[0].author,
    url: body[0].url,
    likes:body[0].likes
 }
 console.log(blog)
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log(updatedBlog)
    response.json(updatedBlog.toJSON())
  }
  catch (exception) {
    next (exception)
  }

})

  
  module.exports = blogRouter
