import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const navItems = [
    { to: '/', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/services', label: 'Work With Me' },
    { to: '/works', label: 'Works' },
    { to: '/contact', label: 'Contact' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            {/* Mobile Sidebar */}
            <div
                className={`mobile-overlay ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            />
            <aside className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-brand mobile-brand">
                    <div className="sidebar-brand-text">Akash</div>
                    <div className="sidebar-brand-text">Kamat</div>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
