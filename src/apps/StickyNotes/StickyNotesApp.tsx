import { useState, useEffect, useRef } from 'react';
import './StickyNotesApp.css';

interface Note {
    id: string;
    content: string;
    color: string;
}

const messages = [
    "You're doing great! ⭐",
    "Remember to stay hydrated! 💧",
    "Take a break if you need one! ☕",
    "Bugs are just features in disguise! 🐛",
    "It works on my machine! 🤷",
    "Have you tried turning it off and on? 🔄",
];

const StickyNotesApp = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            content: '📝 Welcome to Sticky Notes!\n\nClick + to add a new note.\n\nThese definitely save... somewhere.',
            color: '#fff740',
        },
        {
            id: '2', 
            content: '🎯 TODO:\n\n□ Hire Akash\n□ Give him lots of money\n□ ???\n□ Profit',
            color: '#ff7eb9',
        },
        {
            id: '3',
            content: '💡 Pro tip:\n\nIf debugging is the process of removing bugs, then programming must be the process of putting them in.\n\n- Edsger Dijkstra (probably)',
            color: '#7afcff',
        },
    ]);

    const colors = ['#fff740', '#ff7eb9', '#7afcff', '#ff65a3', '#7cf67a', '#ffa500'];
    const [currentColorIdx, setCurrentColorIdx] = useState(0);
    const nextNoteIdRef = useRef(4);
    const [randomMessage, setRandomMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const addNote = () => {
        const newNote: Note = {
            id: `note-${nextNoteIdRef.current++}`,
            content: '',
            color: colors[currentColorIdx],
        };
        setNotes([...notes, newNote]);
        setCurrentColorIdx((currentColorIdx + 1) % colors.length);
    };

    const updateNote = (id: string, content: string) => {
        setNotes(notes.map(note => 
            note.id === id ? { ...note, content } : note
        ));
    };

    const deleteNote = (id: string) => {
        if (notes.length === 1) {
            alert("You can't delete your last note! That's too sad. 😢");
            return;
        }
        setNotes(notes.filter(note => note.id !== id));
    };

    const changeColor = (id: string) => {
        const currentNote = notes.find(n => n.id === id);
        if (!currentNote) return;
        
        const currentIdx = colors.indexOf(currentNote.color);
        const nextIdx = (currentIdx + 1) % colors.length;
        
        setNotes(notes.map(note =>
            note.id === id ? { ...note, color: colors[nextIdx] } : note
        ));
    };

    return (
        <div className="sticky-notes-app">
            {/* Header */}
            <div className="sticky-header">
                <span className="sticky-title">📝 Sticky Notes</span>
                <button className="add-note-btn" onClick={addNote}>+ New Note</button>
            </div>

            {/* Notes Grid */}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="sticky-note"
                        style={{ backgroundColor: note.color }}
                    >
                        <div className="note-header">
                            <button 
                                className="note-btn color-btn"
                                onClick={() => changeColor(note.id)}
                                title="Change color"
                            >
                                🎨
                            </button>
                            <button
                                className="note-btn delete-btn"
                                onClick={() => deleteNote(note.id)}
                                title="Delete note"
                            >
                                ✕
                            </button>
                        </div>
                        <textarea
                            value={note.content}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            placeholder="Write something..."
                            className="note-content"
                        />
                    </div>
                ))}
            </div>

            {/* Footer Message */}
            <div className="sticky-footer">
                <span className="footer-message">{randomMessage}</span>
                <span className="footer-disclaimer">⚠️ Notes auto-save to /dev/null</span>
            </div>
        </div>
    );
};

export default StickyNotesApp;

