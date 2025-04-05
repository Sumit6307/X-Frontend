import { motion } from 'framer-motion';
import { FaFileAlt, FaMagic, FaRobot, FaDownload, FaStar, FaPalette, FaCode, FaEye, FaLinkedin } from 'react-icons/fa';
import { SiGooglesheets, SiGithub, SiOverleaf } from 'react-icons/si'; // Removed SiJsonresume
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ResumeBuilding = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { 
      id: 1, 
      name: 'Tech Resume Pro', 
      category: 'ATS Optimized', 
      premium: false,
      preview: 'https://resume.io/templates/tech',
      features: ['Skills heatmap', 'Project timeline', 'Clean code blocks'],
      source: 'resume.io',
      link: 'https://resume.io/r/example-tech',
      icon: <FaFileAlt className="text-cyan-400" />
    },
    { 
      id: 2, 
      name: 'Developer Modern', 
      category: 'GitHub Integrated', 
      premium: false,
      preview: 'https://standardresume.co/templates/developer',
      features: ['GitHub contributions', 'Skill bars', 'Dark mode'],
      source: 'standardresume.co',
      link: 'https://standardresume.co/example-dev',
      icon: <FaCode className="text-purple-400" />
    },
    { 
      id: 3, 
      name: 'JSON Resume', 
      category: 'Developer Friendly', 
      premium: false,
      preview: 'https://jsonresume.org/',
      features: ['Schema-based', 'CLI tools', 'Multiple themes'],
      source: 'jsonresume.org',
      link: 'https://registry.jsonresume.org/thomasdavis',
      icon: <SiGithub className="text-green-400" />
    },
    { 
      id: 4, 
      name: 'Latex Engineer', 
      category: 'Academic/Technical', 
      premium: false,
      preview: 'https://www.overleaf.com/latex/templates/tagged/cv',
      features: ['Perfect formatting', 'Mathematical typesetting', 'Version control'],
      source: 'Overleaf',
      link: 'https://www.overleaf.com/latex/templates/sample-cv/wqkdttqjqwqx',
      icon: <SiOverleaf className="text-blue-400" />
    },
  ];
  const features = [
    { 
      icon: <FaRobot className="text-cyan-400" />, 
      title: "AI-Powered Optimization", 
      desc: "Real-time ATS scoring with keyword suggestions from Jobscan",
      link: 'https://www.jobscan.co/'
    },
    { 
      icon: <FaMagic className="text-purple-400" />, 
      title: "Content Enhancer", 
      desc: "Improve bullet points using Rezi's AI writing assistant",
      link: 'https://rezi.io/'
    },
    { 
      icon: <SiGithub className="text-gray-400" />, 
      title: "GitHub Sync", 
      desc: "Auto-import projects using GitHub Readme Stats",
      link: 'https://github.com/anuraghazra/github-readme-stats'
    },
    { 
      icon: <FaLinkedin className="text-blue-400" />, 
      title: "LinkedIn Import", 
      desc: "One-click import from your LinkedIn profile",
      link: 'https://www.linkedin.com/profile/export'
    },
  ];

  const tools = [
    {
      name: "Enhancv",
      desc: "AI-powered resume builder with storytelling approach",
      icon: <FaPalette className="text-pink-500" />,
      link: "https://enhancv.com/"
    },
    {
      name: "Resume.com",
      desc: "Free builder with modern templates",
      icon: <FaFileAlt className="text-green-500" />,
      link: "https://www.resume.com/"
    },
    {
      name: "Latex Templates",
      desc: "Professional academic/technical resumes",
      icon: <SiOverleaf className="text-blue-500" />,
      link: "https://www.overleaf.com/latex/templates/tagged/cv"
    },
    {
      name: "JSON Resume",
      desc: "Developer-friendly standardized format",
      icon: <FaCode className="text-yellow-500" />, // Changed from SiJsonresume
      link: "https://jsonresume.org/"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-12 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative"
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
              animate={{ 
                y: [0, -1000],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center py-20 relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)] -z-10" />
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Developer Resume Builder
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Build tech resumes that pass ATS and impress hiring managers with real templates from top platforms
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-wrap justify-center gap-4">
            <Link 
              to="https://resume.io" 
              target="_blank"
              className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
            >
              <FaCode className="mr-2" /> Resume.io
            </Link>
            <Link 
              to="https://enhancv.com" 
              target="_blank"
              className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              <FaMagic className="mr-2" /> Enhancv
            </Link>
          </motion.div>
        </motion.div>

        {/* Template Gallery */}
        <motion.section variants={itemVariants} className="my-24 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            <FaFileAlt className="inline mr-3" />
            Real Developer Resume Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <motion.div 
                key={template.id}
                whileHover={{ y: -15, boxShadow: "0 15px 40px rgba(0, 212, 255, 0.4)" }}
                onHoverStart={() => setSelectedTemplate(template.id)}
                onHoverEnd={() => setSelectedTemplate(null)}
                className="bg-gray-800/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/40 relative h-full"
              >
                <div className="h-48 relative overflow-hidden bg-gray-900 flex items-center justify-center">
                  {selectedTemplate === template.id ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/80 flex items-center justify-center p-4"
                    >
                      <ul className="text-sm text-gray-200">
                        {template.features.map((feat, i) => (
                          <li key={i} className="flex items-center mb-2">
                            <FaStar className="mr-2 text-cyan-400" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-5xl mb-3 text-cyan-400">
                        {template.id === 3 ? < SiGithub /> : <FaFileAlt />}
                      </div>
                      <p className="text-sm text-gray-400">From {template.source}</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-cyan-300">{template.name}</h3>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {template.source}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{template.category}</p>
                  <div className="mt-4 flex gap-3">
                    <a 
                      href={template.preview} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg transition-all flex items-center justify-center"
                    >
                      <FaEye className="mr-2" /> Preview
                    </a>
                    <a 
                      href={template.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/50 rounded-lg transition-all flex items-center justify-center"
                    >
                      Use Template
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          variants={itemVariants}
          className="my-24 bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-3xl p-12 backdrop-blur-2xl border border-cyan-500/30 relative z-10"
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Advanced Resume Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <a 
                href={feature.link} 
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(0, 212, 255, 0.7)" }}
                  className="bg-gray-900/60 p-6 rounded-2xl border border-gray-700/50 transition-all h-full"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                  <p className="text-cyan-400 text-xs mt-3">Click to explore →</p>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Resume Tools */}
        <motion.section variants={itemVariants} className="my-24">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Recommended Resume Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <a 
                href={tool.link} 
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <motion.div 
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)" }}
                  className="bg-gray-800/70 hover:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all h-full"
                >
                  <div className="text-3xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.desc}</p>
                  <p className="text-cyan-400 text-xs mt-3">Visit site →</p>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div 
          variants={itemVariants}
          className="text-center my-24 relative z-10"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to build your perfect resume?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Get started with these professional tools and templates
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a 
              href="https://resume.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 rounded-full text-xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] transition-all inline-flex items-center"
            >
              <FaDownload className="inline mr-3" />
              Start Building Now
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeBuilding;