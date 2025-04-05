// src/pages/IndustryTrends.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaChartLine, FaSearch, FaBookOpen, FaVideo, FaNewspaper, FaArrowRight, FaPlus } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const cardVariants = {
  hover: {
    y: -10,
    boxShadow: "0 10px 25px rgba(0, 212, 255, 0.5)",
    transition: { duration: 0.3 }
  }
};

const tabVariants = {
  selected: { 
    backgroundColor: "rgba(0, 212, 255, 0.2)",
    borderColor: "#00d4ff"
  },
  notSelected: { 
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)"
  }
};

function IndustryTrends() {
  const [activeTab, setActiveTab] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [trendsData, setTrendsData] = useState({
    articles: [],
    videos: [],
    reports: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    summary: '',
    type: 'article',
    url: '',
    duration: ''
  });

  // Fetch real data from Dev.to API and other sources
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch articles from Dev.to API
        const devToResponse = await axios.get('https://dev.to/api/articles?tag=webdev&top=6');
        const devToArticles = devToResponse.data.map(article => ({
          id: article.id,
          title: article.title,
          author: article.user.name,
          date: new Date(article.published_at).toLocaleDateString(),
          summary: article.description,
          type: 'article',
          url: article.url
        }));

        // Fetch YouTube videos (using mock data since API requires key)
        const youtubeVideos = [
          {
            id: 'dQw4w9WgXcQ',
            title: 'React 19 New Features Overview',
            author: 'React Team',
            date: 'May 5, 2024',
            summary: 'Official walkthrough of the upcoming features in React 19.',
            type: 'video',
            duration: '12:45',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          },
          {
            id: '9bZkp7q19f0',
            title: 'Building Microservices with Node.js',
            author: 'Emma Rodriguez',
            date: 'April 20, 2024',
            summary: 'Practical guide to creating scalable microservices architecture.',
            type: 'video',
            duration: '28:30',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
          }
        ];

        // Fetch reports (using mock data)
        const reports = [
          {
            id: '1',
            title: '2024 Developer Ecosystem Survey',
            author: 'JetBrains',
            date: 'March 15, 2024',
            summary: 'Comprehensive analysis of developer tools and preferences worldwide.',
            type: 'report',
            url: 'https://www.jetbrains.com/lp/devecosystem-2024/'
          },
          {
            id: '2',
            title: 'State of JavaScript 2024',
            author: 'JS Foundation',
            date: 'February 28, 2024',
            summary: 'Annual report on JavaScript trends and usage statistics.',
            type: 'report',
            url: 'https://stateofjs.com'
          }
        ];

        setTrendsData({
          articles: devToArticles,
          videos: youtubeVideos,
          reports: reports
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load industry trends. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would send this to your backend
      const newPostData = {
        ...newPost,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString()
      };

      setTrendsData(prev => ({
        ...prev,
        [newPost.type]: [...prev[newPost.type], newPostData]
      }));

      setNewPost({
        title: '',
        author: '',
        summary: '',
        type: 'article',
        url: '',
        duration: ''
      });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding post:', err);
    }
  };

  const filteredItems = trendsData[activeTab].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="bg-cyan-500/20 p-4 rounded-full border border-cyan-500/50">
                <FaChartLine className="text-5xl text-cyan-400" />
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4">
              Industry Trends
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay ahead with the latest insights, expert analysis, and emerging technologies shaping the developer landscape.
            </motion.p>
          </div>

          {/* Action Bar */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search trends..."
                className="w-full bg-gray-800/70 border border-gray-700 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-colors w-full sm:w-auto"
            >
              <FaPlus /> Add Content
            </button>
          </motion.div>

          {/* Add Content Form */}
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/70 border border-cyan-500/30 rounded-xl p-6 mb-8"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Add New Content</h3>
              <form onSubmit={handleAddPost}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Author</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                      value={newPost.author}
                      onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Content Type</label>
                    <select
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                      value={newPost.type}
                      onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                    >
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                      <option value="report">Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">URL</label>
                    <input
                      type="url"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                      value={newPost.url}
                      onChange={(e) => setNewPost({...newPost, url: e.target.value})}
                      required
                    />
                  </div>
                  {newPost.type === 'video' && (
                    <div>
                      <label className="block text-gray-300 mb-2">Duration (mm:ss)</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                        value={newPost.duration}
                        onChange={(e) => setNewPost({...newPost, duration: e.target.value})}
                        placeholder="12:45"
                        required
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Summary</label>
                    <textarea
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500 min-h-[100px]"
                      value={newPost.summary}
                      onChange={(e) => setNewPost({...newPost, summary: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Add Content
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-800/50 rounded-xl p-1">
              <motion.button
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${activeTab === 'articles' ? 'text-cyan-400' : 'text-gray-300'}`}
                onClick={() => setActiveTab('articles')}
                variants={tabVariants}
                animate={activeTab === 'articles' ? 'selected' : 'notSelected'}
              >
                <FaNewspaper /> Articles
              </motion.button>
              <motion.button
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${activeTab === 'videos' ? 'text-cyan-400' : 'text-gray-300'}`}
                onClick={() => setActiveTab('videos')}
                variants={tabVariants}
                animate={activeTab === 'videos' ? 'selected' : 'notSelected'}
              >
                <FaVideo /> Videos
              </motion.button>
              <motion.button
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${activeTab === 'reports' ? 'text-cyan-400' : 'text-gray-300'}`}
                onClick={() => setActiveTab('reports')}
                variants={tabVariants}
                animate={activeTab === 'reports' ? 'selected' : 'notSelected'}
              >
                <FaBookOpen /> Reports
              </motion.button>
            </div>
          </motion.div>

          {/* Loading and Error States */}
          {loading && (
            <motion.div 
              variants={itemVariants}
              className="text-center py-20"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
              <p className="text-xl text-cyan-400">Loading industry trends...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              variants={itemVariants}
              className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center"
            >
              <p className="text-xl text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <>
              {filteredItems.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      // variants={itemVariants}
                      whileHover="hover"
                      variants={cardVariants}
                      className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          {item.type === 'article' && <FaNewspaper className="text-cyan-400" />}
                          {item.type === 'video' && <FaVideo className="text-purple-400" />}
                          {item.type === 'report' && <FaBookOpen className="text-yellow-400" />}
                          <span className="text-sm font-medium text-gray-400">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.summary}</p>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>{item.author}</span>
                          <span>{item.date}</span>
                        </div>
                        {item.type === 'video' && (
                          <div className="mt-3 text-sm text-gray-400">
                            Duration: {item.duration}
                          </div>
                        )}
                      </div>
                      <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-700/50">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2"
                        >
                          View {item.type} <FaArrowRight />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  variants={itemVariants}
                  className="text-center py-12"
                >
                  <p className="text-xl text-gray-400">
                    No {activeTab} found matching your search. Try a different query.
                  </p>
                </motion.div>
              )}
            </>
          )}

          {/* Newsletter CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-8 border border-cyan-500/30"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">Stay Updated</h3>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                Get the latest industry trends delivered to your inbox every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-gray-800/70 border border-gray-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-cyan-500"
                />
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-full transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default IndustryTrends;


// Uncaught TypeError: prev[newPost.type] is not iterable
//     at IndustryTrends.jsx:158:29
//     at basicStateReducer (react-dom_client.js?v=3264903e:4503:47)
//     at updateReducerImpl (react-dom_client.js?v=3264903e:4591:73)
//     at updateReducer (react-dom_client.js?v=3264903e:4536:16)
//     at Object.useState (react-dom_client.js?v=3264903e:16676:20)
//     at exports.useState (chunk-RUPNRBO7.js?v=3264903e:1094:36)
//     at IndustryTrends (IndustryTrends.jsx:49:39)
//     at react-stack-bottom-frame (react-dom_client.js?v=3264903e:16192:20)
//     at renderWithHooks (react-dom_client.js?v=3264903e:4306:24)
//     at updateFunctionComponent (react-dom_client.js?v=3264903e:5972:21)Understand this errorAI