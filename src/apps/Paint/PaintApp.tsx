import { useState, useRef, useEffect } from 'react';
import './PaintApp.css';

const PaintApp = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState<'brush' | 'eraser' | 'fill' | 'spray'>('brush');
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    // Funny spray particles
    const sprayPaint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        for (let i = 0; i < 20; i++) {
            const offsetX = (Math.random() - 0.5) * brushSize * 3;
            const offsetY = (Math.random() - 0.5) * brushSize * 3;
            ctx.fillStyle = color;
            ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw welcome text
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎨 Draw something! (Your masterpiece goes here)', canvas.width / 2, canvas.height / 2);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        setLastPos({ x, y });

        if (tool === 'fill') {
            // Fill with random pattern for fun
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const patterns = ['🎨', '✨', '🌈', '⭐', '💫'];
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = '20px Arial';
                for (let i = 0; i < 50; i++) {
                    ctx.fillText(
                        patterns[Math.floor(Math.random() * patterns.length)],
                        Math.random() * canvas.width,
                        Math.random() * canvas.height
                    );
                }
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (tool === 'spray') {
            sprayPaint(ctx, x, y);
        } else {
            ctx.beginPath();
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        setLastPos({ x, y });
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const saveArt = () => {
        // Troll: pretend to save
        alert('🎨 Masterpiece saved!\n\n(Just kidding, refresh and it\'s gone forever 😈)');
    };

    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000', '#8000FF',
        '#FF69B4', '#8B4513', '#808080', '#C0C0C0',
    ];

    return (
        <div className="paint-app">
            {/* Menu Bar */}
            <div className="paint-menu">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Image</span>
                <span>Colors</span>
                <span>Help</span>
            </div>

            {/* Toolbar */}
            <div className="paint-toolbar">
                <div className="tool-group">
                    <button
                        className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                        onClick={() => setTool('brush')}
                        title="Brush"
                    >
                        ✏️
                    </button>
                    <button
                        className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                        onClick={() => setTool('eraser')}
                        title="Eraser"
                    >
                        🧽
                    </button>
                    <button
                        className={`tool-btn ${tool === 'fill' ? 'active' : ''}`}
                        onClick={() => setTool('fill')}
                        title="Fill (with emojis!)"
                    >
                        🪣
                    </button>
                    <button
                        className={`tool-btn ${tool === 'spray' ? 'active' : ''}`}
                        onClick={() => setTool('spray')}
                        title="Spray Can"
                    >
                        🎨
                    </button>
                </div>

                <div className="tool-group">
                    <label>Size:</label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    />
                    <span>{brushSize}px</span>
                </div>

                <div className="tool-group">
                    <button className="action-btn" onClick={clearCanvas}>🗑️ Clear</button>
                    <button className="action-btn" onClick={saveArt}>💾 Save</button>
                </div>
            </div>

            {/* Color Palette */}
            <div className="paint-colors">
                {colors.map((c) => (
                    <button
                        key={c}
                        className={`color-btn ${color === c ? 'active' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                    />
                ))}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="color-picker"
                    title="Custom color"
                />
            </div>

            {/* Canvas */}
            <div className="paint-canvas-container">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={350}
                    className="paint-canvas"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>

            {/* Status Bar */}
            <div className="paint-status">
                <span>Tool: {tool}</span>
                <span>Color: {color}</span>
                <span>🎨 Pro tip: Picasso started somewhere too!</span>
            </div>
        </div>
    );
};

export default PaintApp;
