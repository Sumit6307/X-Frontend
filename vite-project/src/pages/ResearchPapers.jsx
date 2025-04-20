import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaDownload, FaMicrophone, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation Variants
const backButtonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.3 },
  },
  hover: {
    x: 5,
    scale: 1.05,
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.9, backgroundColor: 'rgba(0, 212, 255, 0.4)' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
  hover: {
    scale: 1.03,
    borderColor: 'rgba(0, 212, 255, 1)',
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
    transition: { duration: 0.3 },
  },
};

const paperCategories = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    icon: '🧠',
    papers: [
      {
        id: 'ai1',
        title: 'Attention Is All You Need',
        authors: 'Vaswani et al.',
        year: 2017,
        citations: '120k',
        abstract: 'Introduced the Transformer model, revolutionizing NLP with self-attention mechanisms.',
        link: 'https://arxiv.org/abs/1706.03762',
        thumbnail: 'https://via.placeholder.com/100x140?text=AI',
        tags: ['NLP', 'Transformers'],
      },
      {
        id: 'ai2',
        title: 'Deep Residual Learning for Image Recognition',
        authors: 'He et al.',
        year: 2015,
        citations: '90k',
        abstract: 'Introduced ResNet, enabling deeper neural networks for computer vision tasks.',
        link: 'https://arxiv.org/abs/1512.03385',
        thumbnail: 'https://via.placeholder.com/100x140?text=ResNet',
        tags: ['Computer Vision', 'ResNet'],
      },
      {
        id: 'ai3',
        title: 'Generative Adversarial Nets',
        authors: 'Goodfellow et al.',
        year: 2014,
        citations: '80k',
        abstract: 'Proposed GANs, a framework for generative modeling using adversarial training.',
        link: 'https://arxiv.org/abs/1406.2661',
        thumbnail: 'https://via.placeholder.com/100x140?text=GAN',
        tags: ['GANs', 'Generative Models'],
      },
      {
        id: 'ai4',
        title: 'BERT: Pre-training of Deep Bidirectional Transformers',
        authors: 'Devlin et al.',
        year: 2018,
        citations: '100k',
        abstract: 'Introduced BERT, a pre-trained model for NLP tasks with bidirectional context.',
        link: 'https://arxiv.org/abs/1810.04805',
        thumbnail: 'https://via.placeholder.com/100x140?text=BERT',
        tags: ['NLP', 'BERT'],
      },
      {
        id: 'ai5',
        title: 'Reinforcement Learning: An Introduction',
        authors: 'Sutton & Barto',
        year: 2018,
        citations: '50k',
        abstract: 'A comprehensive guide to reinforcement learning principles and algorithms.',
        link: 'https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf',
        thumbnail: 'https://via.placeholder.com/100x140?text=RL',
        tags: ['Reinforcement Learning', 'AI'],
      },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: '💻',
    papers: [
      {
        id: 'web1',
        title: 'A Comprehensive Study of Web Performance Optimization',
        authors: 'Smith et al.',
        year: 2020,
        citations: '5k',
        abstract: 'Analyzes techniques for improving web load times and user experience.',
        link: 'https://arxiv.org/abs/2001.12345',
        thumbnail: 'https://via.placeholder.com/100x140?text=Web',
        tags: ['Performance', 'Web'],
      },
      {
        id: 'web2',
        title: 'Progressive Web Apps: The Future of Web',
        authors: 'Jones et al.',
        year: 2018,
        citations: '8k',
        abstract: 'Discusses the architecture and benefits of Progressive Web Apps.',
        link: 'https://arxiv.org/abs/1802.06789',
        thumbnail: 'https://via.placeholder.com/100x140?text=PWA',
        tags: ['PWA', 'Web'],
      },
      {
        id: 'web3',
        title: 'WebAssembly: A New Era for Web Applications',
        authors: 'Haas et al.',
        year: 2017,
        citations: '10k',
        abstract: 'Introduces WebAssembly for high-performance web applications.',
        link: 'https://arxiv.org/abs/1703.07588',
        thumbnail: 'https://via.placeholder.com/100x140?text=WebAssembly',
        tags: ['WebAssembly', 'Performance'],
      },
      {
        id: 'web4',
        title: 'The Evolution of Single Page Applications',
        authors: 'Brown et al.',
        year: 2019,
        citations: '6k',
        abstract: 'Explores the architecture and challenges of modern SPAs.',
        link: 'https://arxiv.org/abs/1904.12345',
        thumbnail: 'https://via.placeholder.com/100x140?text=SPA',
        tags: ['SPA', 'JavaScript'],
      },
    ],
  },
  {
    id: 'quantum',
    label: 'Quantum Computing',
    icon: '⚛️',
    papers: [
      {
        id: 'quantum1',
        title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
        authors: 'Arute et al.',
        year: 2019,
        citations: '15k',
        abstract: 'Demonstrates quantum advantage in computation with Google’s Sycamore processor.',
        link: 'https://arxiv.org/abs/1910.11333',
        thumbnail: 'https://via.placeholder.com/100x140?text=Quantum',
        tags: ['Quantum', 'Supremacy'],
      },
      {
        id: 'quantum2',
        title: 'A Blueprint for Fault-Tolerant Quantum Computation',
        authors: 'Gottesman et al.',
        year: 2010,
        citations: '12k',
        abstract: 'Proposes methods for error correction in quantum computing.',
        link: 'https://arxiv.org/abs/1008.5328',
        thumbnail: 'https://via.placeholder.com/100x140?text=QuantumError',
        tags: ['Quantum', 'Error Correction'],
      },
      {
        id: 'quantum3',
        title: 'Quantum Machine Learning Algorithms',
        authors: 'Biamonte et al.',
        year: 2017,
        citations: '8k',
        abstract: 'Explores quantum algorithms for machine learning tasks.',
        link: 'https://arxiv.org/abs/1611.09347',
        thumbnail: 'https://via.placeholder.com/100x140?text=QuantumML',
        tags: ['Quantum', 'Machine Learning'],
      },
      {
        id: 'quantum4',
        title: 'Quantum Cryptography: The Future of Secure Communication',
        authors: 'Pirandola et al.',
        year: 2020,
        citations: '7k',
        abstract: 'Discusses quantum key distribution and secure communication protocols.',
        link: 'https://arxiv.org/abs/2006.06521',
        thumbnail: 'https://via.placeholder.com/100x140?text=QuantumCrypto',
        tags: ['Quantum', 'Cryptography'],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data Science',
    icon: '📊',
    papers: [
      {
        id: 'data1',
        title: 'The Elements of Statistical Learning',
        authors: 'Hastie et al.',
        year: 2013,
        citations: '70k',
        abstract: 'A foundational text on statistical learning and machine learning techniques.',
        link: 'https://web.stanford.edu/~hastie/ElemStatLearn/',
        thumbnail: 'https://via.placeholder.com/100x140?text=Stats',
        tags: ['Machine Learning', 'Statistics'],
      },
      {
        id: 'data2',
        title: 'XGBoost: A Scalable Tree Boosting System',
        authors: 'Chen & Guestrin',
        year: 2016,
        citations: '40k',
        abstract: 'Introduces XGBoost, a scalable and efficient gradient boosting framework.',
        link: 'https://arxiv.org/abs/1603.02754',
        thumbnail: 'https://via.placeholder.com/100x140?text=XGBoost',
        tags: ['Gradient Boosting', 'Data Science'],
      },
      {
        id: 'data3',
        title: 'Deep Learning for Time Series Forecasting',
        authors: 'Lim & Zohren',
        year: 2021,
        citations: '4k',
        abstract: 'Explores deep learning techniques for time series prediction.',
        link: 'https://arxiv.org/abs/2107.08079',
        thumbnail: 'https://via.placeholder.com/100x140?text=TimeSeries',
        tags: ['Deep Learning', 'Time Series'],
      },
      {
        id: 'data4',
        title: 'Causal Inference in Statistics: A Primer',
        authors: 'Pearl et al.',
        year: 2016,
        citations: '20k',
        abstract: 'Introduces causal inference methods for statistical analysis.',
        link: 'https://www.wiley.com/en-us/Causal+Inference+in+Statistics%3A+A+Primer-p-9781119186847',
        thumbnail: 'https://via.placeholder.com/100x140?text=Causal',
        tags: ['Causal Inference', 'Statistics'],
      },
    ],
  },
  {
    id: 'cyber',
    label: 'Cybersecurity',
    icon: '🔒',
    papers: [
      {
        id: 'cyber1',
        title: 'A Survey of Machine Learning for Cybersecurity',
        authors: 'Biggio & Roli',
        year: 2018,
        citations: '9k',
        abstract: 'Reviews machine learning applications in cybersecurity.',
        link: 'https://arxiv.org/abs/1801.01181',
        thumbnail: 'https://via.placeholder.com/100x140?text=CyberML',
        tags: ['Machine Learning', 'Cybersecurity'],
      },
      {
        id: 'cyber2',
        title: 'Blockchain for Secure IoT Systems',
        authors: 'Reyna et al.',
        year: 2018,
        citations: '6k',
        abstract: 'Explores blockchain technology for securing IoT ecosystems.',
        link: 'https://arxiv.org/abs/1806.09802',
        thumbnail: 'https://via.placeholder.com/100x140?text=Blockchain',
        tags: ['Blockchain', 'IoT'],
      },
      {
        id: 'cyber3',
        title: 'Adversarial Attacks on Neural Networks',
        authors: 'Szegedy et al.',
        year: 2013,
        citations: '30k',
        abstract: 'Introduces adversarial examples that exploit neural network vulnerabilities.',
        link: 'https://arxiv.org/abs/1312.6199',
        thumbnail: 'https://via.placeholder.com/100x140?text=Adversarial',
        tags: ['Adversarial Attacks', 'Security'],
      },
      {
        id: 'cyber4',
        title: 'Zero Trust Architecture: A Paradigm Shift',
        authors: 'Ward & Beyer',
        year: 2020,
        citations: '5k',
        abstract: 'Discusses the zero trust model for modern cybersecurity.',
        link: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf',
        thumbnail: 'https://via.placeholder.com/100x140?text=ZeroTrust',
        tags: ['Zero Trust', 'Security'],
      },
    ],
  },
];

const ResearchPapers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ai');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('citations');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // Voice Search
  const startVoiceSearch = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Voice search is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition failed.');
    };

    recognition.start();
  };

  // Toggle Favorite
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Export Papers
  const exportPapers = () => {
    const filteredPapers = paperCategories
      .filter((category) => activeTab === 'all' || category.id === activeTab)
      .flatMap((category) => category.papers);
    const data = JSON.stringify(filteredPapers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gravityx_papers.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter and Sort Papers
  const filteredPapers = paperCategories
    .filter((category) => activeTab === 'all' || category.id === activeTab)
    .flatMap((category) => category.papers)
    .filter(
      (paper) =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'citations') return parseInt(b.citations.replace('k', '000')) - parseInt(a.citations.replace('k', '000'));
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });

  // Particle Initialization
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative mt-20">
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
        className="fixed top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/80 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-base shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:text-purple-400 animate-[pulse_3s_infinite]"
      >
        <FaArrowLeft className="text-lg" /> Back
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 font-orbitron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cosmic Research Portal
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore groundbreaking research papers in technology and innovation
          </motion.p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="sticky top-20 z-10 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <motion.input
                type="text"
                placeholder="Search papers... (e.g., Transformer)"
                className="px-4 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg focus:outline-none text-white w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                aria-label="Search research papers"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startVoiceSearch}
                className={`px-4 py-2 rounded-lg ${
                  isListening ? 'bg-cyan-500 text-white' : 'bg-gray-900/50 text-cyan-300'
                } border border-cyan-500/50`}
                aria-label="Voice search"
              >
                <FaMicrophone />
              </motion.button>
             
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-900/50 text-cyan-300 rounded-lg border border-cyan-500/50 focus:outline-none"
              aria-label="Sort papers"
            >
              <option value="citations">Sort by Citations</option>
              <option value="year">Sort by Year</option>
            </select>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[{ id: 'all', label: 'All Papers', icon: '📚' }, ...paperCategories].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Papers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                    hoveredCard === paper.id ? 'border-cyan-400 shadow-xl shadow-cyan-500/20' : 'border-gray-700'
                  }`}
                  onMouseEnter={() => setHoveredCard(paper.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setIsModalOpen(paper)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white font-orbitron">{paper.title}</h3>
                      {hoveredCard === paper.id && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block px-2 py-1 bg-cyan-500 text-xs font-semibold rounded-full"
                        >
                          NEW
                        </motion.span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-2">{paper.authors}</p>
                    <p className="text-gray-400 text-sm mb-4">{paper.year} | 📊 {paper.citations}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {paper.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(paper.id);
                        }}
                        className={`p-2 rounded-full ${
                          favorites.includes(paper.id) ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-300'
                        }`}
                        aria-label={favorites.includes(paper.id) ? `Remove ${paper.title} from favorites` : `Add ${paper.title} to favorites`}
                      >
                        <FaStar />
                      </motion.button>
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="py-2 px-4 rounded-lg font-medium flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg"
                        >
                          Read Paper <FaExternalLinkAlt className="text-xs" />
                        </motion.button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-lg">No papers found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold mb-6 font-orbitron text-gray-300">Explore More Research</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NavLink
                to="/paradise/paper-comparisons"
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center"
              >
                <span className="text-2xl mr-3">🆚</span>
                <div>
                  <div className="font-medium text-white font-orbitron">Paper Comparisons</div>
                  <div className="text-sm text-gray-400">Compare methodologies and results</div>
                </div>
              </NavLink>
              <NavLink
                to="/paradise/paper-trends"
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center"
              >
                <span className="text-2xl mr-3">📈</span>
                <div>
                  <div className="font-medium text-white font-orbitron">Research Trends</div>
                  <div className="text-sm text-gray-400">Emerging topics in AI and tech</div>
                </div>
              </NavLink>
              <NavLink
                to="/paradise/paper-recommendations"
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center"
              >
                <span className="text-2xl mr-3">🏆</span>
                <div>
                  <div className="font-medium text-white font-orbitron">Top Picks</div>
                  <div className="text-sm text-gray-400">Highly cited papers by field</div>
                </div>
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResearchPapers;