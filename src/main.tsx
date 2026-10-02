import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadAllKeyImages } from './lib/preloader';

// Kick off background preloading of destination imagery for instant navigation
preloadAllKeyImages();

createRoot(document.getElementById('root')!).render(<App />);
