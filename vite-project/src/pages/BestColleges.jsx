import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUniversity, 
  FaBuilding, 
  FaSearch, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaGlobeAsia, 
  FaFilter 
} from 'react-icons/fa';
import { GiSemiClosedEye } from 'react-icons/gi';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const BestColleges = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const colleges = [
    // Government Institutions (1-10)
    {
      id: 1,
      name: "Indian Institute of Technology (IIT Bombay)",
      location: "Mumbai, India",
      type: "Government",
      ranking: 1,
      programs: ["Computer Science", "Mechanical", "Electrical"],
      url: "https://www.iitb.ac.in/",
      acceptanceRate: "0.2%",
      icon: <FaUniversity className="text-orange-500" />,
      tags: ["JEE Advanced", "STEM"]
    },
    {
      id: 2,
      name: "Indian Institute of Science (IISc Bangalore)",
      location: "Bangalore, India",
      type: "Government",
      ranking: 2,
      programs: ["Research", "Engineering", "Science"],
      url: "https://iisc.ac.in/",
      acceptanceRate: "1.5%",
      icon: <FaUniversity className="text-blue-500" />,
      tags: ["Research", "PhD"]
    },
    {
      id: 3,
      name: "IIT Delhi",
      location: "Delhi, India",
      type: "Government",
      ranking: 3,
      programs: ["Computer Science", "Design", "Textile"],
      url: "https://home.iitd.ac.in/",
      acceptanceRate: "0.5%",
      icon: <FaUniversity className="text-orange-400" />,
      tags: ["IIT", "JEE", "Hauz Khas"]
    },
    {
      id: 4,
      name: "IIT Madras",
      location: "Chennai, India",
      type: "Government",
      ranking: 4,
      programs: ["Civil", "Aerospace", "Data Science"],
      url: "https://www.iitm.ac.in/",
      acceptanceRate: "0.7%",
      icon: <FaUniversity className="text-orange-300" />,
      tags: ["IIT", "JEE", "South India"]
    },
    {
      id: 5,
      name: "University of Delhi (DU)",
      location: "Delhi, India",
      type: "Government",
      ranking: 5,
      programs: ["Arts", "Commerce", "Science"],
      url: "https://www.du.ac.in/",
      acceptanceRate: "8%",
      icon: <FaUniversity className="text-green-500" />,
      tags: ["Undergrad", "CUET", "North Campus"]
    },
    {
      id: 6,
      name: "Jawaharlal Nehru University (JNU)",
      location: "Delhi, India",
      type: "Government",
      ranking: 6,
      programs: ["International Relations", "Languages", "Social Sciences"],
      url: "https://www.jnu.ac.in/",
      acceptanceRate: "6%",
      icon: <FaUniversity className="text-blue-400" />,
      tags: ["Research", "PhD", "UGC"]
    },
    {
      id: 7,
      name: "Banaras Hindu University (BHU)",
      location: "Varanasi, India",
      type: "Government",
      ranking: 7,
      programs: ["Medicine", "Arts", "Sanskrit"],
      url: "https://www.bhu.ac.in/",
      acceptanceRate: "10%",
      icon: <FaUniversity className="text-yellow-500" />,
      tags: ["Central University", "Ancient"]
    },
    {
      id: 8,
      name: "University of Mumbai",
      location: "Mumbai, India",
      type: "Government",
      ranking: 8,
      programs: ["Law", "Commerce", "Arts"],
      url: "https://mu.ac.in/",
      acceptanceRate: "15%",
      icon: <FaUniversity className="text-blue-400" />,
      tags: ["Traditional", "Affiliated Colleges"]
    },
    {
      id: 9,
      name: "Indian Statistical Institute (ISI)",
      location: "Kolkata, India",
      type: "Government",
      ranking: 9,
      programs: ["Statistics", "Mathematics", "Computer Science"],
      url: "https://www.isical.ac.in/",
      acceptanceRate: "2%",
      icon: <FaUniversity className="text-purple-500" />,
      tags: ["Research", "ISI Entrance"]
    },
    {
      id: 10,
      name: "All India Institute of Medical Sciences (AIIMS Delhi)",
      location: "Delhi, India",
      type: "Government",
      ranking: 10,
      programs: ["Medicine", "Nursing", "Biotechnology"],
      url: "https://www.aiims.edu/",
      acceptanceRate: "0.1%",
      icon: <FaUniversity className="text-red-500" />,
      tags: ["NEET", "Medical"]
    },
  
    // Private Institutions (11-20)
    {
      id: 11,
      name: "BITS Pilani",
      location: "Pilani, India",
      type: "Private",
      ranking: 11,
      programs: ["Engineering", "Pharmacy", "Management"],
      url: "https://www.bits-pilani.ac.in/",
      acceptanceRate: "3%",
      icon: <FaBuilding className="text-red-500" />,
      tags: ["BITSAT", "Deemed University"]
    },
    {
      id: 12,
      name: "Manipal Academy of Higher Education",
      location: "Manipal, India",
      type: "Private",
      ranking: 12,
      programs: ["Medicine", "Engineering", "Architecture"],
      url: "https://manipal.edu/",
      acceptanceRate: "40%",
      icon: <FaBuilding className="text-purple-500" />,
      tags: ["MET", "International"]
    },
    {
      id: 13,
      name: "Vellore Institute of Technology (VIT)",
      location: "Vellore, India",
      type: "Private",
      ranking: 13,
      programs: ["Computer Science", "Electronics", "Business"],
      url: "https://vit.ac.in/",
      acceptanceRate: "25%",
      icon: <FaBuilding className="text-orange-400" />,
      tags: ["VITEEE", "South India"]
    },
    {
      id: 14,
      name: "SRM Institute of Science and Technology",
      location: "Chennai, India",
      type: "Private",
      ranking: 14,
      programs: ["Medicine", "Engineering", "Dentistry"],
      url: "https://www.srmist.edu.in/",
      acceptanceRate: "30%",
      icon: <FaBuilding className="text-blue-400" />,
      tags: ["SRMJEEE", "Deemed University"]
    },
    {
      id: 15,
      name: "Amity University",
      location: "Noida, India",
      type: "Private",
      ranking: 15,
      programs: ["Law", "Biotech", "Fashion"],
      url: "https://www.amity.edu/",
      acceptanceRate: "50%",
      icon: <FaBuilding className="text-yellow-500" />,
      tags: ["Amity Entrance", "Multi-Campus"]
    },
    {
      id: 16,
      name: "Symbiosis International University",
      location: "Pune, India",
      type: "Private",
      ranking: 16,
      programs: ["Management", "Law", "Media"],
      url: "https://www.siu.edu.in/",
      acceptanceRate: "20%",
      icon: <FaBuilding className="text-purple-400" />,
      tags: ["SET", "Deemed University"]
    },
    {
      id: 17,
      name: "Ashoka University",
      location: "Sonipat, India",
      type: "Private",
      ranking: 17,
      programs: ["Liberal Arts", "Economics", "Psychology"],
      url: "https://ashoka.edu.in/",
      acceptanceRate: "15%",
      icon: <FaBuilding className="text-green-400" />,
      tags: ["Liberal Arts", "Interdisciplinary"]
    },
    {
      id: 18,
      name: "OP Jindal Global University",
      location: "Sonipat, India",
      type: "Private",
      ranking: 18,
      programs: ["Law", "Business", "International Affairs"],
      url: "https://www.jgu.edu.in/",
      acceptanceRate: "25%",
      icon: <FaBuilding className="text-red-400" />,
      tags: ["LSAT", "Private Law School"]
    },
    {
      id: 19,
      name: "Shiv Nadar University",
      location: "Greater Noida, India",
      type: "Private",
      ranking: 19,
      programs: ["Engineering", "Natural Sciences", "Humanities"],
      url: "https://snu.edu.in/",
      acceptanceRate: "20%",
      icon: <FaBuilding className="text-blue-500" />,
      tags: ["SNUSAT", "Research Focus"]
    },
    {
      id: 20,
      name: "Kalinga Institute of Industrial Technology (KIIT)",
      location: "Bhubaneswar, India",
      type: "Private",
      ranking: 20,
      programs: ["Engineering", "Medicine", "Law"],
      url: "https://kiit.ac.in/",
      acceptanceRate: "35%",
      icon: <FaBuilding className="text-orange-500" />,
      tags: ["KIITEE", "Odisha"]
    },
  
    // Semi-Government Institutions (21-30)
    {
      id: 21,
      name: "Delhi Technological University (DTU)",
      location: "Delhi, India",
      type: "Semi-Government",
      ranking: 21,
      programs: ["Engineering", "Management", "Design"],
      url: "https://dtu.ac.in/",
      acceptanceRate: "8%",
      icon: <GiSemiClosedEye className="text-green-500" />,
      tags: ["JAC Delhi", "State Funded"]
    },
    {
      id: 22,
      name: "Netaji Subhas University of Technology (NSUT)",
      location: "Delhi, India",
      type: "Semi-Government",
      ranking: 22,
      programs: ["Computer Science", "Electronics", "Instrumentation"],
      url: "https://nsut.ac.in/",
      acceptanceRate: "10%",
      icon: <GiSemiClosedEye className="text-blue-500" />,
      tags: ["State University", "Delhi"]
    },
    {
      id: 23,
      name: "Jadavpur University",
      location: "Kolkata, India",
      type: "Semi-Government",
      ranking: 23,
      programs: ["Engineering", "Arts", "Science"],
      url: "https://www.jaduniv.edu.in/",
      acceptanceRate: "12%",
      icon: <GiSemiClosedEye className="text-yellow-500" />,
      tags: ["State University", "West Bengal"]
    },
    {
      id: 24,
      name: "Anna University",
      location: "Chennai, India",
      type: "Semi-Government",
      ranking: 24,
      programs: ["Engineering", "Architecture", "Management"],
      url: "https://www.annauniv.edu/",
      acceptanceRate: "10%",
      icon: <GiSemiClosedEye className="text-red-500" />,
      tags: ["TANCET", "South India"]
    },
    {
      id: 25,
      name: "Punjab Engineering College (PEC)",
      location: "Chandigarh, India",
      type: "Semi-Government",
      ranking: 25,
      programs: ["Mechanical", "Civil", "Aerospace"],
      url: "https://www.pec.ac.in/",
      acceptanceRate: "15%",
      icon: <GiSemiClosedEye className="text-orange-500" />,
      tags: ["JEE Main", "Chandigarh"]
    },
    {
      id: 26,
      name: "Thapar Institute of Engineering & Technology",
      location: "Patiala, India",
      type: "Semi-Government",
      ranking: 26,
      programs: ["Computer Science", "Biotech", "Chemical"],
      url: "https://www.thapar.edu/",
      acceptanceRate: "20%",
      icon: <GiSemiClosedEye className="text-purple-500" />,
      tags: ["JEE Main", "Punjab"]
    },
    {
      id: 27,
      name: "Birla Institute of Technology & Science (BITS Goa)",
      location: "Goa, India",
      type: "Semi-Government",
      ranking: 27,
      programs: ["Engineering", "Pharmacy", "Sciences"],
      url: "https://www.bits-pilani.ac.in/goa/",
      acceptanceRate: "5%",
      icon: <GiSemiClosedEye className="text-blue-400" />,
      tags: ["BITSAT", "Goa Campus"]
    },
    {
      id: 28,
      name: "National Institute of Technology (NIT Trichy)",
      location: "Tiruchirappalli, India",
      type: "Semi-Government",
      ranking: 28,
      programs: ["Computer Science", "Electrical", "Civil"],
      url: "https://www.nitt.edu/",
      acceptanceRate: "3%",
      icon: <GiSemiClosedEye className="text-green-400" />,
      tags: ["JEE Main", "NIT"]
    },
    {
      id: 29,
      name: "Visvesvaraya National Institute of Technology (VNIT Nagpur)",
      location: "Nagpur, India",
      type: "Semi-Government",
      ranking: 29,
      programs: ["Mechanical", "Metallurgy", "Architecture"],
      url: "https://vnit.ac.in/",
      acceptanceRate: "4%",
      icon: <GiSemiClosedEye className="text-red-400" />,
      tags: ["JEE Main", "Maharashtra"]
    },
    {
      id: 30,
      name: "Motilal Nehru National Institute of Technology (MNNIT Allahabad)",
      location: "Prayagraj, India",
      type: "Semi-Government",
      ranking: 30,
      programs: ["Computer Science", "Electronics", "Civil"],
      url: "https://www.mnnit.ac.in/",
      acceptanceRate: "5%",
      icon: <GiSemiClosedEye className="text-orange-400" />,
      tags: ["JEE Main", "Uttar Pradesh"]
    }
  ];
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         college.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filters.type === 'All' || college.type === filters.type;
    const matchesLocation = filters.location === 'All' || 
                           college.location.includes(filters.location);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles-colleges"
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

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            University Explorer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover top government, private & semi-government institutions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities or programs..."
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
            >
              <FaFilter /> Filters
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                      UNIVERSITY TYPE
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Government', 'Private', 'Semi-Government'].map(type => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFilters({...filters, type})}
                          className={`px-4 py-2 rounded-full text-sm ${
                            filters.type === type 
                              ? 'bg-cyan-600 text-white' 
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                      LOCATION
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'India'].map(location => (
                        <motion.button
                          key={location}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFilters({...filters, location})}
                          className={`px-4 py-2 rounded-full text-sm ${
                            filters.location === location 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {location}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.length > 0 ? (
            filteredColleges.map(college => (
              <motion.div
                key={college.id}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{college.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-cyan-400">
                      {college.icon}
                      <span className="ml-2">{college.type}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                    #{college.ranking}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm flex items-center">
                    <FaGlobeAsia className="mr-2" /> {college.location}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Acceptance: {college.acceptanceRate}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">TOP PROGRAMS</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.programs.slice(0, 3).map(program => (
                      <span key={program} className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {college.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={college.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg"
                >
                  <FaExternalLinkAlt className="inline mr-2" /> Visit Website
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No universities match your filters</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: 'All', location: 'All' });
                }}
                className="mt-4 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestColleges;