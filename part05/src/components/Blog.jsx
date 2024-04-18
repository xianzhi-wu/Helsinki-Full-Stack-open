import { useState, useEffect } from "react"

import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, token }) => {

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
  }, [])

  const [visiblity, setVisiblity] = useState(false)

  const visible = { display: visiblity ? 'none' : '' }
  const invisible = { display: visiblity ? '' : 'none' }

  const toggle = (event) => {
    event.preventDefault()
    setVisiblity(!visiblity)
  }

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleFormChange = (event) => {
    const {name, value} = event.target
    setFormData(preState => ({
      ...preState,
      [name]: value
    }))
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const returnedBlog = await blogService.create(formData, token)

    setBlogs(blogs.concat(returnedBlog))
      
    setFormData({
      title: '',
      author: '',
      url: ''
    })

    setVisiblity(!visiblity)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibleBlogs, setVisibleBlogs] = useState({})
  const viewBlog = (blogId) => {
    setVisibleBlogs(preState => ({
      ...preState,
      [blogId]: !preState[blogId]
    }))
  }

  const like = async (blogId) => {
    const likedBlog = await blogService.like(blogId)
    // not efficient
    setBlogs(prevBlogs => {
        const updatedBlogs = prevBlogs.map(blog => {
          if (blog.id === likedBlog.id) {
            return { ...blog, likes: blog.likes + 1 }
          }
          return blog
        })

        updatedBlogs.sort((a, b) => b.likes - a.likes)

        return updatedBlogs
    })
  }

  const remove = async (blogId, title) => {
    if (window.confirm(`Remove blog: ${title}?`)) {
      await blogService.remove(blogId, token)
      setBlogs(prevBlogs => 
        prevBlogs.filter(blog => blog.id !== blogId)
      )
    }
  }

  return (
    <>
      <button onClick={toggle} style={visible}>create new blog</button>
      <form style={invisible}>
        <div>title: <input type="text" name="title" value={formData.title} onChange={handleFormChange}/></div>
        <div>author: <input type="text" name="author" value={formData.author} onChange={handleFormChange}/></div>
        <div>url: <input type="text" name="url" value={formData.url} onChange={handleFormChange}/></div>
        <button onClick={createBlog}>create</button>
        <button onClick={toggle}>cancel</button>
      </form>
      <ul style={{ listStyleType: 'none', paddingInlineStart: 0, ...visible }}>
        {blogs.map(blog => (
          <li key={blog.id} style={blogStyle}>
            <div>
              {blog.title} 
              <button onClick={() => viewBlog(blog.id)}>{visibleBlogs[blog.id] ? 'hide' : 'view'}</button>
            </div>
            <div style={{ display: visibleBlogs[blog.id] ? 'block' : 'none'}}>
              <div>author:{blog.author}</div>
              <div>likes:{blog.likes} <button onClick={() => like(blog.id)}>like</button></div>
              <a href={blog.url}>{blog.url}</a> 
              <button onClick={() => remove(blog.id, blog.title)}>remove</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Blog