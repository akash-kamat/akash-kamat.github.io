import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'motion/react';
import type { WindowState } from '../state/windowStore';
import { useWindowStore } from '../state/windowStore';
import { soundManager } from '../utils/soundManager';
import './Window.css';

interface WindowProps {
    windowState: WindowState;
    children: React.ReactNode;
}

const Window = ({ windowState, children }: WindowProps) => {
    const {
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        updateWindowPosition,
        updateWindowSize,
        activeWindowId,
    } = useWindowStore();

    const [localPosition, setLocalPosition] = useState(windowState.position);
    const [localSize, setLocalSize] = useState(windowState.size);
    const [isClosing, setIsClosing] = useState(false);

    const rndRef = useRef<Rnd>(null);
    const isActive = activeWindowId === windowState.id;

    useEffect(() => {
        soundManager.init();
    }, []);

    useEffect(() => {
        if (windowState.isMaximized) {
            setLocalPosition({ x: 0, y: 0 });
            setLocalSize({ width: window.innerWidth, height: window.innerHeight - 40 });
        } else {
            setLocalPosition(windowState.position);
            setLocalSize(windowState.size);
        }
    }, [windowState.isMaximized]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        soundManager.playClose();
        setIsClosing(true);
        // Delay actual close to allow animation
        setTimeout(() => {
            closeWindow(windowState.id);
        }, 200);
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        soundManager.playMinimize();
        minimizeWindow(windowState.id);
    };

    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        soundManager.playMaximize();
        toggleMaximize(windowState.id);
    };

    const handleFocus = () => {
        if (!isActive) {
            focusWindow(windowState.id);
        }
    };

    const handleDragStop = (_e: unknown, data: { x: number; y: number }) => {
        setLocalPosition({ x: data.x, y: data.y });
        updateWindowPosition(windowState.id, { x: data.x, y: data.y });
    };

    const handleResizeStop = (
        _e: unknown,
        _direction: unknown,
        ref: HTMLElement,
        _delta: unknown,
        position: { x: number; y: number }
    ) => {
        const newSize = {
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
        };
        setLocalSize(newSize);
        setLocalPosition(position);
        updateWindowSize(windowState.id, newSize);
        updateWindowPosition(windowState.id, position);
    };

    // Calculate taskbar position for minimize animation
    const taskbarY = window.innerHeight - 40;

    return (
        <AnimatePresence>
            {!windowState.isMinimized && !isClosing && (
                <Rnd
                    ref={rndRef}
                    position={localPosition}
                    size={localSize}
                    minWidth={300}
                    minHeight={200}
                    bounds="parent"
                    dragHandleClassName="title-bar"
                    disableDragging={windowState.isMaximized}
                    enableResizing={!windowState.isMaximized}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                    onMouseDown={handleFocus}
                    style={{ zIndex: windowState.zIndex }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            scale: 0.5,
                            y: taskbarY - localPosition.y,
                            transition: { duration: 0.2 }
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 25,
                            duration: 0.25
                        }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <div
                            className={`window glass ${isActive ? 'active' : ''}`}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div className="title-bar" onDoubleClick={handleMaximize}>
                                <div className="title-bar-text">
                                    {windowState.title}
                                </div>
                                <div className="title-bar-controls">
                                    <button
                                        aria-label="Minimize"
                                        onClick={handleMinimize}
                                    />
                                    <button
                                        aria-label={windowState.isMaximized ? 'Restore' : 'Maximize'}
                                        onClick={handleMaximize}
                                    />
                                    <button
                                        aria-label="Close"
                                        onClick={handleClose}
                                    />
                                </div>
                            </div>
                            <div className="window-body" style={{ flex: 1, overflow: 'auto', margin: 0, background: 'rgba(255, 255, 255, 0.8)' }}>
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </AnimatePresence>
    );
};

export default Window;
