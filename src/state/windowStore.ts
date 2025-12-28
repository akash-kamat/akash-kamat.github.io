import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WindowState = {
    id: string;
    appId: string;
    title: string;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
};

export type IconState = {
    id: string;
    appId: string;
    title: string;
    icon: string;
    desktopPosition: { x: number; y: number };
};

export type WindowStore = {
    windows: WindowState[];
    activeWindowId: string | null;
    nextZIndex: number;

    // Desktop Icons State
    icons: IconState[];
    selectedIconId: string | null;

    openWindow: (appId: string, title: string, defaultSize?: { width: number; height: number }) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    toggleMaximize: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;

    // Icon Actions
    addIcon: (icon: IconState) => void;
    updateIconPosition: (id: string, position: { x: number; y: number }) => void;
    selectIcon: (id: string | null) => void;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useWindowStore = create<WindowStore>()(
    persist(
        (set, get) => ({
            windows: [],
            activeWindowId: null,
            nextZIndex: 1,
            icons: [],
            selectedIconId: null,

            openWindow: (appId, title, defaultSize = { width: 600, height: 400 }) => {
                const { windows, nextZIndex } = get();

                // Check if window already exists for this app
                const existingWindow = windows.find(w => w.appId === appId);
                if (existingWindow) {
                    // Focus and restore if minimized
                    get().restoreWindow(existingWindow.id);
                    get().focusWindow(existingWindow.id);
                    return;
                }

                const id = generateId();
                const newWindow: WindowState = {
                    id,
                    appId,
                    title,
                    isMinimized: false,
                    isMaximized: false,
                    position: {
                        x: 100 + (windows.length * 30) % 200,
                        y: 50 + (windows.length * 30) % 150,
                    },
                    size: defaultSize,
                    zIndex: nextZIndex,
                };

                set({
                    windows: [...windows, newWindow],
                    activeWindowId: id,
                    nextZIndex: nextZIndex + 1,
                });
            },

            closeWindow: (id) => {
                const { windows, activeWindowId } = get();
                const newWindows = windows.filter(w => w.id !== id);

                set({
                    windows: newWindows,
                    activeWindowId: activeWindowId === id
                        ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
                        : activeWindowId,
                });
            },

            focusWindow: (id) => {
                const { windows, nextZIndex } = get();

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, zIndex: nextZIndex } : w
                    ),
                    activeWindowId: id,
                    nextZIndex: nextZIndex + 1,
                });
            },

            minimizeWindow: (id) => {
                const { windows, activeWindowId } = get();
                const remainingVisible = windows.filter(w => w.id !== id && !w.isMinimized);

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, isMinimized: true } : w
                    ),
                    activeWindowId: activeWindowId === id
                        ? (remainingVisible.length > 0 ? remainingVisible[remainingVisible.length - 1].id : null)
                        : activeWindowId,
                });
            },

            restoreWindow: (id) => {
                const { windows, nextZIndex } = get();

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
                    ),
                    activeWindowId: id,
                    nextZIndex: nextZIndex + 1,
                });
            },

            toggleMaximize: (id) => {
                const { windows } = get();

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
                    ),
                });
            },

            updateWindowPosition: (id, position) => {
                const { windows } = get();

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, position } : w
                    ),
                });
            },

            updateWindowSize: (id, size) => {
                const { windows } = get();

                set({
                    windows: windows.map(w =>
                        w.id === id ? { ...w, size } : w
                    ),
                });
            },

            // Icon Actions
            addIcon: (icon) => {
                const { icons } = get();
                if (!icons.find(i => i.id === icon.id)) {
                    set({ icons: [...icons, icon] });
                }
            },

            updateIconPosition: (id, position) => {
                const { icons } = get();
                set({
                    icons: icons.map(i => i.id === id ? { ...i, desktopPosition: position } : i)
                });
            },

            selectIcon: (id) => {
                set({ selectedIconId: id });
            },
        }),
        {
            name: 'akashkamat-os-windows',
            partialize: (state) => ({
                // Only persist certain fields
                windows: state.windows.map(w => ({
                    id: w.id, // Need ID for persistence
                    appId: w.appId,
                    title: w.title,
                    isMinimized: w.isMinimized,
                    isMaximized: w.isMaximized,
                    position: w.position,
                    size: w.size,
                    zIndex: w.zIndex
                })),
                icons: state.icons,
            }),
        }
    )
);
