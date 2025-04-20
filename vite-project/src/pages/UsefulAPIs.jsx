import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowLeft, FaCode, FaServer, FaDatabase, FaCloud, FaShieldAlt, FaChartLine, FaImage, FaMapMarkerAlt, FaMoneyBillWave, FaRobot, FaVideo, FaLanguage, FaShoppingCart, FaMusic, FaNewspaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const UsefulAPIs = () => {
  const navigate = useNavigate();
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedApi, setExpandedApi] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', label: 'All APIs', icon: <FaCode /> },
    { id: 'development', label: 'Development', icon: <FaCode /> },
    { id: 'finance', label: 'Finance', icon: <FaMoneyBillWave /> },
    { id: 'ai', label: 'AI', icon: <FaRobot /> },
    { id: 'multimedia', label: 'Multimedia', icon: <FaImage /> },
    { id: 'data', label: 'Data', icon: <FaDatabase /> },
  ];

  // 20+ Real APIs with actual endpoints and docs
  const apiData = [
    {
      id: 1,
      name: 'REST Countries',
      description: 'Get information about countries via RESTful API',
      category: 'data',
      endpoint: 'https://restcountries.com/v3.1',
      docs: 'https://restcountries.com',
      status: 'active',
      tags: ['geography', 'free', 'no-auth'],
    },
    {
      id: 2,
      name: 'OpenWeatherMap',
      description: 'Global weather data API with free tier',
      category: 'data',
      endpoint: 'https://api.openweathermap.org/data/2.5',
      docs: 'https://openweathermap.org/api',
      status: 'active',
      tags: ['weather', 'forecast', 'free-tier'],
    },
    {
      id: 3,
      name: 'CoinGecko',
      description: 'Cryptocurrency market data API',
      category: 'finance',
      endpoint: 'https://api.coingecko.com/api/v3',
      docs: 'https://www.coingecko.com/en/api',
      status: 'active',
      tags: ['crypto', 'market-data', 'free-tier'],
    },
    {
      id: 4,
      name: 'NewsAPI',
      description: 'News headlines from over 30,000 sources',
      category: 'data',
      endpoint: 'https://newsapi.org/v2',
      docs: 'https://newsapi.org/docs',
      status: 'active',
      tags: ['news', 'headlines', 'free-tier'],
    },
    {
      id: 5,
      name: 'The Movie Database',
      description: 'Movie and TV show information',
      category: 'multimedia',
      endpoint: 'https://api.themoviedb.org/3',
      docs: 'https://developers.themoviedb.org/3',
      status: 'active',
      tags: ['movies', 'tv', 'free-tier'],
    },
    {
      id: 6,
      name: 'Unsplash',
      description: 'Beautiful free photos API',
      category: 'multimedia',
      endpoint: 'https://api.unsplash.com',
      docs: 'https://unsplash.com/developers',
      status: 'active',
      tags: ['photos', 'images', 'free-tier'],
    },
    {
      id: 7,
      name: 'Twilio',
      description: 'Communication APIs for SMS, WhatsApp, etc.',
      category: 'development',
      endpoint: 'https://api.twilio.com/2010-04-01',
      docs: 'https://www.twilio.com/docs/usage/api',
      status: 'active',
      tags: ['sms', 'voice', 'paid'],
    },
    {
      id: 8,
      name: 'Stripe',
      description: 'Online payment processing API',
      category: 'finance',
      endpoint: 'https://api.stripe.com/v1',
      docs: 'https://stripe.com/docs/api',
      status: 'active',
      tags: ['payments', 'ecommerce', 'paid'],
    },
    {
      id: 9,
      name: 'Google Maps',
      description: 'Maps, routes, and places API',
      category: 'data',
      endpoint: 'https://maps.googleapis.com/maps/api',
      docs: 'https://developers.google.com/maps/documentation',
      status: 'active',
      tags: ['maps', 'geolocation', 'free-tier'],
    },
    {
      id: 10,
      name: 'GitHub API',
      description: 'Access repositories, users, and code',
      category: 'development',
      endpoint: 'https://api.github.com',
      docs: 'https://docs.github.com/en/rest',
      status: 'active',
      tags: ['git', 'repos', 'free'],
    },
    {
      id: 11,
      name: 'Alpaca Markets',
      description: 'Stock market and trading API',
      category: 'finance',
      endpoint: 'https://paper-api.alpaca.markets/v2',
      docs: 'https://alpaca.markets/docs/api-documentation',
      status: 'active',
      tags: ['stocks', 'trading', 'free-tier'],
    },
    {
      id: 12,
      name: 'DeepAI',
      description: 'AI APIs for image, text, and video processing',
      category: 'ai',
      endpoint: 'https://api.deepai.org/api',
      docs: 'https://deepai.org/api-docs',
      status: 'active',
      tags: ['machine-learning', 'free-tier'],
    },
    {
      id: 13,
      name: 'IBM Watson',
      description: 'AI services for language, vision, and more',
      category: 'ai',
      endpoint: 'https://api.us-south.assistant.watson.cloud.ibm.com',
      docs: 'https://cloud.ibm.com/apidocs',
      status: 'active',
      tags: ['nlp', 'vision', 'paid'],
    },
    {
      id: 14,
      name: 'Spotify',
      description: 'Access music catalog and user data',
      category: 'multimedia',
      endpoint: 'https://api.spotify.com/v1',
      docs: 'https://developer.spotify.com/documentation/web-api',
      status: 'active',
      tags: ['music', 'free-tier'],
    },
    {
      id: 15,
      name: 'Youtube Data',
      description: 'Access YouTube videos and channels',
      category: 'multimedia',
      endpoint: 'https://www.googleapis.com/youtube/v3',
      docs: 'https://developers.google.com/youtube/v3',
      status: 'active',
      tags: ['videos', 'free-tier'],
    },
    {
      id: 16,
      name: 'RapidAPI Hub',
      description: 'Thousands of APIs in one place',
      category: 'development',
      endpoint: 'https://api.rapidapi.com',
      docs: 'https://docs.rapidapi.com',
      status: 'active',
      tags: ['api-hub', 'free-tier'],
    },
    {
      id: 17,
      name: 'NASA APIs',
      description: 'Space data from NASA missions',
      category: 'data',
      endpoint: 'https://api.nasa.gov',
      docs: 'https://api.nasa.gov',
      status: 'active',
      tags: ['space', 'free', 'no-auth'],
    },
    {
      id: 18,
      name: 'Twitter API',
      description: 'Access tweets and user data',
      category: 'data',
      endpoint: 'https://api.twitter.com/2',
      docs: 'https://developer.twitter.com/en/docs/twitter-api',
      status: 'active',
      tags: ['social-media', 'free-tier'],
    },
    {
      id: 19,
      name: 'ExchangeRate-API',
      description: 'Currency conversion rates',
      category: 'finance',
      endpoint: 'https://v6.exchangerate-api.com/v6/YOUR-API-KEY',
      docs: 'https://www.exchangerate-api.com/docs',
      status: 'active',
      tags: ['currency', 'free-tier'],
    },
    {
      id: 20,
      name: 'JokeAPI',
      description: 'Programming and general jokes',
      category: 'development',
      endpoint: 'https://v2.jokeapi.dev/joke',
      docs: 'https://sv443.net/jokeapi/v2',
      status: 'active',
      tags: ['fun', 'free', 'no-auth'],
    },
    {
      id: 21,
      name: 'IP Geolocation',
      description: 'Locate any IP address',
      category: 'data',
      endpoint: 'https://ipapi.co/json',
      docs: 'https://ipapi.com/documentation',
      status: 'active',
      tags: ['geolocation', 'free-tier'],
    },
    {
      id: 22,
      name: 'Oxford Dictionaries',
      description: 'English dictionary and thesaurus',
      category: 'data',
      endpoint: 'https://od-api.oxforddictionaries.com/api/v2',
      docs: 'https://developer.oxforddictionaries.com',
      status: 'active',
      tags: ['language', 'free-tier'],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setApis(apiData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const filteredApis = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id) => {
    setExpandedApi(expandedApi === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'beta': return 'bg-purple-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FaCode />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

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
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.3 }}
        whileHover={{ 
          x: 5,
          scale: 1.05,
          boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)',
          backgroundColor: 'rgba(0, 212, 255, 0.3)',
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="fixed top-30 left-6 z-20 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black/80 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-base md:text-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:text-purple-400"
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            GravityX API Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Connect with {apis.length}+ real-world APIs to power your applications
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="flex flex-col md:flex-row gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search APIs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* API Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {filteredApis.length > 0 ? (
              filteredApis.map((api) => (
                <motion.div
                  key={api.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                    hoveredCard === api.id ? 'border-cyan-400 shadow-xl shadow-cyan-500/20' : 'border-gray-700'
                  }`}
                  onMouseEnter={() => setHoveredCard(api.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{api.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 text-sm">
                            {getCategoryIcon(api.category)}
                          </span>
                          <span className="text-gray-400 text-sm capitalize">
                            {api.category}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(api.status)}`}>
                        {api.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{api.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {api.tags.map((tag, index) => (
                        <motion.span 
                          key={index} 
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => toggleExpand(api.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2 px-4 bg-gradient-to-r from-cyan-600/70 to-purple-600/70 rounded-lg font-medium mb-4 hover:shadow-lg"
                    >
                      {expandedApi === api.id ? 'Hide Details' : 'Show Details'}
                    </motion.button>

                    <AnimatePresence>
                      {expandedApi === api.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Endpoint:</h4>
                              <code className="block p-3 bg-gray-900 rounded-lg text-sm overflow-x-auto">
                                {api.endpoint}
                              </code>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold mb-2">Documentation:</h4>
                              <a
                                href={api.docs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-cyan-400 hover:underline"
                              >
                                {api.docs} <FaExternalLinkAlt className="ml-1 text-xs" />
                              </a>
                            </div>

                            <a
                              href={api.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-medium flex items-center justify-center gap-2"
                              >
                                Connect to API <FaExternalLinkAlt className="text-xs" />
                              </motion.button>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 text-lg">No APIs found matching your criteria</p>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Need More APIs?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore thousands more APIs on RapidAPI Hub
            </p>
            <a href="https://rapidapi.com/hub" target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Browse RapidAPI Hub
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UsefulAPIs;