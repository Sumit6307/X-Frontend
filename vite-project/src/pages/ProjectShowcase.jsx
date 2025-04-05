import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRegStar, FaCodeBranch, FaEye } from 'react-icons/fa';
import { SiJavascript, SiReact, SiPython, SiNodedotjs, SiTypescript } from 'react-icons/si';
import { IoMdSearch } from 'react-icons/io';
import { RiLightbulbFlashLine } from 'react-icons/ri';

const ProjectShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'game', label: 'Games' },
    { id: 'tool', label: 'Dev Tools' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Cosmic Explorer',
      description: 'Interactive 3D visualization of our solar system with educational content about each planet',
      longDescription: 'This project uses Three.js to create an immersive 3D experience of our solar system. Users can navigate between planets, view detailed information, and see real-time positions. Built with React and WebGL.',
      tags: ['react', 'threejs', 'webgl', 'astronomy'],
      githubUrl: 'https://github.com/user/cosmic-explorer',
      liveUrl: 'https://cosmic-explorer.app',
      stars: 428,
      forks: 87,
      watches: 1200,
      techStack: ['React', 'Three.js', 'Node.js'],
      category: 'web',
      featured: true,
      author: 'stellarDev',
      authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      title: 'Neural Art Generator',
      description: 'AI-powered tool that transforms your photos into artwork in the style of famous painters',
      longDescription: 'Using TensorFlow.js and a pre-trained neural style transfer model, this web app allows users to upload photos and apply artistic styles. The backend processes images with Python and Flask, while the frontend is built with React.',
      tags: ['ai', 'machine-learning', 'tensorflow', 'python'],
      githubUrl: 'https://github.com/user/neural-art',
      liveUrl: 'https://neural-art-generator.com',
      stars: 892,
      forks: 210,
      watches: 3500,
      techStack: ['Python', 'TensorFlow', 'React'],
      category: 'ai',
      featured: true,
      author: 'aiWizard',
      authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      title: 'Code Collab',
      description: 'Real-time collaborative code editor with video chat and shared terminal',
      longDescription: 'Built with WebSockets and operational transforms, this editor allows multiple developers to code together in real-time. Features include syntax highlighting, video chat, shared terminal, and GitHub integration.',
      tags: ['nodejs', 'websockets', 'collaboration', 'editor'],
      githubUrl: 'https://github.com/user/code-collab',
      liveUrl: 'https://code-collab.live',
      stars: 1250,
      forks: 340,
      watches: 5600,
      techStack: ['Node.js', 'React', 'WebSockets'],
      category: 'tool',
      featured: true,
      author: 'teamCoder',
      authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    {
      id: 4,
      title: 'Pixel Quest',
      description: 'Retro-style 2D platformer game with procedurally generated levels',
      longDescription: 'A nostalgic 2D platformer built with Phaser.js featuring procedurally generated levels, character customization, and online leaderboards. The game includes 50+ unlockable achievements and daily challenges.',
      tags: ['game', 'javascript', 'phaser', 'procedural-generation'],
      githubUrl: 'https://github.com/user/pixel-quest',
      liveUrl: 'https://pixel-quest-game.com',
      stars: 567,
      forks: 98,
      watches: 2300,
      techStack: ['JavaScript', 'Phaser', 'Node.js'],
      category: 'game',
      featured: false,
      author: 'gameDevPro',
      authorAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    {
      id: 5,
      title: 'HealthTrack',
      description: 'Mobile app for tracking fitness metrics and nutrition with AI recommendations',
      longDescription: 'A React Native application that syncs with wearable devices to track health metrics. Features include meal planning with computer vision for food recognition, workout suggestions based on progress, and health trend analysis.',
      tags: ['mobile', 'react-native', 'health', 'ai'],
      githubUrl: 'https://github.com/user/health-track',
      liveUrl: 'https://healthtrack.app',
      stars: 723,
      forks: 156,
      watches: 3100,
      techStack: ['React Native', 'Python', 'TensorFlow Lite'],
      category: 'mobile',
      featured: false,
      author: 'healthHacker',
      authorAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    {
      id: 6,
      title: 'Dev Dashboard',
      description: 'Customizable dashboard for developers with productivity tools and integrations',
      longDescription: 'A modular dashboard that aggregates GitHub activity, coding stats, task management, and learning resources. Supports plugins for additional integrations like Jira, Slack, and VS Code. Built with Electron for desktop use.',
      tags: ['productivity', 'electron', 'dashboard', 'tools'],
      githubUrl: 'https://github.com/user/dev-dashboard',
      liveUrl: 'https://dev-dashboard-tool.com',
      stars: 432,
      forks: 76,
      watches: 1800,
      techStack: ['Electron', 'React', 'TypeScript'],
      category: 'tool',
      featured: false,
      author: 'toolMaster',
      authorAvatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getTechIcon = (tech) => {
    switch (tech.toLowerCase()) {
      case 'react':
        return <SiReact className="text-blue-500" />;
      case 'javascript':
        return <SiJavascript className="text-yellow-400" />;
      case 'python':
        return <SiPython className="text-blue-400" />;
      case 'node.js':
        return <SiNodedotjs className="text-green-500" />;
      case 'typescript':
        return <SiTypescript className="text-blue-600" />;
      default:
        return <RiLightbulbFlashLine className="text-purple-500" />;
    }
  };

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
            Cosmic Project Showcase
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore stellar projects from developers across the universe
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
                placeholder="Search projects by name, tech, or tags..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 ${
                    project.featured ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                          <img src={project.authorAvatar} alt={project.author} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-gray-400">@{project.author}</span>
                      </div>
                      {project.featured && (
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
                    
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {expandedProject === project.id ? project.longDescription : project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-lg text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-lg">{getTechIcon(tech)}</span>
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaRegStar /> {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeBranch /> {project.forks}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye /> {project.watches}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub className="text-lg" />
                        </motion.a>
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt className="text-lg" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 text-left"
                      whileHover={{ x: 5 }}
                    >
                      {expandedProject === project.id ? 'Show less' : 'Read more'}
                    </motion.button>
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
                  No projects found matching your criteria
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
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
              Ready to launch your project into orbit?
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Showcase your work to thousands of developers and get valuable feedback
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Submit Your Project
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

export default ProjectShowcase;