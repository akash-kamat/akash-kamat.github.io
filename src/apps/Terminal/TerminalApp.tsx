import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../state/windowStore';
import { getAppById } from '../../utils/windowRegistry';
import { soundManager } from '../../utils/soundManager';
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
                    '  calculator  - Open Calculator',
                    '  browser     - Open Internet Explorer',
                    '  paint       - Open Paint',
                    '  solitaire   - Open Solitaire',
                    '  clear       - Clear terminal',
                    '  whoami      - Display user info',
                    '  date        - Show current date/time',
                    '  echo <msg>  - Echo a message',
                    '  matrix      - Enter the matrix...',
                    '  hack        - Become a hacker',
                    '  coffee      - Essential fuel',
                    '  hire        - Make a great decision',
                    '',
                    '  Try more commands... there might be secrets! 🤫',
                    '',
                ];
                break;

            case 'about':
            case 'work':
            case 'skills':
            case 'experience':
            case 'contact':
            case 'calculator':
            case 'browser':
            case 'paint':
            case 'solitaire':
            case 'help-app':
            {
                const app = getAppById(command === 'help-app' ? 'help' : command);
                if (app) {
                    openWindow(app.id, app.title, app.defaultSize);
                    output = [`Opening ${app.title}...`];
                }
                break;
            }

            case 'clear':
            case 'cls':
                setHistory([]);
                return;

            case 'whoami':
                output = [
                    '╔════════════════════════════════════╗',
                    '║  User: Akash Kamat                 ║',
                    '║  Role: Full Stack Developer        ║',
                    '║  Status: Available for hire!       ║',
                    '║  Coffee Level: ████████░░ 80%     ║',
                    '║  Debug Mode: Always ON             ║',
                    '╚════════════════════════════════════╝',
                ];
                break;

            case 'date':
                output = [new Date().toString()];
                break;

            case 'matrix':
                soundManager.playNotify();
                output = [
                    '',
                    '  Wake up, Neo...',
                    '  The Matrix has you...',
                    '  Follow the white rabbit. 🐰',
                    '',
                    '  (Unfortunately, we only have a troll calculator)',
                    '',
                ];
                break;

            case 'hack':
            case 'hacker':
                soundManager.playNotify();
                output = [
                    '',
                    '  ACCESSING MAINFRAME...',
                    '  ████████████████████ 100%',
                    '  ',
                    '  > Bypassing firewall... SUCCESS',
                    '  > Downloading RAM... 32GB acquired',
                    '  > Hacking the Gibson... ACCESS GRANTED',
                    '  > Tracing IP... 127.0.0.1 (it\'s coming from INSIDE the house!)',
                    '  ',
                    '  Just kidding. This is a portfolio website. 😄',
                    '  But nice try, Mr. Robot!',
                    '',
                ];
                break;

            case 'coffee':
            case 'java':
                output = [
                    '',
                    '  ☕ Brewing coffee...',
                    '  ',
                    '     ( (  ',
                    '      ) ) ',
                    '    ........ ',
                    '    |      |] ',
                    '    \\      /  ',
                    '     `----\'   ',
                    '  ',
                    '  Coffee.exe is essential for Developer.exe to function.',
                    '  Warning: Running low on caffeine may cause bugs.',
                    '',
                ];
                break;

            case 'hire':
            case 'hire me':
            case 'hireme':
                soundManager.playNotify();
                output = [
                    '',
                    '  🎉 EXCELLENT CHOICE! 🎉',
                    '  ',
                    '  You\'ve made the best decision today.',
                    '  ',
                    '  Benefits of hiring Akash:',
                    '  ✓ Writes code that (mostly) works',
                    '  ✓ Excellent at Googling errors',
                    '  ✓ Can turn coffee into code',
                    '  ✓ Makes fun portfolio websites',
                    '  ✓ Knows that tabs > spaces (fight me)',
                    '  ',
                    '  Contact me at: contact@akashkamat.com',
                    '  Or open the Contact app!',
                    '',
                ];
                break;

            case 'sudo':
            case 'sudo rm -rf /':
            case 'rm -rf /':
                soundManager.playError();
                output = [
                    '',
                    '  Nice try! 🙅',
                    '  ',
                    '  Permission denied: You don\'t have root access.',
                    '  Also, this is a browser. What were you expecting?',
                    '',
                ];
                break;

            case 'exit':
            case 'quit':
                output = [
                    '',
                    '  You can check out any time you like,',
                    '  But you can never leave... 🎸',
                    '  ',
                    '  (Just close the window, it\'s not that deep)',
                    '',
                ];
                break;

            case 'konami':
            case '↑↑↓↓←→←→ba':
                soundManager.playNotify();
                output = [
                    '',
                    '  🎮 KONAMI CODE ACTIVATED! 🎮',
                    '  ',
                    '  +30 Lives Added!',
                    '  (Not that you needed them for this portfolio)',
                    '  ',
                    '  Achievement Unlocked: Retro Gamer 🏆',
                    '',
                ];
                break;

            case 'vim':
            case 'vi':
                output = [
                    '',
                    '  You\'ve entered Vim.',
                    '  ',
                    '  Good luck getting out. 😈',
                    '  ',
                    '  Hint: Type :q! (or just close this window)',
                    '',
                ];
                break;

            case ':q':
            case ':q!':
            case ':wq':
                output = [
                    '',
                    '  You escaped Vim!',
                    '  ',
                    '  Achievement Unlocked: Vim Survivor 🏆',
                    '',
                ];
                break;

            case 'ls':
            case 'dir':
                output = [
                    '',
                    '  Directory of C:\\Users\\Akash',
                    '  ',
                    '  12/29/2024  09:00 AM    <DIR>          Projects',
                    '  12/29/2024  09:00 AM    <DIR>          Skills',
                    '  12/29/2024  09:00 AM             1,337 secrets.txt',
                    '  12/29/2024  09:00 AM            42,069 memes.jpg',
                    '  12/29/2024  09:00 AM    <DIR>          node_modules (∞ files)',
                    '  ',
                ];
                break;

            case 'cat secrets.txt':
            case 'type secrets.txt':
                output = [
                    '',
                    '  Contents of secrets.txt:',
                    '  ',
                    '  - I still don\'t fully understand CSS flexbox',
                    '  - I Google "how to center a div" more than I\'d admit',
                    '  - Most of my code is from Stack Overflow',
                    '  - I\'ve mass-deleted node_modules to fix bugs',
                    '  - "It works on my machine" is my defense mechanism',
                    '',
                ];
                break;

            case 'ping google.com':
            case 'ping':
                output = [
                    '',
                    '  Pinging google.com [142.250.190.78]:',
                    '  ',
                    '  Reply: Hello from Google! We\'re watching. 👀',
                    '  Reply: Did you try turning it off and on again?',
                    '  Reply: Have you considered using Bing? (Just kidding)',
                    '  Reply: Error 418: I\'m a teapot ☕',
                    '',
                ];
                break;

            case 'neofetch':
                output = [
                    '',
                    '         .---.               akash@portfolio',
                    '        /     \\              ----------------',
                    '        \\.@-@./              OS: AkashOS 7',
                    '        /`\\_/`\\              Host: Your Browser',
                    '       //  _  \\\\             Kernel: React 19',
                    '      | \\     )|_            Uptime: Way too long',
                    '     /`\\_`>  <_/ \\           Packages: node_modules (∞)',
                    '     \\__/\'---\'\\__/           Shell: fake-bash',
                    '                              CPU: Brain @ tired MHz',
                    '                              Memory: 8GB / Coffee',
                    '',
                ];
                break;

            case '':
                return;

            default:
                if (command.startsWith('echo ')) {
                    output = [command.substring(5)];
                } else if (command.startsWith('cd ')) {
                    output = ['Nowhere to go! This is a browser, not a real terminal. 😅'];
                } else {
                    output = [
                        `'${command}' is not recognized as an internal or external command.`,
                        '',
                        'Type "help" for a list of available commands.',
                    ];
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
        soundManager.playClick();
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
