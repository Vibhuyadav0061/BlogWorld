import axios from 'axios'
let cachedUser = null;
const isAuthenticatedAuth = async()=>{
    
    if (cachedUser) return cachedUser;
    const token =  localStorage.getItem("token");
    if(!token) return false;
    try{
        const responce = await axios.get("https://blogworld-od9u.onrender.com/api/auth/profile",{
            headers:{
                Authorization: token,
            },
        })
        cachedUser = responce.data.user;
        return cachedUser;
    }
    catch(err){
        console.log(err);
        return false;
    }

}
export default isAuthenticatedAuth;
