import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import AICarrerGuide from './pages/AICarrerGuide'
import IndustryTrends from './pages/IndustryTrends';
import Roadmap from './pages/RoadMap';
import Certifications from './pages/Certifications';
import Notes from './pages/Notes';
import BestColleges from './pages/BestColleges';
import Libraries from './pages/Libraries';
import ValuableRepo from './pages/ValuableRepo';
import ResearchPapers from './pages/ResearchPapers';
import UsefulAPIs from './pages/UsefulAPIs';
import OpenSource from './pages/OpenSource';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Suggest from './pages/Suggest';
import TermsOfService from './pages/TermsOfService';
import { Analytics } from '@vercel/analytics/react'




// Starfield Component
const Starfield = ({ theme }) => {
  const gradientClass = theme === 'dark' ? 'cosmic-gradient-dark' : 'cosmic-gradient-light';

  useEffect(() => {
    console.log('Starfield rendered with theme:', theme);
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-1] bg-gray-900 overflow-hidden will-change-transform">
      {/* Theme-Specific Gradient */}
      <div className={`absolute inset-0 ${gradientClass}`} />
      {/* 350 Twinkling Stars */}
      {[...Array(350)].map((_, i) => {
        const isColored = Math.random() > 0.7; // 30% colored stars
        const color = isColored
          ? theme === 'dark'
            ? Math.random() > 0.5 ? 'var(--neon-blue)' : 'var(--neon-purple)'
            : Math.random() > 0.5 ? 'var(--light-blue)' : 'var(--light-indigo)'
          : theme === 'dark' ? '#FFFFFF' : '#D1D5DB';
        const size = Math.random() > 0.9 ? 4 + Math.random() * 2 : 0.5 + Math.random() * 2.5; // 10% larger stars

        return (
          <motion.span
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              translateZ: `${Math.random() * 50}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.7,
              repeat: Infinity,
              delay: Math.random() * 1.2,
              ease: 'easeInOut',
            }}
            whileHover={{
              opacity: 1,
              scale: 1.3,
              boxShadow: `0 0 10px ${color}`,
              transition: { duration: 0.2 },
            }}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    console.log('App theme:', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-black'} ${theme}`}>
      <Starfield theme={theme} />
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
          <Route path="/portfolio-ideas" element={<PortfolioIdeas />} />
          <Route path="/resume-building" element={<ResumeBuilding />} />
          <Route path="/ai-tools-hub" element={<AiToolsHub />} />
          <Route path="/industry-trends" element={<IndustryTrends />} />
          <Route path="/roadmaps" element={<Roadmap />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/best-colleges" element={<BestColleges />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/valuable-repo" element={<ValuableRepo />} />
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/useful-apis" element={<UsefulAPIs />} />
          <Route path="/open-source" element={<OpenSource />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/ai-career-guide" element={<AICarrerGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
         <Analytics />
      </div>
      <Footer />
    </div>
  );
}

export default App;