import { useState } from 'react';
import './HelpApp.css';

const HelpApp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const topics = [
        {
            id: 'getting-started',
            title: '🚀 Getting Started',
            content: `Welcome to AkashOS Help!

If you're seeing this, congratulations! You've successfully booted into a fake operating system running in your browser. Your IT department is probably very confused right now.

Quick Tips:
• Click on desktop icons to open applications
• The Start menu has more apps (some actually work!)
• Right-click the desktop for options
• Try the Terminal for a command-line experience

Remember: If something doesn't work, it's a feature, not a bug.`
        },
        {
            id: 'troubleshooting',
            title: '🔧 Troubleshooting',
            content: `Common Issues and "Solutions":

Q: Why doesn't the calculator give correct answers?
A: It's calculating in parallel universes where math is different.

Q: Why can't I browse real websites?
A: The hamsters powering our servers need a break.

Q: The music player has no actual music!
A: Just imagine the music. It's better that way.

Q: Is my data being saved?
A: Yes! To /dev/null, the most secure storage.

Q: Why does everything look like Windows 7?
A: Because Windows 7 was peak UI design. Fight me.

Still having issues? Have you tried:
✓ Turning it off and on again
✓ Downloading more RAM
✓ Asking Stack Overflow
✓ Blaming the intern`
        },
        {
            id: 'easter-eggs',
            title: '🥚 Easter Eggs',
            content: `Shh... Secret List!

Here are some hidden features you might discover:

• Try typing "konami" in the terminal
• The calculator has... special math skills
• Click the Windows logo 10 times fast
• Right-click the desktop many times
• The solitaire game is rigged (but sometimes you win anyway)
• Search for "hire me" in the browser

There are more secrets hidden throughout the OS. Keep exploring!

Fun Fact: You spent time reading this instead of checking my actual portfolio. I respect that.`
        },
        {
            id: 'about-dev',
            title: '👨‍💻 About the Developer',
            content: `Hi! I'm Akash Kamat 👋

I built this Windows 7-style portfolio because:
1. I wanted to stand out
2. Nostalgia is a powerful thing
3. I may have too much free time

Skills demonstrated in this project:
• React + TypeScript
• State management (Zustand)
• CSS animations
• Overthinking simple portfolio sites
• Turning procrastination into productivity

If you've made it this far, you should definitely:
• Check out my real projects in the Work folder
• Connect with me (Contact app)
• Consider hiring me (I accept coffee as payment)

Thanks for visiting my portfolio OS!`
        },
        {
            id: 'faq',
            title: '❓ FAQ',
            content: `Frequently Asked Questions

Q: Is this a real operating system?
A: No, it's a portfolio website cosplaying as one.

Q: Can I install real software?
A: Only if you believe hard enough.

Q: Why Windows 7?
A: Because Windows 11 would take too long to load.

Q: Are you actually a good developer?
A: I made a whole fake OS instead of a normal portfolio. You decide.

Q: Can I hire you?
A: Yes! Please! The answer is always yes!

Q: How long did this take to build?
A: Less time than it took Microsoft to fix their Start menu.

Q: Is this mobile responsive?
A: *nervous laughter* It's... optimized for desktop.

Q: What's the meaning of life?
A: 42. The calculator might give you a different answer though.`
        }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.toLowerCase().includes('hire')) {
            setSelectedTopic('about-dev');
        } else {
            setSelectedTopic('faq');
        }
    };

    const currentTopic = topics.find(t => t.id === selectedTopic);

    return (
        <div className="help-app">
            {/* Header */}
            <div className="help-header">
                <div className="help-title">
                    <span className="help-icon">❓</span>
                    <span>AkashOS Help and Support</span>
                </div>
            </div>

            <div className="help-content">
                {/* Sidebar */}
                <div className="help-sidebar">
                    <form onSubmit={handleSearch} className="help-search">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search help topics..."
                            className="help-search-input"
                        />
                        <button type="submit" className="help-search-btn">🔍</button>
                    </form>

                    <div className="help-topics">
                        <h3>Help Topics</h3>
                        {topics.map((topic) => (
                            <button
                                key={topic.id}
                                className={`help-topic ${selectedTopic === topic.id ? 'active' : ''}`}
                                onClick={() => setSelectedTopic(topic.id)}
                            >
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="help-main">
                    {currentTopic ? (
                        <div className="topic-content">
                            <h2>{currentTopic.title}</h2>
                            <pre>{currentTopic.content}</pre>
                        </div>
                    ) : (
                        <div className="help-welcome">
                            <h1>👋 Welcome to Help!</h1>
                            <p>Select a topic from the sidebar or search for something.</p>
                            <div className="quick-links">
                                <h3>Popular Topics:</h3>
                                <button onClick={() => setSelectedTopic('getting-started')}>
                                    🚀 Getting Started
                                </button>
                                <button onClick={() => setSelectedTopic('easter-eggs')}>
                                    🥚 Easter Eggs
                                </button>
                                <button onClick={() => setSelectedTopic('about-dev')}>
                                    👨‍💻 Hire Me!
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="help-footer">
                <span>📞 Support Hotline: 1-800-HIRE-AKASH</span>
                <span>💡 Pro tip: The best help is self-help (and caffeine)</span>
            </div>
        </div>
    );
};

export default HelpApp;
