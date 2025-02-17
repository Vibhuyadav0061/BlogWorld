import axios from "axios";
import React, { useEffect, useState } from "react";
import img from '../assets/pro.jpg'
// Example data

const user = {
 
  email: "john@example.com",
  profilePicture: "https://via.placeholder.com/150",
};



const Dashboard = ({username}) => {
  const [blogs,setBlogs] = useState([]);
  useEffect(()=>{
    const  fetchBlogs  = async()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/blogs/${username}`);
        setBlogs(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    if(username){
      fetchBlogs();
    }   
  },[username])
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-3xl font-semibold text-gray-900">Profile.......</h2>
          <div className="flex items-center mt-4">
            <img
              src={img}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-300"
            />
            <div className="ml-6">
              <p className="text-xl font-medium text-gray-900">{username}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-3xl font-semibold text-gray-900">Your Blogs</h2>
          <div className="mt-4 space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.username}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-xl font-medium text-gray-900">{blog.title}</h3>
                  <p className="text-gray-700 mt-2">{blog.content}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
