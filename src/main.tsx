import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/auth/AuthContext';
import { Toaster } from 'sonner';

import { handleChunkLoadError } from './utils/errorHandling.ts';

document.addEventListener("wheel", function() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLInputElement && activeElement.type === "number") {
      activeElement.blur();
    }
});

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
});

handleChunkLoadError();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <div className='w-[320px]'>
          <Toaster
            position="bottom-center"
            theme="dark"
            expand
            richColors
            closeButton
          />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
