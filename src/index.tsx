import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StateContextProvider } from './context/context';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);