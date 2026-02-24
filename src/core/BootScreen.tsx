import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/soundManager';
import './BootScreen.css';

interface BootScreenProps {
    onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
    const [phase, setPhase] = useState<'starting' | 'loading' | 'done'>('starting');
    const [loadingDots, setLoadingDots] = useState(0);

    useEffect(() => {
        soundManager.init();

        const startTimer = setTimeout(() => {
            setPhase('loading');
        }, 900);

        const doneTimer = setTimeout(() => {
            soundManager.playStartup();
            setPhase('done');
        }, 4200);

        const finalTimer = setTimeout(() => {
            onBootComplete();
        }, 4600);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(doneTimer);
            clearTimeout(finalTimer);
        };
    }, [onBootComplete]);

    useEffect(() => {
        if (phase !== 'loading') return;

        const dotInterval = setInterval(() => {
            setLoadingDots((prev) => (prev + 1) % 4);
        }, 350);

        return () => clearInterval(dotInterval);
    }, [phase]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="boot-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <div className="boot-content">
                        {phase === 'starting' && (
                            <motion.div
                                className="boot-starting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="boot-logo">
                                    <div className="boot-logo__grid">
                                        <div className="boot-logo__segment boot-logo__segment--red"></div>
                                        <div className="boot-logo__segment boot-logo__segment--green"></div>
                                        <div className="boot-logo__segment boot-logo__segment--blue"></div>
                                        <div className="boot-logo__segment boot-logo__segment--yellow"></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {phase === 'loading' && (
                            <motion.div
                                className="boot-loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="boot-logo">
                                    <div className="boot-logo__grid">
                                        <div className="boot-logo__segment boot-logo__segment--red"></div>
                                        <div className="boot-logo__segment boot-logo__segment--green"></div>
                                        <div className="boot-logo__segment boot-logo__segment--blue"></div>
                                        <div className="boot-logo__segment boot-logo__segment--yellow"></div>
                                    </div>
                                </div>

                                <div className="loading-orbs">
                                    <div className="orb orb-1"></div>
                                    <div className="orb orb-2"></div>
                                    <div className="orb orb-3"></div>
                                    <div className="orb orb-4"></div>
                                    <div className="orb orb-5"></div>
                                </div>

                                <div className="boot-text">
                                    booting into akash{'.'.repeat(loadingDots)}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="boot-footer">
                        <div className="boot-copyright">
                            &copy; 2026 Akash Kamat. All rights reserved.
                        </div>
                        <div className="boot-version">
                            Portfolio OS Experience - Build 7601
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BootScreen;

