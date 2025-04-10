// src/pages/Roadmap.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  FaMapMarkedAlt, 
  FaExternalLinkAlt, 
  FaSearch, 
  FaStar,
  FaPython,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaDatabase,
  FaShieldAlt,
  FaAndroid,
  FaApple,
  FaGamepad,
  FaPenFancy,
  FaProjectDiagram,
  FaGraduationCap,
  FaJava,
  FaJs,
  FaCode,
  FaServer,
  FaRobot,
  FaMobile,
  FaPaintBrush,
  FaLaptopCode
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiKubernetes, 
  SiPostgresql, 
  SiMongodb,
  SiRedis,
  SiTensorflow,
  SiPytorch,
  SiGraphql,
  SiBlockchaindotcom,
  SiRust,
  SiGo,
  SiCplusplus,
  SiPhp,
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,
  SiSpring,
  
  SiTerraform,
  SiCloudflare,
  SiDotnet
} from 'react-icons/si';
import { DiScrum } from 'react-icons/di';

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
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)",
    transition: { duration: 0.3 }
  }
};

const technologyIcons = {
  // Role-based icons
  'Frontend Developer': <FaCode className="text-blue-500" />,
  'Backend Developer': <FaServer className="text-green-500" />,
  'DevOps Engineer': <FaServer className="text-purple-500" />,
  'Full Stack Developer': <FaLaptopCode className="text-cyan-500" />,
  'AI Engineer': <FaRobot className="text-pink-500" />,
  'Data Analyst': <SiTensorflow className="text-orange-500" />,
  'AI and Data Scientist': <SiPytorch className="text-red-500" />,
  'Android Developer': <FaAndroid className="text-emerald-500" />,
  'iOS Developer': <FaApple className="text-gray-300" />,
  'PostgreSQL DBA': <SiPostgresql className="text-blue-400" />,
  'Blockchain Developer': <SiBlockchaindotcom className="text-yellow-500" />,
  'QA Engineer': <FaShieldAlt className="text-yellow-500" />,
  'Software Architect': <FaProjectDiagram className="text-cyan-500" />,
  'Cyber Security': <FaShieldAlt className="text-red-600" />,
  'UX Designer': <FaPaintBrush className="text-fuchsia-500" />,
  'Game Developer': <FaGamepad className="text-green-400" />,
  'Technical Writer': <FaPenFancy className="text-gray-400" />,
  'MLOps': <SiTensorflow className="text-red-400" />,
  'Product Manager': <DiScrum className="text-indigo-500" />,
  'Engineering Manager': <FaProjectDiagram className="text-blue-600" />,
  'Developer Relations': <FaPenFancy className="text-purple-400" />,
  
  // Skill-based icons
  'SQL': <FaDatabase className="text-blue-400" />,
  'Computer Science': <FaGraduationCap className="text-white" />,
  'React': <FaReact className="text-cyan-400" />,
  'Vue': <SiVuedotjs className="text-green-500" />,
  'Angular': <SiAngular className="text-red-500" />,
  'JavaScript': <FaJs className="text-yellow-400" />,
  'Node.js': <FaNodeJs className="text-green-600" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'Python': <FaPython className="text-blue-400" />,
  'System Design': <FaServer className="text-amber-500" />,
  'API Design': <FaServer className="text-blue-300" />,
  'ASP.NET Core': <SiDotnet className="text-purple-600" />,
  'Java': <FaJava className="text-red-500" />,
  'C++': <SiCplusplus className="text-blue-500" />,
  'Flutter': <SiFlutter className="text-blue-500" />,
  'Spring Boot': <SiSpring className="text-green-500" />,
  'Go': <SiGo className="text-cyan-500" />,
  'Rust': <SiRust className="text-orange-600" />,
  'GraphQL': <SiGraphql className="text-pink-500" />,
  'Design and Architecture': <FaProjectDiagram className="text-purple-400" />,
  'Design System': <FaPaintBrush className="text-blue-400" />,
  'React Native': <FaReact className="text-blue-400" />,
  'AWS': <FaCode className="text-orange-400" />,
  'Code Review': <FaCode className="text-green-400" />,
  'Docker': <FaDocker className="text-blue-500" />,
  'Kubernetes': <SiKubernetes className="text-blue-500" />,
  'Linux': <FaLaptopCode className="text-yellow-400" />,
  'MongoDB': <SiMongodb className="text-green-500" />,
  'Prompt Engineering': <FaRobot className="text-purple-400" />,
  'Terraform': <SiTerraform className="text-purple-500" />,
  'Data Structures & Algorithms': <FaGraduationCap className="text-blue-400" />,
  'Git and GitHub': <FaCode className="text-orange-500" />,
  'Redis': <SiRedis className="text-red-600" />,
  'PHP': <SiPhp className="text-purple-500" />,
  'Cloudflare': <SiCloudflare className="text-orange-500" />,
  'Swift': <SiSwift className="text-orange-500" />,
  'Kotlin': <SiKotlin className="text-purple-400" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" />
};

