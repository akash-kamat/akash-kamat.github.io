import { Howl } from 'howler';
import { useSettingsStore } from '../state/settingsStore';

// Windows 7 style subtle UI sounds
class SoundManager {
    private sounds: Record<string, Howl | null> = {
        startup: null,
        click: null,
        open: null,
        close: null,
        minimize: null,
        maximize: null,
        error: null,
        notify: null,
        navigate: null,
        recycle: null,
    };

    private initialized = false;

    private createSound(soundName: keyof typeof this.sounds, src: string, volume: number) {
        try {
            this.sounds[soundName] = new Howl({
                src: [src],
                volume,
                preload: true,
            });
        } catch {
            this.sounds[soundName] = null;
        }
    }

    init() {
        if (this.initialized) return;

        // Use static audio files from /public for reliability.
        this.createSound('click', '/assets/default_win7/Windows Default.wav', 0.08);
        this.createSound('open', '/assets/default_win7/Windows Navigation Start.wav', 0.12);
        this.createSound('close', '/assets/default_win7/Windows Critical Stop.wav', 0.1);
        this.createSound('minimize', '/assets/default_win7/Windows Minimize.wav', 0.08);
        this.createSound('maximize', '/assets/default_win7/Windows Restore.wav', 0.08);
        this.createSound('error', '/assets/default_win7/Windows Error.wav', 0.2);
        this.createSound('notify', '/assets/default_win7/Windows Notify.wav', 0.15);
        this.createSound('navigate', '/assets/default_win7/Windows Navigation Start.wav', 0.06);
        this.createSound('recycle', '/assets/default_win7/Windows Recycle.wav', 0.12);
        this.createSound('startup', '/assets/default_win7/Windows Startup.wav', 0.25);

        this.initialized = true;
    }

    private play(soundName: keyof typeof this.sounds) {
        const { soundEnabled } = useSettingsStore.getState();
        if (!soundEnabled) return;

        const sound = this.sounds[soundName];
        if (sound) {
            try {
                sound.play();
            } catch {
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

    playNotify() {
        this.play('notify');
    }

    playNavigate() {
        this.play('navigate');
    }

    playRecycle() {
        this.play('recycle');
    }

    playStartup() {
        this.play('startup');
    }
}

export const soundManager = new SoundManager();
