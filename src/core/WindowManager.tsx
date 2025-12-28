import { Suspense } from 'react';
import { useWindowStore } from '../state/windowStore';
import { getAppById } from '../utils/windowRegistry';
import Window from './Window';

const WindowManager = () => {
    const windows = useWindowStore((state) => state.windows);

    return (
        <div className="window-manager">
            {windows.map((windowState) => {
                const app = getAppById(windowState.appId);
                if (!app) return null;

                const AppComponent = app.component;

                return (
                    <Window key={windowState.id} windowState={windowState}>
                        <Suspense fallback={<div className="window-loading">Loading...</div>}>
                            <AppComponent />
                        </Suspense>
                    </Window>
                );
            })}
        </div>
    );
};

export default WindowManager;