const roleBasedRoadmaps = [
  {
    title: 'Frontend Developer',
    url: 'https://roadmap.sh/frontend',
    category: 'Development',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'Master HTML, CSS, JavaScript and modern frameworks to build user interfaces',
    icon: technologyIcons['Frontend Developer'],
    isPopular: true
  },
  {
    title: 'Backend Developer',
    url: 'https://roadmap.sh/backend',
    category: 'Development',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'Learn server-side programming, databases, APIs and system design',
    icon: technologyIcons['Backend Developer'],
    isPopular: true
  },
  {
    title: 'DevOps Engineer',
    url: 'https://roadmap.sh/devops',
    category: 'Operations',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Master CI/CD, cloud infrastructure, monitoring and automation',
    icon: technologyIcons['DevOps Engineer'],
    isPopular: true
  },
  {
    title: 'Full Stack Developer',
    url: 'https://roadmap.sh/full-stack',
    category: 'Development',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Combine frontend and backend skills to build complete applications',
    icon: technologyIcons['Full Stack Developer'],
    isPopular: true
  },
  {
    title: 'AI Engineer',
    url: 'https://roadmap.sh/ai-data-scientist',
    category: 'AI/ML',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Path to becoming an AI/Data Science professional',
    icon: technologyIcons['AI Engineer']
  },
  {
    title: 'Data Analyst',
    url: 'https://roadmap.sh/data-analyst',
    category: 'Data',
    type: 'role',
    level: 'Beginner to Intermediate',
    description: 'Guide to becoming a data analyst',
    icon: technologyIcons['Data Analyst']
  },
  {
    title: 'AI and Data Scientist',
    url: 'https://roadmap.sh/ai-data-scientist',
    category: 'AI/ML',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive data science and AI learning path',
    icon: technologyIcons['AI and Data Scientist']
  },
  {
    title: 'Android Developer',
    url: 'https://roadmap.sh/android',
    category: 'Mobile',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'Android app development roadmap',
    icon: technologyIcons['Android Developer']
  },
  {
    title: 'iOS Developer',
    url: 'https://roadmap.sh/ios',
    category: 'Mobile',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'iOS app development roadmap',
    icon: technologyIcons['iOS Developer']
  },
  {
    title: 'PostgreSQL DBA',
    url: 'https://roadmap.sh/postgresql-dba',
    category: 'Database',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'PostgreSQL database administration guide',
    icon: technologyIcons['PostgreSQL DBA']
  },
  {
    title: 'Blockchain Developer',
    url: 'https://roadmap.sh/blockchain',
    category: 'Blockchain',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Step by step guide to becoming a blockchain developer',
    icon: technologyIcons['Blockchain Developer']
  },
  {
    title: 'QA Engineer',
    url: 'https://roadmap.sh/qa',
    category: 'Testing',
    type: 'role',
    level: 'Beginner to Intermediate',
    description: 'Quality assurance engineering path',
    icon: technologyIcons['QA Engineer']
  },
  {
    title: 'Software Architect',
    url: 'https://roadmap.sh/software-architect',
    category: 'Architecture',
    type: 'role',
    level: 'Advanced',
    description: 'Guide to becoming a software architect',
    icon: technologyIcons['Software Architect']
  },
  {
    title: 'Cyber Security',
    url: 'https://roadmap.sh/cyber-security',
    category: 'Security',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Cybersecurity learning path',
    icon: technologyIcons['Cyber Security']
  },
  {
    title: 'UX Designer',
    url: 'https://roadmap.sh/ux-design',
    category: 'Design',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'User experience design roadmap',
    icon: technologyIcons['UX Designer']
  },
  {
    title: 'Game Developer',
    url: 'https://roadmap.sh/game-developer',
    category: 'Gaming',
    type: 'role',
    level: 'Beginner to Advanced',
    description: 'Game development learning path',
    icon: technologyIcons['Game Developer']
  },
  {
    title: 'Technical Writer',
    url: 'https://roadmap.sh/technical-writer',
    category: 'Documentation',
    type: 'role',
    level: 'Beginner to Intermediate',
    description: 'Technical writing career guide',
    icon: technologyIcons['Technical Writer']
  },
  {
    title: 'MLOps',
    url: 'https://roadmap.sh/mlops',
    category: 'AI/ML',
    type: 'role',
    level: 'Advanced',
    description: 'Machine Learning Operations roadmap',
    icon: technologyIcons['MLOps']
  },
  {
    title: 'Product Manager',
    url: 'https://roadmap.sh/product-manager',
    category: 'Management',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Product management career path',
    icon: technologyIcons['Product Manager']
  },
  {
    title: 'Engineering Manager',
    url: 'https://roadmap.sh/engineering-manager',
    category: 'Management',
    type: 'role',
    level: 'Advanced',
    description: 'Engineering management guide',
    icon: technologyIcons['Engineering Manager']
  },
  {
    title: 'Developer Relations',
    url: 'https://roadmap.sh/developer-relations',
    category: 'Community',
    type: 'role',
    level: 'Intermediate to Advanced',
    description: 'Developer advocacy and relations path',
    icon: technologyIcons['Developer Relations']
  }
];

