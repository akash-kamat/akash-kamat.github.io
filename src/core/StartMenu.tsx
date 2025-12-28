import { useWindowStore } from '../state/windowStore';
import { appRegistry } from '../utils/windowRegistry';
import './StartMenu.css';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
    const openWindow = useWindowStore((state) => state.openWindow);

    if (!isOpen) return null;

    const handleAppClick = (appId: string, title: string, defaultSize?: { width: number; height: number }) => {
        openWindow(appId, title, defaultSize);
        onClose();
    };

    // Dummy apps for start menu
    const pinnedApps = [
        { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
        { id: 'browser', name: 'Internet Explorer', icon: '🌐' },
        { id: 'media-player', name: 'Windows Media Player', icon: '🎵' },
        { id: 'calculator', name: 'Calculator', icon: '🔢' },
        { id: 'sticky-notes', name: 'Sticky Notes', icon: '📝' },
        { id: 'snipping-tool', name: 'Snipping Tool', icon: '✂️' },
        { id: 'paint', name: 'Paint', icon: '🎨' },
        { id: 'magnifier', name: 'Magnifier', icon: '🔍' },
        { id: 'solitaire', name: 'Solitaire', icon: '🃏' },
    ];

    const rightLinks = [
        { id: 'documents', name: 'Documents', icon: '📁' },
        { id: 'pictures', name: 'Pictures', icon: '🖼️' },
        { id: 'music', name: 'Music', icon: '🎵' },
        { id: 'games', name: 'Games', icon: '🎮' },
        { id: 'computer', name: 'Computer', icon: '💻' },
        { id: 'control-panel', name: 'Control Panel', icon: '⚙️' },
        { id: 'devices', name: 'Devices and Printers', icon: '🖨️' },
        { id: 'default-programs', name: 'Default Programs', icon: '📋' },
        { id: 'help', name: 'Help and Support', icon: '❓' },
    ];

    return (
        <>
            {/* Backdrop to close menu */}
            <div className="start-menu-backdrop" onClick={onClose} />

            <div className="start-menu">
                {/* Left Column - Apps */}
                <div className="start-menu__left">
                    {/* Pinned Apps */}
                    <div className="start-menu__apps">
                        {pinnedApps.map((app) => (
                            <button
                                key={app.id}
                                className="start-menu__app"
                                onClick={() => {
                                    // Try to open from registry, otherwise just close
                                    const regApp = appRegistry.find(a => a.id === app.id);
                                    if (regApp) {
                                        handleAppClick(regApp.id, regApp.title, regApp.defaultSize);
                                    } else {
                                        onClose();
                                    }
                                }}
                            >
                                <span className="start-menu__app-icon">{app.icon}</span>
                                <span className="start-menu__app-name">{app.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="start-menu__separator" />

                    {/* Portfolio Apps */}
                    <div className="start-menu__apps">
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
                        <div className="start-menu__user-avatar">👤</div>
                        <span className="start-menu__user-name">Akash Kamat</span>
                    </div>

                    {/* Links */}
                    <div className="start-menu__links">
                        {rightLinks.map((link) => (
                            <button key={link.id} className="start-menu__link">
                                <span className="start-menu__link-icon">{link.icon}</span>
                                <span className="start-menu__link-name">{link.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Shutdown */}
                    <div className="start-menu__shutdown">
                        <button className="start-menu__shutdown-btn">
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
