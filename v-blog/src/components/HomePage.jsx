import React from 'react';
import axios from 'axios';
import { useState ,useEffect } from 'react';



const HomePage = () => {
  const [blogs,setBlogs] = useState([]);
  useEffect(()=>{
    const  fetchBlogs  = async()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/blogs/");
        setBlogs(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    
      fetchBlogs();
     
  },[])
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900">Explore fresh insights every day – Your daily dose of blogs!</h1>
          <p className="mt-2 text-lg text-gray-600">Explore the latest posts from our community</p>
        </header>

        {/* Blog List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.username + "home"}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
              <p className="mt-2 text-gray-700">{blog.content.slice(0, 150)}...</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Posted By: {blog.username}   Created at: {Date.now()}</p>
                {/* <a
                  href={`/blogs/${blog.username}`}
                  className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                >
                  Read More
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
