import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaRocket, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Animation variants for footer elements
const linkVariants = {
  hover: {
    scale: 1.1,
    color: '#00D4FF',
    transition: { duration: 0.2 },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    color: '#D81BFF',
    transition: { duration: 0.3 },
  },
};

const backToTopVariants = {
  hover: {
    y: -5,
    boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
    transition: { duration: 0.2 },
  },
};

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-black py-12 text-gray-400 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/10 via-neonPurple/10 to-transparent opacity-50 -z-10" />

      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-extrabold text-neonBlue mb-4 tracking-wide">
              GravityX
            </h3>
            <p className="text-sm text-gray-300">
              Built for Developers, by Developers. Connecting the global dev community since 2025.
            </p>
            <motion.div
              className="flex justify-center md:justify-start space-x-6 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaGithub className="text-gray-400" size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaTwitter className="text-gray-400" size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaLinkedin className="text-gray-400" size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-semibold text-neonPurple mb-4">Explore</h4>
            <motion.a
              href="#"
              className="text-gray-300 mb-2"
              variants={linkVariants}
              whileHover="hover"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-300 mb-2"
              variants={linkVariants}
              whileHover="hover"
            >
              Terms of Service
            </motion.a>
            <Link
              to="/add-profile"
              className="text-gray-300"
              variants={linkVariants}
              whileHover="hover"
            >
              Add Your Profile
            </Link>
          </motion.div>

          {/* Contact/Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-semibold text-neonPurple mb-4">Get in Touch</h4>
            <p className="text-sm text-gray-300 mb-2">support@gravityx.dev</p>
            <motion.a
              href="mailto:support@gravityx.dev"
              className="shine-button inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="mr-2" /> Contact Us
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GravityX. All Rights Reserved.</p>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          variants={backToTopVariants}
          whileHover="hover"
          className="absolute bottom-6 right-6 bg-neonBlue/20 text-neonBlue p-3 rounded-full hover:bg-neonBlue/40 transition-all duration-300"
        >
          <FaArrowUp size={20} />
        </motion.button>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue/50 via-neonPurple/50 to-transparent" />
    </footer>
  );
}

export default Footer;