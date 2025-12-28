import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    soundEnabled: boolean;
    currWallpaperIndex: number;
    wallpapers: string[];
    toggleSound: () => void;
    nextWallpaper: () => void;
    getCurrentWallpaper: () => string;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            soundEnabled: true,
            currWallpaperIndex: 0,
            wallpapers: [
                '/src/assets/default wallpaper.jpg',
                '/src/assets/wallpaper 1.jpg',
                '/src/assets/wallpaper 2.jpg',
                '/src/assets/wallpaper 3.jpg',
                '/src/assets/wallpaper 4.jpg',
            ],
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
            nextWallpaper: () => set((state) => ({
                currWallpaperIndex: (state.currWallpaperIndex + 1) % state.wallpapers.length
            })),
            getCurrentWallpaper: () => {
                const state = get();
                return state.wallpapers[state.currWallpaperIndex];
            },
        }),
        {
            name: 'os-settings-storage',
        }
    )
);
