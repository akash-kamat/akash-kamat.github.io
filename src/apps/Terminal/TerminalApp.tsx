import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../state/windowStore';
import { getAppById } from '../../utils/windowRegistry';
import './TerminalApp.css';

interface HistoryEntry {
    type: 'input' | 'output';
    content: string;
}

const TerminalApp = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([
        { type: 'output', content: 'AkashOS Terminal [Version 1.0.0]' },
        { type: 'output', content: '(c) 2024 Akash Kamat. All rights reserved.' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Type "help" for available commands.' },
        { type: 'output', content: '' },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const openWindow = useWindowStore((state) => state.openWindow);

    useEffect(() => {
        // Auto-scroll to bottom
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const command = cmd.trim().toLowerCase();
        let output: string[] = [];

        switch (command) {
            case 'help':
                output = [
                    'Available commands:',
                    '',
                    '  help        - Show this help message',
                    '  about       - Open AboutMe.txt',
                    '  work        - Open Work folder',
                    '  skills      - Open Skills.dll',
                    '  experience  - Open Experience.log',
                    '  contact     - Open Contact.mail',
                    '  clear       - Clear terminal',
                    '  whoami      - Display user info',
                    '  date        - Show current date/time',
                    '  echo <msg>  - Echo a message',
                    '',
                ];
                break;

            case 'about':
            case 'work':
            case 'skills':
            case 'experience':
            case 'contact':
                const app = getAppById(command);
                if (app) {
                    openWindow(app.id, app.title, app.defaultSize);
                    output = [`Opening ${app.title}...`];
                }
                break;

            case 'clear':
                setHistory([]);
                return;

            case 'whoami':
                output = [
                    'User: Akash Kamat',
                    'Role: Full Stack Developer',
                    'Status: Available for opportunities',
                ];
                break;

            case 'date':
                output = [new Date().toString()];
                break;

            case '':
                return;

            default:
                if (command.startsWith('echo ')) {
                    output = [command.substring(5)];
                } else {
                    output = [`'${command}' is not recognized as an internal or external command.`];
                }
        }

        setHistory((prev) => [
            ...prev,
            { type: 'input', content: `C:\\Users\\Akash> ${cmd}` },
            ...output.map((line) => ({ type: 'output' as const, content: line })),
        ]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="terminal-app" onClick={handleTerminalClick}>
            {/* Terminal Output & Input Flow */}
            <div className="terminal-output" ref={outputRef}>
                {history.map((entry, i) => (
                    <div
                        key={i}
                        className={`terminal-line ${entry.type === 'input' ? 'terminal-line--input' : ''}`}
                    >
                        {entry.content}
                    </div>
                ))}

                {/* Active Input Line */}
                <form className="terminal-input" onSubmit={handleSubmit}>
                    <span className="terminal-input__prompt">C:\Users\Akash&gt;</span>

                    <div className="terminal-input__wrapper">
                        {/* Visual Output with Block Cursor */}
                        <div className="terminal-input__visual">
                            <span>{input}</span>
                            <span className="terminal-cursor" />
                        </div>

                        {/* Invisible Real Input */}
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input__field ghost-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TerminalApp;
