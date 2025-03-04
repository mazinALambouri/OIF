import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="pt-16">
          <Home />
          <About />
          <Schedule />
          <Speakers />
          <Sponsors />
          {/* Other sections will be added here */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
