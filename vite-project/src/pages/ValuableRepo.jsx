import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const ValuableRepo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const repoCategories = [
    {
      title: "Frontend Gems",
      icon: "💎",
      language: "JavaScript",
      repos: [
        { 
          name: "react-spring", 
          description: "A spring physics based animation library",
          link: "https://github.com/pmndrs/react-spring",
          stars: "26.5k",
          language: "TypeScript",
          category: "Animation"
        },
        { 
          name: "framer-motion", 
          description: "Production-ready motion library for React",
          link: "https://github.com/framer/motion",
          stars: "19.3k",
          language: "TypeScript",
          category: "Animation"
        },
        { 
          name: "zustand", 
          description: "Bear necessities for state management in React",
          link: "https://github.com/pmndrs/zustand",
          stars: "35.2k",
          language: "TypeScript",
          category: "State Management"
        }
      ]
    },
    {
      title: "Backend Treasures",
      icon: "🏰",
      language: "Multiple",
      repos: [
        { 
          name: "pocketbase", 
          description: "Open Source realtime backend in 1 file",
          link: "https://github.com/pocketbase/pocketbase",
          stars: "25.4k",
          language: "Go",
          category: "Database"
        },
        { 
          name: "meilisearch", 
          description: "Lightning-fast search engine",
          link: "https://github.com/meilisearch/meilisearch",
          stars: "37.6k",
          language: "Rust",
          category: "Search"
        },
        { 
          name: "supabase", 
          description: "Open source Firebase alternative",
          link: "https://github.com/supabase/supabase",
          stars: "54.3k",
          language: "TypeScript",
          category: "Database"
        }
      ]
    },
    {
      title: "AI/ML Goldmines",
      icon: "🧠",
      language: "Python",
      repos: [
        { 
          name: "stable-diffusion-webui", 
          description: "Stable Diffusion web UI",
          link: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
          stars: "58.2k",
          language: "Python",
          category: "AI"
        },
        { 
          name: "langchain", 
          description: "Building applications with LLMs",
          link: "https://github.com/langchain-ai/langchain",
          stars: "67.8k",
          language: "Python",
          category: "AI"
        },
        { 
          name: "transformers", 
          description: "State-of-the-art Machine Learning",
          link: "https://github.com/huggingface/transformers",
          stars: "110k",
          language: "Python",
          category: "ML"
        }
      ]
    },
    {
      title: "Dev Tools",
      icon: "�",
      language: "Multiple",
      repos: [
        { 
          name: "tldraw", 
          description: "A tiny drawing app",
          link: "https://github.com/tldraw/tldraw",
          stars: "16.4k",
          language: "TypeScript",
          category: "Productivity"
        },
        { 
          name: "tabby", 
          description: "Self-hosted AI coding assistant",
          link: "https://github.com/TabbyML/tabby",
          stars: "14.2k",
          language: "Python",
          category: "AI"
        },
        { 
          name: "n8n", 
          description: "Workflow automation tool",
          link: "https://github.com/n8n-io/n8n",
          stars: "34.5k",
          language: "TypeScript",
          category: "Automation"
        }
      ]
    }
  ];

  // Extract all unique categories and languages for filters
  const allCategories = ['All', ...new Set(
    repoCategories.flatMap(cat => 
      cat.repos.map(repo => repo.category)
    )
  )];
  
  const allLanguages = ['All', ...new Set(
    repoCategories.flatMap(cat => 
      cat.repos.map(repo => repo.language)
    )
  )];

  // Filter repos based on search and filters
  const filteredRepos = repoCategories.map(category => ({
    ...category,
    repos: category.repos.filter(repo => 
      (repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       repo.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || repo.category === selectedCategory) &&
      (selectedLanguage === 'All' || repo.language === selectedLanguage)
    )
  })).filter(category => category.repos.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6"
    >
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 mt-30">
        <h1 className="text-4xl font-bold text-neonBlue">Valuable Repositories</h1>
        
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue/50 text-white"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
            >
              {allLanguages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
            
            <button className="px-3 py-1 bg-neonBlue/20 text-neonBlue rounded-lg hover:bg-neonBlue/30 transition-colors border border-neonBlue/50 text-sm">
              Suggest Repo
            </button>
          </div>
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-600"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neonPurple mb-2">No repositories found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {filteredRepos.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <div>
                  <h2 className="text-2xl font-semibold text-neonPurple">{category.title}</h2>
                  <p className="text-gray-400 text-sm">{category.language} • {category.repos.length} repositories</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.repos.map(repo => (
                  <motion.div
                    key={repo.name}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-neonBlue/40 transition-all duration-200"
                  >
                    <a 
                      href={repo.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white hover:text-neonBlue transition-colors">
                          {repo.name}
                        </h3>
                        <span className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                          ⭐ {repo.stars}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{repo.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                          {repo.language}
                        </span>
                        <span className="text-xs bg-neonBlue/10 text-neonBlue px-2 py-1 rounded">
                          {repo.category}
                        </span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-dashed border-gray-600">
        <h3 className="text-xl font-semibold text-neonPurple mb-4">Repository Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavLink 
            to="/paradise/trending-repos" 
            className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-center group"
          >
            <span className="text-2xl mr-3 group-hover:text-yellow-400 transition-colors">🔥</span>
            <div>
              <div className="font-medium">Trending This Week</div>
              <div className="text-sm text-gray-400">See what's gaining popularity</div>
            </div>
          </NavLink>
          <NavLink 
            to="/paradise/underrated-repos" 
            className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-center group"
          >
            <span className="text-2xl mr-3 group-hover:text-green-400 transition-colors">💎</span>
            <div>
              <div className="font-medium">Hidden Gems</div>
              <div className="text-sm text-gray-400">Underrated but valuable repos</div>
            </div>
          </NavLink>
          <NavLink 
            to="/paradise/repo-stats" 
            className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-center group"
          >
            <span className="text-2xl mr-3 group-hover:text-blue-400 transition-colors">📊</span>
            <div>
              <div className="font-medium">Statistics</div>
              <div className="text-sm text-gray-400">Growth metrics and analysis</div>
            </div>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ValuableRepo;