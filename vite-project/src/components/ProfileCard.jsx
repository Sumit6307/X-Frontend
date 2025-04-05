// src/components/ProfileCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaCode, FaShareAlt, FaWhatsapp, FaFacebook, FaLink, FaEdit } from 'react-icons/fa';

// Animation variants for skills
const skillVariants = {
  animate: {
    x: ['100%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 12,
        ease: 'linear',
      },
    },
  },
};

// Card hover animation
const cardVariants = {
  hover: {
    scale: 1.03,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.5)',
    transition: { duration: 0.3 },
  },
};

// Button animation
const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)', transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

// Share menu animation
const shareMenuVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
};

function ProfileCard({ profile, onOpenProfile, layout = 'grid' }) {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Fetch logged-in user's ID
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get('https://x-backend-1-zhox.onrender.com/api/profiles/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setLoggedInUserId(res.data.userId))
        .catch((err) => console.error('Fetch User Error:', err));
    }
  }, []);

  // Generate profile URL
  const profileUrl = `${window.location.origin}/profile/${profile._id}`;
  const shareText = `Check out ${profile.name}'s profile on GravityX!`;

  // Handle native Web Share API
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${profile.name}'s GravityX Profile`,
          text: shareText,
          url: profileUrl,
        })
        .then(() => setIsShareMenuOpen(false))
        .catch((err) => console.error('Share failed:', err));
    } else {
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  // Custom share options
  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`,
      color: '#25D366',
    },
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      color: '#1877F2',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`,
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      color: '#0A66C2',
    },
    {
      name: 'Copy Link',
      icon: <FaLink />,
      action: () => {
        navigator.clipboard
          .writeText(profileUrl)
          .then(() => {
            setIsShareMenuOpen(false);
            alert('Profile URL copied to clipboard!');
          })
          .catch((err) => console.error('Failed to copy:', err));
      },
      color: '#00D4FF',
    },
  ];

  // Layout specific styles
  const getCardClasses = () => {
    switch (layout) {
      case 'grid':
        return 'relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 w-full overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300';
      case 'masonry':
        return 'relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 w-full overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300 h-full';
      case 'list':
        return 'relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 w-full overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300';
      default:
        return 'relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 w-full overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300';
    }
  };

  const getImageClasses = () => {
    switch (layout) {
      case 'list':
        return 'w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.5)]';
      default:
        return 'w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.5)]';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={layout !== 'list' ? "hover" : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={getCardClasses()}
    >
      {/* Profile Header - Different structure for list view */}
      {layout === 'list' ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={profile.imageUrl || 'https://via.placeholder.com/150'}
              alt={profile.name}
              className={getImageClasses()}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg -z-10 animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Link
                  to={`/profile/${profile._id}`}
                  className="text-2xl font-extrabold text-white hover:text-cyan-400 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
                >
                  {profile.name}
                </Link>
                <p className="text-sm text-gray-300 flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2 text-cyan-400" size={16} />
                  {profile.location || 'Global Dev'}
                </p>
              </div>

              {/* Share Button and Views Badge */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleNativeShare}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-cyan-500/20 text-cyan-300 p-2 rounded-full border border-cyan-400/30"
                  title="Share Profile"
                >
                  <FaShareAlt size={14} />
                </motion.button>
                <div className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/30">
                  {profile.views} Views
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-2 italic line-clamp-2 leading-relaxed">
              {profile.bio || 'No bio provided'}
            </p>

            {/* Skills Section for List View */}
            <div className="mt-4 relative overflow-hidden">
              <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                <FaCode className="mr-2" size={12} /> Skills
              </h3>
              <div className="relative bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.2)] overflow-hidden">
                <motion.div
                  className="flex space-x-3 whitespace-nowrap"
                  variants={skillVariants}
                  animate="animate"
                >
                  {profile.skills.length > 0 ? (
                    <>
                      {profile.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                          className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30"
                        >
                          {skill}
                        </motion.span>
                      ))}
                      {profile.skills.map((skill, idx) => (
                        <motion.span
                          key={`duplicate-${idx}`}
                          whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                          className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium border border-cyan-400/30"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">No skills listed</span>
                  )}
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-800/80 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-800/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Default layout for grid and masonry */}
          <div className="flex items-start space-x-5">
            <div className="relative">
              <img
                src={profile.imageUrl || 'https://via.placeholder.com/150'}
                alt={profile.name}
                className={getImageClasses()}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg -z-10 animate-pulse" />
            </div>
            <div className="flex-1">
              <Link
                to={`/profile/${profile._id}`}
                className="text-3xl font-extrabold text-white hover:text-cyan-400 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
              >
                {profile.name}
              </Link>
              <p className="text-sm text-gray-300 flex items-center mt-2">
                <FaMapMarkerAlt className="mr-2 text-cyan-400" size={16} />
                {profile.location || 'Global Dev'}
              </p>
              <p className="text-sm text-gray-400 mt-2 italic line-clamp-2 leading-relaxed">
                {profile.bio || 'No bio provided'}
              </p>
            </div>
          </div>

          {/* Animated Skills Box */}
          <div className="mt-6 relative">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center drop-shadow-[0_0_6px_rgba(0,212,255,0.3)]">
              <FaCode className="mr-2" /> Skills
            </h3>
            <div className="relative bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.2)] overflow-hidden">
              <motion.div
                className="flex space-x-4 whitespace-nowrap"
                variants={skillVariants}
                animate="animate"
              >
                {profile.skills.length > 0 ? (
                  <>
                    {profile.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                        className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                    {profile.skills.map((skill, idx) => (
                      <motion.span
                        key={`duplicate-${idx}`}
                        whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
                        className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">No skills listed</span>
                )}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-800/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-800/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </>
      )}

      {/* Social Links */}
      <div className={`${layout === 'list' ? 'mt-6' : 'mt-6'} flex justify-center space-x-6`}>
        {profile.socialLinks.github && (
          <motion.a
            href={profile.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02-.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.a>
        )}
        {profile.socialLinks.linkedin && (
          <motion.a
            href={profile.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaLinkedin className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
        {profile.socialLinks.twitter && (
          <motion.a
            href={profile.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaTwitter className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
        {profile.socialLinks.instagram && (
          <motion.a
            href={profile.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#00D4FF' }}
          >
            <FaInstagram className="w-7 h-7 text-gray-400" />
          </motion.a>
        )}
      </div>

      {/* Edit Button and Connect Button */}
      <div className={`${layout === 'list' ? 'mt-6 flex flex-col md:flex-row gap-4' : 'mt-6 flex flex-col space-y-4'}`}>
        {loggedInUserId === profile._id && (
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`${layout === 'list' ? 'md:flex-1' : 'w-full text-center'}`}
          >
            <Link
              to={`/edit-profile/${profile._id}`}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold text-lg inline-flex items-center justify-center w-full"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </Link>
          </motion.div>
        )}
        <motion.a
          href={profile.socialLinks.linkedin || '#'}
          target="_blank"
          rel="noopener noreferrer"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`${layout === 'list' ? 'md:flex-1' : 'w-full'} bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold text-lg text-center block`}
        >
          Connect
        </motion.a>
      </div>

      {/* Custom Share Menu */}
      {isShareMenuOpen && (
        <motion.div
          variants={shareMenuVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-12 right-4 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.3)] z-10"
        >
          {shareOptions.map((option, idx) => (
            <motion.a
              key={idx}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={option.action ? (e) => { e.preventDefault(); option.action(); } : undefined}
              className="flex items-center space-x-2 text-white py-2 px-3 rounded-md hover:bg-cyan-500/20"
              whileHover={{ scale: 1.05, backgroundColor: `${option.color}20` }}
            >
              <span style={{ color: option.color }}>{option.icon}</span>
              <span>{option.name}</span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ProfileCard;