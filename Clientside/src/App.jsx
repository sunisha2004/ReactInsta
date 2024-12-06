import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Verify from './components/Verify';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/profile'
import AddData from './components/AddData';
import { useState } from 'react';


function App() {
 const [user,setUser]=useState("");
console.log("app"+user);

  return (
    <>
    <Router>
   {user&&   <Nav user={user}/>}
      <Routes>
    <Route path="/" element={<Home setUser={setUser}/>}></Route>

      <Route path="/Verify" element={<Verify/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/addData" element={<AddData/>}></Route>


      

      </Routes>
    </Router>
    </>
  )
}

export default App
