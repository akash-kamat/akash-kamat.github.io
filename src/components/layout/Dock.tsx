import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiUser, FiBriefcase, FiMail, FiStar, FiCompass } from 'react-icons/fi';

const navItems = [
    { to: '/', label: 'About', icon: FiUser },
    { to: '/skills', label: 'Skills', icon: FiStar },
    { to: '/services', label: 'Work With Me', icon: FiCompass },
    { to: '/works', label: 'Works', icon: FiBriefcase },
    { to: '/contact', label: 'Contact', icon: FiMail },
];

export default function Dock() {
    return (
        <motion.nav
            className="dock"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 100 }}
        >
            <div className="dock-container">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `dock-item ${isActive ? 'active' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <motion.div
                                    className="dock-icon-wrapper"
                                    whileHover={{ scale: 1.3, y: -8 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    <Icon
                                        className="dock-icon"
                                        style={{
                                            color: isActive ? 'var(--accent)' : 'inherit'
                                        }}
                                    />
                                    <span className="dock-label">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            className="dock-indicator"
                                            layoutId="dock-indicator"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </motion.nav>
    );
}
