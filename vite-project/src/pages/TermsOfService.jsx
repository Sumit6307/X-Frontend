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

const TermsOfService = () => {
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
            Terms of Service
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Navigating the cosmic rules of GravityX’s career network
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 max-w-4xl mx-auto"
        >
          {/* Acceptance of Terms */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              Welcome to GravityX, your stellar platform for career opportunities across India. By accessing or using our platform, you agree to be bound by these Terms of Service (“Terms”). If you do not agree, please do not use GravityX.
            </p>
          </motion.section>

          {/* Use of Platform */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Use of Platform</h2>
            <p className="text-gray-300">
              GravityX provides access to job listings, internships, hackathons, and mentorship programs. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Use the platform for lawful purposes only.</li>
              <li>Provide accurate and up-to-date information in your profile and applications.</li>
              <li>Not engage in spamming, harassment, or unauthorized data scraping.</li>
            </ul>
          </motion.section>

          {/* User Responsibilities */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-300">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>Ensuring all content you submit (e.g., resumes, messages) is accurate and appropriate.</li>
              <li>Notifying us of any unauthorized use of your account.</li>
            </ul>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-300">
              All content on GravityX, including logos, designs, and text, is owned by GravityX or its licensors. You may not reproduce, distribute, or create derivative works without our permission, except for personal use in job applications.
            </p>
          </motion.section>

          {/* Termination */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Termination</h2>
            <p className="text-gray-300">
              We may suspend or terminate your account if you violate these Terms, engage in prohibited activities, or for any reason at our discretion. You may also delete your account at any time.
            </p>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-300">
              GravityX is provided “as is” without warranties. We are not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Inaccuracies in job listings or third-party content.</li>
              <li>Losses arising from your use of the platform.</li>
              <li>Service interruptions due to technical issues.</li>
            </ul>
          </motion.section>

          {/* Governing Law */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">7. Governing Law</h2>
            <p className="text-gray-300">
              These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Tech Nebula, India.
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section variants={sectionVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">8. Contact Us</h2>
            <p className="text-gray-300">
              For questions about these Terms, reach our cosmic support team:
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

export default TermsOfService;