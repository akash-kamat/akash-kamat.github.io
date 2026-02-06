import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './layout/Layout';
import About from '../pages/About';
import Works from '../pages/Works';
import Skills from '../pages/Skills';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Admin from '../pages/Admin';

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<Layout />}>
                    <Route path="/" element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}
