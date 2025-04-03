import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.tsx';
import { Provider } from 'react-redux';
import { timerStore } from './store/useTimerStore.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={timerStore}>
      <Home />
    </Provider>
  </StrictMode>
);
