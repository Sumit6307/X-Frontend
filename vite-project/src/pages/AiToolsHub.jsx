import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSearch, FaCode, FaPalette, FaBrain, FaChartLine, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTensorflow, SiOpenai, SiHuggingface, SiGitlab, SiFigma, SiNotion } from 'react-icons/si';

const AiToolsHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'coding', name: 'Code Assistants' },
    { id: 'design', name: 'Design AI' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'analytics', name: 'Data & Analytics' }
  ];

  const tools = [
    { 
      id: 1, 
      name: 'GitHub Copilot', 
      description: 'AI pair programmer that suggests code in real-time', 
      category: 'coding', 
      icon: <FaCode className="text-blue-400" />, 
      popularity: 95,
      link: 'https://github.com/features/copilot',
      features: ['Real-time code suggestions', 'Multi-language support', 'VS Code integration'],
      pricing: 'Free for students, $10/month for professionals',
      launchYear: 2021
    },
    { 
      id: 2, 
      name: 'Figma AI', 
      description: 'AI-powered design tools for UI/UX designers', 
      category: 'design', 
      icon: <SiFigma className="text-purple-400" />, 
      popularity: 88,
      link: 'https://www.figma.com/ai',
      features: ['Auto-layout generation', 'Design suggestions', 'Prototyping assistance'],
      pricing: 'Included in Figma plans',
      launchYear: 2023
    },
    { 
      id: 3, 
      name: 'Tableau GPT', 
      description: 'AI-powered data visualization and analytics', 
      category: 'analytics', 
      icon: <FaChartLine className="text-green-400" />, 
      popularity: 90,
      link: 'https://www.tableau.com/products/ai-analytics',
      features: ['Natural language queries', 'Automated insights', 'Predictive modeling'],
      pricing: 'Included in Tableau plans',
      launchYear: 2022
    },
    { 
      id: 4, 
      name: 'TensorFlow Playground', 
      description: 'Interactive neural network visualization tool', 
      category: 'coding', 
      icon: <SiTensorflow className="text-orange-400" />, 
      popularity: 85,
      link: 'https://playground.tensorflow.org/',
      features: ['Neural network visualization', 'Real-time training', 'Educational tool'],
      pricing: 'Free',
      launchYear: 2016
    },
    { 
      id: 5, 
      name: 'ChatGPT', 
      description: 'Advanced conversational AI by OpenAI', 
      category: 'productivity', 
      icon: <SiOpenai className="text-cyan-400" />, 
      popularity: 99,
      link: 'https://chat.openai.com/',
      features: ['Code generation', 'Content creation', 'Research assistance'],
      pricing: 'Free tier, $20/month for Plus',
      launchYear: 2022
    },
    { 
      id: 6, 
      name: 'Hugging Face', 
      description: 'Platform for AI models and datasets', 
      category: 'coding', 
      icon: <SiHuggingface className="text-yellow-400" />, 
      popularity: 92,
      link: 'https://huggingface.co/',
      features: ['Model hosting', 'Inference API', 'Community models'],
      pricing: 'Free tier, pay-as-you-go for API',
      launchYear: 2016
    },
    { 
      id: 7, 
      name: 'Notion AI', 
      description: 'AI-powered workspace assistant', 
      category: 'productivity', 
      icon: <SiNotion className="text-gray-400" />, 
      popularity: 87,
      link: 'https://www.notion.so/product/ai',
      features: ['Content generation', 'Task automation', 'Knowledge organization'],
      pricing: '$10/month add-on',
      launchYear: 2023
    },
    { 
      id: 8, 
      name: 'GitLab Duo', 
      description: 'AI-powered DevOps assistant', 
      category: 'coding', 
      icon: <SiGitlab className="text-red-400" />, 
      popularity: 83,
      link: 'https://about.gitlab.com/direction/ai-powered/',
      features: ['Code review', 'Vulnerability explanation', 'Test generation'],
      pricing: 'Included in GitLab Ultimate',
      launchYear: 2023
    }
  ];

  const filteredTools = tools.filter(tool => 
    (activeCategory === 'all' || tool.category === activeCategory) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
          >
            AI Developer Tools Hub
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover and compare the best AI tools for developers and designers
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search AI tools by name, category or feature..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-4 px-6 pl-14 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 backdrop-blur-lg transition-all"
              />
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 my-12" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full transition-all ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <motion.div 
                key={tool.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                whileHover={{ y: -5 }} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tool.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <span className="text-gray-400">Pricing: </span>
                      <span className="text-gray-200">{tool.pricing}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Launched: </span>
                      <span className="text-gray-200">{tool.launchYear}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs px-3 py-1 bg-gray-700 rounded-full">
                      {tool.category}
                    </span>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center gap-1 text-purple-400 hover:text-purple-300"
                    >
                      Visit <FaExternalLinkAlt className="text-xs" />
                    </a>
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
                No matching tools found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
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
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 mb-24 bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 md:p-12 border border-cyan-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Want more AI tools?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our curated collections of AI resources for developers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="https://github.com/topics/ai-tools"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
              >
                Browse on GitHub
              </motion.a>
              <motion.a
                href="https://www.futurepedia.io/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-cyan-400 rounded-full font-semibold"
              >
                Explore Futurepedia
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AiToolsHub;