import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';

interface DesktopIconProps {
    id: string;
    title: string;
    icon: string;
    isSelected: boolean;
    initialPosition?: { x: number; y: number };
    onSelect: (id: string) => void;
    onDoubleClick: (id: string) => void;
}

const DesktopIcon = ({
    id,
    title,
    icon,
    isSelected,
    initialPosition = { x: 0, y: 0 },
    onSelect,
    onDoubleClick,
}: DesktopIconProps) => {
    const [position, setPosition] = useState(initialPosition);
    const clickTimeoutRef = useRef<number | null>(null);
    const isDragging = useRef(false);

    const handleClick = () => {
        // Don't trigger click if we just finished dragging
        if (isDragging.current) {
            isDragging.current = false;
            return;
        }

        // Handle double-click detection
        if (clickTimeoutRef.current) {
            // Double click
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            onDoubleClick(id);
        } else {
            // Single click - wait to see if it becomes a double click
            onSelect(id);
            clickTimeoutRef.current = window.setTimeout(() => {
                clickTimeoutRef.current = null;
            }, 300);
        }
    };

    const handleDragStart = () => {
        onSelect(id);
    };

    const handleDragStop = (_e: unknown, data: { x: number; y: number }) => {
        // Only mark as dragging if position actually changed
        if (data.x !== position.x || data.y !== position.y) {
            isDragging.current = true;
            setPosition({ x: data.x, y: data.y });
        }
    };

    return (
        <Rnd
            position={position}
            size={{ width: 80, height: 90 }}
            enableResizing={false}
            bounds="parent"
            onDragStart={handleDragStart}
            onDragStop={handleDragStop}
            onClick={handleClick}
        >
            <div className={`desktop-icon ${isSelected ? 'selected' : ''}`}>
                <div className="desktop-icon__icon">{icon}</div>
                <span className="desktop-icon__label">{title}</span>
            </div>
        </Rnd>
    );
};

export default DesktopIcon;
