import React from 'react'
import Weather from './components/Weather';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/> */
        <Route path="/about" element={<About />}/>
        <Route path="/Weather" element={<Weather />}/>
        <Route path="/contact" element={<Contact />}/> 
      </Routes>
    </div>
  );
}

export default App;
