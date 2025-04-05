// src/pages/AICareerGuide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaRobot, FaChartLine, FaUniversity, FaBriefcase, FaSearch, FaArrowRight, FaStar, FaLinkedin, FaGithub } from 'react-icons/fa';

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

function AICareerGuide() {
  const [userData, setUserData] = useState({
    skills: '',
    interests: '',
    experience: 'beginner'
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('paths');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample AI career data - in a real app, this would come from an API
  const careerData = {
    paths: [
      {
        id: 1,
        title: "Machine Learning Engineer",
        description: "Design and implement ML models, work on data pipelines, and deploy AI solutions.",
        salary: "$120,000 - $200,000",
        growth: "35% (Much faster than average)",
        skills: ["Python", "TensorFlow", "PyTorch", "Data Modeling"],
        resources: [
          { name: "Coursera ML Course", url: "https://www.coursera.org/learn/machine-learning" },
          { name: "Fast.ai Practical DL", url: "https://course.fast.ai" }
        ]
      },
      {
        id: 2,
        title: "AI Research Scientist",
        description: "Push boundaries of AI through novel research and algorithm development.",
        salary: "$150,000 - $250,000",
        growth: "25% (Much faster than average)",
        skills: ["Advanced Math", "Research Methods", "PyTorch", "Academic Writing"],
        resources: [
          { name: "ArXiv AI Papers", url: "https://arxiv.org/category/cs/ai" },
          { name: "Deep Learning Book", url: "https://www.deeplearningbook.org" }
        ]
      },
      {
        id: 3,
        title: "Data Scientist",
        description: "Extract insights from complex data using statistical and ML techniques.",
        salary: "$100,000 - $180,000",
        growth: "30% (Much faster than average)",
        skills: ["Python/R", "SQL", "Data Visualization", "Statistics"],
        resources: [
          { name: "Kaggle Competitions", url: "https://www.kaggle.com" },
          { name: "Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" }
        ]
      }
    ],
    skills: [
      {
        id: 1,
        name: "Python Programming",
        importance: "Essential",
        description: "The primary language for AI/ML development with rich libraries.",
        resources: [
          { name: "Python Official Docs", url: "https://docs.python.org/3/" },
          { name: "Real Python Tutorials", url: "https://realpython.com" }
        ]
      },
      {
        id: 2,
        name: "TensorFlow/PyTorch",
        importance: "Core",
        description: "Leading frameworks for building and training neural networks.",
        resources: [
          { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
          { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials" }
        ]
      }
    ],
    courses: [
      {
        id: 1,
        title: "Deep Learning Specialization",
        provider: "DeepLearning.AI (Coursera)",
        level: "Intermediate",
        duration: "5 months",
        rating: "4.9/5",
        url: "https://www.coursera.org/specializations/deep-learning"
      },
      {
        id: 2,
        title: "Advanced AI with TensorFlow",
        provider: "Google Cloud",
        level: "Advanced",
        duration: "6 weeks",
        rating: "4.7/5",
        url: "https://www.coursera.org/learn/advanced-tensorflow"
      }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const generateRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call your AI recommendation API
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock recommendations based on user input
      const mockRecommendations = {
        primaryPath: careerData.paths[0],
        alternativePaths: [careerData.paths[1], careerData.paths[2]],
        skillsToLearn: careerData.skills.slice(0, 3),
        recommendedCourses: careerData.courses.slice(0, 2),
        jobMarketInsights: {
          growth: "Exploding demand across industries",
          hotAreas: "Healthcare AI, Autonomous Systems, NLP"
        }
      };
      
      setRecommendations(mockRecommendations);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = careerData[activeTab].filter(item =>
    (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <div className="bg-purple-500/20 p-4 rounded-full border border-purple-500/50">
                <FaRobot className="text-5xl text-purple-400" />
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
              AI Career Guide
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Personalized roadmap to your dream career in Artificial Intelligence
            </motion.p>
          </div>

          {/* AI Recommendation Engine */}
          <motion.div variants={itemVariants} className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Get Personalized Recommendations</h2>
            <form onSubmit={generateRecommendations} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Your Current Skills</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="Python, Data Analysis, etc."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500"
                  value={userData.skills}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Your Interests</label>
                <input
                  type="text"
                  name="interests"
                  placeholder="Computer Vision, NLP, Robotics, etc."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500"
                  value={userData.interests}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Experience Level</label>
                <select
                  name="experience"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500"
                  value={userData.experience}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaRobot /> Generate My AI Career Path
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </motion.div>

          {/* Recommendations Display */}
          {recommendations && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">Your AI Career Roadmap</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Primary Career Path */}
                <motion.div 
                  whileHover="hover"
                  variants={cardVariants}
                  className="bg-gray-800/70 border border-cyan-500/50 rounded-xl p-6 col-span-1 lg:col-span-2"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-cyan-500/20 p-2 rounded-full">
                      <FaStar className="text-cyan-400 text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-400">Recommended Path</h3>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">{recommendations.primaryPath.title}</h4>
                  <p className="text-gray-300 mb-4">{recommendations.primaryPath.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Average Salary</p>
                      <p className="text-lg font-semibold text-cyan-400">{recommendations.primaryPath.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Job Growth</p>
                      <p className="text-lg font-semibold text-purple-400">{recommendations.primaryPath.growth}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Key Skills Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.primaryPath.skills.map((skill, i) => (
                        <span key={i} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Learning Resources</p>
                    <ul className="space-y-2">
                      {recommendations.primaryPath.resources.map((resource, i) => (
                        <li key={i}>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                          >
                            {resource.name} <FaArrowRight className="text-xs" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                {/* Job Market Insights */}
                <motion.div 
                  whileHover="hover"
                  variants={cardVariants}
                  className="bg-gray-800/70 border border-purple-500/50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <FaChartLine className="text-purple-400 text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-400">Market Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Industry Growth</h4>
                      <p className="text-gray-300">{recommendations.jobMarketInsights.growth}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Hot Areas</h4>
                      <p className="text-gray-300">{recommendations.jobMarketInsights.hotAreas}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Networking Tips</h4>
                      <div className="flex gap-4">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                          <FaGithub className="text-2xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Alternative Paths */}
              <h3 className="text-2xl font-bold text-white mb-4">Alternative Career Paths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {recommendations.alternativePaths.map((path, i) => (
                  <motion.div
                    key={i}
                    whileHover="hover"
                    variants={cardVariants}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{path.title}</h4>
                    <p className="text-gray-300 mb-4">{path.description}</p>
                    <div className="flex justify-between text-sm text-gray-400 mb-3">
                      <span>Salary: {path.salary}</span>
                      <span>Growth: {path.growth}</span>
                    </div>
                    <a 
                      href={path.resources[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 text-sm"
                    >
                      Learn more <FaArrowRight />
                    </a>
                  </motion.div>
                ))}
              </div>
              
              {/* Skills Development */}
              <h3 className="text-2xl font-bold text-white mb-4">Skills to Focus On</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {recommendations.skillsToLearn.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover="hover"
                    variants={cardVariants}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        skill.importance === 'Essential' ? 'bg-red-500/20 text-red-400' : 
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {skill.importance}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{skill.name}</h4>
                    <p className="text-gray-300 mb-4">{skill.description}</p>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Resources:</p>
                      <ul className="space-y-1">
                        {skill.resources.map((resource, j) => (
                          <li key={j}>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                            >
                              {resource.name} <FaArrowRight className="text-xs" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Recommended Courses */}
              <h3 className="text-2xl font-bold text-white mb-4">Recommended Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.recommendedCourses.map((course, i) => (
                  <motion.div
                    key={i}
                    whileHover="hover"
                    variants={cardVariants}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-bold text-white mb-1">{course.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{course.provider}</p>
                    <div className="flex gap-4 text-sm mb-4">
                      <span className="text-gray-300">Level: {course.level}</span>
                      <span className="text-gray-300">Duration: {course.duration}</span>
                      <span className="text-yellow-400 flex items-center gap-1">
                        <FaStar /> {course.rating}
                      </span>
                    </div>
                    <a 
                      href={course.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2"
                    >
                      View Course <FaArrowRight />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Career Explorer Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold text-purple-400">AI Career Explorer</h2>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search careers..."
                  className="w-full bg-gray-800/70 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-800/50 rounded-xl p-1">
                <button
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'paths' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'text-gray-300'}`}
                  onClick={() => setActiveTab('paths')}
                >
                  <FaBriefcase /> Career Paths
                </button>
                <button
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'skills' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'text-gray-300'}`}
                  onClick={() => setActiveTab('skills')}
                >
                  <FaChartLine /> Key Skills
                </button>
                <button
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'courses' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'text-gray-300'}`}
                  onClick={() => setActiveTab('courses')}
                >
                  <FaUniversity /> Courses
                </button>
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover="hover"
                    variants={cardVariants}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    {activeTab === 'paths' && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Salary: {item.salary}</span>
                          <span>Growth: {item.growth}</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'skills' && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>
                        <span className="text-sm text-purple-400">{item.importance} Skill</span>
                      </>
                    )}
                    {activeTab === 'courses' && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{item.provider}</p>
                        <div className="flex gap-4 text-sm mb-4">
                          <span className="text-gray-300">Level: {item.level}</span>
                          <span className="text-gray-300">Duration: {item.duration}</span>
                        </div>
                      </>
                    )}
                    <div className="mt-4">
                      <a 
                        href={item.resources?.[0]?.url || item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2"
                      >
                        Learn more <FaArrowRight />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No {activeTab} found matching your search.</p>
              </div>
            )}
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your AI Career?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Join our AI Career Accelerator program and get 1:1 mentorship, project experience, and job placement support.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Apply Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AICareerGuide;