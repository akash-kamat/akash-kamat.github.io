import { NavLink } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { useSiteContent } from '../../hooks/useSiteContent';
import { defaultContent } from '../../lib/contentDefaults';
import { contactIconMap, getIcon } from '../../lib/iconMaps';

const navItems = [
    { to: '/', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/services', label: 'Work With Me' },
    { to: '/works', label: 'Works' },
    { to: '/contact', label: 'Contact' },
];

export default function Sidebar() {
    const { data: socials } = useSiteContent('socials', defaultContent.socials);
    return (
        <aside className="sidebar sidebar-desktop">
            <div className="sidebar-brand">
                <div className="sidebar-brand-text">Akash Kamat</div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-socials">
                {socials.items.map((social) => {
                    const Icon = getIcon(contactIconMap, social.icon, FiMail);
                    return (
                    <a
                        key={social.name}
                        href={social.url}
                        target={social.url.startsWith('mailto') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="sidebar-social-link"
                    >
                        <Icon className="sidebar-social-icon" />
                    </a>
                    );
                })}
            </div>
        </aside>
    );
}
