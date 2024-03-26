import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
    }
  }, [])
  /*
  This useEffect hook will run only once after the component mounts. 
  The empty dependency array [] indicates that the effect does not depend on any values, 
  so it will only execute when the component mounts and not re-run on subsequent re-renders.
  */

  const logout = () => {
    window.localStorage.removeItem('loggedBlogItem')
    setUser(null)
  }

  /*
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])
  
  const addBlog = (newBlog) => {
    console.log(newBlog)
    blogService
      .create(newBlog, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }*/

  return (
    <div>
      <h2>blogs</h2>
      { user ? 
        <div> {user.username} logged in <button onClick={logout}>logout</button></div> 
        : <Login setUser={setUser}/>
      }
      { user && <Blog blogs={blogs} setBlogs={setBlogs} token={user.token}/>}
    </div>
  )
}

export default App