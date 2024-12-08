import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './profile.css'


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const getUser = async () => {
    if (!token) {
      navigate("/Login");
    } else {
      try {
        const res = await axios.get("http://localhost:3004/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr);
          setUserData(res.data.data || null);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("Login");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  
  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3004/api/getPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const DeleteUser=async(e)=>{
    e.preventDefault()
    if(!token){
      navigate("/Login")
    }
    else{
      try{
        const res= await axios.delete("http://localhost:3004/api/deleteUser",{
          headers: { Authorization: `Bearer ${token}`},
        })
        if(res.status === 200){
          alert(res.data.msg)
          localStorage.removeItem("token")
          navigate('/Login')
          location.reload()
        }
        else{
          navigate('/Login')
        }
      }
      catch(error){
        console.error(error);
        location.reload()
        navigate("/Login")
        
      }
    }

  }

  return (
    <div className="container">
      <div className="left-side">
        <form>
          <div className="form-group">
            <div className="image">
              <img
                src={userDetails?.profile || "/default-profile.png"}
                alt="Profile"
              />
            </div>
            <div>Username: {userDetails?.username}</div>
            <div>Email: {userDetails?.email}</div>
          </div>
        </form>
        {userData ? (
          <>
            <div>
              <div>Name: {userData.name}</div>
              <div>Date of Birth: {userData.dob}</div>
              <div>Note: {userData.note}</div>
            </div>
            <Link to={"/EditData"}>
              <button>Edit Profile</button>
            </Link>
          </>
        ) : (
          <>
            <div>Note: Not added, need to create !</div>
            <Link to={"/addData"}>
              <button>Create Profile</button>
            </Link>
          </>
        )}
        <button onClick={DeleteUser}>Delete Profile</button>
      </div>
      <div className="right-side">
        <Link to={"/addpost"}>
          <button>Add Post</button>
        </Link>
        {posts.length === 0 ? (
          <div>No post added</div>
        ) : (
          posts.map((post, index) => (
            <div key={index}>
              <Link to={`/viewUserPost/${post._id}`}><img
                src={post.images[0]}
                alt="Post"
                className="post-image"
              /> </Link>
              
                {/* <button>View</button> */}
             
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;