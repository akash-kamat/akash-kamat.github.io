import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../state/windowStore';
import { useSettingsStore } from '../state/settingsStore';
import { appRegistry } from '../utils/windowRegistry';
import { soundManager } from '../utils/soundManager';
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
    const [selectionBox, setSelectionBox] = useState<{
        visible: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
    }>({
        visible: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const desktopRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef<{ x: number; y: number } | null>(null);

    // Initialize sound manager
    useEffect(() => {
        soundManager.init();
    }, []);

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
        soundManager.playClick();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleNextWallpaper = () => {
        soundManager.playClick();
        nextWallpaper();
        setContextMenu(null);
    };

    const handleOpenApp = (id: string) => {
        const icon = icons.find(i => i.id === id);
        if (icon) {
            soundManager.playOpen();
            openWindow(icon.appId, icon.title);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;

        const target = e.target as HTMLElement;
        if (target.closest('.desktop-icon') || target.closest('.context-menu')) return;

        dragStartRef.current = { x: e.clientX, y: e.clientY };
        setSelectionBox({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            width: 0,
            height: 0,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragStartRef.current) return;

        const startX = dragStartRef.current.x;
        const startY = dragStartRef.current.y;
        const currentX = e.clientX;
        const currentY = e.clientY;

        setSelectionBox({
            visible: true,
            x: Math.min(startX, currentX),
            y: Math.min(startY, currentY),
            width: Math.abs(currentX - startX),
            height: Math.abs(currentY - startY),
        });
    };

    const handleMouseUp = () => {
        dragStartRef.current = null;
        setSelectionBox((prev) => ({ ...prev, visible: false, width: 0, height: 0 }));
    };

    useEffect(() => {
        const stopSelection = () => handleMouseUp();
        window.addEventListener('mouseup', stopSelection);
        return () => window.removeEventListener('mouseup', stopSelection);
    }, []);

    return (
        <div
            ref={desktopRef}
            className="desktop"
            onClick={() => selectIcon(null)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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

            {selectionBox.visible && (
                <div
                    className="desktop-selection-box"
                    style={{
                        left: selectionBox.x,
                        top: selectionBox.y,
                        width: selectionBox.width,
                        height: selectionBox.height,
                    }}
                />
            )}

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
