import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowLeft, FaRocket, FaStar } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useNavigate } from 'react-router-dom';

// Animation Variants
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

const cardHoverVariants = {
  hover: {
    y: -10,
    boxShadow: '0 15px 30px rgba(0, 212, 255, 0.3)',
    borderColor: 'rgba(147, 51, 234, 0.8)',
  }
};

const Certifications = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Real certification data with direct links
  const certifications = [
    {
      id: 1,
      title: "Google Data Analytics Professional Certificate",
      provider: "Google (via Coursera)",
      description: "Learn data cleaning, analysis, and visualization using tools like spreadsheets, SQL, R, and Tableau.",
      duration: "6 months (10 hrs/week)",
      level: "Beginner",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics",
      price: "Free trial, then $49/month",
      free: false,
      skills: ["SQL", "Tableau", "Data Cleaning", "R Programming"],
      platform: "Coursera",
      popularity: 95
    },
    {
      id: 2,
      title: "IBM Data Science Professional Certificate",
      provider: "IBM (via Coursera)",
      description: "Master data science and machine learning using Python, SQL, and data visualization tools.",
      duration: "3-6 months",
      level: "Beginner",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science",
      price: "Free trial, then $49/month",
      free: false,
      skills: ["Python", "Jupyter", "Machine Learning", "Data Analysis"],
      platform: "Coursera",
      popularity: 88
    },
    {
      id: 3,
      title: "Microsoft Certified: Azure AI Fundamentals",
      provider: "Microsoft",
      description: "Validate foundational knowledge of machine learning and AI concepts on Microsoft Azure.",
      duration: "Self-paced",
      level: "Beginner",
      url: "https://learn.microsoft.com/en-us/certifications/azure-ai-fundamentals/",
      price: "$99 exam fee",
      free: false,
      skills: ["Azure AI", "Machine Learning", "Cognitive Services"],
      platform: "Microsoft Learn",
      popularity: 82
    },
    {
      id: 4,
      title: "Deep Learning Specialization",
      provider: "DeepLearning.AI (via Coursera)",
      description: "Master deep learning concepts from Andrew Ng, including CNNs, RNNs, and Transformers.",
      duration: "5 months (5 hrs/week)",
      level: "Intermediate",
      url: "https://www.coursera.org/specializations/deep-learning",
      price: "Free trial, then $49/month",
      free: false,
      skills: ["Neural Networks", "TensorFlow", "Computer Vision", "NLP"],
      platform: "Coursera",
      popularity: 92
    },
    {
      id: 5,
      title: "CS50's Introduction to AI with Python",
      provider: "Harvard University",
      description: "Harvard's free introductory course covering search algorithms, machine learning, and more.",
      duration: "10 weeks",
      level: "Beginner",
      url: "https://cs50.ai/",
      price: "Free",
      free: true,
      skills: ["Python", "AI Fundamentals", "Machine Learning"],
      platform: "Harvard Online",
      popularity: 85
    },
    {
      id: 6,
      title: "AWS Certified Machine Learning - Specialty",
      provider: "Amazon Web Services",
      description: "Validate expertise in building, training, and deploying ML models on AWS.",
      duration: "Self-paced",
      level: "Advanced",
      url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
      price: "$300 exam fee",
      free: false,
      skills: ["AWS SageMaker", "ML Algorithms", "Model Deployment"],
      platform: "AWS Training",
      popularity: 78
    },
    {
      id: 7,
      title: "TensorFlow Developer Certificate",
      provider: "Google",
      description: "Official certification for building and training models using TensorFlow.",
      duration: "3-6 months",
      level: "Intermediate",
      url: "https://www.tensorflow.org/certificate",
      price: "$100 exam fee",
      free: false,
      skills: ["TensorFlow", "Neural Networks", "Model Building"],
      platform: "TensorFlow",
      popularity: 87
    },
    {
      id: 8,
      title: "AI For Everyone",
      provider: "DeepLearning.AI (via Coursera)",
      description: "Non-technical course explaining AI concepts for business professionals.",
      duration: "4 weeks",
      level: "Beginner",
      url: "https://www.coursera.org/learn/ai-for-everyone",
      price: "Free (audit option)",
      free: true,
      skills: ["AI Concepts", "Business Applications", "Ethics"],
      platform: "Coursera",
      popularity: 76
    }
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'free' && cert.free) || 
                         (filter === 'paid' && !cert.free);
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Generate star ratings
  const renderStars = (popularity) => {
    const stars = [];
    const starCount = Math.floor(popularity / 20);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`${i < starCount ? 'text-yellow-400' : 'text-gray-600'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles-cert"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 60, density: { enable: true, value_area: 800 } },
              color: { value: '#00d4ff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
              size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
              line_linked: { enable: true, distance: 150, color: '#9333ea', opacity: 0.4, width: 1 },
              move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out' },
            },
            interactivity: {
              detect_on: 'canvas',
              events: { 
                onhover: { enable: true, mode: 'grab' }, 
                onclick: { enable: true, mode: 'push' }, 
                resize: true 
              },
              modes: { 
                grab: { distance: 140, line_linked: { opacity: 1 } }, 
                push: { particles_nb: 4 } 
              },
            },
            retina_detect: true,
          }}
        />
      </div>

      {/* Floating Stars Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
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
      >
        <FaArrowLeft className="text-lg md:text-xl" /> Back
      </motion.button>

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
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
            Cosmic Certifications
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Launch your AI career with stellar certifications from across the universe
          </motion.p>
          <motion.div 
            className="mt-10" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
          >
            <a
              href="#certifications-grid"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaRocket className="mr-2" /> Explore Certifications
            </a>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button 
              onClick={() => setFilter('all')}
              className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Certifications
            </motion.button>
            <motion.button 
              onClick={() => setFilter('free')}
              className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all ${
                filter === 'free' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Free Only
            </motion.button>
            <motion.button 
              onClick={() => setFilter('paid')}
              className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all ${
                filter === 'paid' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Premium Certifications
            </motion.button>
          </div>
          <motion.div 
            className="w-full md:w-64"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="text"
              placeholder="Search certifications..."
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          id="certifications-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                    hoveredCard === cert.id ? 'border-cyan-400 shadow-xl shadow-cyan-500/20' : 'border-gray-700'
                  }`}
                  onMouseEnter={() => setHoveredCard(cert.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  variants={cardHoverVariants}
                  whileHover="hover"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                        <p className="text-sm text-cyan-400 mt-1">{cert.provider}</p>
                      </div>
                      {cert.free ? (
                        <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs font-bold rounded-full border border-green-400/50">
                          FREE
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-purple-900/50 text-purple-400 text-xs font-bold rounded-full border border-purple-400/50">
                          PREMIUM
                        </span>
                      )}
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(cert.popularity)}
                      </div>
                      <span className="text-xs text-gray-400">{cert.popularity}% recommended</span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{cert.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-400 mb-2">SKILLS COVERED:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                          <motion.span 
                            key={index} 
                            className="bg-gray-700 text-cyan-300 text-xs px-3 py-1 rounded-full border border-gray-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div>
                        <p className="text-gray-400">Duration</p>
                        <p className="text-white">{cert.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Level</p>
                        <p className="text-white">{cert.level}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Platform</p>
                        <p className="text-white">{cert.platform}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Price</p>
                        <p className={`font-medium ${cert.free ? 'text-green-400' : 'text-purple-400'}`}>
                          {cert.price}
                        </p>
                      </div>
                    </div>

                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg"
                      >
                        View on {cert.platform}
                        <FaExternalLinkAlt className="text-xs" />
                      </motion.button>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-lg">No certifications found matching your criteria</p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 md:p-12 border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to launch your AI career?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              These certifications have helped thousands of developers land jobs at top tech companies
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.coursera.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
                >
                  Explore More Certifications
                </motion.button>
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                Back to Top
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;