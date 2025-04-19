import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUserPlus, FaHome, FaBars, FaTimes, FaUser, FaEdit, FaSignOutAlt, FaSignInAlt, FaUmbrellaBeach, FaCode, FaTimesCircle, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants
const logoVariants = { 
  hover: { 
    scale: 1.1, 
    textShadow: '0 0 15px rgba(0, 212, 255, 0.8)', 
    transition: { duration: 0.3 } 
  } 
};

const navItemVariants = { 
  hover: { 
    scale: 1.05, 
    color: '#00D4FF', 
    transition: { duration: 0.2 } 
  } 
};

const devButtonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.7)',
    textShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    transition: { duration: 0.15 }
  }
};

const containerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98,
    y: -15,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    } 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDevContainerOpen, setIsDevContainerOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const profileId = localStorage.getItem('userProfileId');
    const profileName = localStorage.getItem('userProfileName');
    if (profileId && profileName) {
      setUserProfile({ id: profileId, name: profileName });
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDevContainer = () => setIsDevContainerOpen(!isDevContainerOpen);

  const handleLogout = () => {
    localStorage.removeItem('userProfileId');
    localStorage.removeItem('userProfileName');
    setUserProfile(null);
    navigate('/login');
  };

  // Updated developer menu sections with all requested items
  const developerMenuSections = [
    {
      title: 'Career Development',
      icon: '🚀',
      items: [
        { name: 'Job Board', path: '/paradise/job-board', icon: '💼' },
        { name: 'Internships', path: '/paradise/internships', icon: '👔' },
        { name: 'Bootcamps', path: '/paradise/bootcamps', icon: '⚡' },
        { name: 'Hackathons', path: '/paradise/hackathons', icon: '👾' },
        { name: 'Mentorship', path: '/paradise/mentorship', icon: '🧙' },
        { name: 'Remote Work', path: '/paradise/remote-work', icon: '🌍' }
      ]
    },
    {
      title: 'Learning Resources',
      icon: '📚',
      items: [
        { name: 'All Resources', path: '/paradise/all-resources', icon: '📂' },
        { name: 'Courses', path: '/paradise/courses', icon: '🎓' },
        { name: 'Tutorials', path: '/paradise/tutorials', icon: '📝' },
        { name: 'Documentation', path: '/paradise/documentation', icon: '📖' },
        { name: 'Dev Tools', path: '/paradise/dev-tools', icon: '🛠️' },
        { name: 'Dev Wellness', path: '/paradise/dev-wellness', icon: '🧠' }
      ]
    },
    {
      title: 'Productivity Tools',
      icon: '⚙️',
      items: [
        { name: 'Games', path: '/paradise/games', icon: '🎮' },
        { name: 'Resume Builder', path: '/paradise/resume-builder', icon: '📄' },
        { name: 'All Tools', path: '/paradise/all-tools', icon: '🧰' },
        { name: 'Code Assistants', path: '/paradise/code-assistants', icon: '🤖' },
        { name: 'Design AI', path: '/paradise/design-ai', icon: '🎨' },
        { name: 'Productivity', path: '/paradise/productivity', icon: '⏱️' }
      ]
    },
    {
      title: 'Data & Trends',
      icon: '📊',
      items: [
        { name: 'Data & Analytics', path: '/paradise/data-analytics', icon: '🔢' },
        { name: 'Industry Trends', path: '/paradise/industry-trends', icon: '📈' },
        { name: 'AI Career Guide', path: '/paradise/ai-career-guide', icon: '🧭' },
        { name: 'Research Papers', path: '/paradise/research-papers', icon: '📜' },
        { name: 'Useful APIs', path: '/paradise/useful-apis', icon: '🔌' },
        { name: 'Open Source', path: '/paradise/open-source', icon: '🌐' }
      ]
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 p-6 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover="hover" variants={logoVariants}>
          <Link to="/" className="text-4xl font-extrabold text-neonBlue tracking-wide relative">
            GravityX
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple rounded-full opacity-75 blur-sm" />
          </Link>
        </motion.div>

        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`}>
            <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
              <FaHome className="mr-2" /> Home
            </motion.div>
          </NavLink>

          <NavLink to="/paradise" className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-white-400' : 'text-white-300'}`}>
            <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
              <FaUmbrellaBeach className="mr-2" /> Paradise
            </motion.div>
          </NavLink>

          {/* Enhanced Developers Button - Desktop */}
          {location.pathname.startsWith('/paradise') && (
            <div className="relative">
              <motion.button
                onMouseEnter={() => setIsDevContainerOpen(true)}
                onMouseLeave={() => !isDevContainerOpen && setIsDevContainerOpen(false)}
                onClick={toggleDevContainer}
                variants={devButtonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={{
                  boxShadow: isDevContainerOpen 
                    ? ['0 0 15px rgba(0, 212, 255, 0.5)', '0 0 30px rgba(0, 212, 255, 0.8)'] 
                    : '0 0 15px rgba(0, 212, 255, 0.5)',
                  scale: isDevContainerOpen ? 1.1 : 1,
                  backgroundColor: isDevContainerOpen ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 212, 255, 0.2)'
                }}
                transition={{
                  boxShadow: { duration: 0.5, repeat: isDevContainerOpen ? Infinity : 0, repeatType: 'mirror' },
                  scale: { duration: 0.2 },
                  backgroundColor: { duration: 0.3 }
                }}
                className={`flex items-center text-lg font-semibold ${
                  isDevContainerOpen ? 'text-white' : 'text-neonBlue'
                } bg-neonBlue/20 border-2 border-neonBlue/70 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 relative overflow-hidden`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-neonBlue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  animate={{ rotate: isDevContainerOpen ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mr-2"
                >
                  <FaCode className="text-xl" />
                </motion.span>
                <span className="relative z-10">Dev Hub</span>
                {isDevContainerOpen && (
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-neonBlue rounded-full"
                  />
                )}
              </motion.button>
              
              {isDevContainerOpen && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onMouseEnter={() => setIsDevContainerOpen(true)}
                  onMouseLeave={() => setIsDevContainerOpen(false)}
                  className="absolute top-16 right-0 w-[36rem] max-h-[80vh] bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-[0_0_40px_rgba(0,212,255,0.4)] border-2 border-neonBlue/40 overflow-hidden z-50"
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                  <div className="relative p-6 max-h-[calc(80vh-3rem)] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <motion.h2 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl font-bold text-neonBlue flex items-center"
                      >
                        <FaCode className="mr-3 text-2xl" /> 
                        <span>Developer Universe</span>
                      </motion.h2>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsDevContainerOpen(false)}
                        className="text-gray-400 hover:text-neonBlue transition-colors p-1"
                      >
                        <FaTimes size={20} />
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {developerMenuSections.map((section, index) => (
                        <motion.div 
                          key={section.title}
                          variants={containerVariants}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          className="bg-gray-800/60 rounded-xl p-5 border border-gray-700 hover:border-neonBlue/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                        >
                          <div className="flex items-center mb-4">
                            <motion.span 
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-2xl mr-3"
                            >
                              {section.icon}
                            </motion.span>
                            <h3 className="text-lg font-semibold text-neonPurple">{section.title}</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {section.items.map((item) => (
                              <motion.div
                                key={item.name}
                                variants={menuItemVariants}
                                whileHover="hover"
                              >
                                <NavLink
                                  to={item.path}
                                  className={({ isActive }) => `flex items-center justify-between px-4 py-2.5 text-sm font-medium ${
                                    isActive ? 'text-neonBlue bg-neonBlue/10' : 'text-gray-300 hover:text-white'
                                  } rounded-lg transition-all duration-200 group`}
                                  onClick={() => setIsDevContainerOpen(false)}
                                >
                                  <div className="flex items-center">
                                    <span className="text-lg mr-3">{item.icon}</span>
                                    <span>{item.name}</span>
                                  </div>
                                  <FaChevronRight className="text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                                </NavLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Quick Links Footer */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 pt-4 border-t border-gray-700/50"
                    >
                      <div className="flex flex-wrap gap-3">
                        <NavLink 
                          to="/paradise/trending" 
                          className="px-3 py-1.5 text-xs font-medium bg-neonBlue/10 text-neonBlue rounded-full hover:bg-neonBlue/20 transition-colors"
                        >
                          🔥 Trending
                        </NavLink>
                        <NavLink 
                          to="/paradise/new" 
                          className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-full hover:bg-green-500/20 transition-colors"
                        >
                          🆕 New
                        </NavLink>
                        <NavLink 
                          to="/paradise/ai-tools" 
                          className="px-3 py-1.5 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full hover:bg-purple-500/20 transition-colors"
                        >
                          🤖 AI Tools
                        </NavLink>
                        <NavLink 
                          to="/paradise/community" 
                          className="px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-full hover:bg-amber-500/20 transition-colors"
                        >
                          👥 Community
                        </NavLink>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {userProfile ? (
            <>
              <NavLink to={`/profile/${userProfile.id}`} className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`}>
                <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
                  <FaUser className="mr-2" /> {userProfile.name}
                </motion.div>
              </NavLink>
              <NavLink to={`/edit-profile/${userProfile.id}`} className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`}>
                <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
                  <FaEdit className="mr-2" /> Edit Profile
                </motion.div>
              </NavLink>
              <motion.button onClick={handleLogout} variants={navItemVariants} whileHover="hover" className="flex items-center text-lg font-semibold text-gray-300">
                <FaSignOutAlt className="mr-2" /> Logout
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/add-profile" className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`}>
                <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
                  <FaUserPlus className="mr-2" /> Add Profile
                </motion.div>
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => `flex items-center text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'}`}>
                <motion.div variants={navItemVariants} whileHover="hover" className="flex items-center">
                  <FaSignInAlt className="mr-2" /> Login
                </motion.div>
              </NavLink>
            </>
          )}
        </div>

        <button className="md:hidden text-gray-300 hover:text-neonBlue focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-md mt-4 p-4 rounded-b-xl shadow-lg"
        >
          <NavLink to="/" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
            <FaHome className="inline mr-2" /> Home
          </NavLink>

          <NavLink to="/paradise" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-amber-400' : 'text-amber-300'} hover:bg-amber-400/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
            <FaUmbrellaBeach className="inline mr-2" /> Paradise
          </NavLink>

          {/* Developers Container - Mobile */}
          {location.pathname.startsWith('/paradise') && (
            <div>
              <motion.button
                onClick={toggleDevContainer}
                whileTap={{ scale: 0.95 }}
                className="w-full text-left py-3 px-4 text-lg font-semibold text-neonBlue bg-neonBlue/10 rounded-lg hover:bg-neonBlue/20 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="flex items-center">
                  <motion.span
                    animate={{ rotate: isDevContainerOpen ? 180 : 0 }}
                    className="inline-block mr-2"
                  >
                    <FaCode />
                  </motion.span>
                  Dev Hub
                </span>
                <motion.span
                  animate={{ rotate: isDevContainerOpen ? 90 : 0 }}
                >
                  <FaChevronRight />
                </motion.span>
              </motion.button>
              {isDevContainerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 ml-4 p-4 bg-gray-800/60 rounded-lg border border-gray-700"
                >
                  {developerMenuSections.map((section) => (
                    <motion.div 
                      key={section.title} 
                      className="mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-md font-semibold text-neonPurple mb-2 flex items-center">
                        <span className="text-lg mr-2">{section.icon}</span>
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <motion.div
                            key={item.name}
                            whileTap={{ scale: 0.98 }}
                          >
                            <NavLink
                              to={item.path}
                              className={({ isActive }) => `block px-3 py-2 text-sm font-medium ${
                                isActive ? 'text-neonBlue bg-neonBlue/10' : 'text-gray-300'
                              } hover:text-white rounded-lg transition-colors duration-200 flex items-center`}
                              onClick={() => { setIsDevContainerOpen(false); setIsOpen(false); }}
                            >
                              <span className="text-base mr-2">{item.icon}</span>
                              {item.name}
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  {/* Mobile Quick Links */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <NavLink 
                      to="/paradise/trending" 
                      className="px-3 py-1 text-xs font-medium bg-neonBlue/10 text-neonBlue rounded-full"
                      onClick={() => { setIsDevContainerOpen(false); setIsOpen(false); }}
                    >
                      🔥 Trending
                    </NavLink>
                    <NavLink 
                      to="/paradise/new" 
                      className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full"
                      onClick={() => { setIsDevContainerOpen(false); setIsOpen(false); }}
                    >
                      🆕 New
                    </NavLink>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {userProfile ? (
            <>
              <NavLink to={`/profile/${userProfile.id}`} className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
                <FaUser className="inline mr-2" /> {userProfile.name}
              </NavLink>
              <NavLink to={`/edit-profile/${userProfile.id}`} className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
                <FaEdit className="inline mr-2" /> Edit Profile
              </NavLink>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="block w-full text-left py-3 px-4 text-lg font-semibold text-gray-300 hover:bg-neonBlue/10 rounded-lg transition-colors duration-200">
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/add-profile" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
                <FaUserPlus className="inline mr-2" /> Add Profile
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
                <FaSignInAlt className="inline mr-2" /> Login
              </NavLink>
            </>
          )}
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonBlue/50 to-transparent opacity-50" />
    </motion.nav>
  );
}

export default Navbar;