import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Verify from './components/Verify';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Profile from './components/profile'


function App() {
 

  return (
    <>
    <Router>
      <Nav/>
      <Routes>
    <Route path="/" element={<Home/>}></Route>

      <Route path="/Verify" element={<Verify/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>

      

      </Routes>
    </Router>
    </>
  )
}

export default App
