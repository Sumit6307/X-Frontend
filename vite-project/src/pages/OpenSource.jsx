import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaArrowLeft, FaExternalLinkAlt, FaBook, FaTools, FaServer, FaMobile, FaDatabase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const OpenSource = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: <FaGithub /> },
    { id: 'frontend', label: 'Frontend', icon: <FaTools /> },
    { id: 'backend', label: 'Backend', icon: <FaServer /> },
    { id: 'mobile', label: 'Mobile', icon: <FaMobile /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
    { id: 'learning', label: 'Learning', icon: <FaBook /> },
  ];

  // 20+ Real Open Source Projects
  const projectsData = [
    {
      id: 1,
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
      category: 'frontend',
      repo: 'https://github.com/facebook/react',
      docs: 'https://reactjs.org/docs/getting-started.html',
      stars: '210k',
      forks: '43.5k',
      tags: ['javascript', 'ui', 'declarative'],
    },
    {
      id: 2,
      name: 'Vue.js',
      description: 'The Progressive JavaScript Framework',
      category: 'frontend',
      repo: 'https://github.com/vuejs/vue',
      docs: 'https://vuejs.org/guide/introduction.html',
      stars: '204k',
      forks: '33.9k',
      tags: ['javascript', 'framework', 'components'],
    },
    {
      id: 3,
      name: 'Next.js',
      description: 'The React Framework for Production',
      category: 'frontend',
      repo: 'https://github.com/vercel/next.js',
      docs: 'https://nextjs.org/docs',
      stars: '110k',
      forks: '24.5k',
      tags: ['react', 'ssr', 'vercel'],
    },
    {
      id: 4,
      name: 'Node.js',
      description: 'Node.js JavaScript runtime',
      category: 'backend',
      repo: 'https://github.com/nodejs/node',
      docs: 'https://nodejs.org/en/docs/',
      stars: '96.5k',
      forks: '26.3k',
      tags: ['javascript', 'runtime', 'server'],
    },
    {
      id: 5,
      name: 'Express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      category: 'backend',
      repo: 'https://github.com/expressjs/express',
      docs: 'https://expressjs.com/',
      stars: '60.5k',
      forks: '10.3k',
      tags: ['node', 'framework', 'web'],
    },
    {
      id: 6,
      name: 'Django',
      description: 'The Web framework for perfectionists with deadlines',
      category: 'backend',
      repo: 'https://github.com/django/django',
      docs: 'https://docs.djangoproject.com/',
      stars: '70.2k',
      forks: '29.2k',
      tags: ['python', 'full-stack', 'batteries-included'],
    },
    {
      id: 7,
      name: 'Flutter',
      description: 'Google\'s UI toolkit for building beautiful, natively compiled applications',
      category: 'mobile',
      repo: 'https://github.com/flutter/flutter',
      docs: 'https://flutter.dev/docs',
      stars: '154k',
      forks: '25.6k',
      tags: ['dart', 'cross-platform', 'google'],
    },
    {
      id: 8,
      name: 'React Native',
      description: 'A framework for building native apps with React',
      category: 'mobile',
      repo: 'https://github.com/facebook/react-native',
      docs: 'https://reactnative.dev/docs/getting-started',
      stars: '110k',
      forks: '23.5k',
      tags: ['javascript', 'mobile', 'facebook'],
    },
    {
      id: 9,
      name: 'MongoDB',
      description: 'The MongoDB Database',
      category: 'database',
      repo: 'https://github.com/mongodb/mongo',
      docs: 'https://docs.mongodb.com/',
      stars: '24.2k',
      forks: '5.9k',
      tags: ['nosql', 'document', 'database'],
    },
    {
      id: 10,
      name: 'PostgreSQL',
      description: 'The most advanced open source relational database',
      category: 'database',
      repo: 'https://github.com/postgres/postgres',
      docs: 'https://www.postgresql.org/docs/',
      stars: '12.8k',
      forks: '4k',
      tags: ['sql', 'relational', 'database'],
    },
    {
      id: 11,
      name: 'TypeScript',
      description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output',
      category: 'frontend',
      repo: 'https://github.com/microsoft/TypeScript',
      docs: 'https://www.typescriptlang.org/docs/',
      stars: '91.3k',
      forks: '11.8k',
      tags: ['javascript', 'types', 'microsoft'],
    },
    {
      id: 12,
      name: 'VS Code',
      description: 'Visual Studio Code',
      category: 'tools',
      repo: 'https://github.com/microsoft/vscode',
      docs: 'https://code.visualstudio.com/docs',
      stars: '147k',
      forks: '25.9k',
      tags: ['editor', 'ide', 'microsoft'],
    },
    {
      id: 13,
      name: 'TensorFlow',
      description: 'An Open Source Machine Learning Framework for Everyone',
      category: 'ai',
      repo: 'https://github.com/tensorflow/tensorflow',
      docs: 'https://www.tensorflow.org/learn',
      stars: '175k',
      forks: '88.2k',
      tags: ['machine-learning', 'deep-learning', 'google'],
    },
    {
      id: 14,
      name: 'Kubernetes',
      description: 'Production-Grade Container Orchestration',
      category: 'devops',
      repo: 'https://github.com/kubernetes/kubernetes',
      docs: 'https://kubernetes.io/docs/home/',
      stars: '98.7k',
      forks: '36.2k',
      tags: ['containers', 'orchestration', 'google'],
    },
    {
      id: 15,
      name: 'Docker',
      description: 'Docker container runtime and tools',
      category: 'devops',
      repo: 'https://github.com/docker/docker-ce',
      docs: 'https://docs.docker.com/',
      stars: '5.8k',
      forks: '1.6k',
      tags: ['containers', 'virtualization', 'platform'],
    },
    {
      id: 16,
      name: 'The Algorithms',
      description: 'Open Source resource for learning Data Structures & Algorithms',
      category: 'learning',
      repo: 'https://github.com/TheAlgorithms',
      docs: 'https://the-algorithms.com/',
      stars: '165k',
      forks: '41.2k',
      tags: ['algorithms', 'data-structures', 'learning'],
    },
    {
      id: 17,
      name: 'FreeCodeCamp',
      description: 'Open Source learning platform',
      category: 'learning',
      repo: 'https://github.com/freeCodeCamp/freeCodeCamp',
      docs: 'https://www.freecodecamp.org/learn/',
      stars: '370k',
      forks: '32.9k',
      tags: ['education', 'courses', 'certification'],
    },
    {
      id: 18,
      name: 'GravityX Core',
      description: 'The core framework powering GravityX applications',
      category: 'frontend',
      repo: 'https://github.com/gravityx/core',
      docs: 'https://docs.gravityx.com/core',
      stars: '15.2k',
      forks: '2.3k',
      tags: ['framework', 'react', 'cosmic'],
    },
    {
      id: 19,
      name: 'Three.js',
      description: 'JavaScript 3D library',
      category: 'frontend',
      repo: 'https://github.com/mrdoob/three.js',
      docs: 'https://threejs.org/docs/',
      stars: '93.5k',
      forks: '34.8k',
      tags: ['3d', 'webgl', 'graphics'],
    },
    {
      id: 20,
      name: 'Rust',
      description: 'Empowering everyone to build reliable and efficient software',
      category: 'backend',
      repo: 'https://github.com/rust-lang/rust',
      docs: 'https://doc.rust-lang.org/book/',
      stars: '83.1k',
      forks: '11k',
      tags: ['systems', 'performance', 'memory-safe'],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FaGithub />;
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
            Cosmic Open Source
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore {projects.length}+ stellar open-source projects to contribute to or learn from
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
              placeholder="Search projects..."
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

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border ${
                    hoveredCard === project.id ? 'border-cyan-400 shadow-xl shadow-cyan-500/20' : 'border-gray-700'
                  }`}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 text-sm">
                            {getCategoryIcon(project.category)}
                          </span>
                          <span className="text-gray-400 text-sm capitalize">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      {hoveredCard === project.id && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block px-2 py-1 bg-cyan-500 text-xs font-semibold rounded-full"
                        >
                          OPEN SOURCE
                        </motion.span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <motion.span 
                          key={index} 
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaStar className="text-yellow-400" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaCodeBranch className="text-purple-400" />
                        <span className="text-sm">{project.forks}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => toggleExpand(project.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2 px-4 bg-gradient-to-r from-cyan-600/70 to-purple-600/70 rounded-lg font-medium mb-4 hover:shadow-lg"
                    >
                      {expandedProject === project.id ? 'Hide Details' : 'Show Details'}
                    </motion.button>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Repository:</h4>
                              <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-cyan-400 hover:underline"
                              >
                                {project.repo} <FaExternalLinkAlt className="ml-1 text-xs" />
                              </a>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold mb-2">Documentation:</h4>
                              <a
                                href={project.docs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-cyan-400 hover:underline"
                              >
                                {project.docs} <FaExternalLinkAlt className="ml-1 text-xs" />
                              </a>
                            </div>

                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-medium flex items-center justify-center gap-2"
                              >
                                View on GitHub <FaExternalLinkAlt className="text-xs" />
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
                <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to contribute?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join the GravityX open-source community and build the future with us
            </p>
            <a href="https://github.com/gravityx" target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Join Our GitHub Org
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpenSource;