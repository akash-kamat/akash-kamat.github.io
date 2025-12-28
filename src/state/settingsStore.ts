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
                '/assets/default wallpaper.jpg',
                '/assets/wallpaper 1.jpg',
                '/assets/wallpaper 2.jpg',
                '/assets/wallpaper 3.jpg',
                '/assets/wallpaper 4.jpg',
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
            name: 'os-settings-v2', // Changed to invalidate old cached paths
        }
    )
);
