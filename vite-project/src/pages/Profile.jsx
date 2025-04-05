import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEdit, FaCode, FaExternalLinkAlt, FaLock } from 'react-icons/fa';

const containerVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const projectVariants = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }), hover: { scale: 1.03, boxShadow: '0 0 25px rgba(0, 212, 255, 0.4)' } };
const inputVariants = { focus: { scale: 1.02, borderColor: '#00D4FF', transition: { duration: 0.2 } } };
const buttonVariants = { hover: { scale: 1.05, boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }, tap: { scale: 0.95 } };

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [credentials, setCredentials] = useState({ name: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    // Update the fetchProfile function in Profile.jsx
const fetchProfile = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await axios.get(`https://x-backend-1-zhox.onrender.com/api/profiles/${id}`, { headers });
    setProfileData(response.data);
    
    if (token) {
      try {
        const meResponse = await axios.get('https://x-backend-1-zhox.onrender.com/api/profiles/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsCurrentUser(meResponse.data.userId === id);
      } catch (meError) {
        console.log('Not logged in or token expired');
        setIsCurrentUser(false);
      }
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized (likely token expired)
      localStorage.removeItem('authToken');
      setProfileData({ 
        error: 'Please login again',
        ...(error.response?.data || {})
      });
    } else {
      setProfileData({ 
        error: 'Failed to load profile',
        details: error.message
      });
    }
  } finally {
    setLoading(false);
  }
};
    fetchProfile();
  }, [id]);

  const handleEditClick = () => {
    setShowAuthForm(true);
    setAuthError('');
    setCredentials({ name: '', password: '' });
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const response = await axios.post('https://x-backend-1-zhox.onrender.com/api/profiles/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userProfileId', response.data.profile._id);
      localStorage.setItem('userProfileName', response.data.profile.name);
      
      if (response.data.profile._id === id) {
        navigate(`/edit-profile/${id}`);
      } else {
        setAuthError('These credentials do not match this profile');
      }
    } catch (err) {
      console.error('Login Error:', err.response || err.message);
      setAuthError(err.response?.data?.error || 'Invalid name or password. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCancelAuth = () => {
    setShowAuthForm(false);
    setAuthError('');
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <Navbar />
      <div className="pt-20 pb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-cyan-400 tracking-wide">Loading Profile...</motion.div>
      </div>
    </div>
  );

  if (profileData?.error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <Navbar />
      <div className="pt-20 pb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 bg-red-900/30 p-6 rounded-lg shadow-lg text-center">{profileData.error}</motion.div>
      </div>
    </div>
  );

  const { name = 'Unnamed Profile', bio = 'No bio provided', location = 'Unknown Location', socialLinks = {}, projects = [], views = 0, imageUrl = 'https://via.placeholder.com/150' } = profileData || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-20 max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-xl p-8 shadow-[0_0_30px_rgba(0,212,255,0.2)] border border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.img
              src={imageUrl}
              alt={name}
              className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_20px_rgba(0,212,255,0.6)]"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex-1 text-center md:text-left">
              <motion.h1 variants={itemVariants} className="text-5xl font-extrabold text-cyan-400 mb-3 tracking-wider drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">{name}</motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-gray-300 flex items-center justify-center md:justify-start"><span className="mr-2 text-cyan-400">📍</span> {location}</motion.p>
              <motion.p variants={itemVariants} className="mt-4 text-gray-200 leading-relaxed max-w-lg">{bio}</motion.p>
              <motion.div variants={itemVariants} className="flex justify-center md:justify-start gap-6 mt-6">
                {socialLinks.github && (
                  <motion.a href={socialLinks.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#00D4FF' }} className="text-gray-300"><FaGithub size={28} /></motion.a>
                )}
                {socialLinks.linkedin && (
                  <motion.a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#00D4FF' }} className="text-gray-300"><FaLinkedin size={28} /></motion.a>
                )}
                {socialLinks.twitter && (
                  <motion.a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#00D4FF' }} className="text-gray-300"><FaTwitter size={28} /></motion.a>
                )}
                {socialLinks.instagram && (
                  <motion.a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#00D4FF' }} className="text-gray-300"><FaInstagram size={28} /></motion.a>
                )}
              </motion.div>
              <motion.p variants={itemVariants} className="text-sm text-gray-400 mt-3">Views: {views}</motion.p>
              
              {isCurrentUser && (
                <motion.button
                  onClick={handleEditClick}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-lg flex items-center gap-2 font-semibold"
                >
                  <FaEdit /> Edit Profile
                </motion.button>
              )}
            </div>
          </div>


          <motion.div variants={itemVariants} className="mt-12">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center"><FaCode className="mr-2" /> Projects</h2>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-gray-800/80 p-6 rounded-lg mb-6 border border-cyan-500/10 shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{project.title || 'Untitled'}</h3>
                    <FaCode className="text-cyan-400" />
                  </div>
                  <p className="text-gray-300 mt-2">{project.description || 'No description'}</p>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-purple-400 mt-2 inline-flex items-center gap-1 transition-colors">
                      <FaExternalLinkAlt /> View Project
                    </a>
                  )}
                  <pre className="bg-black/70 text-gray-200 p-4 rounded mt-4 text-sm overflow-x-auto font-mono border border-cyan-500/20">{project.codeSnippet || 'No code provided'}</pre>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">No projects available</p>
            )}
          </motion.div>
          {showAuthForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-xl w-full max-w-md border border-neonBlue/20 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                <h2 className="text-2xl text-neonBlue font-semibold mb-6 text-center">Authenticate to Edit</h2>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={credentials.name}
                    onChange={handleCredentialChange}
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                  <motion.input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleCredentialChange}
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      disabled={authLoading}
                      className="flex-1 shine-button text-white p-4 rounded-lg flex items-center justify-center text-lg font-semibold disabled:opacity-50"
                      variants={buttonVariants}
                      whileHover={!authLoading ? "hover" : {}}
                      whileTap={!authLoading ? "tap" : {}}
                    >
                      {authLoading ? 'Authenticating...' : <><FaLock className="mr-2" /> Authenticate</>}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleCancelAuth}
                      className="flex-1 bg-gray-700 text-white p-4 rounded-lg flex items-center justify-center text-lg font-semibold"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-red-500/20 rounded-lg text-center border border-red-500/30"
                  >
                    <p className="text-red-300">{authError}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
      </div>
    </div>
  );
}

export default Profile;