import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Hero from '../home/Hero';
import About from '../home/About';
import Services from '../home/Services';

const Home = () => {
    const navigate = useNavigate();
    const [askOpen, setAskOpen] = useState(false);
  const handleBook = () => navigate("/appointment"); 
  const handleAsk  = () => setAskOpen(true); 
    return(
        <>
        <Hero onBook={handleBook} onAsk={handleAsk} />
        <About />
        <Services />
        </>
    )
}

export default Home;