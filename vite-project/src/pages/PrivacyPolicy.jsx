import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation Variants for Back Button
const backButtonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      delay: 0.3,
    },
  },
  hover: {
    x: 5,
    scale: 1.05,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.9,
    backgroundColor: 'rgba(0, 212, 255, 0.4)',
  },
};

// Animation Variants for Sections
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

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

      {/* Back Button */}
      <motion.button
        variants={backButtonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate(-1) || navigate('/')}
        className="fixed top-30 left-6 z-20 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black/80 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-base md:text-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:text-purple-400 animate-[pulse_3s_infinite]"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-lg md:text-xl" /> Back
      </motion.button>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Safeguarding your data across the cosmic career network of GravityX
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 max-w-4xl mx-auto"
        >
          {/* Introduction */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to GravityX, your stellar platform for career opportunities across India. Your privacy is our priority as we empower your career journey. This Privacy Policy explains how we collect, use, share, and protect your data in our interstellar network.
            </p>
          </motion.section>

          {/* Data Collection */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Data We Collect</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email, professional details (e.g., resume, job preferences), and profile data provided during registration or opportunity applications.
              </li>
              <li>
                <strong>Usage Data:</strong> Interactions with our platform, such as searches, clicks, and opportunity views, to enhance your experience.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type, device type, and operating system to optimize performance and security.
              </li>
            </ul>
          </motion.section>

          {/* Data Usage */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. How We Use Your Data</h2>
            <p className="text-gray-300">
              We use your data to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Match you with relevant jobs, internships, hackathons, and mentorship programs.</li>
              <li>Improve platform features and personalize your career journey.</li>
              <li>Send updates, job alerts, or platform-related notifications.</li>
              <li>Maintain the security and integrity of our cosmic network.</li>
            </ul>
          </motion.section>

          {/* Data Sharing */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Data Sharing</h2>
            <p className="text-gray-300">
              We do not sell your data. We may share it with:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>
                <strong>Recruiters & Companies:</strong> Verified employers accessing your profile for job opportunities.
              </li>
              <li>
                <strong>Service Providers:</strong> Trusted partners (e.g., cloud hosting, analytics) that support GravityX’s operations.
              </li>
              <li>
                <strong>Legal Obligations:</strong> When required by law or to protect our platform’s rights.
              </li>
            </ul>
          </motion.section>

          {/* Cookies */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-300">
              We use cookies to navigate the stars, storing preferences and analyzing platform usage. Manage cookies via your browser settings to control your data orbit.
            </p>
          </motion.section>

          {/* User Rights */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of promotional emails or job alerts.</li>
              <li>Request data portability or restrict processing, where applicable.</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Contact us at{' '}
              <a
                href="mailto:contact.gravityx1@gmail.com"
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                contact.gravityx1@gmail.com
              </a>{' '}
              to exercise these rights.
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">7. Contact Us</h2>
            <p className="text-gray-300">
              Have questions? Our cosmic support team is here to assist:
            </p>
            <p className="text-gray-300 mt-2">
              Email:{' '}
              <a
                href="mailto:contact.gravityx1@gmail.com"
                className="text-cyan-400 hover:text-purple-400 transition-colors"
              >
                contact.gravityx1@gmail.com
              </a>
            </p>
          </motion.section>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="/opportunities"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
            Join the Cosmos
            </a>
          </motion.div>
        </motion.div>

        {/* Grainy Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0" />
      </div>
    </div>
  );
};

export default PrivacyPolicy;