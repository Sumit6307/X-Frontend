// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const inputVariants = { focus: { scale: 1.02, borderColor: '#00D4FF', transition: { duration: 0.2 } } };
const buttonVariants = { hover: { scale: 1.05, boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }, tap: { scale: 0.95 } };

function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://x-backend-1-zhox.onrender.com/api/profiles/login', {
        name: formData.name,
        password: formData.password,
      });
      // Store JWT token instead of editToken
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('userProfileId', res.data.profile._id);
      localStorage.setItem('userProfileName', res.data.profile.name);
      navigate(`/profile/${res.data.profile._id}`);
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.error || 'Invalid name or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden relative">
      <Navbar />
      <div className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-6"
        >
          <h1 className="text-5xl neon-heading mb-10 text-center tracking-wide">Login to GravityX</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/80 backdrop-blur-md p-8 rounded-xl max-w-md mx-auto border border-neonBlue/20 shadow-[0_0_20px_rgba(0,212,255,0.1)] space-y-6"
          >
            <div>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
                required
              />
            </div>
            <div>
              <motion.input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                whileFocus="focus"
                variants={inputVariants}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full shine-button text-white p-4 rounded-lg flex items-center justify-center text-lg font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaSignInAlt className="mr-2" /> Login
            </motion.button>
          </form>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-red-500/20 rounded-xl text-center border border-red-500/30"
            >
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Login;