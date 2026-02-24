import { useState, useEffect } from 'react';
import './SolitaireApp.css';

interface Card {
    suit: string;
    value: string;
    color: 'red' | 'black';
    faceUp: boolean;
}

const fallingCardSymbols = ['🃏', '♠️', '♥️', '♦️', '♣️'] as const;
const fallingCards = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    animationDelay: `${(i % 7) * 0.25}s`,
    symbol: fallingCardSymbols[i % fallingCardSymbols.length],
}));

const SolitaireApp = () => {
    const [gameState, setGameState] = useState<'playing' | 'won' | 'trolled'>('playing');
    const [clicks, setClicks] = useState(0);
    const [time, setTime] = useState(0);
    const [trollMessage, setTrollMessage] = useState<string | null>(null);

    // Generate random cards for display
    const generateCards = () => {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const cards: Card[] = [];
        
        for (let i = 0; i < 7; i++) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const value = values[Math.floor(Math.random() * values.length)];
            cards.push({
                suit,
                value,
                color: suit === '♥' || suit === '♦' ? 'red' : 'black',
                faceUp: Math.random() > 0.3,
            });
        }
        return cards;
    };

    const [columns] = useState(() => {
        const cols = [];
        for (let i = 0; i < 7; i++) {
            cols.push(generateCards().slice(0, i + 1));
        }
        return cols;
    });

    // Timer
    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => setTime(t => t + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [gameState]);

    const trollMessages = [
        "Nice try! That card doesn't go there... or does it? 🤔",
        "Are you sure about that move? I wouldn't be...",
        "Interesting strategy. Bold. Wrong, but bold.",
        "That's definitely a card. Good job identifying it!",
        "The cards have decided: chaos reigns supreme! 🃏",
        "Fun fact: The odds of winning solitaire are... wait, what was I saying?",
        "This game is rigged. (Source: I'm the game)",
        "Plot twist: All the aces are hiding under your desk",
        "You're doing great! *shuffles deck behind back*",
    ];

    const handleCardClick = () => {
        setClicks(c => c + 1);
        
        // Random trolling
        if (Math.random() < 0.3) {
            setTrollMessage(trollMessages[Math.floor(Math.random() * trollMessages.length)]);
            setTimeout(() => setTrollMessage(null), 3000);
        }

        // Random win/troll after many clicks
        if (clicks > 20 && Math.random() < 0.1) {
            if (Math.random() > 0.5) {
                setGameState('won');
            } else {
                setGameState('trolled');
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const resetGame = () => {
        setGameState('playing');
        setClicks(0);
        setTime(0);
        setTrollMessage(null);
    };

    if (gameState === 'won') {
        return (
            <div className="solitaire-app solitaire-win">
                <div className="win-animation">
                    <h1>🎉 YOU WON! 🎉</h1>
                    <p>Time: {formatTime(time)}</p>
                    <p>Clicks: {clicks}</p>
                    <p className="win-subtitle">
                        (We both know this was pure luck, but let's celebrate anyway!)
                    </p>
                    <div className="card-rain">
                        {fallingCards.map((card, i) => (
                            <span key={i} className="falling-card" style={{ 
                                left: card.left,
                                animationDelay: card.animationDelay
                            }}>
                                {card.symbol}
                            </span>
                        ))}
                    </div>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            </div>
        );
    }

    if (gameState === 'trolled') {
        return (
            <div className="solitaire-app solitaire-troll">
                <div className="troll-screen">
                    <h1>😈 GOTCHA!</h1>
                    <p>The cards have unionized and refuse to cooperate.</p>
                    <p className="troll-stats">
                        You wasted {formatTime(time)} of your life and clicked {clicks} times.
                    </p>
                    <p className="troll-advice">
                        Maybe try something productive? Like... hiring me? 👀
                    </p>
                    <button onClick={resetGame}>Fine, I'll Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="solitaire-app">
            {/* Header */}
            <div className="solitaire-header">
                <div className="solitaire-stats">
                    <span>⏱️ {formatTime(time)}</span>
                    <span>🖱️ {clicks} clicks</span>
                </div>
                <button className="new-game-btn" onClick={resetGame}>New Game</button>
            </div>

            {/* Troll Message */}
            {trollMessage && (
                <div className="troll-message">{trollMessage}</div>
            )}

            {/* Game Area */}
            <div className="solitaire-game">
                {/* Top row - Foundation & Stock */}
                <div className="solitaire-top">
                    <div className="stock-pile" onClick={handleCardClick}>
                        <div className="card card-back">🎴</div>
                    </div>
                    <div className="waste-pile" onClick={handleCardClick}>
                        <div className="card card-front red">
                            <span className="card-corner">7♥</span>
                        </div>
                    </div>
                    <div className="spacer"></div>
                    {['♠', '♥', '♦', '♣'].map((suit) => (
                        <div key={suit} className="foundation" onClick={handleCardClick}>
                            <span className={`foundation-suit ${suit === '♥' || suit === '♦' ? 'red' : ''}`}>
                                {suit}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tableau */}
                <div className="solitaire-tableau">
                    {columns.map((column, colIdx) => (
                        <div key={colIdx} className="tableau-column">
                            {column.map((card, cardIdx) => (
                                <div
                                    key={cardIdx}
                                    className={`card ${card.faceUp ? `card-front ${card.color}` : 'card-back'}`}
                                    style={{ top: `${cardIdx * 25}px` }}
                                    onClick={handleCardClick}
                                >
                                    {card.faceUp ? (
                                        <span className="card-corner">{card.value}{card.suit}</span>
                                    ) : (
                                        '🎴'
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="solitaire-footer">
                <span>💡 Tip: The cards are plotting against you</span>
            </div>
        </div>
    );
};

export default SolitaireApp;

