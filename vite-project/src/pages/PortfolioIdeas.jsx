import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaLaptopCode, FaMobileAlt, FaChartLine, FaLightbulb, FaExternalLinkAlt } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { RiLayoutGridFill, RiLayoutMasonryFill, RiLayoutRowFill } from 'react-icons/ri';

const PortfolioIdeas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [layout, setLayout] = useState('grid');
  const [expandedItem, setExpandedItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All Ideas' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'creative', label: 'Creative' },
    { id: 'data-driven', label: 'Data-Driven' },
    { id: 'mobile-first', label: 'Mobile-First' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Neon Cyberpunk Portfolio',
      description: 'Futuristic design with neon aesthetics and cyberpunk vibes',
      longDescription: 'This portfolio features dark backgrounds with vibrant neon accents, glitch effects, and futuristic UI elements. Perfect for developers working with cutting-edge technologies. Includes animated code snippets and 3D model integration.',
      tags: ['dark-theme', 'animation', 'modern', 'threejs'],
      category: 'creative',
      difficulty: 'Advanced',
      previewUrl: 'https://www.awwwards.com/sites/cyberpunk-developer-portfolio',
      icon: <FaLightbulb className="text-yellow-400" />,
      featured: true,
      platform: 'Awwwards'
    },
    {
      id: 2,
      title: 'Minimal Developer Portfolio',
      description: 'Clean, typography-focused design for developers',
      longDescription: 'A minimalist approach that puts your code and projects front and center. Features a monospace font, clean lines, and subtle animations. Includes a live GitHub contribution graph and project showcase with code snippets.',
      tags: ['minimal', 'typography', 'light-theme', 'github-api'],
      category: 'minimal',
      difficulty: 'Beginner',
      previewUrl: 'https://dribbble.com/shots/18234520-Minimal-Developer-Portfolio',
      icon: <RiLayoutRowFill className="text-blue-400" />,
      featured: false,
      platform: 'Dribbble'
    },
    {
      id: 3,
      title: 'Interactive Timeline Portfolio',
      description: 'Structured as an interactive timeline of your career',
      longDescription: 'Visitors scroll through your professional journey, with each stop revealing projects, skills, and experiences. Features smooth scroll animations, parallax effects, and integrated media. Supports dark/light mode toggle.',
      tags: ['storytelling', 'interactive', 'animation', 'responsive'],
      category: 'interactive',
      difficulty: 'Intermediate',
      previewUrl: 'https://codepen.io/collection/XgvYQq',
      icon: <FaChartLine className="text-purple-400" />,
      featured: true,
      platform: 'CodePen'
    },
    {
      id: 4,
      title: 'Code Canvas Portfolio',
      description: 'Interactive coding environment portfolio',
      longDescription: 'Visitors can interact with code snippets demonstrating your skills. Features a live code editor showing projects in action, syntax highlighting, and executable examples. Integrates with CodeSandbox for live demos.',
      tags: ['interactive', 'educational', 'unique', 'codesandbox'],
      category: 'interactive',
      difficulty: 'Advanced',
      previewUrl: 'https://codesandbox.io/examples/portfolio',
      icon: <FaLaptopCode className="text-green-400" />,
      featured: true,
      platform: 'CodeSandbox'
    },
    {
      id: 5,
      title: 'Mobile-First Developer Portfolio',
      description: 'Optimized for mobile with gesture controls',
      longDescription: 'Designed mobile-first with swipeable sections, touch-friendly navigation, and performance optimizations. Includes device mockup displays, touch gestures for navigation, and offline capabilities with service workers.',
      tags: ['mobile', 'performance', 'pwa', 'touch-friendly'],
      category: 'mobile-first',
      difficulty: 'Intermediate',
      previewUrl: 'https://www.behance.net/gallery/125640589/Mobile-First-Developer-Portfolio',
      icon: <FaMobileAlt className="text-cyan-400" />,
      featured: false,
      platform: 'Behance'
    },
    {
      id: 6,
      title: 'Data Visualization Portfolio',
      description: 'Visualizes your skills and experience with data',
      longDescription: 'Uses D3.js to create dynamic charts and graphs showcasing your skills, project impact, and career growth. Integrates with GitHub API for real-time stats. Includes interactive dashboards and skill radars with filtering capabilities.',
      tags: ['d3js', 'analytics', 'dynamic', 'github-api'],
      category: 'data-driven',
      difficulty: 'Advanced',
      previewUrl: 'https://observablehq.com/@d3/gallery',
      icon: <FaChartLine className="text-pink-400" />,
      featured: false,
      platform: 'Observable'
    },
    {
      id: 7,
      title: '3D Developer Portfolio',
      description: 'Immersive 3D environment showcasing your work',
      longDescription: 'A WebGL-powered 3D space where visitors can navigate through your projects as interactive objects. Features Three.js scenes, animated transitions, and spatial audio. Perfect for game developers and 3D artists.',
      tags: ['threejs', 'webgl', '3d', 'immersive'],
      category: 'creative',
      difficulty: 'Advanced',
      previewUrl: 'https://threejs.org/examples/#webgl_animation_keyframes',
      icon: <FaPalette className="text-orange-400" />,
      featured: true,
      platform: 'Three.js'
    },
    {
      id: 8,
      title: 'Terminal Style Portfolio',
      description: 'Command-line interface inspired portfolio',
      longDescription: 'Interactive terminal emulator where visitors can "run commands" to view your projects and info. Features typewriter effects, command history, and Easter eggs. Supports actual commands like "ls projects" or "cat about.txt".',
      tags: ['cli', 'terminal', 'interactive', 'retro'],
      category: 'interactive',
      difficulty: 'Intermediate',
      previewUrl: 'https://github.com/mkrl/misbrands',
      icon: <FaLaptopCode className="text-red-400" />,
      featured: false,
      platform: 'GitHub'
    }
  ];

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-cyan-900/10" />
      </div>

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
            Cosmic Portfolio Ideas
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover real portfolio examples from top platforms to inspire your next design
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative max-w-2xl mx-auto mb-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                opacity: [0, 0.3, 0],
                transition: { duration: 3, repeat: Infinity }
              }}
            />
            <div className="relative flex items-center">
              <IoMdSearch className="absolute left-4 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by style, platform, or technology..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2 bg-gray-800 rounded-full p-1">
              <motion.button
                onClick={() => setLayout('grid')}
                className={`p-3 rounded-full ${layout === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutGridFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('masonry')}
                className={`p-3 rounded-full ${layout === 'masonry' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutMasonryFill className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setLayout('list')}
                className={`p-3 rounded-full ${layout === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiLayoutRowFill className="text-lg" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Ideas Grid */}
        <motion.div
          layout
          className={`grid ${
            layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            layout === 'masonry' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            'grid-cols-1'
          } gap-8`}
        >
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 ${
                    item.featured ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="flex gap-2">
                        {item.featured && (
                          <motion.span
                            className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-semibold rounded-full"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            Featured
                          </motion.span>
                        )}
                        <motion.span
                          className="px-3 py-1 bg-gray-700 text-xs font-semibold rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.platform}
                        </motion.span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {expandedItem === item.id ? item.longDescription : item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        item.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                        item.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-red-900/50 text-red-400'
                      }`}>
                        {item.difficulty}
                      </span>
                      
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="text-sm text-cyan-400 hover:text-cyan-300"
                          whileHover={{ x: 5 }}
                        >
                          {expandedItem === item.id ? 'Show less' : 'Read more'}
                        </motion.button>
                        
                        <motion.a
                          href={item.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm flex items-center gap-1 text-purple-400 hover:text-purple-300"
                          whileHover={{ x: 5 }}
                        >
                          View on {item.platform} <FaExternalLinkAlt className="text-xs" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-gray-400 mb-4">
                  No portfolio ideas found matching your criteria
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to build your cosmic portfolio?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get started with these resources from real developers and designers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="https://github.com/topics/portfolio-template"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Explore GitHub Templates
              </motion.a>
              <motion.a
                href="https://www.awwwards.com/websites/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                Get Inspired on Awwwards
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioIdeas;