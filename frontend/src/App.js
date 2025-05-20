import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SkillPage from './pages/SkillPage';
import About from './pages/About';  // About page import karo
import './index.css'; // make sure this line exists

function App() {
  const [skills, setSkills] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<Home skills={skills} setSkills={setSkills} />} />
            <Route path="/skills" element={<SkillPage skills={skills} />} />
            <Route path="/about" element={<About />} />  {/* About route add */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
