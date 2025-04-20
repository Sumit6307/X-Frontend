import { useState, useRef, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const libraryCategories = [
  {
    title: 'Frontend Development',
    icon: '💻',
    libraries: [
      { name: 'React', description: 'A JavaScript library for building user interfaces', link: 'https://reactjs.org/', stars: '208k' },
      { name: 'Vue.js', description: 'The Progressive JavaScript Framework', link: 'https://vuejs.org/', stars: '204k' },
      { name: 'Angular', description: "The modern web developer's platform", link: 'https://angular.io/', stars: '87.5k' },
      { name: 'Svelte', description: 'Cybernetically enhanced web apps', link: 'https://svelte.dev/', stars: '68.9k' },
    ],
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    libraries: [
      { name: 'Express', description: 'Fast, unopinionated web framework for Node.js', link: 'https://expressjs.com/', stars: '60.5k' },
      { name: 'NestJS', description: 'A progressive Node.js framework', link: 'https://nestjs.com/', stars: '57.8k' },
      { name: 'Django', description: 'The web framework for perfectionists with deadlines', link: 'https://www.djangoproject.com/', stars: '70.1k' },
      { name: 'Spring Boot', description: 'Makes it easy to create stand-alone Java applications', link: 'https://spring.io/projects/spring-boot', stars: '68.3k' },
    ],
  },
  {
    title: 'Data Science & AI',
    icon: '🧠',
    libraries: [
      { name: 'TensorFlow', description: 'End-to-end open source machine learning platform', link: 'https://www.tensorflow.org/', stars: '176k' },
      { name: 'PyTorch', description: 'An open source machine learning framework', link: 'https://pytorch.org/', stars: '67.5k' },
      { name: 'Pandas', description: 'Powerful data structures for data analysis', link: 'https://pandas.pydata.org/', stars: '38.5k' },
      { name: 'NumPy', description: 'The fundamental package for scientific computing', link: 'https://numpy.org/', stars: '23.9k' },
    ],
  },
  {
    title: 'Mobile Development',
    icon: '📱',
    libraries: [
      { name: 'React Native', description: 'Build native apps using React', link: 'https://reactnative.dev/', stars: '110k' },
      { name: 'Flutter', description: "Google's UI toolkit for building beautiful apps", link: 'https://flutter.dev/', stars: '154k' },
      { name: 'Ionic', description: 'Cross-platform mobile app development', link: 'https://ionicframework.com/', stars: '48.9k' },
      { name: 'Xamarin', description: '.NET mobile app platform', link: 'https://dotnet.microsoft.com/apps/xamarin', stars: '8.7k' },
    ],
  },
  {
    title: 'Testing',
    icon: '🧪',
    libraries: [
      { name: 'Jest', description: 'Delightful JavaScript testing', link: 'https://jestjs.io/', stars: '41.9k' },
      { name: 'Cypress', description: 'Fast, easy and reliable testing for anything', link: 'https://www.cypress.io/', stars: '43.4k' },
      { name: 'Selenium', description: 'Browser automation framework', link: 'https://www.selenium.dev/', stars: '26.8k' },
      { name: 'Pytest', description: 'A mature Python testing tool', link: 'https://docs.pytest.org/', stars: '9.8k' },
    ],
  },
  {
    title: 'Utility Libraries',
    icon: '🧰',
    libraries: [
      { name: 'Lodash', description: 'Modern JavaScript utility library', link: 'https://lodash.com/', stars: '56.8k' },
      { name: 'Axios', description: 'Promise based HTTP client', link: 'https://axios-http.com/', stars: '100k' },
      { name: 'Moment.js', description: 'Parse, validate, manipulate dates', link: 'https://momentjs.com/', stars: '47.2k' },
      { name: 'Chart.js', description: 'Simple yet flexible JavaScript charting', link: 'https://www.chartjs.org/', stars: '60.4k' },
    ],
  },
];

const LibraryCard = memo(({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 15 },
    visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)', transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover="hover"
      className="glass-card rounded-xl p-6 transition-all duration-300"
      style={{ perspective: 1000 }}
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{category.icon}</span>
        <h2 className="text-2xl font-semibold text-purple-300">{category.title}</h2>
      </div>
      <ul className="space-y-4">
        {category.libraries.map((lib) => (
          <motion.li
            key={lib.name}
            whileHover={{ x: 5 }}
            className="p-3 hover:bg-gray-700/30 rounded-lg transition-colors"
          >
            <a
              href={lib.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label={`Visit ${lib.name} website`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">{lib.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{lib.description}</p>
                </div>
                <motion.span
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ⭐ <span className="stars-counter">{lib.stars}</span>
                </motion.span>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});

const Libraries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = libraryCategories
    .map((category) => ({
      ...category,
      libraries: category.libraries.filter(
        (lib) =>
          lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lib.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => selectedCategory === 'All' || category.title === selectedCategory);

  const searchVariants = {
    initial: { width: '100%', boxShadow: '0 0 0 rgba(0, 255, 255, 0)' },
    focus: { width: '110%', boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)', transition: { duration: 0.3 } },
  };

  const handleSuggestLibrary = () => {
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto p-6 min-h-screen"
    >
      {/* Sticky Search Bar */}
      <motion.div
        className="sticky z-10 glass-card p-4 rounded-lg mb-8 mt-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-300">GravityX Library Hub</h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <motion.input
              type="text"
              placeholder="Search libraries... (e.g., React)"
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none text-white w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variants={searchVariants}
              initial="initial"
              whileFocus="focus"
              aria-label="Search libraries"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSuggestLibrary}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/50 ripple"
              aria-label="Suggest a library"
            >
              Suggest Library
            </motion.button>
          </div>
        </div>
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['All', ...libraryCategories.map((c) => c.title)].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Library Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCategories.map(
            (category, index) =>
              category.libraries.length > 0 && (
                <LibraryCard key={category.title} category={category} index={index} />
              )
          )}
        </AnimatePresence>
      </div>

      {/* Library Resources */}
      <motion.div
        className="mt-12 glass-card rounded-xl p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Library Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NavLink
            to="/paradise/library-comparisons"
            className="p-4 glass-card rounded-lg hover:bg-gray-700/30 transition-colors flex items-center"
          >
            <span className="text-2xl mr-3">🆚</span>
            <div>
              <div className="font-medium text-white">Framework Comparisons</div>
              <div className="text-sm text-gray-400">React vs Vue, Express vs Koa, etc.</div>
            </div>
          </NavLink>
          <NavLink
            to="/paradise/library-trends"
            className="p-4 glass-card rounded-lg hover:bg-gray-700/30 transition-colors flex items-center"
          >
            <span className="text-2xl mr-3">📈</span>
            <div>
              <div className="font-medium text-white">Trend Analysis</div>
              <div className="text-sm text-gray-400">Popularity trends over time</div>
            </div>
          </NavLink>
          <NavLink
            to="/paradise/library-recommendations"
            className="p-4 glass-card rounded-lg hover:bg-gray-700/30 transition-colors flex items-center"
          >
            <span className="text-2xl mr-3">🏆</span>
            <div>
              <div className="font-medium text-white">Expert Picks</div>
              <div className="text-sm text-gray-400">Recommended libraries by use case</div>
            </div>
          </NavLink>
        </div>
      </motion.div>

      {/* Suggest Library Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-card p-6 rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">Suggest a Library</h3>
              <input
                type="text"
                placeholder="Library Name"
                className="w-full px-4 py-2 mb-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none"
                aria-label="Library name"
              />
              <textarea
                placeholder="Why should we include this library?"
                className="w-full px-4 py-2 mb-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none"
                rows="4"
                aria-label="Library description"
              />
              <div className="flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    alert('Library suggestion submitted! (Simulated)');
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg ripple"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Libraries;