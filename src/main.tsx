import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Restore clean SPA paths when redirected via GitHub Pages 404.html (?/path)
if (typeof window !== 'undefined' && window.location.search.startsWith('?/')) {
  const decoded = window.location.search
    .slice(1)
    .split('&')
    .map((segment) => segment.replace(/~and~/g, '&'))
    .join('?');
  const baseNoTrail = window.location.pathname.replace(/\/$/, '');
  window.history.replaceState(null, '', `${baseNoTrail}${decoded}${window.location.hash}`);
}

createRoot(document.getElementById('root')!).render(<App />);
