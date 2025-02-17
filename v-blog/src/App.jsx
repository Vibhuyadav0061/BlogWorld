
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import { BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom'
import isAuthenticatedAuth from './utils/Auth'
import { useState } from 'react'
import { useEffect } from 'react'
import BlogPostForm from './components/BlogPostForm'

function App() {
  const [user , setUser] = useState(null);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
     const checkAuth = async()=>{
       const loggedInUser = await isAuthenticatedAuth();
       setUser(loggedInUser);
       console.log(loggedInUser);
       setLoading(false);
     }
     checkAuth();
     
  }, [])

  


  if(loading){
    return <div>Loading................</div>
  }
 
  return (
    <>
    {/* <BlogPostForm/> */}
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={user? <HomePage/> : <Navigate to="/login"/>} />
        <Route path='/login' element={user?  <Navigate to="/home"/>: <Login setUser = {setUser}/>} />
        <Route path='/home' element={user? <HomePage/> :<Navigate to="/login"/> } />
        <Route path='/signup' element={user? <Navigate to="/home"/> : <SignUp setUser = {setUser}/>} />
        <Route path='/dashboard' element={user? <Dashboard username={user.username}/> : <Navigate to="/login"/>}/>
        <Route path='/blogpost' element={user? <BlogPostForm username={user.username}/> : <Navigate to="/login"/>}/>
        
      </Routes>
     </Router>
    </>
  )
}

export default App
