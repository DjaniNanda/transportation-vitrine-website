import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Checklist from '../components/Checklist';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

/** The one-page scroll: every section keeps the id the navbar links to. */
const Home: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Checklist />
    <About />
    <Testimonials />
    <Contact />
  </>
);

export default Home;
