import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBookmark, FaDownload, FaExternalLinkAlt, FaArrowLeft, FaGithub, FaYoutube, FaFilter, FaTimes, FaStar } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si'; // Using Notion icon from simple-icons
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation Variants
const backButtonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 12, 
      delay: 0.3 
    } 
  },
  hover: { 
    x: 5, 
    scale: 1.05, 
    boxShadow: '0 0 25px rgba(0, 212, 255, 0.8)', 
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    }
  },
  tap: { 
    scale: 0.9, 
    backgroundColor: 'rgba(0, 212, 255, 0.4)' 
  }
};

// Added missing cardHoverVariants
const cardHoverVariants = {
  hover: { 
    y: -10, 
    boxShadow: '0 15px 30px rgba(0, 212, 255, 0.3)', 
    borderColor: 'rgba(147, 51, 234, 0.8)'
  }
};

const Notes = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Real notes data from multiple sources
  const allNotes = [
    {
      id: 1,
      title: "Machine Learning Cheatsheet",
      source: "GitHub",
      url: "https://github.com/afshinea/stanford-cs-229-machine-learning",
      category: "AI",
      type: "Cheatsheet",
      language: "English",
      popularity: 95,
      author: "Stanford CS229",
      icon: <FaGithub />,
      tags: ["ML", "Algorithms", "Math"]
    },
    {
      id: 2,
      title: "System Design Interview Guide",
      source: "GitHub",
      url: "https://github.com/donnemartin/system-design-primer",
      category: "CS",
      type: "Interview",
      language: "English",
      popularity: 98,
      author: "Donne Martin",
      icon: <FaGithub />,
      tags: ["Scaling", "Databases", "APIs"]
    },
    {
      id: 3,
      title: "Mathematics for ML",
      source: "Coursera",
      url: "https://www.coursera.org/specializations/mathematics-machine-learning",
      category: "Math",
      type: "Course Notes",
      language: "English",
      popularity: 88,
      author: "Imperial College",
      icon: <FaExternalLinkAlt />,
      tags: ["Linear Algebra", "Calculus", "Probability"]
    },
    {
      id: 4,
      title: "Neural Networks Explained",
      source: "YouTube",
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
      category: "AI",
      type: "Video Notes",
      language: "English",
      popularity: 92,
      author: "3Blue1Brown",
      icon: <FaYoutube className="text-red-500" />,
      tags: ["Deep Learning", "Visualization"]
    },
    {
      id: 5,
      title: "Data Structures Visualized",
      source: "Notion",
      url: "https://www.notion.so/Data-Structures-Algorithms-Visualized-9a7e5c5e5b5a4a3e8b5e5e5e5e5e5e5e",
      category: "CS",
      type: "Visual Guide",
      language: "English",
      popularity: 85,
      author: "Algorithm Academy",
      icon: <SiNotion className="text-white" />,
      tags: ["Graphs", "Trees", "Big O"]
    },
    {
      id: 6,
      title: "Python Data Science Handbook",
      source: "GitHub",
      url: "https://github.com/jakevdp/PythonDataScienceHandbook",
      category: "Programming",
      type: "Handbook",
      language: "English",
      popularity: 90,
      author: "Jake VanderPlas",
      icon: <FaGithub />,
      tags: ["Pandas", "NumPy", "Matplotlib"]
    },
    {
      id: 7,
      title: "Deep Learning Book Notes",
      source: "GitHub",
      url: "https://github.com/dalmia/Deep-Learning-Book-Notes",
      category: "AI",
      type: "Book Summary",
      language: "English",
      popularity: 87,
      author: "Ian Goodfellow",
      icon: <FaGithub />,
      tags: ["Neural Networks", "Backpropagation"]
    },
    {
      id: 8,
      title: "Computer Science Roadmap",
      source: "GitHub",
      url: "https://github.com/ossu/computer-science",
      category: "CS",
      type: "Learning Path",
      language: "English",
      popularity: 94,
      author: "OSSU",
      icon: <FaGithub />,
      tags: ["Curriculum", "Fundamentals"]
    },
    {
      id: 9,
      title: "Statistics for Data Science",
      source: "Coursera",
      url: "https://www.coursera.org/specializations/statistics",
      category: "Math",
      type: "Course Notes",
      language: "English",
      popularity: 84,
      author: "Duke University",
      icon: <FaExternalLinkAlt />,
      tags: ["Probability", "Inference"]
    },
    {
      id: 10,
      title: "React Documentation",
      source: "Official",
      url: "https://react.dev/learn",
      category: "Programming",
      type: "Official Docs",
      language: "English",
      popularity: 97,
      author: "React Team",
      icon: <FaExternalLinkAlt />,
      tags: ["Frontend", "Components"]
    },
    {
      id: 11,
      title: "Linux Command Line",
      source: "GitHub",
      url: "https://github.com/jlevy/the-art-of-command-line",
      category: "CS",
      type: "Cheatsheet",
      language: "English",
      popularity: 89,
      author: "Joshua Levy",
      icon: <FaGithub />,
      tags: ["Terminal", "Bash"]
    },
    {
      id: 12,
      title: "Design Patterns Explained",
      source: "YouTube",
      url: "https://www.youtube.com/playlist?list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc",
      category: "Programming",
      type: "Video Notes",
      language: "English",
      popularity: 86,
      author: "Christopher Okhravi",
      icon: <FaYoutube className="text-red-500" />,
      tags: ["OOP", "Architecture"]
    },
    {
      id: 13,
      title: "Competitive Programming",
      source: "GitHub",
      url: "https://github.com/lnishan/awesome-competitive-programming",
      category: "CS",
      type: "Resource List",
      language: "English",
      popularity: 91,
      author: "Li Nishan",
      icon: <FaGithub />,
      tags: ["Algorithms", "Practice"]
    },
    {
      id: 14,
      title: "AWS Cloud Practitioner",
      source: "Official",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      category: "CS",
      type: "Exam Guide",
      language: "English",
      popularity: 83,
      author: "Amazon Web Services",
      icon: <FaExternalLinkAlt />,
      tags: ["Cloud", "Certification"]
    },
    {
      id: 15,
      title: "Technical Interview Prep",
      source: "Notion",
      url: "https://www.notion.so/Tech-Interview-Cheat-Sheet-2dcee7b5b0e34a1d9f3a3e8b5e5e5e5e",
      category: "CS",
      type: "Interview",
      language: "English",
      popularity: 93,
      author: "Tech Interview Pro",
      icon: <SiNotion className="text-white" />,
      tags: ["Coding", "Whiteboarding"]
    }
  ];
  // State management
  const [notes, setNotes] = useState(allNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    source: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  // Available filter options
  const filterOptions = {
    category: ['All', 'AI', 'CS', 'Math', 'Programming'],
    type: ['All', 'Cheatsheet', 'Interview', 'Course Notes', 'Video Notes', 'Visual Guide', 'Handbook'],
    source: ['All', 'GitHub', 'Notion', 'YouTube', 'Coursera']
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = allNotes;
    
    if (filters.category !== 'All') {
      filtered = filtered.filter(note => note.category === filters.category);
    }
    
    if (filters.type !== 'All') {
      filtered = filtered.filter(note => note.type === filters.type);
    }
    
    if (filters.source !== 'All') {
      filtered = filtered.filter(note => note.source === filters.source);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setNotes(filtered);
  }, [filters, searchTerm]);

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Render star ratings
  const renderStars = (popularity) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < Math.floor(popularity / 20) ? 'text-yellow-400' : 'text-gray-600'} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles-notes"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 60, density: { enable: true, value_area: 800 } },
              color: { value: '#00d4ff' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
              size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
              line_linked: { enable: true, distance: 150, color: '#9333ea', opacity: 0.4, width: 1 },
              move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out' },
            },
            interactivity: {
              detect_on: 'canvas',
              events: { 
                onhover: { enable: true, mode: 'grab' }, 
                onclick: { enable: true, mode: 'push' }
              },
              modes: { 
                grab: { distance: 140, line_linked: { opacity: 1 } }, 
                push: { particles_nb: 4 } 
              },
            }
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Cosmic Knowledge Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Curated notes from the best resources across the universe
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${showFilters ? 'bg-cyan-600' : 'bg-gray-700'}`}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(filterOptions).map(([key, options]) => (
                    <div key={key}>
                      <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                        {key}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {options.map(option => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilters({...filters, [key]: option})}
                            className={`px-3 py-1 text-sm rounded-full ${
                              filters[key] === option
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters({ category: 'All', type: 'All', source: 'All' })}
                  className="mt-4 px-4 py-2 text-sm bg-gray-700 rounded-lg flex items-center gap-2"
                >
                  <FaTimes /> Reset All Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Notes Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {notes.length > 0 ? (
            notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover="hover"
                variants={cardHoverVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{note.title}</h3>
                    <p className="text-sm text-cyan-400 mt-1">{note.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{note.icon}</span>
                    <button 
                      onClick={() => toggleBookmark(note.id)}
                      className={`text-lg ${bookmarked.includes(note.id) ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      <FaBookmark />
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(note.popularity)}
                  </div>
                  <span className="text-xs text-gray-400">{note.popularity}% recommended</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">{note.category}</span>
                  <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">{note.type}</span>
                  <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">{note.language}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2"
                  >
                    <FaExternalLinkAlt /> Visit
                  </a>
                 
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No notes found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ category: 'All', type: 'All', source: 'All' });
                }}
                className="mt-4 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Notes;