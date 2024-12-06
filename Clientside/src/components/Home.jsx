import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({setUser}) => {
  const navigates=useNavigate()
 
  const getUser = async () => {
    const token = localStorage.getItem("token")
    console.log(!token);
    
    if(!token){
      // console.log("hs");
      // console.log("hsi");
      
      navigates("/Login")
    }
    else{
      try {
        const res = await axios.get("http://localhost:3004/api/display", { headers: { "Authorization": `Bearer ${token}` } })
      
        if(res.status==200){
          setUser(res.data.name)
        }
        else{
          navigates("/Login")
        }
        } catch (error) {
          console.log(error);

        }
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div><h1>Home page</h1></div>
  )
}

export default Home