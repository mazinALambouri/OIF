import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import WhyOman from './components/WhyOman';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import LiveStream from './components/LiveStream';
import Attendance from './pages/Attendance';
import AttendanceRecords from './pages/AttendanceRecords';
import QRScanner from './pages/QRScanner';
import './App.css';

// Page transition variants
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Content container with scroll-triggered animations
const SectionContainer = ({ children, id }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ staggerChildren: 0.2 }}
      className="section-container"
    >
      {children}
    </motion.section>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <motion.main 
          className="pt-16"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          <Routes>
            <Route path="/" element={
              <>
                <SectionContainer id="home">
                  <Home />
                </SectionContainer>
                <SectionContainer id="livestream">
                  <LiveStream />
                </SectionContainer>
                <SectionContainer id="about">
                  <About />
                </SectionContainer>
                <SectionContainer id="schedule">
                  <Schedule />
                </SectionContainer>
                <SectionContainer id="speakers">
                  <Speakers />
                </SectionContainer>
                <SectionContainer id="whyoman">
                  <WhyOman />
                </SectionContainer>
                <SectionContainer id="sponsors">
                  <Sponsors />
                </SectionContainer>
              </>
            } />
            <Route path="/attendance" element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageTransition}
              >
                <Attendance />
              </motion.div>
            } />
            <Route path="/attendance/records" element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageTransition}
              >
                <AttendanceRecords />
              </motion.div>
            } />
            <Route path="/attendance/scan" element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageTransition}
              >
                <QRScanner />
              </motion.div>
            } />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
