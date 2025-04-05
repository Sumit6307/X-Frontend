import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEdit, FaCode, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

// Animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projectVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
  hover: { scale: 1.03, boxShadow: '0 0 25px rgba(0, 212, 255, 0.5)' },
};

function ProfileModal({ id, onClose }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log(`Fetching profile for ID: ${id}`); // Debug: Log ID
        const response = await axios.get(`https://x-backend-1-zhox.onrender.com/api/profiles/${id}`);
        console.log('API Response:', response.data); // Debug: Log response
        setProfileData(response.data);
      } catch (error) {
        console.error('Fetch Error:', error.message); // Debug: Log error
        setProfileData({ error: 'Failed to load profile' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    console.log('Modal is in loading state'); // Debug: Confirm loading
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-cyan-400 tracking-wide"
      >
        Loading Profile...
      </motion.div>
    );
  }

  if (profileData?.error) {
    console.log('Modal error state:', profileData.error); // Debug: Confirm error
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 bg-red-900/30 p-6 rounded-lg shadow-lg text-center"
      >
        {profileData.error}
      </motion.div>
    );
  }

  if (!profileData) {
    console.log('No profile data available'); // Debug: Catch null data
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 bg-red-900/30 p-6 rounded-lg shadow-lg text-center"
      >
        No profile data found
      </motion.div>
    );
  }

  const {
    name = 'Unnamed Profile',
    bio = 'No bio provided',
    location = 'Unknown Location',
    socialLinks = {},
    projects = [],
    views = 0,
    imageUrl = 'https://via.placeholder.com/150',
    skills = [],
  } = profileData;

  console.log('Rendering profile for:', name); // Debug: Confirm render

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Blurred Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl -z-10"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gray-900/90 backdrop-blur-md rounded-xl p-8 w-full max-w-4xl shadow-[0_0_50px_rgba(0,212,255,0.4)] border border-cyan-500/40 max-h-[90vh] overflow-y-auto transform-gpu">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 text-cyan-400 hover:text-purple-400"
        >
          <FaTimes size={30} />
        </motion.button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <motion.img
            src={imageUrl}
            alt={name}
            className="w-60 h-60 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_30px_rgba(0,212,255,0.8)]"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-6xl font-extrabold text-cyan-400 mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]"
            >
              {name}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 flex items-center justify-center md:justify-start"
            >
              <FaMapMarkerAlt className="mr-2 text-cyan-400" size={20} /> {location}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="mt-5 text-gray-200 leading-relaxed max-w-lg text-lg"
            >
              {bio}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-start gap-8 mt-6"
            >
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: '#00D4FF' }}
                  className="text-gray-300"
                >
                  <FaGithub size={34} />
                </motion.a>
              )}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: '#00D4FF' }}
                  className="text-gray-300"
                >
                  <FaLinkedin size={34} />
                </motion.a>
              )}
              {socialLinks.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: '#00D4FF' }}
                  className="text-gray-300"
                >
                  <FaTwitter size={34} />
                </motion.a>
              )}
              {socialLinks.instagram && (
                <motion.a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: '#00D4FF' }}
                  className="text-gray-300"
                >
                  <FaInstagram size={34} />
                </motion.a>
              )}
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-sm text-gray-400 mt-4"
            >
              Views: {views}
            </motion.p>
            <motion.button
              onClick={() => {
                const editToken = localStorage.getItem(`editToken_${id}`);
                if (!editToken) {
                  const token = prompt('Enter your edit token:');
                  if (token) {
                    localStorage.setItem(`editToken_${id}`, token);
                    window.location.href = `/edit-profile/${id}`;
                  }
                } else {
                  window.location.href = `/edit-profile/${id}`;
                }
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 212, 255, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-8 rounded-lg flex items-center gap-2 font-semibold text-lg"
            >
              <FaEdit /> Edit Profile
            </motion.button>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <h2 className="text-4xl font-bold text-cyan-400 mb-6 flex items-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            <FaCode className="mr-3" /> Skills
          </h2>
          <div className="flex flex-wrap gap-4">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 212, 255, 0.6)' }}
                  className="bg-cyan-500/20 text-cyan-300 px-5 py-3 rounded-full text-lg font-medium border border-cyan-400/40"
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-400 text-lg">No skills listed</p>
            )}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <h2 className="text-4xl font-bold text-cyan-400 mb-6 flex items-center drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            <FaCode className="mr-3" /> Projects
          </h2>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-800/80 p-6 rounded-lg mb-8 border border-cyan-500/10 shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">{project.title || 'Untitled'}</h3>
                  <FaCode className="text-cyan-400" size={24} />
                </div>
                <p className="text-gray-300 mt-3 text-lg">{project.description || 'No description'}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-purple-400 mt-3 inline-flex items-center gap-2 transition-colors text-lg"
                  >
                    <FaExternalLinkAlt /> View Project
                  </a>
                )}
                <pre className="bg-black/70 text-gray-200 p-5 rounded-lg mt-4 text-sm overflow-x-auto font-mono border border-cyan-500/20 shadow-inner">
                  {project.codeSnippet || 'No code provided'}
                </pre>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-lg">No projects available</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProfileModal;