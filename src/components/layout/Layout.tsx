import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <MobileNav />
            <ThemeToggle />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
