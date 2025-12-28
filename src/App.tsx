import Desktop from './core/Desktop';
import WindowManager from './core/WindowManager';
import Taskbar from './core/Taskbar';
import './index.css';

function App() {
  return (
    <div className="os-container">
      <Desktop />
      <WindowManager />
      <Taskbar />
    </div>
  );
}

export default App;
