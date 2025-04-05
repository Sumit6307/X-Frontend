// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import Navbar from '../components/Navbar';
import { FaRocket, FaRedo, FaCode, FaBolt, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { RiLayoutGridFill, RiLayoutMasonryFill, RiLayoutRowFill } from 'react-icons/ri';

// Animation variants
const heroVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } };
const skillVariants = { animate: { x: ['0%', '-50%'], transition: { x: { repeat: Infinity, repeatType: 'loop', duration: 15, ease: 'linear' } } } };
const skillBoxVariants = { hidden: { opacity: 0, scale: 0.9, rotateX: 20 }, visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, ease: 'easeOut' } }, hover: { scale: 1.02, rotateX: 5, boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' } };
const skillTagVariants = { hover: { scale: 1.15, y: -5, boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)', rotate: 2, transition: { duration: 0.2 } } };
const premiumButtonVariants = {
  animate: { scale: [1, 1.03, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
  hover: { scale: 1.05, boxShadow: '0 0 25px rgba(192, 192, 192, 0.8), 0 0 10px rgba(255, 215, 0, 0.5)', transition: { duration: 0.3 } },
  tap: { scale: 0.98 },
};
const navButtonVariants = {
  hover: { scale: 1.1, boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)', transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

// SearchBar component
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <motion.input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value === '') onSearch(''); // Clear search when input is empty
        }}
        placeholder="Search by name, skills, location, bio..."
        className="w-full p-4 pl-12 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 shadow-lg"
        whileFocus={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
      />
      <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400">
        <FaSearch size={20} />
      </button>
    </form>
  );
};

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [error, setError] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState('grid');
  const profilesPerPage = 18;

  const fetchProfiles = async () => {
    try {
      setError('');
      const res = await axios.get('https://x-backend-1-zhox.onrender.com/api/profiles');
      setProfiles(res.data);
      setFilteredProfiles(res.data);
      const skillCount = {};
      res.data.forEach((profile) => profile.skills.forEach((skill) => { skillCount[skill.toLowerCase()] = (skillCount[skill.toLowerCase()] || 0) + 1; }));
      const topSkills = Object.entries(skillCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([skill]) => skill.toUpperCase());
      setTrendingSkills(topSkills);
    } catch (err) {
      console.error('Fetch Profiles Error:', err);
      setError('Failed to load profiles. Is the backend server running on https://x-backend-1-zhox.onrender.com?');
    }
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProfiles(profiles);
      setCurrentPage(1);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = profiles.filter(profile => (
      (profile.name && profile.name.toLowerCase().includes(lowercasedSearch)) ||
      (profile.bio && profile.bio.toLowerCase().includes(lowercasedSearch)) ||
      (profile.location && profile.location.toLowerCase().includes(lowercasedSearch)) ||
      (profile.skills && profile.skills.some(skill => skill.toLowerCase().includes(lowercasedSearch))) ||
      (profile.projects && profile.projects.some(project => (
        (project.title && project.title.toLowerCase().includes(lowercasedSearch)) ||
        (project.description && project.description.toLowerCase().includes(lowercasedSearch))
      )))
    ));

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  };

  const handleOpenProfile = (id) => { setSelectedProfileId(id); };
  const handleCloseProfile = () => { setSelectedProfileId(null); };

  // Pagination Logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'masonry':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr';
      case 'list':
        return 'flex flex-col gap-6 max-w-4xl mx-auto';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      <Navbar />
      <div className="pt-20 pb-12">
        <style>{`
          .neon-heading { color: #fff; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5); }
          .shine-button { background: linear-gradient(90deg, #00D4FF, #D81BFF); }
          .neon-blue { color: #00D4FF; }
          .neon-purple { color: #D81BFF; }
          .premium-button {
            background: linear-gradient(135deg, #D4AF37, #F0E68C, #D4AF37);
            background-size: 150% 150%;
            color: #1a1a1a;
            border: 1px solid #C0C0C0;
            border-radius: 25px;
            position: relative;
            overflow: hidden;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .premium-button::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: metallic-shine 4s infinite linear;
            z-index: 0;
          }
          .premium-button span {
            position: relative;
            z-index: 1;
          }
          .nav-button {
            background: linear-gradient(45deg, #00D4FF, #9333EA);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            position: relative;
            overflow: hidden;
          }
          .nav-button::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
            animation: pulse-glow 3s infinite ease-in-out;
            z-index: 0;
          }
          .nav-button span {
            position: relative;
            z-index: 1;
          }
          @keyframes metallic-shine {
            0% { transform: translateX(-100%) translateY(-100%); }
            100% { transform: translateX(100%) translateY(100%); }
          }
          @keyframes pulse-glow {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.2); opacity: 0.5; }
            100% { transform: scale(0.8); opacity: 0; }
          }
        `}</style>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />

        {/* Hero Section with Premium Button */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="relative text-center py-20 bg-gradient-to-r from-neonBlue/20 via-neonPurple/20 to-transparent"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 -z-10" />
          
          {/* Premium Button in Upper Left */}
          <div className="absolute left-6 mt-[30px]">
            <Link to="/paradise">
              <motion.button
                className="premium-button px-6 py-3 text-lg inline-flex items-center"
                variants={premiumButtonVariants}
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <FaBolt className="mr-2" />
                <span>GravityX Paradise</span>
              </motion.button>
            </Link>
          </div>

          <motion.h1
            className="text-6xl md:text-7xl neon-heading mb-6 tracking-wide"
            animate={{ textShadow: ['0 0 10px rgba(0,212,255,0.5)', '0 0 20px rgba(0,212,255,0.8)', '0 0 10px rgba(0,212,255,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GravityX
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 px-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Connect with 2M+ Developers Worldwide in a Universe of Innovation
          </motion.p>
          <Link to="/add-profile">
            <motion.button
              className="shine-button text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="mr-2" /> Join the Cosmos
            </motion.button>
          </Link>
        </motion.section>

        {error && (
          <div className="container mx-auto py-6 px-4 text-center text-red-300 bg-red-500/20 rounded-lg max-w-2xl">
            <p>{error}</p>
            <motion.button
              onClick={fetchProfiles}
              className="mt-2 text-neonBlue hover:text-neonPurple inline-flex items-center"
              whileHover={{ scale: 1.1 }}
            >
              <FaRedo className="mr-2" /> Retry
            </motion.button>
          </div>
        )}

        <div className="container mx-auto py-10 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>

        {trendingSkills.length > 0 && (
          <section className="container mx-auto py-20 px-4">
            <h2 className="text-5xl neon-heading mb-12 text-center tracking-wider drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
              Trending Skills
            </h2>
            <motion.div
              variants={skillBoxVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl border border-neonBlue/40 shadow-[0_0_30px_rgba(0,212,255,0.3)] overflow-hidden perspective-1000 transform-style-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/10 via-neonPurple/10 to-transparent opacity-50 animate-pulse -z-10" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
              <div className="flex items-center justify-center mb-6">
                <FaCode className="text-neonBlue mr-3" size={28} />
                <span className="text-xl font-semibold text-neonBlue drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                  Most Used Skills in the Cosmos
                </span>
              </div>
              <motion.div
                className="flex space-x-8 whitespace-nowrap justify-center"
                variants={skillVariants}
                animate="animate"
              >
                {trendingSkills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    variants={skillTagVariants}
                    whileHover="hover"
                    className="inline-block bg-gradient-to-r from-neonBlue/50 to-neonPurple/50 text-white px-8 py-4 rounded-full text-lg font-bold border border-neonBlue/60 shadow-[0_0_15px_rgba(0,212,255,0.4)] transform-gpu"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none" />
            </motion.div>
          </section>
        )}

        <section className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl neon-heading">Explore Developers</h2>
            <div className="flex gap-2 bg-gray-800 rounded-full p-1">
              <motion.button
                onClick={() => setLayout('grid')}
                className={`p-3 rounded-full ${layout === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutGridFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('masonry')}
                className={`p-3 rounded-full ${layout === 'masonry' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutMasonryFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('list')}
                className={`p-3 rounded-full ${layout === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutRowFill className="text-lg" />
              </motion.button>
            </div>
          </div>

          {filteredProfiles.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={getLayoutClasses()}
              >
                {currentProfiles.map((profile) => (
                  <LazyLoadComponent key={profile._id} threshold={100}>
                    <ProfileCard 
                      profile={profile} 
                      onOpenProfile={handleOpenProfile} 
                      layout={layout} 
                    />
                  </LazyLoadComponent>
                ))}
              </motion.div>
              
              {/* Pagination Buttons */}
              <div className="flex justify-center gap-6 mt-10">
                <motion.button
                  className="nav-button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  variants={navButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <span><FaArrowLeft /></span>
                </motion.button>
                <motion.button
                  className="nav-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variants={navButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <span><FaArrowRight /></span>
                </motion.button>
              </div>
              <p className="text-center text-gray-400 mt-4">
                Page {currentPage} of {totalPages} | Showing {filteredProfiles.length} developers
              </p>
            </>
          ) : (
            <p className="text-center text-gray-400 text-lg">
              {profiles.length === 0 ? 'No profiles available yet. Be the first!' : 'No matching profiles found.'}
            </p>
          )}
        </section>

        <AnimatePresence>
          {selectedProfileId && <ProfileModal id={selectedProfileId} onClose={handleCloseProfile} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;