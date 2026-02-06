import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
