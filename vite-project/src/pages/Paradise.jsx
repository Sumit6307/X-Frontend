// src/pages/Paradise.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Globe from 'react-globe.gl';
import Navbar from '../components/Navbar';
import { FaRocket, FaCode, FaGlobe, FaStar, FaFileAlt, FaBrain, FaLightbulb, FaTrophy, FaHandshake, FaChartLine, FaRobot } from 'react-icons/fa';

// Animation Variants
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden relative">
      <Navbar />
      <div className="pt-24 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.3)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />

        {/* Enhanced Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center py-24 relative"
        >
          <div className="relative z-10">
            <motion.h1
              className="text-7xl md:text-9xl font-extrabold tracking-widest drop-shadow-[0_0_30px_rgba(0,212,255,1)]"
              initial="hidden"
              animate="visible"
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
          {/* Subtle Particle Background */}
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
          animate={{ opacity: 1, scale: 1, transition: { duration: 2, ease: 'easeOut' } }}
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
            autoRotateSpeed={1.5} // Faster rotation
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.9}
            arcDashGap={4}
            arcDashAnimateTime={1500}
            arcStroke={0.5}
            ringsData={pointsData} // Orbit ring effect
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
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
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
                path: '/opportunities'
              },
              {
                title: 'Resources',
                icon: <FaCode />,
                desc: 'Access a galaxy of cutting-edge tools, libraries, APIs, and tutorials to supercharge your skills.',
                extra: 'From free courses to premium software—find it all.',
                path: '/resources'
              },
              {
                title: 'Project Showcase',
                icon: <FaGlobe />,
                desc: 'Display your masterpieces, gain feedback from a global community, and spark collaboration.',
                extra: 'Feature your GitHub repos and live demos.',
                path: '/project-showcase'
              },
              {
                title: 'Portfolio Ideas',
                icon: <FaStar />,
                desc: 'Ignite your creativity with bold, innovative ideas to craft portfolios that leave a mark.',
                extra: 'Templates, inspirations, and design tips included.',
                path: '/portfolio-ideas'
              },
              {
                title: 'Resume Building',
                icon: <FaFileAlt />,
                desc: 'Craft stellar resumes with expert tips and templates designed for tech careers.',
                extra: 'Optimize for ATS and impress recruiters.',
                path: '/resume-building'
              },
              {
                title: 'AI Tools Hub',
                icon: <FaBrain />,
                desc: 'Explore a constellation of AI-powered tools to innovate and accelerate your projects.',
                extra: 'Code assistants, design AI, and more.',
                path: '/ai-tools-hub'
              },
              {
                title: 'Industry Trends',
                icon: <FaChartLine />,
                desc: 'Share regular articles and videos on industry trends, expert insights, and career advice to keep engaged.',
                extra: 'Stay ahead with the latest tech developments and market shifts.',
                path: '/industry-trends'
              },
              {
                title: 'AI Career Guide',
                icon: <FaRobot />,
                desc: 'Get AI-powered career recommendations tailored to your skills, interests, and goals.',
                extra: 'Personalized roadmap for your dream tech career.',
                path: '/ai-career-guide'
              }
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
                    className="block text-center text-cyan-400 hover:text-purple-400 font-semibold text-lg"
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
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
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
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
            Contributor Badges
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 text-center mb-20 max-w-3xl mx-auto">
            Celebrate the stars of GravityX with cosmic honors.
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
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-10 drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
            Innovation Knows No Bounds...✦
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16">
            Fuel GravityX with your wildest ideas! Suggest features that redefine tech, roast us to perfection, and co-create the future of development.
          </p>
          <div className="flex justify-center gap-10">
            <Link to="#" className="bg-cyan-500 text-black py-5 px-10 rounded-full flex items-center gap-4 font-bold text-xl hover:bg-cyan-400 shadow-[0_0_30px_rgba(0,212,255,1)]">
              <FaStar /> Suggest Idea
            </Link>
            <Link to="#" className="bg-red-500 text-white py-5 px-10 rounded-full flex items-center gap-4 font-bold text-xl hover:bg-red-400 shadow-[0_0_30px_rgba(255,0,0,1)]">
              <FaLightbulb /> Roast Us
            </Link>
          </div>
        </motion.section>

        {/* Enhanced Supported By */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto py-24 px-6 bg-black relative"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-cyan-400 mb-16 text-center drop-shadow-[0_0_20px_rgba(0,212,255,0.9)]">
            Supported By
          </h2>
          <div className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-900/50 via-black to-gray-900/50 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-20 items-center"
            >
              {[
                'https://logos-world.net/wp-content/uploads/2020/12/Microsoft-Logo.png', // Microsoft
                'https://www.cloudflare.com/static/77a2e6c8bc155da49133e2379e8f4d9b/cloudflare-logo.png', // Cloudflare
                'https://assets.vercel.com/image/upload/v1663738468/front/nextjs/Vercel-logotype-dark.png', // Vercel
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ISO_Logo_%282016%29.svg/1200px-ISO_Logo_%282016%29.svg.png', // ISO
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/GitHub_Logo.svg/1200px-GitHub_Logo.svg.png', // GitHub
              ].map((src, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  whileHover={{ scale: 1.2, y: -15, transition: { duration: 0.3 } }}
                >
                  <img
                    src={src}
                    alt="Supporter"
                    className="h-24 md:h-32 object-contain invert brightness-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.div>
              ))}
              {/* Duplicate for seamless scroll */}
              {[
                'https://logos-world.net/wp-content/uploads/2020/12/Microsoft-Logo.png',
                'https://www.cloudflare.com/static/77a2e6c8bc155da49133e2379e8f4d9b/cloudflare-logo.png',
                'https://assets.vercel.com/image/upload/v1663738468/front/nextjs/Vercel-logotype-dark.png',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ISO_Logo_%282016%29.svg/1200px-ISO_Logo_%282016%29.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/GitHub_Logo.svg/1200px-GitHub_Logo.svg.png',
              ].map((src, idx) => (
                <motion.div
                  key={idx + 5}
                  className="relative"
                  whileHover={{ scale: 1.2, y: -15, transition: { duration: 0.3 } }}
                >
                  <img
                    src={src}
                    alt="Supporter"
                    className="h-24 md:h-32 object-contain invert brightness-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.div>
              ))}
            </motion.div>
            {/* Frame Effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />
          </div>
        </motion.section>

        {/* Footer Effect */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-[pulse_5s_infinite]" />
      </div>
    </div>
  );
}

export default Paradise;