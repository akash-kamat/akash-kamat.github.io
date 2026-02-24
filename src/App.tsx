import { useState } from 'react';
import Desktop from './core/Desktop';
import WindowManager from './core/WindowManager';
import Taskbar from './core/Taskbar';
import BootScreen from './core/BootScreen';
import './index.css';

function App() {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootScreen onBootComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="os-container">
      <Desktop />
      <WindowManager />
      <Taskbar />
    </div>
  );
}

export default App;
