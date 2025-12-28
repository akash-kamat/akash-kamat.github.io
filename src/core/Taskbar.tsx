import { useState, useEffect } from 'react';
import { useWindowStore } from '../state/windowStore';
import { useSettingsStore } from '../state/settingsStore';
import { getAppById } from '../utils/windowRegistry';
import StartMenu from './StartMenu';
import './Taskbar.css';

const Taskbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const windows = useWindowStore((state) => state.windows);
    const activeWindowId = useWindowStore((state) => state.activeWindowId);
    const focusWindow = useWindowStore((state) => state.focusWindow);
    const restoreWindow = useWindowStore((state) => state.restoreWindow);
    const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
    const soundEnabled = useSettingsStore((state) => state.soundEnabled);
    const toggleSound = useSettingsStore((state) => state.toggleSound);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleTaskbarItemClick = (windowId: string, isMinimized: boolean) => {
        if (isMinimized) {
            restoreWindow(windowId);
        } else if (activeWindowId === windowId) {
            minimizeWindow(windowId);
        } else {
            focusWindow(windowId);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <>
            {/* Start Menu */}
            <StartMenu
                isOpen={startMenuOpen}
                onClose={() => setStartMenuOpen(false)}
            />

            <div className="taskbar">
                {/* Start Button */}
                <button
                    className={`start-button ${startMenuOpen ? 'active' : ''}`}
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                    title="Start"
                >
                    <img
                        src="/assets/windows 7 start icon.ico"
                        alt="Start"
                        className="windows-logo"
                    />
                </button>

                {/* Running Apps */}
                <div className="taskbar-apps">
                    {windows.map((win) => {
                        const app = getAppById(win.appId);
                        if (!app) return null;

                        const isActiveAndVisible = activeWindowId === win.id && !win.isMinimized;

                        return (
                            <button
                                key={win.id}
                                className={`taskbar-app ${isActiveAndVisible ? 'active' : ''} ${win.isMinimized ? 'minimized' : ''}`}
                                onClick={() => handleTaskbarItemClick(win.id, win.isMinimized)}
                                title={win.title}
                            >
                                <span className="taskbar-app__icon">{app.icon}</span>
                                <span className="taskbar-app__title">{win.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* System Tray */}
                <div className="system-tray">
                    <button className="tray-icon" title="Show hidden icons" style={{ width: '16px' }}>
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="white">
                            <path d="M8 4L2 10L3.4 11.4L8 6.8L12.6 11.4L14 10L8 4Z" />
                        </svg>
                    </button>
                    <button className="tray-icon" title="Solve PC issues: 1 message" style={{ width: '20px', fontSize: '14px' }}>
                        🏳️
                    </button>
                    <button className="tray-icon" title="Network Internet access" style={{ width: '20px', fontSize: '14px' }}>
                        📶
                    </button>
                    <button
                        className="tray-icon"
                        onClick={toggleSound}
                        title={soundEnabled ? 'Volume: On' : 'Volume: Muted'}
                        style={{ width: '20px', fontSize: '16px' }}
                    >
                        {soundEnabled ? '🔊' : '🔇'}
                    </button>
                    <div className="tray-clock">
                        <div className="tray-clock__time">{formatTime(currentTime)}</div>
                        <div className="tray-clock__date">{formatDate(currentTime)}</div>
                    </div>
                    <button className="show-desktop" title="Show desktop" />
                </div>
            </div>
        </>
    );
};

export default Taskbar;
