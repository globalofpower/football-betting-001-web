import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./service/graphql/apollo-client";

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
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
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
      </ApolloProvider>
    </QueryClientProvider>
  </StrictMode>,
)
