import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaBriefcase, FaGraduationCap, FaLaptopCode, FaHandshake, FaGlobeAmericas, FaExternalLinkAlt } from 'react-icons/fa';
import { SiHackaday } from 'react-icons/si';
import { IoMdSchool } from 'react-icons/io';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import axios from 'axios';

const Opportunities = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [opportunitiesData, setOpportunitiesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'jobs', label: 'Job Board', icon: <FaBriefcase /> },
    { id: 'internships', label: 'Internships', icon: <IoMdSchool /> },
    { id: 'bootcamps', label: 'Bootcamps', icon: <FaLaptopCode /> },
    { id: 'hackathons', label: 'Hackathons', icon: <SiHackaday /> },
    { id: 'mentorship', label: 'Mentorship', icon: <FaHandshake /> },
    { id: 'remote', label: 'Remote Work', icon: <FaGlobeAmericas /> },
  ];

  // Static fallback data
  const fallbackData = {
    jobs: [
      {
        id: 'fallback1',
        title: 'Senior Software Developer',
        company: 'TechNova India',
        location: 'Remote, India',
        salary: '₹10L - ₹15L',
        description: 'Build cutting-edge applications for Indian market',
        tags: ['React', 'Node.js', 'India'],
        link: 'https://www.google.co.in',
      },
    ],
    internships: [
      {
        id: 'fallback1',
        title: 'Frontend Development Intern',
        company: 'Digital Solutions India',
        location: 'Bangalore, India',
        duration: '3 months',
        description: 'Learn React and build real-world applications',
        tags: ['React', 'JavaScript', 'CSS'],
        link: 'https://www.google.co.in',
      },
    ],
    bootcamps: [
      {
        id: 'fallback1',
        title: 'Full Stack Development Bootcamp',
        company: 'CodeMaster India',
        location: 'Online',
        duration: '12 weeks',
        cost: '₹50,000',
        description: 'Comprehensive full-stack development program',
        tags: ['MERN', 'JavaScript', 'Node.js'],
        link: 'https://www.google.co.in',
      },
    ],
    hackathons: [
      {
        id: 'fallback1',
        title: 'National Hackathon Challenge',
        company: 'TechFest India',
        location: 'Multiple Cities',
        date: 'Coming Soon',
        prize: '₹5,00,000',
        description: 'Annual national-level hackathon competition',
        tags: ['Innovation', 'Coding', 'Prize'],
        link: 'https://www.google.co.in',
      },
    ],
    mentorship: [
      {
        id: 'fallback1',
        title: 'Tech Career Mentorship',
        company: 'CareerGrowth India',
        location: 'Online',
        duration: '3 months',
        description: '1-on-1 mentorship with industry experts',
        tags: ['Career', 'Guidance', 'Tech'],
        link: 'https://www.google.co.in',
      },
    ],
    remote: [
      {
        id: 'fallback1',
        title: 'Remote React Developer',
        company: 'GlobalTech Solutions',
        location: 'Fully Remote',
        salary: '₹8L - ₹12L',
        description: 'Work from anywhere in India',
        tags: ['React', 'Remote', 'Flexible'],
        link: 'https://www.google.co.in',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const data = { ...fallbackData };

      try {
        const requests = tabs.map(tab => 
          axios.get(`https://x-backend-1-zhox.onrender.com/api/google-${tab.id}`, {
            params: {
              q: tab.id === 'remote' ? 'Remote work' : tab.id,
              location: 'India',
            },
          }).catch(err => {
            console.error(`Error fetching ${tab.id}:`, err);
            return { data: fallbackData[tab.id] };
          })
        );

        const responses = await Promise.all(requests);
        
        tabs.forEach((tab, index) => {
          data[tab.id] = responses[index].data || fallbackData[tab.id];
        });

        setOpportunitiesData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to load some data: ${err.message}. Using fallback data where needed.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Error boundary fallback
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center bg-gray-800 p-8 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Opportunities</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: '#00d4ff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
              size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
              line_linked: { enable: true, distance: 150, color: '#9333ea', opacity: 0.4, width: 1 },
              move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out' },
            },
            interactivity: {
              detect_on: 'canvas',
              events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
              modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } },
            },
            retina_detect: true,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cosmic Career Portal
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Launch your developer career with stellar opportunities from across India
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link
              to="/post-opportunity"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaRocket className="mr-2" /> Post an Opportunity
            </Link>
          </motion.div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        )}

        {/* Opportunities Grid */}
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {opportunitiesData[activeTab]?.length > 0 ? (
                opportunitiesData[activeTab].map((opportunity) => (
                  <motion.div
                    key={opportunity.id || Math.random().toString(36).substr(2, 9)}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                      hoveredCard === opportunity.id ? 'border-cyan-400 shadow-xl shadow-cyan-500/20' : 'border-gray-700'
                    }`}
                    onMouseEnter={() => setHoveredCard(opportunity.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">{opportunity.title || 'Untitled Opportunity'}</h3>
                        {hoveredCard === opportunity.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block px-2 py-1 bg-cyan-500 text-xs font-semibold rounded-full"
                          >
                            NEW
                          </motion.span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-2">{opportunity.company || opportunity.provider || 'Unknown'}</p>
                      <p className="text-gray-400 text-sm mb-4">{opportunity.location || 'Location not specified'}</p>
                      <p className="text-gray-300 mb-4">{opportunity.description || 'No description available'}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(opportunity.tags || []).map((tag, index) => (
                          <motion.span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-xs" whileHover={{ scale: 1.1 }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {opportunity.salary || opportunity.prize || opportunity.cost ? (
                        <p className="text-lg font-semibold text-cyan-400 mb-6">{opportunity.salary || opportunity.prize || opportunity.cost}</p>
                      ) : null}

                      {/* Single Apply Button */}
                      <div className="mt-4">
                        <a
                          href={opportunity.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <motion.button
                            whileHover={{ scale: opportunity.link ? 1.03 : 1 }}
                            whileTap={{ scale: opportunity.link ? 0.97 : 1 }}
                            className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
                              opportunity.link 
                                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg' 
                                : 'bg-gray-700 cursor-not-allowed'
                            }`}
                            disabled={!opportunity.link}
                          >
                            {opportunity.link ? 'Apply Now' : 'Details Coming Soon'}
                            {opportunity.link && <FaExternalLinkAlt className="text-xs" />}
                          </motion.button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-400 text-lg">No {activeTab} opportunities found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Featured Companies */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-300">Trusted by cosmic companies across India</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
            {['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Google India', 'Amazon India', 'Microsoft India'].map((company, index) => (
              <motion.div
                key={index}
                className="text-2xl font-bold text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 md:p-12 border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to launch your career into orbit?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">Join thousands of developers finding jobs across India</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg">
                Create Your Profile
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold">
                Browse All Opportunities
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Opportunities;