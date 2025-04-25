import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUserPlus, FaHome, FaBars, FaTimes, FaUser, FaEdit, FaSignOutAlt, FaSignInAlt, FaUmbrellaBeach, FaCode, FaTimesCircle, FaChevronRight, FaBell } from 'react-icons/fa';
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
    scale: 1.15,
    boxShadow: '0 0 30px rgba(0, 212, 255, 0.9), 0 0 60px rgba(0, 212, 255, 0.5)',
    textShadow: '0 0 15px rgba(0, 212, 255, 1)',
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 }
  }
};

const notificationButtonVariants = {
  hover: {
    scale: 1.2,
    boxShadow: '0 0 25px rgba(0, 212, 255, 1), 0 0 50px rgba(147, 51, 234, 0.7)',
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 }
  },
  pulse: {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 10px rgba(0, 212, 255, 0.5)',
      '0 0 20px rgba(0, 212, 255, 0.8)',
      '0 0 10px rgba(0, 212, 255, 0.5)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
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
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    } 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

// Enhanced DevHubButton Component
const DevHubButton = ({ isDevContainerOpen, setIsDevContainerOpen, toggleDevContainer, isMobile = false }) => {
  const [timeBasedGlow, setTimeBasedGlow] = useState(0);

  // Time-based animation for pulsating effects
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeBasedGlow((prev) => (prev + 0.08) % 1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const glowIntensity = [
    `0 0 ${25 + 25 * Math.sin(timeBasedGlow * Math.PI)}px rgba(0, 212, 255, ${0.7 + 0.3 * Math.sin(timeBasedGlow * Math.PI)})`,
    `0 0 ${50 + 30 * Math.sin(timeBasedGlow * Math.PI)}px rgba(147, 51, 234, ${0.5 + 0.2 * Math.sin(timeBasedGlow * Math.PI)})`,
  ].join(', ');

  return (
    <motion.button
      onClick={toggleDevContainer}
      onMouseEnter={() => !isMobile && setIsDevContainerOpen(true)}
      onMouseLeave={() => !isMobile && !isDevContainerOpen && setIsDevContainerOpen(false)}
      variants={devButtonVariants}
      whileHover="hover"
      whileTap="tap"
      animate={{
        boxShadow: isDevContainerOpen
          ? [glowIntensity, `0 0 80px rgba(0, 212, 255, 0.9), 0 0 120px rgba(147, 51, 234, 0.6)`]
          : glowIntensity,
        scale: isDevContainerOpen ? 1.2 : 1,
        backgroundColor: isDevContainerOpen ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 212, 255, 0.4)',
        y: [0, -2, 0, 2, 0], // Subtle vibration effect
      }}
      transition={{
        boxShadow: { duration: 0.5, repeat: Infinity, repeatType: 'mirror' },
        scale: { duration: 0.3 },
        backgroundColor: { duration: 0.4 },
        y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`relative flex items-center justify-between text-xl font-extrabold ${
        isMobile ? 'w-full text-left py-4 px-5 rounded-xl' : 'px-8 py-3 rounded-full'
      } ${isDevContainerOpen ? 'text-white' : 'text-neonBlue'} ${
        isMobile ? 'bg-neonBlue/25 hover:bg-neonBlue/40' : 'bg-neonBlue/40 border-2 border-neonBlue/90'
      } transition-all duration-300 overflow-hidden group shadow-[0_0_20px_rgba(0,212,255,0.7)]`}
    >
      {/* Prismatic Gradient Overlay */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-neonBlue/60 via-purple-500/50 to-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          backgroundPosition: `${200 * timeBasedGlow}%`,
          animation: 'prismFlow 3s linear infinite',
        }}
      />

      {/* Lens Flare Effect */}
      <span
        className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${50 + 30 * Math.sin(timeBasedGlow * Math.PI)}% ${50 + 30 * Math.cos(timeBasedGlow * Math.PI)}%, rgba(255, 255, 255, 0.5), transparent 70%)`,
        }}
      />

      {/* Orbiting Sparkle Particles */}
      <span className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-b from-neonBlue to-purple-500 rounded-full"
            initial={{
              x: `${Math.cos((i * 45 * Math.PI) / 180) * 40}%`,
              y: `${Math.sin((i * 45 * Math.PI) / 180) * 40}%`,
              opacity: 0,
            }}
            animate={{
              x: `${Math.cos(((i * 45 + timeBasedGlow * 360) * Math.PI) / 180) * 40}%`,
              y: `${Math.sin(((i * 45 + timeBasedGlow * 360) * Math.PI) / 180) * 40}%`,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.8 + Math.random() * 0.7,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </span>

      {/* Starburst Effect */}
      <span className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full"
            initial={{
              x: '50%',
              y: '50%',
              opacity: 0,
            }}
            animate={{
              x: `${50 + Math.cos((i * 120 + timeBasedGlow * 360) * Math.PI / 180) * 60}%`,
              y: `${50 + Math.sin((i * 120 + timeBasedGlow * 360) * Math.PI / 180) * 60}%`,
              opacity: [0, 0.6, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </span>

      {/* Icon and Text */}
      <span className="flex items-center relative z-10">
        <motion.span
          animate={{ rotate: isDevContainerOpen ? 360 : 0, scale: isDevContainerOpen ? 1.3 : 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block mr-3"
        >
          <FaCode className="text-2xl" />
        </motion.span>
        <span className="tracking-wider">Dev Hub</span>
      </span>

      {/* Chevron for Mobile */}
      {isMobile && (
        <motion.span
          animate={{ rotate: isDevContainerOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronRight className="text-lg" />
        </motion.span>
      )}

      {/* Underline Glow Effect */}
      {isDevContainerOpen && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-neonBlue via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]"
        />
      )}
    </motion.button>
  );
};

// Editable notification messages (add or modify here)
const notificationMessages = [
  'GravityX coming soon',
  'Hackathon is coming in the catchy way',
  // Add more messages here as needed
];

// Function to create a new notification
const createNotification = (id, message) => ({
  id,
  message,
  timestamp: new Date().toLocaleTimeString(),
  read: false,
});

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDevContainerOpen, setIsDevContainerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user profile from localStorage
  useEffect(() => {
    const profileId = localStorage.getItem('userProfileId');
    const profileName = localStorage.getItem('userProfileName');
    if (profileId && profileName) {
      setUserProfile({ id: profileId, name: profileName });
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDevContainer = () => setIsDevContainerOpen(!isDevContainerOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const handleLogout = () => {
    localStorage.removeItem('userProfileId');
    localStorage.removeItem('userProfileName');
    setUserProfile(null);
    navigate('/login');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    console.log('All notifications marked as read');
  };

  // Add a specific notification by index from notificationMessages
  const addNotification = (index) => {
    const message = notificationMessages[index];
    if (message) {
      const newNotification = createNotification(notifications.length + 1, message);
      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // Keep latest 10 notifications
      console.log('Notification added:', newNotification);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const developerMenuSections = [
    {
      title: 'Career Development',
      icon: '🚀',
      items: [
        { name: 'Job Board', path: '/opportunities', icon: '💼' },
        { name: 'Internships', path: '/opportunities', icon: '👔' },
        { name: 'Bootcamps', path: '/opportunities', icon: '⚡' },
        { name: 'Hackathons', path: '/opportunities', icon: '👾' },
        { name: 'Mentorship', path: '/opportunities', icon: '🧙' },
        { name: 'Remote Work', path: '/opportunities', icon: '🌍' },
        { name: 'Roadmaps', path: '/roadmaps', icon: '🗺️' },
        { name: 'Certifications', path: '/certifications', icon: '🏅' }
      ]
    },
    {
      title: 'Learning Resources',
      icon: '📚',
      items: [
        { name: 'All Resources', path: '/resources', icon: '📂' },
        { name: 'Courses', path: '/resources', icon: '🎓' },
        { name: 'Notes', path: '/notes', icon: '📝' },
        { name: 'Tutorials', path: '/resources', icon: '📝' },
        { name: 'Documentation', path: '/resources', icon: '📖' },
        { name: 'Dev Tools', path: '/resources', icon: '🛠️' },
        { name: 'Dev Wellness', path: '/resources', icon: '🧠' },
        { name: 'Best Colleges', path: '/best-colleges', icon: '🏛️' }
      ]
    },
    {
      title: 'Productivity Tools',
      icon: '⚙️',
      items: [
        { name: 'Games', path: '/project-showcase', icon: '🎮' },
        { name: 'Resume Builder', path: '/resume-building', icon: '📄' },
        { name: 'All Tools', path: '/ai-tools-hub', icon: '🧰' },
        { name: 'Code Assistants', path: '/ai-tools-hub', icon: '🤖' },
        { name: 'Productivity', path: '/ai-tools-hub', icon: '⏱️' },
        { name: 'Dev Tools', path: '/resources', icon: '🔧' },
        { name: 'Libraries', path: '/libraries', icon: '📦' },
        { name: 'Valuable Repo', path: '/valuable-repo', icon: '💎' }
      ]
    },
    {
      title: 'Data & Trends',
      icon: '📊',
      items: [
        { name: 'Data & Analytics', path: '/ai-tools-hub', icon: '🔢' },
        { name: 'Industry Trends', path: '/industry-trends', icon: '📈' },
        { name: 'AI Career Guide', path: '/ai-career-guide', icon: '🧭' },
        { name: 'Research Papers', path: '/research-papers', icon: '📜' },
        { name: 'Useful APIs', path: '/useful-apis', icon: '🔌' },
        { name: 'Open Source', path: '/open-source', icon: '🌐' },
        { name: 'Design AI', path: '/ai-tools-hub', icon: '🎨' }
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
          {/* Enhanced Dev Hub Button - Desktop (Positioned before Home) */}
          {location.pathname.startsWith('/paradise') && (
            <div className="relative">
              <DevHubButton
                isDevContainerOpen={isDevContainerOpen}
                setIsDevContainerOpen={setIsDevContainerOpen}
                toggleDevContainer={toggleDevContainer}
              />
              
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
                          onClick={() => setIsDevContainerOpen(false)}
                        >
                          🔥 Trending
                        </NavLink>
                        <NavLink 
                          to="/paradise/new" 
                          className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-full hover:bg-green-500/20 transition-colors"
                          onClick={() => setIsDevContainerOpen(false)}
                        >
                          🆕 New
                        </NavLink>
                        <NavLink 
                          to="/paradise/ai-tools" 
                          className="px-3 py-1.5 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full hover:bg-purple-500/20 transition-colors"
                          onClick={() => setIsDevContainerOpen(false)}
                        >
                          🤖 AI Tools
                        </NavLink>
                        <NavLink 
                          to="/paradise/community" 
                          className="px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-full hover:bg-amber-500/20 transition-colors"
                          onClick={() => setIsDevContainerOpen(false)}
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

          {/* Notification Icon - Desktop (Rightmost) */}
          <div className="relative">
            <motion.button
              onClick={toggleNotification}
              variants={notificationButtonVariants}
              whileHover="hover"
              whileTap="tap"
              animate="pulse"
              className="relative flex items-center text-lg font-semibold text-neonBlue p-2 rounded-full bg-neonBlue/20 border-2 border-neonBlue/50 shadow-[0_0_15px_rgba(0,212,255,0.6)]"
            >
              <FaBell className="text-2xl" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-neonPurple text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-neonBlue/50"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {isNotificationOpen && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-14 right-0 w-96 max-h-[70vh] bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.5)] border-2 border-neonBlue/60 overflow-hidden z-50"
              >
                <div className="relative p-6 max-h-[calc(70vh-3rem)] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <motion.h3
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl font-bold text-neonBlue flex items-center"
                    >
                      <FaBell className="mr-3 text-2xl" /> Notifications
                    </motion.h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-gray-300 hover:text-neonBlue transition-colors p-2"
                    >
                      <FaTimes size={20} />
                    </motion.button>
                  </div>

                  <div className="flex flex-col space-y-3 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addNotification(0)}
                      className="py-3 px-4 text-sm font-medium text-white bg-neonBlue/20 rounded-lg hover:bg-neonBlue/30 transition-colors"
                    >
                      Add: GravityX Coming Soon
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addNotification(1)}
                      className="py-3 px-4 text-sm font-medium text-white bg-neonPurple/20 rounded-lg hover:bg-neonPurple/30 transition-colors"
                    >
                      Add: Hackathon is Coming
                    </motion.button>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-gray-300 text-sm font-medium">No notifications yet</p>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={markAllNotificationsRead}
                        className="w-full py-3 px-4 mb-4 text-sm font-medium text-neonBlue bg-neonBlue/10 rounded-lg hover:bg-neonBlue/20 transition-colors"
                      >
                        Mark All as Read
                      </motion.button>
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          variants={menuItemVariants}
                          className={`p-4 mb-3 rounded-lg ${notif.read ? 'bg-gray-800/50' : 'bg-neonBlue/20'} hover:bg-neonBlue/30 transition-all duration-200 border-l-4 ${notif.read ? 'border-gray-600' : 'border-neonPurple'}`}
                        >
                          <p className={`text-sm font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
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
          {/* Enhanced Dev Hub Button - Mobile (Positioned before Home) */}
          {location.pathname.startsWith('/paradise') && (
            <div>
              <DevHubButton
                isDevContainerOpen={isDevContainerOpen}
                setIsDevContainerOpen={setIsDevContainerOpen}
                toggleDevContainer={toggleDevContainer}
                isMobile={true}
              />
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

          {/* Notification Icon - Mobile */}
          <div className="relative">
            <motion.button
              onClick={toggleNotification}
              variants={notificationButtonVariants}
              whileHover="hover"
              whileTap="tap"
              animate="pulse"
              className="w-full text-left py-3 px-4 text-lg font-semibold text-neonBlue hover:bg-neonBlue/10 rounded-lg transition-colors duration-200 flex items-center"
            >
              <FaBell className="inline mr-2 text-xl" /> Notifications
              {unreadCount > 0 && (
                <span className="ml-2 w-6 h-6 bg-neonPurple text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-neonBlue/50">
                  {unreadCount}
                </span>
              )}
            </motion.button>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 ml-4 p-4 bg-gray-900/90 backdrop-blur-xl rounded-2xl border-2 border-neonBlue/60"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold text-neonPurple flex items-center">
                    <FaBell className="mr-2 text-xl" /> Notifications
                  </h3>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-gray-300 hover:text-neonBlue transition-colors p-2"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                <div className="flex flex-col space-y-3 mb-4">
                  <button
                    onClick={() => addNotification(0)}
                    className="py-3 px-4 text-sm font-medium text-white bg-neonBlue/20 rounded-lg hover:bg-neonBlue/30 transition-colors"
                  >
                    Add: GravityX Coming Soon
                  </button>
                  <button
                    onClick={() => addNotification(1)}
                    className="py-3 px-4 text-sm font-medium text-white bg-neonPurple/20 rounded-lg hover:bg-neonPurple/30 transition-colors"
                  >
                    Add: Hackathon is Coming
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-gray-300 text-sm font-medium">No notifications yet</p>
                ) : (
                  <>
                    <button
                      onClick={markAllNotificationsRead}
                      className="w-full py-3 px-4 mb-4 text-sm font-medium text-neonBlue bg-neonBlue/10 rounded-lg hover:bg-neonBlue/20 transition-colors"
                    >
                      Mark All as Read
                    </button>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 mb-3 rounded-lg ${notif.read ? 'bg-gray-800/50' : 'bg-neonBlue/20'} hover:bg-neonBlue/30 transition-all duration-200 border-l-4 ${notif.read ? 'border-gray-600' : 'border-neonPurple'}`}
                      >
                        <p className={`text-sm font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </div>

          <NavLink to="/" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-neonBlue' : 'text-gray-300'} hover:bg-neonBlue/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
            <FaHome className="inline mr-2" /> Home
          </NavLink>

          <NavLink to="/paradise" className={({ isActive }) => `block py-3 px-4 text-lg font-semibold ${isActive ? 'text-amber-400' : 'text-amber-300'} hover:bg-amber-400/10 rounded-lg transition-colors duration-200`} onClick={toggleMenu}>
            <FaUmbrellaBeach className="inline mr-2" /> Paradise
          </NavLink>

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

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes prismFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;