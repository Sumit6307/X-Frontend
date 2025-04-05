// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaHome, FaBars, FaTimes, FaUser, FaEdit, FaSignOutAlt, FaSignInAlt, FaUmbrellaBeach } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation variants
const logoVariants = { hover: { scale: 1.1, textShadow: '0 0 15px rgba(0, 212, 255, 0.8)', transition: { duration: 0.3 } } };
const navItemVariants = { hover: { scale: 1.05, color: '#00D4FF', transition: { duration: 0.2 } } };

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profileId = localStorage.getItem('userProfileId');
    const profileName = localStorage.getItem('userProfileName');
    if (profileId && profileName) {
      setUserProfile({ id: profileId, name: profileName });
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('userProfileId');
    localStorage.removeItem('userProfileName');
    setUserProfile(null);
    navigate('/login');
  };

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
          
          {/* Paradise Link - Added right after Home */}
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
          
          {/* Paradise Link - Mobile Version */}
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
    </motion.nav>
  );
}

export default Navbar;