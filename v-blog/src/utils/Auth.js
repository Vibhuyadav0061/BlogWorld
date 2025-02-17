import axios from 'axios'
let cachedUser = null;
const isAuthenticatedAuth = async()=>{
    
    if (cachedUser) return cachedUser;
    const token =  localStorage.getItem("token");
    if(!token) return false;
    try{
        const responce = await axios.get("http://localhost:5000/api/auth/profile",{
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
