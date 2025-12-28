import { Howl } from 'howler';
import { useSettingsStore } from '../state/settingsStore';

// Sound files will be added to assets/sounds/
// For now, we'll use placeholder paths

class SoundManager {
    private sounds: Record<string, Howl | null> = {
        click: null,
        open: null,
        close: null,
        minimize: null,
        maximize: null,
        error: null,
    };

    private initialized = false;

    init() {
        if (this.initialized) return;

        // Initialize sounds with placeholder - sounds will be added later
        // Using try-catch to handle missing sound files gracefully
        try {
            this.sounds.click = new Howl({
                src: ['/sounds/click.mp3'],
                volume: 0.3,
                preload: true,
            });

            this.sounds.open = new Howl({
                src: ['/sounds/open.mp3'],
                volume: 0.4,
                preload: true,
            });

            this.sounds.close = new Howl({
                src: ['/sounds/close.mp3'],
                volume: 0.3,
                preload: true,
            });

            this.sounds.minimize = new Howl({
                src: ['/sounds/minimize.mp3'],
                volume: 0.3,
                preload: true,
            });

            this.sounds.maximize = new Howl({
                src: ['/sounds/maximize.mp3'],
                volume: 0.3,
                preload: true,
            });

            this.sounds.error = new Howl({
                src: ['/sounds/error.mp3'],
                volume: 0.5,
                preload: true,
            });
        } catch (e) {
            console.warn('Sound files not found, sounds disabled');
        }

        this.initialized = true;
    }

    private play(soundName: keyof typeof this.sounds) {
        const { soundEnabled } = useSettingsStore.getState();
        if (!soundEnabled) return;

        const sound = this.sounds[soundName];
        if (sound) {
            try {
                sound.play();
            } catch (e) {
                // Silently fail if sound can't play
            }
        }
    }

    playClick() {
        this.play('click');
    }

    playOpen() {
        this.play('open');
    }

    playClose() {
        this.play('close');
    }

    playMinimize() {
        this.play('minimize');
    }

    playMaximize() {
        this.play('maximize');
    }

    playError() {
        this.play('error');
    }
}

export const soundManager = new SoundManager();
