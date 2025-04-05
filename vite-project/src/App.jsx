import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
import EditProfile from './pages/EditProfile';
import Paradise from './pages/Paradise';
import Login from './pages/Login';
import Opportunities from './pages/Opportunities';
import Resources from './pages/Resources';
import ProjectShowcase from './pages/ProjectShowcase';
import PortfolioIdeas from './pages/PortfolioIdeas';
import ResumeBuilding from './pages/ResumeBuilding';
import AiToolsHub from './pages/AiToolsHub';
import IndustryTrends from './pages/IndustryTrends';
import AICareerGuide from './pages/AICarrerGuide';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/paradise" element={<Paradise />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/project-showcase" element={<ProjectShowcase />} />
          <Route path ="/portfolio-ideas" element={<PortfolioIdeas />} />
          <Route path="/resume-building" element={<ResumeBuilding />} />
          <Route path="/ai-tools-hub" element={<AiToolsHub />} />
          <Route path="/industry-trends" element={<IndustryTrends />} />
          <Route path="/ai-career-guide" element={<AICareerGuide/>} />
          

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;