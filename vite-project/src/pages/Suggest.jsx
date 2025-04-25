import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import { FaStar, FaLightbulb, FaArrowLeft } from 'react-icons/fa';

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

function Suggest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formType, setFormType] = useState('idea');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'Idea',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS with public key
  useEffect(() => {
    const publicKey = 'ycJ3Ch2jE3bY5a176'; // Your EmailJS Public Key
    emailjs.init(publicKey);
  }, []);

  // Determine form type from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type')?.toLowerCase();
    if (type === 'roast') {
      setFormType('roast');
      setFormData((prev) => ({ ...prev, type: 'Roast' }));
    } else {
      setFormType('idea');
      setFormData((prev) => ({ ...prev, type: 'Idea' }));
    }
  }, [location.search]);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = `${formType === 'idea' ? 'Idea' : 'Roast'} is required`;
    } else if (formData.message.length < 10) {
      newErrors.message = `${formType === 'idea' ? 'Idea' : 'Roast'} must be at least 10 characters`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus('Sending...');

    // EmailJS configuration
    const serviceID = 'service_43ksxbn'; // Your EmailJS Service ID
    const templateID = 'template_peyu8cm'; // Your EmailJS Template ID

    emailjs.send(serviceID, templateID, formData)
      .then((response) => {
        console.log('EmailJS success:', response.status, response.text);
        setStatus('Submission sent successfully! Thanks for your cosmic contribution!');
        setFormData({ name: '', email: '', message: '', type: formType === 'idea' ? 'Idea' : 'Roast' });
        setErrors({});
        setTimeout(() => setStatus(''), 5000);
      })
      .catch((error) => {
        console.error('EmailJS error details:', error);
        setStatus(
          `Failed to send submission (Error: ${error.text || 'Unknown'}). Please try again or email us at support@gravityx.com.`
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Toggle between idea and roast
  const toggleFormType = (type) => {
    setFormType(type);
    setFormData((prev) => ({ ...prev, type: type === 'idea' ? 'Idea' : 'Roast' }));
    navigate(`/suggest?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      {/* Back Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.3 } }}
        whileHover={{ x: 5, scale: 1.05, boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="fixed top-30 left-6 z-20 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black/80 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-base md:text-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:text-purple-400 animate-[pulse_3s_infinite]"
      >
        <FaArrowLeft className="text-lg md:text-xl" /> Back
      </motion.button>

      <div className="pt-24 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.3)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />

        {/* Form Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-10 drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
            {formType === 'idea' ? 'Suggest a Cosmic Idea' : 'Roast Us to Perfection'}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8">
            {formType === 'idea'
              ? 'Share your wildest ideas to redefine tech and fuel GravityX’s future.'
              : 'Give us your spiciest feedback to help us grow stronger.'}
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              onClick={() => toggleFormType('idea')}
              className={`px-6 py-3 rounded-full font-semibold text-lg ${
                formType === 'idea'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Suggest Idea
            </motion.button>
            <motion.button
              onClick={() => toggleFormType('roast')}
              className={`px-6 py-3 rounded-full font-semibold text-lg ${
                formType === 'roast'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Roast Us
            </motion.button>
          </div>

          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="max-w-2xl mx-auto bg-black/90 p-8 rounded-2xl border border-cyan-500/40 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent animate-[gradient_5s_ease_infinite]" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                {formType === 'idea' ? (
                  <FaStar className="text-5xl text-cyan-400 animate-[pulse_2s_infinite]" />
                ) : (
                  <FaLightbulb className="text-5xl text-red-400 animate-[pulse_2s_infinite]" />
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-cyan-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-gray-900/50 border ${
                      errors.name ? 'border-red-500' : 'border-cyan-500/50'
                    } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-cyan-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-gray-900/50 border ${
                      errors.email ? 'border-red-500' : 'border-cyan-500/50'
                    } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    placeholder="Your Email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-cyan-300 mb-2">
                    {formType === 'idea' ? 'Your Idea' : 'Your Roast'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2 bg-gray-900/50 border ${
                      errors.message ? 'border-red-500' : 'border-cyan-500/50'
                    } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    placeholder={formType === 'idea' ? 'Describe your stellar idea...' : 'Drop your spiciest roast...'}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-full font-bold text-xl ${
                    formType === 'idea'
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : 'bg-red-500 text-white hover:bg-red-400'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} shadow-[0_0_20px_rgba(0,212,255,0.5)]`}
                >
                  {isSubmitting ? 'Submitting...' : formType === 'idea' ? 'Submit Idea' : 'Submit Roast'}
                </motion.button>
              </div>
              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 text-lg ${status.includes('success') ? 'text-cyan-400' : 'text-red-400'}`}
                >
                  {status}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Footer Effect */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />
      </div>
    </div>
  );
}

export default Suggest;