const skillBasedRoadmaps = [
  {
    title: 'React',
    url: 'https://roadmap.sh/react',
    category: 'Frontend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Learn React.js, hooks, state management and ecosystem tools',
    icon: technologyIcons['React'],
    isPopular: true
  },
  {
    title: 'JavaScript',
    url: 'https://roadmap.sh/javascript',
    category: 'Frontend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Master JavaScript programming language fundamentals',
    icon: technologyIcons['JavaScript'],
    isPopular: true
  },
  {
    title: 'Python',
    url: 'https://roadmap.sh/python',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Master Python programming and popular frameworks',
    icon: technologyIcons['Python'],
    isPopular: true
  },
  {
    title: 'Node.js',
    url: 'https://roadmap.sh/nodejs',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Learn JavaScript runtime and backend development',
    icon: technologyIcons['Node.js']
  },
  {
    title: 'TypeScript',
    url: 'https://roadmap.sh/typescript',
    category: 'Frontend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'TypeScript programming language roadmap',
    icon: technologyIcons['TypeScript']
  },
  {
    title: 'SQL',
    url: 'https://roadmap.sh/sql',
    category: 'Database',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Structured Query Language learning path',
    icon: technologyIcons['SQL']
  },
  {
    title: 'Computer Science',
    url: 'https://roadmap.sh/computer-science',
    category: 'Fundamentals',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Computer science fundamentals',
    icon: technologyIcons['Computer Science']
  },
  {
    title: 'System Design',
    url: 'https://roadmap.sh/system-design',
    category: 'Architecture',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Large scale system design principles',
    icon: technologyIcons['System Design']
  },
  {
    title: 'Docker',
    url: 'https://roadmap.sh/docker',
    category: 'DevOps',
    type: 'skill',
    level: 'Beginner to Intermediate',
    description: 'Master containerization and deployment with Docker',
    icon: technologyIcons['Docker']
  },
  {
    title: 'Kubernetes',
    url: 'https://roadmap.sh/kubernetes',
    category: 'DevOps',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Container orchestration with Kubernetes',
    icon: technologyIcons['Kubernetes']
  },
  {
    title: 'AWS',
    url: 'https://roadmap.sh/aws',
    category: 'Cloud',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Learn Amazon Web Services and cloud architecture',
    icon: technologyIcons['AWS']
  },
  {
    title: 'Data Structures & Algorithms',
    url: 'https://roadmap.sh/computer-science',
    category: 'Fundamentals',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Core computer science concepts for interviews',
    icon: technologyIcons['Data Structures & Algorithms']
  },
  {
    title: 'Git and GitHub',
    url: 'https://roadmap.sh/git',
    category: 'Tools',
    type: 'skill',
    level: 'Beginner to Intermediate',
    description: 'Version control with Git and GitHub',
    icon: technologyIcons['Git and GitHub']
  },
  {
    title: 'Redis',
    url: 'https://roadmap.sh/redis',
    category: 'Database',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'In-memory data structure store',
    icon: technologyIcons['Redis']
  },
  {
    title: 'PHP',
    url: 'https://roadmap.sh/php',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'PHP web development roadmap',
    icon: technologyIcons['PHP']
  },
  {
    title: 'Cloudflare',
    url: 'https://roadmap.sh/cloudflare',
    category: 'DevOps',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Cloudflare services and CDN',
    icon: technologyIcons['Cloudflare']
  },
  {
    title: 'Vue',
    url: 'https://roadmap.sh/vue',
    category: 'Frontend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Vue.js framework learning path',
    icon: technologyIcons['Vue']
  },
  {
    title: 'Angular',
    url: 'https://roadmap.sh/angular',
    category: 'Frontend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Angular framework roadmap',
    icon: technologyIcons['Angular']
  },
  {
    title: 'API Design',
    url: 'https://roadmap.sh/api-design',
    category: 'Backend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'REST and GraphQL API design principles',
    icon: technologyIcons['API Design']
  },
  {
    title: 'ASP.NET Core',
    url: 'https://roadmap.sh/aspnet-core',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Microsoft .NET framework for web apps',
    icon: technologyIcons['ASP.NET Core']
  },
  {
    title: 'Java',
    url: 'https://roadmap.sh/java',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Java programming language roadmap',
    icon: technologyIcons['Java']
  },
  {
    title: 'C++',
    url: 'https://roadmap.sh/cpp',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'C++ programming language guide',
    icon: technologyIcons['C++']
  },
  {
    title: 'Flutter',
    url: 'https://roadmap.sh/flutter',
    category: 'Mobile',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Flutter cross-platform development',
    icon: technologyIcons['Flutter']
  },
  {
    title: 'Spring Boot',
    url: 'https://roadmap.sh/spring-boot',
    category: 'Backend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Java Spring Boot framework',
    icon: technologyIcons['Spring Boot']
  },
  {
    title: 'Go',
    url: 'https://roadmap.sh/golang',
    category: 'Backend',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Go programming language roadmap',
    icon: technologyIcons['Go']
  },
  {
    title: 'Rust',
    url: 'https://roadmap.sh/rust',
    category: 'Backend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Rust systems programming language',
    icon: technologyIcons['Rust']
  },
  {
    title: 'GraphQL',
    url: 'https://roadmap.sh/graphql',
    category: 'Backend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'GraphQL query language',
    icon: technologyIcons['GraphQL']
  },
  {
    title: 'Design and Architecture',
    url: 'https://roadmap.sh/software-design-architecture',
    category: 'Architecture',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Software design patterns and principles',
    icon: technologyIcons['Design and Architecture']
  },
  {
    title: 'Design System',
    url: 'https://roadmap.sh/design-system',
    category: 'Design',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Creating consistent UI design systems',
    icon: technologyIcons['Design System']
  },
  {
    title: 'React Native',
    url: 'https://roadmap.sh/react-native',
    category: 'Mobile',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Cross-platform mobile development',
    icon: technologyIcons['React Native']
  },
  {
    title: 'Code Review',
    url: 'https://roadmap.sh/code-review',
    category: 'Best Practices',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Effective code review practices',
    icon: technologyIcons['Code Review']
  },
  {
    title: 'Linux',
    url: 'https://roadmap.sh/linux',
    category: 'DevOps',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Linux administration and shell scripting',
    icon: technologyIcons['Linux']
  },
  {
    title: 'MongoDB',
    url: 'https://roadmap.sh/mongodb',
    category: 'Database',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'NoSQL database with MongoDB',
    icon: technologyIcons['MongoDB']
  },
  {
    title: 'Prompt Engineering',
    url: 'https://roadmap.sh/prompt-engineering',
    category: 'AI/ML',
    type: 'skill',
    level: 'Beginner to Intermediate',
    description: 'AI prompt engineering guide',
    icon: technologyIcons['Prompt Engineering']
  },
  {
    title: 'Terraform',
    url: 'https://roadmap.sh/terraform',
    category: 'DevOps',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'Infrastructure as code with Terraform',
    icon: technologyIcons['Terraform']
  },
  {
    title: 'Swift',
    url: 'https://roadmap.sh/swift',
    category: 'Mobile',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Swift programming for iOS',
    icon: technologyIcons['Swift']
  },
  {
    title: 'Kotlin',
    url: 'https://roadmap.sh/kotlin',
    category: 'Mobile',
    type: 'skill',
    level: 'Beginner to Advanced',
    description: 'Kotlin for Android development',
    icon: technologyIcons['Kotlin']
  },
  {
    title: 'Next.js',
    url: 'https://roadmap.sh/nextjs',
    category: 'Frontend',
    type: 'skill',
    level: 'Intermediate to Advanced',
    description: 'React framework for production',
    icon: technologyIcons['Next.js']
  }
];

