import { useState } from 'react';
import './BrowserApp.css';

const BrowserApp = () => {
    const [url, setUrl] = useState('https://www.akashkamat.com');
    const [currentPage, setCurrentPage] = useState<'home' | 'search' | '404' | 'loading'>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const visitorCounterSuffix = '742';

    const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            // Everything leads to 404 or funny pages
            if (url.includes('google')) {
                setCurrentPage('search');
            } else {
                setCurrentPage('404');
            }
        }, 1500);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setCurrentPage('404');
        }, 1000);
    };

    const searchResults = [
        { title: "How to exit Vim - Stack Overflow", desc: "I've been stuck since 2015..." },
        { title: "Why is my code not working?", desc: "It works on my machine ¯\\_(ツ)_/¯" },
        { title: "Is cereal a soup? - Reddit", desc: "The eternal debate continues" },
        { title: "10 reasons why tabs are better than spaces", desc: "Number 7 will shock you!" },
        { title: searchQuery + " - No results found", desc: "Did you mean: 'hire Akash Kamat'?" },
    ];

    return (
        <div className="browser-app">
            {/* Browser Toolbar */}
            <div className="browser-toolbar">
                <div className="browser-nav">
                    <button className="browser-btn" title="Back">←</button>
                    <button className="browser-btn" title="Forward">→</button>
                    <button className="browser-btn" onClick={() => setCurrentPage('home')} title="Home">🏠</button>
                    <button className="browser-btn" onClick={() => window.location.reload()} title="Refresh">↻</button>
                </div>
                <form className="browser-url-bar" onSubmit={handleNavigate}>
                    <span className="browser-url-icon">🔒</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="browser-url-input"
                        placeholder="Enter URL..."
                    />
                    <button type="submit" className="browser-go">Go</button>
                </form>
            </div>

            {/* Browser Content */}
            <div className="browser-content">
                {isLoading ? (
                    <div className="browser-loading">
                        <div className="loading-spinner"></div>
                        <p>Connecting to dial-up modem...</p>
                        <p className="loading-subtext">🔊 *screech* *beep* *boop*</p>
                    </div>
                ) : currentPage === 'home' ? (
                    <div className="browser-home">
                        <div className="ie-logo">🌐</div>
                        <h1>Internet Explorer</h1>
                        <p className="ie-subtitle">The browser your IT department still uses</p>
                        
                        <form className="ie-search" onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search the World Wide Web..."
                                className="ie-search-input"
                            />
                            <button type="submit" className="ie-search-btn">🔍 Search</button>
                        </form>

                        <div className="ie-links">
                            <h3>Favorites ⭐</h3>
                            <ul>
                                <li onClick={() => { setUrl('https://github.com/akash-kamat'); setCurrentPage('404'); }}>
                                    🐙 My GitHub
                                </li>
                                <li onClick={() => { setUrl('https://linkedin.com/in/akash-kamat'); setCurrentPage('404'); }}>
                                    💼 LinkedIn (for the recruiters)
                                </li>
                                <li onClick={() => setCurrentPage('search')}>
                                    🔍 AltaVista (Google's grandfather)
                                </li>
                                <li onClick={() => setCurrentPage('404')}>
                                    📧 Check Hotmail
                                </li>
                            </ul>
                        </div>

                        <div className="ie-footer">
                            <p>⚠️ This browser is best viewed with Netscape Navigator</p>
                            <p>🎵 Visitor Counter: 000,000,{visitorCounterSuffix}</p>
                        </div>
                    </div>
                ) : currentPage === 'search' ? (
                    <div className="browser-search-results">
                        <div className="search-header">
                            <span className="search-logo">🔍 Bingle</span>
                            <form onSubmit={handleSearch} className="search-form">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button type="submit">Search</button>
                            </form>
                        </div>
                        <div className="search-results">
                            <p className="results-count">About 4,206,969 results (0.42 seconds)</p>
                            {searchResults.map((result, idx) => (
                                <div key={idx} className="search-result" onClick={() => setCurrentPage('404')}>
                                    <h3>{result.title}</h3>
                                    <p>{result.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="browser-404">
                        <h1>😵 404 - Page Not Found</h1>
                        <p>The page you're looking for has gone to live on a farm upstate.</p>
                        <div className="error-details">
                            <p>Possible reasons:</p>
                            <ul>
                                <li>The hamster powering our servers took a break</li>
                                <li>This URL was a test and you failed</li>
                                <li>The page exists but it's shy</li>
                                <li>You should probably hire the developer of this site instead</li>
                            </ul>
                        </div>
                        <button className="btn-home" onClick={() => setCurrentPage('home')}>
                            🏠 Take me home
                        </button>
                        <p className="error-code">Error Code: COFFEE_NOT_FOUND</p>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="browser-status">
                <span>🌐 {isLoading ? 'Loading...' : 'Done'}</span>
                <span>🔒 Secured by hopes and dreams</span>
            </div>
        </div>
    );
};

export default BrowserApp;

