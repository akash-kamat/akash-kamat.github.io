import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../state/windowStore';
import { useSettingsStore } from '../state/settingsStore';
import { appRegistry } from '../utils/windowRegistry';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

const Desktop = () => {
    const {
        icons,
        selectedIconId,
        addIcon,
        selectIcon,
        openWindow
    } = useWindowStore();

    const { getCurrentWallpaper, nextWallpaper } = useSettingsStore();
    const currentWallpaper = getCurrentWallpaper();

    const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number } | null>(null);
    const desktopRef = useRef<HTMLDivElement>(null);

    // Initialize icons if empty
    useEffect(() => {
        if (icons.length === 0) {
            appRegistry.forEach((app, index) => {
                addIcon({
                    id: app.id,
                    appId: app.id,
                    title: app.title,
                    icon: app.icon,
                    desktopPosition: { x: 20, y: 20 + index * 100 },
                });
            });
        }
    }, [icons.length, addIcon]);

    // Close context menu on click
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleNextWallpaper = () => {
        nextWallpaper();
        setContextMenu(null);
    };

    const handleOpenApp = (id: string) => {
        const icon = icons.find(i => i.id === id);
        if (icon) {
            openWindow(icon.appId, icon.title);
        }
    };

    return (
        <div
            ref={desktopRef}
            className="desktop"
            onClick={() => selectIcon(null)}
            onContextMenu={handleContextMenu}
            style={{ backgroundImage: `url('${currentWallpaper}')` }}
        >
            <div className="desktop-icons">
                {icons.map((icon) => (
                    <DesktopIcon
                        key={icon.id}
                        id={icon.id}
                        title={icon.title}
                        icon={icon.icon}
                        initialPosition={icon.desktopPosition}
                        isSelected={selectedIconId === icon.id}
                        onSelect={() => selectIcon(icon.id)}
                        onDoubleClick={handleOpenApp}
                    />
                ))}
            </div>

            {/* Context Menu */}
            {contextMenu && contextMenu.visible && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="context-menu-item">View</div>
                    <div className="context-menu-item">Sort by</div>
                    <div className="context-menu-item">Refresh</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item" onClick={handleNextWallpaper}>
                        Next desktop background
                    </div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item">New</div>
                    <div className="context-menu-separator" />
                    <div className="context-menu-item">Display resolution</div>
                    <div className="context-menu-item">Gadgets</div>
                    <div className="context-menu-item">Personalize</div>
                </div>
            )}
        </div>
    );
};

export default Desktop;
