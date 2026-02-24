import { useState, useEffect, useRef } from 'react';
import './MediaPlayerApp.css';

interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    fake: boolean;
}

const MediaPlayerApp = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(75);
    const [progress, setProgress] = useState(0);
    const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(20).fill(10));
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const idleBars = Array(20).fill(10);

    const playlist: Track[] = [
        { id: '1', title: 'Loading...', artist: 'Buffering', album: 'Please Wait', duration: '∞:∞', fake: true },
        { id: '2', title: 'Never Gonna Give You Up', artist: 'Rick Astley', album: 'Whenever You Need Somebody', duration: '3:32', fake: true },
        { id: '3', title: 'Darude - Sandstorm', artist: 'Every YouTube Comment', album: 'Memes Vol. 1', duration: '3:45', fake: true },
        { id: '4', title: 'Epic Sax Guy', artist: 'SunStroke Project', album: 'Eurovision Hits', duration: '10:00:00', fake: true },
        { id: '5', title: 'Keyboard Cat', artist: 'Fatso', album: 'Internet Classics', duration: '0:54', fake: true },
        { id: '6', title: 'All Star', artist: 'Smash Mouth', album: 'Shrek Soundtrack', duration: '3:20', fake: true },
        { id: '7', title: 'Through the Fire and Flames', artist: 'DragonForce', album: 'Guitar Hero Nightmares', duration: '7:21', fake: true },
        { id: '8', title: 'Elevator Music', artist: 'Awkward Silence', album: 'Lobby Favorites', duration: '24:00:00', fake: true },
    ];

    // Fake visualizer animation
    useEffect(() => {
        if (!isPlaying) return;

        const visualizerInterval = setInterval(() => {
            setVisualizerBars((bars) => bars.map(() => Math.random() * 80 + 20));
        }, 100);

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // Auto-play next track
                    setCurrentTrack((current) => (current + 1) % playlist.length);
                    return 0;
                }
                return prev + 0.5;
            });
        }, 200);

        return () => {
            clearInterval(visualizerInterval);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, playlist.length]);

    const handlePlayPause = () => {
        if (!isPlaying) {
            // Show troll message occasionally
            if (Math.random() < 0.3) {
                alert(`🎵 Now Playing: ${playlist[currentTrack].title}\n\n(Just kidding, this is a fake media player. But imagine how good this song would sound!)`);
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrack((current) => (current + 1) % playlist.length);
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentTrack((current) => (current === 0 ? playlist.length - 1 : current - 1));
        setProgress(0);
    };

    const handleTrackSelect = (index: number) => {
        setCurrentTrack(index);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <div className="media-player-app">
            {/* Visualizer */}
            <div className="visualizer">
                {(isPlaying ? visualizerBars : idleBars).map((height, idx) => (
                    <div
                        key={idx}
                        className="visualizer-bar"
                        style={{ height: `${height}%` }}
                    />
                ))}
                <div className="now-playing-overlay">
                    <div className="album-art">🎵</div>
                    <div className="track-info">
                        <div className="track-title">{playlist[currentTrack].title}</div>
                        <div className="track-artist">{playlist[currentTrack].artist}</div>
                        <div className="track-album">{playlist[currentTrack].album}</div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <span className="time-current">
                    {Math.floor(progress / 100 * 210 / 60)}:{(Math.floor(progress / 100 * 210) % 60).toString().padStart(2, '0')}
                </span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="time-total">{playlist[currentTrack].duration}</span>
            </div>

            {/* Controls */}
            <div className="controls">
                <button className="control-btn" title="Shuffle">🔀</button>
                <button className="control-btn" onClick={handlePrev} title="Previous">⏮️</button>
                <button className="control-btn play-btn" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button className="control-btn" onClick={handleNext} title="Next">⏭️</button>
                <button className="control-btn" title="Repeat">🔁</button>
            </div>

            {/* Volume */}
            <div className="volume-control">
                <span>🔊</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="volume-slider"
                />
                <span className="volume-value">{volume}%</span>
            </div>

            {/* Playlist */}
            <div className="playlist">
                <div className="playlist-header">
                    <span>📋 Playlist</span>
                    <span className="playlist-count">{playlist.length} tracks</span>
                </div>
                <div className="playlist-tracks">
                    {playlist.map((track, idx) => (
                        <div
                            key={track.id}
                            className={`playlist-track ${idx === currentTrack ? 'active' : ''}`}
                            onClick={() => handleTrackSelect(idx)}
                        >
                            <span className="track-number">{idx + 1}</span>
                            <div className="track-details">
                                <span className="track-name">{track.title}</span>
                                <span className="track-meta">{track.artist}</span>
                            </div>
                            <span className="track-duration">{track.duration}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="media-footer">
                <span>🎧 Windows Media Player Classic™</span>
                <span>⚠️ No actual audio included</span>
            </div>
        </div>
    );
};

export default MediaPlayerApp;
