import { useWindowStore } from '../state/windowStore';
import { appRegistry, getAppById } from '../utils/windowRegistry';
import { soundManager } from '../utils/soundManager';
import './StartMenu.css';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
    const openWindow = useWindowStore((state) => state.openWindow);

    if (!isOpen) return null;

    const handleAppClick = (appId: string, title: string, defaultSize?: { width: number; height: number }) => {
        soundManager.playClick();
        openWindow(appId, title, defaultSize);
        onClose();
    };

    // Pinned apps (working apps from allApps)
    const pinnedApps = [
        { id: 'browser', name: 'Internet Explorer', icon: '🌐' },
        { id: 'media-player', name: 'Windows Media Player', icon: '🎵' },
        { id: 'calculator', name: 'Calculator', icon: '🔢' },
        { id: 'sticky-notes', name: 'Sticky Notes', icon: '📝' },
        { id: 'paint', name: 'Paint', icon: '🎨' },
        { id: 'solitaire', name: 'Solitaire', icon: '🃏' },
    ];

    const rightLinks = [
        { id: 'work', name: 'Documents (Work)', icon: '📁', appId: 'work' },
        { id: 'skills', name: 'System Info', icon: '⚙️', appId: 'skills' },
        { id: 'experience', name: 'Event Log', icon: '📋', appId: 'experience' },
        { id: 'contact', name: 'Mail', icon: '✉️', appId: 'contact' },
        { id: 'terminal', name: 'Command Prompt', icon: '💻', appId: 'terminal' },
        { id: 'help', name: 'Help and Support', icon: '❓', appId: 'help' },
    ];

    const handleRightLinkClick = (link: typeof rightLinks[0]) => {
        soundManager.playClick();
        const app = getAppById(link.appId);
        if (app) {
            openWindow(app.id, app.title, app.defaultSize);
        }
        onClose();
    };

    const handleShutdown = () => {
        soundManager.playClose();
        // Fun shutdown
        if (confirm('🔌 Are you sure you want to shut down?\n\n(This will just refresh the page)')) {
            window.location.reload();
        }
    };

    return (
        <>
            {/* Backdrop to close menu */}
            <div className="start-menu-backdrop" onClick={onClose} />

            <div className="start-menu">
                {/* Left Column - Apps */}
                <div className="start-menu__left">
                    {/* Combined Apps List */}
                    <div className="start-menu__apps">
                        {/* Pinned Apps */}
                        {pinnedApps.map((app) => {
                            const regApp = getAppById(app.id);
                            return (
                                <button
                                    key={app.id}
                                    className="start-menu__app"
                                    onClick={() => {
                                        if (regApp) {
                                            handleAppClick(regApp.id, regApp.title, regApp.defaultSize);
                                        }
                                    }}
                                >
                                    <span className="start-menu__app-icon">{app.icon}</span>
                                    <span className="start-menu__app-name">{app.name}</span>
                                </button>
                            );
                        })}

                        <div className="start-menu__separator" />

                        {/* Portfolio Apps */}
                        {appRegistry.map((app) => (
                            <button
                                key={app.id}
                                className="start-menu__app"
                                onClick={() => handleAppClick(app.id, app.title, app.defaultSize)}
                            >
                                <span className="start-menu__app-icon">{app.icon}</span>
                                <span className="start-menu__app-name">{app.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* All Programs */}
                    <div className="start-menu__separator" />
                    <button className="start-menu__all-programs">
                        <span>All Programs</span>
                        <span className="arrow">▶</span>
                    </button>

                    {/* Search Box */}
                    <div className="start-menu__search">
                        <input
                            type="text"
                            placeholder="Search programs and files"
                            className="start-menu__search-input"
                        />
                        <span className="start-menu__search-icon">🔍</span>
                    </div>
                </div>

                {/* Right Column - Links */}
                <div className="start-menu__right">
                    {/* User Profile */}
                    <div className="start-menu__user">
                        <div className="start-menu__user-avatar">👨‍💻</div>
                        <span className="start-menu__user-name">Akash Kamat</span>
                    </div>

                    {/* Links */}
                    <div className="start-menu__links">
                        {rightLinks.map((link) => (
                            <button 
                                key={link.id} 
                                className="start-menu__link"
                                onClick={() => handleRightLinkClick(link)}
                            >
                                <span className="start-menu__link-icon">{link.icon}</span>
                                <span className="start-menu__link-name">{link.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Shutdown */}
                    <div className="start-menu__shutdown">
                        <button className="start-menu__shutdown-btn" onClick={handleShutdown}>
                            Shut down
                        </button>
                        <button className="start-menu__shutdown-arrow">▶</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StartMenu;
