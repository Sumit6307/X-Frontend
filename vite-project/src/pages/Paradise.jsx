import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Globe from 'react-globe.gl';
import Navbar from '../components/Navbar';
import { FaRocket, FaCode, FaGlobe, FaStar, FaFileAlt, FaBrain, FaLightbulb, FaChartLine, FaRobot, FaMapMarkedAlt, FaArrowLeft } from 'react-icons/fa';

// Animation Variants for Back Button
const backButtonVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      delay: 0.3,
    },
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
    },
  },
  tap: {
    scale: 0.9,
    backgroundColor: 'rgba(0, 212, 255, 0.4)',
  },
};

// Other Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  hover: { scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 1)', rotate: 2, transition: { duration: 0.3 } },
};
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  hover: { scale: 1.1, boxShadow: '0 0 50px rgba(147, 51, 234, 0.8)', transition: { duration: 0.3 } },
};
const textVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.2 } }),
};

function Paradise() {
  const navigate = useNavigate();

  // GravityX Integration Points Worldwide
  const pointsData = [
    { lat: 40.7128, lng: -74.0060, label: 'New York', size: 0.8 },
    { lat: 51.5074, lng: -0.1278, label: 'London', size: 0.8 },
    { lat: 35.6762, lng: 139.6503, label: 'Tokyo', size: 0.8 },
    { lat: -33.8688, lng: 151.2093, label: 'Sydney', size: 0.8 },
    { lat: 28.6139, lng: 77.2090, label: 'New Delhi', size: 0.8 },
    { lat: -23.5505, lng: -46.6333, label: 'São Paulo', size: 0.8 },
  ];

  // Arcs connecting points for a global network effect
  const arcsData = [
    { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278, color: '#00d4ff' },
    { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503, color: '#9333ea' },
    { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093, color: '#00d4ff' },
    { startLat: -33.8688, startLng: 151.2093, endLat: 28.6139, endLng: 77.2090, color: '#9333ea' },
    { startLat: 28.6139, startLng: 77.2090, endLat: -23.5505, endLng: -46.6333, color: '#00d4ff' },
    { startLat: -23.5505, startLng: -46.6333, endLat: 40.7128, endLng: -74.0060, color: '#9333ea' },
  ];

  // Debug log
  useEffect(() => {
    console.log('Paradise.jsx: Component mounted');
    console.log('Paradise.jsx: Star-like particles rendered in hero section', {
      particleCount: 20,
      color: 'bg-cyan-400',
      size: '1x1px',
      animation: 'falling, fading, 5-10s duration',
    });
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative">
      <Navbar />
      {/* Back Button */}
      <motion.button
        variants={backButtonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate(-1)}
        className="fixed top-30 left-6 z-20 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black/80 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-base md:text-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:text-purple-400 animate-[pulse_3s_infinite]"
      >
        <FaArrowLeft className="text-lg md:text-xl" /> Back
      </motion.button>

      <div className="pt-24 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.3)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />

        {/* Hero Section with Star-Like Particles */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center py-24 relative"
        >
          <div className="relative z-10">
            <motion.h1
              className="text-7xl md:text-9xl font-extrabold tracking-widest neon-heading"
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {['One', 'Platform', 'for', 'Global', 'Developers'].map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  custom={i}
                  className={`${i === 3 || i === 4 ? 'text-purple-400' : 'text-cyan-400'} inline-block mx-2`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-3xl md:text-5xl text-gray-200 max-w-4xl mx-auto font-semibold mt-8 animate-[fadeIn_2s_ease-in]"
            >
              Unleash Your Potential with GravityX
            </motion.p>
            <motion.div
              className="text-4xl md:text-6xl font-bold text-cyan-300 flex justify-center gap-6 md:gap-10 mt-12"
              initial="hidden"
              animate="visible"
            >
              {['Connect', '▸', 'Collab', '▸', 'Code', '▸', 'Create', '▸', 'Conquer'].map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  custom={i}
                  className="relative"
                  whileHover={{ scale: 1.1, color: '#9333ea', transition: { duration: 0.3 } }}
                >
                  {word}
                  {i % 2 === 0 && (
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1, transition: { duration: 0.5, delay: i * 0.2 } }}
                    />
                  )}
                </motion.span>
              ))}
            </motion.div>
          </div>
          {/* Star-Like Particle Background (Exact Match with Home.jsx) */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                animate={{ y: ['0%', '100%'], opacity: [0, 1, 0], transition: { duration: 5 + Math.random() * 5, repeat: Infinity } }}
              />
            ))}
          </div>
        </motion.section>

        {/* Catchier Earth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { tolduration: 2, ease: 'easeOut' } }}
          className="relative flex justify-center py-16"
        >
          <Globe
            width={800}
            height={800}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="rgba(0, 212, 255, 1)"
            atmosphereAltitude={0.25}
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor={() => '#00d4ff'}
            pointRadius="size"
            pointAltitude={0.15}
            pointsMerge={true}
            pointLabel="label"
            labelColor={() => '#ffffff'}
            labelSize={0.7}
            labelDotRadius={0.5}
            autoRotate={true}
            autoRotateSpeed={1.5}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.9}
            arcDashGap={4}
            arcDashAnimateTime={1500}
            arcStroke={0.5}
            ringsData={pointsData}
            ringColor={() => '#00d4ff'}
            ringMaxRadius={4}
            ringPropagationSpeed={3}
            ringRepeatPeriod={1000}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-extrabold text-cyan-300 drop-shadow-[0_0_40px_rgba(0,212,255,1)]"
            animate={{ y: [0, -15, 0], transition: { duration: 2, repeat: Infinity } }}
          >
            GravityX
          </motion.div>
        </motion.div>

        {/* Dive into GravityX */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)] neon-heading">
            Dive into GravityX
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 text-center mb-20 max-w-3xl mx-auto">
            Everything a developer dreams of—unlocked in one cosmic hub.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                title: 'Opportunities',
                icon: <FaRocket />,
                desc: 'Unlock a universe of career paths, internships, and learning programs tailored for developers across the globe.',
                extra: 'Join exclusive bootcamps, hackathons, and job boards.',
                path: '/opportunities',
              },
              {
                title: 'Resources',
                icon: <FaCode />,
                desc: 'Access a galaxy of cutting-edge tools, libraries, APIs, and tutorials to supercharge your skills.',
                extra: 'From free courses to premium software—find it all.',
                path: '/resources',
              },
              {
                title: 'Project Showcase',
                icon: <FaGlobe />,
                desc: 'Display your masterpieces, gain feedback from a global community, and spark collaboration.',
                extra: 'Feature your GitHub repos and live demos.',
                path: '/project-showcase',
              },
              {
                title: 'Portfolio Ideas',
                icon: <FaStar />,
                desc: 'Ignite your creativity with bold, innovative ideas to craft portfolios that leave a mark.',
                extra: 'Templates, inspirations, and design tips included.',
                path: '/portfolio-ideas',
              },
              {
                title: 'Resume Building',
                icon: <FaFileAlt />,
                desc: 'Craft stellar resumes with expert tips and templates designed for tech careers.',
                extra: 'Optimize for ATS and impress recruiters.',
                path: '/resume-building',
              },
              {
                title: 'AI Tools Hub',
                icon: <FaBrain />,
                desc: 'Explore a constellation of AI-powered tools to innovate and accelerate your projects.',
                extra: 'Code assistants, design AI, and more.',
                path: '/ai-tools-hub',
              },
              {
                title: 'Industry Trends',
                icon: <FaChartLine />,
                desc: 'Share regular articles and videos on industry trends, expert insights, and career advice to keep engaged.',
                extra: 'Stay ahead with the latest tech developments and market shifts.',
                path: '/industry-trends',
              },
              {
                title: 'AI Career Guide',
                icon: <FaRobot />,
                desc: 'Get AI-powered career recommendations tailored to your skills, interests, and goals.',
                extra: 'Personalized roadmap for your dream tech career.',
                path: '/ai-career-guide',
              },
              {
                title: 'Developer Roadmaps',
                icon: <FaMapMarkedAlt />,
                desc: 'Step-by-step guides to becoming a modern developer in any tech domain.',
                extra: 'Curated paths from roadmap.sh with direct links to each technology.',
                path: '/roadmaps',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-black/90 p-8 rounded-2xl border border-cyan-500/40 overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent animate-[gradient_5s_ease_infinite]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-5xl text-cyan-400 animate-[pulse_2s_infinite]">{item.icon}</div>
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-300 text-center mb-4">{item.title}</h3>
                  <p className="text-gray-200 text-lg mb-4 text-center">{item.desc}</p>
                  <p className="text-gray-400 text-sm italic text-center mb-6">{item.extra}</p>
                  <Link
                    to={item.path}
                    className="block text-center text-cyan-500 hover:text-purple-400 font-semibold text-lg"
                  >
                    Explore Now <FaRocket className="inline ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Coming Soon */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)] neon-heading">
            Coming Soon to GravityX
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { title: 'Portfolio Builder', desc: 'Create stunning portfolios with drag-and-drop ease.' },
              { title: 'Idea Submission', desc: 'Pitch your next big thing to the GravityX community.' },
              { title: 'Journey Showcase', desc: 'Share your developer story with the world.' },
              { title: 'Design Studio', desc: 'Design jaw-dropping UI/UX with advanced tools.' },
              { title: 'Dev Forums', desc: 'Debate, discuss, and connect with global devs.' },
              { title: 'GravityX UI Kit', desc: 'Build faster with our cosmic UI components.' },
              { title: 'Code Compiler', desc: 'Test and run code in real-time, anywhere.' },
              { title: 'Global Challenges', desc: 'Compete in epic coding battles worldwide.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-gray-900/95 p-6 rounded-xl border border-purple-500/50 overflow-hidden shadow-[0_0_15px_rgba(147,51,234,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent animate-[pulse_4s_infinite]" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-cyan-300 text-center mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-center text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contributor Badges */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)] neon-heading">
            Open Source Contributor Badges
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            Celebrate the stars of GravityX with cosmic honors as we embrace our open-source journey.
          </p>
          <p className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-20 max-w-3xl mx-auto animate-[pulse_3s_infinite]">
            OPEN SOURCE PROGRAM COMING SOON!
          </p>
          <p className="text-xl md:text-2xl text-gray-400 text-center mb-20 max-w-3xl mx-auto">
            These badges are awarded through GravityX's upcoming open-source programming initiatives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: 'Pioneer',
                desc: 'Trailblazers who ignite the GravityX journey.',
                icon: <FaRocket className="text-5xl text-purple-400 animate-[spin_10s_linear_infinite]" />,
              },
              {
                title: 'Enhancer',
                desc: 'Visionaries refining the GravityX universe.',
                icon: <FaCode className="text-5xl text-cyan-400 animate-[pulse_2s_infinite]" />,
              },
              {
                title: 'Innovator',
                desc: 'Creators pushing the boundaries of tech.',
                icon: <FaStar className="text-5xl text-yellow-400 animate-[bounce_3s_infinite]" />,
              },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-black/90 p-8 rounded-full border border-cyan-500/50 overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-black animate-[spin_6s_linear_infinite]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4">{badge.icon}</div>
                  <h3 className="text-3xl font-bold text-cyan-300 mb-2">{badge.title}</h3>
                  <p className="text-gray-300 text-center">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Innovation Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-10 drop-shadow-[0_0_20px_rgba(0,212,255,0.9)] neon-heading">
            Innovation Knows No Bounds...✦
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16">
            Fuel GravityX with your wildest ideas! Suggest features that redefine tech, roast us to perfection, and co-create the future of development.
          </p>
          <div className="flex justify-center gap-10">
            <Link to="/suggest?type=idea" className="shine-button text-white py-5 px-10 rounded-full flex items-center gap-4 font-bold text-xl">
              <FaStar /> Suggest Idea
            </Link>
            <Link to="/suggest?type=roast" className="bg-red-500 text-white py-5 px-10 rounded-full flex items-center gap-4 font-bold text-xl hover:bg-red-400 shadow-[0_0_30px_rgba(255,0,0,1)]">
              <FaLightbulb /> Roast Us
            </Link>
          </div>
        </motion.section>

        {/* Supported By */}
        <motion.section
  initial="hidden"
  animate="visible"
  variants={sectionVariants}
  className="container mx-auto py-24 px-6 bg-black relative"
>
  <div className="text-center mb-16">
    <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(0,212,255,0.9)] neon-heading">
      Supported By
    </h2>
    <p className="text-lg text-cyan-200/80 max-w-2xl mx-auto">
      Trusted by industry leaders and innovative partners
    </p>
  </div>

  <div className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-900/50 via-black to-gray-900/50 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
    <motion.div
      animate={{ x: ['100%', '-100%'] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className="flex gap-16 items-center"
    >
      {[
        // Cloud Providers
        { name: "AWS", src: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2.png" },
        { name: "Google Cloud", src: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png" },
        { name: "Microsoft Azure", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
        { name: "IBM Cloud", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        
        // Development Platforms
        { name: "Vercel", src: "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg" },
        { name: "GitHub", src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" },
        { name: "GitLab", src: "https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png" },
        
        // Tech Companies
        { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "DigitalOcean", src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg" },
        
        // AI/ML
        { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { name: "Hugging Face", src: "https://huggingface.co/front/assets/huggingface_logo.svg" },
        
        // Security
        { name: "Cloudflare", src: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png" },
        { name: "Let's Encrypt", src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Let%27s_Encrypt_logo.svg" },
        
        // Government
        { name: "MSME", src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/MSME_Logo.png" },
        { name: "Startup India", src: "https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/startup-india-logo.svg" }
      ].map((company, idx) => (
        <motion.div
          key={idx}
          className="relative min-w-[180px] flex flex-col items-center px-4 group"
          whileHover={{ scale: 1.15, y: -10, transition: { duration: 0.3 } }}
        >
          <div className="relative">
            <img
              src={company.src}
              alt={company.name}
              className="h-20 md:h-24 object-contain invert brightness-125 transition-all duration-300 group-hover:brightness-150"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/180x80/000000/FFFFFF/?text=${encodeURIComponent(company.name)}`;
                e.target.className = "h-20 md:h-24 object-contain";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
          <span className="mt-2 text-sm text-cyan-300/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {company.name}
          </span>
        </motion.div>
      ))}
      
      {/* Duplicate first 8 for seamless scroll */}
      {[
        { name: "AWS", src: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2.png" },
        { name: "Google Cloud", src: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png" },
        { name: "Microsoft Azure", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
        { name: "IBM Cloud", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { name: "Vercel", src: "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg" },
        { name: "Netlify", src: "https://www.netlify.com/v3/img/components/logomark-dark.png" },
        { name: "GitHub", src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" },
        { name: "GitLab", src: "https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png" }
      ].map((company, idx) => (
        <motion.div
          key={`dup-${idx}`}
          className="relative min-w-[180px] flex flex-col items-center px-4 group"
          whileHover={{ scale: 1.15, y: -10, transition: { duration: 0.3 } }}
        >
          <div className="relative">
            <img
              src={company.src}
              alt={company.name}
              className="h-20 md:h-24 object-contain invert brightness-125 transition-all duration-300 group-hover:brightness-150"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
          <span className="mt-2 text-sm text-cyan-300/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {company.name}
          </span>
        </motion.div>
      ))}
    </motion.div>

    {/* Frame Effects */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse" />
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse" />
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 animate-pulse" />
    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 animate-pulse" />
    
    {/* Glow Effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl" />
    </div>
  </div>
</motion.section>


        {/* Footer Effect */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />
      </div>
    </div>
  );
}

export default Paradise;