const allRoadmaps = [...roleBasedRoadmaps, ...skillBasedRoadmaps];
const allCategories = [...new Set(allRoadmaps.map(item => item.category))];
const popularRoadmaps = allRoadmaps.filter(roadmap => roadmap.isPopular);

function Roadmap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRoadmaps = allRoadmaps
    .filter(roadmap => {
      const matchesSearch = 
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.level.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'role' && roadmap.type === 'role') || 
        (activeTab === 'skill' && roadmap.type === 'skill');
      
      const matchesCategory = 
        activeCategory === 'all' || 
        roadmap.category === activeCategory ||
        (activeCategory === 'Popular' && roadmap.isPopular);
      
      return matchesSearch && matchesTab && matchesCategory;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)] -z-10" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="bg-cyan-500/20 p-4 rounded-full border border-cyan-500/50">
                <FaMapMarkedAlt className="text-5xl text-cyan-400" />
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4">
              Developer Roadmaps
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive guides to help developers choose their path and guide their learning journey
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search roadmaps by title, description, category or level..."
                className="w-full bg-gray-800/70 border border-gray-700 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex rounded-md bg-gray-800/50 p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                All Roadmaps
              </button>
              <button
                onClick={() => setActiveTab('role')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'role' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                Role Based
              </button>
              <button
                onClick={() => setActiveTab('skill')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'skill' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                Skill Based
              </button>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 ${activeCategory === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                All Categories
              </button>
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 ${activeCategory === category ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() => setActiveCategory('Popular')}
                className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 ${activeCategory === 'Popular' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
              >
                <FaStar className="text-yellow-400" />
                Popular
              </button>
            </div>
          </motion.div>

          {/* Roadmaps Grid */}
          {filteredRoadmaps.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRoadmaps.map((roadmap, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`relative bg-gray-800/50 border rounded-xl overflow-hidden transition-all duration-300 ${roadmap.isPopular ? 'border-yellow-500/30 hover:border-yellow-500/50' : 'border-gray-700 hover:border-cyan-500/50'}`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {roadmap.icon}
                        </div>
                        <div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${roadmap.isPopular ? 'bg-yellow-500/20 text-yellow-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                            {roadmap.category}
                          </span>
                          <span className="block text-xs font-medium mt-1 text-gray-400">
                            {roadmap.type === 'role' ? 'Career Path' : 'Technology'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
                        {roadmap.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{roadmap.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{roadmap.description}</p>
                    <div className="flex justify-between items-center">
                      {roadmap.isPopular && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center gap-1">
                          <FaStar className="text-xs" /> Popular
                        </span>
                      )}
                      <a 
                        href={roadmap.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-sm"
                      >
                        View Roadmap <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No roadmaps found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                  setActiveCategory('all');
                }}
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* Footer CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-8 border border-cyan-500/30 text-center"
          >
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Want to create your own roadmap?</h3>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Contribute to the community by creating and sharing your own developer roadmap
            </p>
            <a
              href="https://github.com/kamranahmedse/developer-roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
            >
              Contribute on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Roadmap;