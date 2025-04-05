import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBook, FaVideo, FaTools, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';
import { SiJavascript, SiReact, SiPython, SiNodedotjs } from 'react-icons/si';
import { IoMdSearch } from 'react-icons/io';
import { RiMentalHealthLine } from 'react-icons/ri';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', label: 'All Resources', icon: <FaCode /> },
    { id: 'courses', label: 'Courses', icon: <FaGraduationCap /> },
    { id: 'tutorials', label: 'Tutorials', icon: <FaVideo /> },
    { id: 'docs', label: 'Documentation', icon: <FaBook /> },
    { id: 'tools', label: 'Dev Tools', icon: <FaTools /> },
    { id: 'wellness', label: 'Dev Wellness', icon: <RiMentalHealthLine /> },
  ];

  const resources = [
    {
      id: 1,
      title: 'React Official Documentation',
      category: 'docs',
      description: 'Comprehensive guide to React from the creators themselves',
      link: 'https://reactjs.org/docs/getting-started.html',
      tags: ['react', 'frontend', 'documentation'],
      icon: <SiReact className="text-4xl text-blue-400" />,
      featured: true,
    },
    {
      id: 2,
      title: 'JavaScript.info',
      category: 'tutorials',
      description: 'Modern JavaScript tutorial from the basics to advanced topics',
      link: 'https://javascript.info/',
      tags: ['javascript', 'tutorial', 'frontend'],
      icon: <SiJavascript className="text-4xl text-yellow-400" />,
      featured: true,
    },
    {
      id: 3,
      title: 'Python Crash Course',
      category: 'courses',
      description: 'Free interactive Python tutorial for beginners',
      link: 'https://www.learnpython.org/',
      tags: ['python', 'beginner', 'course'],
      icon: <SiPython className="text-4xl text-blue-500" />,
      featured: false,
    },
    {
      id: 4,
      title: 'Node.js Best Practices',
      category: 'docs',
      description: 'Collection of best practices for Node.js development',
      link: 'https://github.com/goldbergyoni/nodebestpractices',
      tags: ['node', 'backend', 'best-practices'],
      icon: <SiNodedotjs className="text-4xl text-green-500" />,
      featured: true,
    },
    {
      id: 5,
      title: 'Frontend Masters',
      category: 'courses',
      description: 'In-depth courses on modern frontend technologies',
      link: 'https://frontendmasters.com/',
      tags: ['frontend', 'courses', 'premium'],
      icon: <FaLaptopCode className="text-4xl text-purple-500" />,
      featured: false,
    },
    {
      id: 6,
      title: 'Developer Mental Health Guide',
      category: 'wellness',
      description: 'Resources for maintaining mental health as a developer',
      link: 'https://mentalhealth.dev/',
      tags: ['wellness', 'mental-health', 'self-care'],
      icon: <RiMentalHealthLine className="text-4xl text-pink-500" />,
      featured: true,
    },
    {
      id: 7,
      title: 'CSS Tricks',
      category: 'tutorials',
      description: 'Daily articles about CSS, HTML, JavaScript, and all things web development',
      link: 'https://css-tricks.com/',
      tags: ['css', 'frontend', 'tutorials'],
      icon: <FaCode className="text-4xl text-blue-300" />,
      featured: false,
    },
    {
      id: 8,
      title: 'Dev.to Community',
      category: 'tutorials',
      description: 'Community of developers sharing knowledge and resources',
      link: 'https://dev.to/',
      tags: ['community', 'articles', 'tutorials'],
      icon: <FaBook className="text-4xl text-gray-400" />,
      featured: false,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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
            Cosmic Developer Resources
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Fuel your coding journey with stellar resources from across the universe
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
                placeholder="Search resources, tutorials, tools..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                    hoveredCard === resource.id
                      ? 'border-cyan-400 shadow-xl shadow-cyan-500/20'
                      : 'border-gray-700'
                  } ${resource.featured ? 'ring-2 ring-purple-500/50' : ''}`}
                  onMouseEnter={() => setHoveredCard(resource.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-700 rounded-lg">
                        {resource.icon}
                      </div>
                      {resource.featured && (
                        <motion.span
                          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-semibold rounded-full"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          Featured
                        </motion.span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <motion.a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Visit Resource
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.a>
                  </div>
                  {hoveredCard === resource.id && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-2xl font-bold text-gray-400 mb-4">
                  No resources found matching your criteria
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
              Have an amazing resource to share?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Contribute to our cosmic collection and help fellow developers level up their skills
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Submit a Resource
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                View Submission Guidelines
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;