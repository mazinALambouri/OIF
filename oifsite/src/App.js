import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <LiveStream />
                <About />
                <Schedule />
                <Speakers />
                <WhyOman />
                <Sponsors />
              </>
            } />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/records" element={<AttendanceRecords />} />
            <Route path="/attendance/scan" element={<QRScanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
