import { Component } from 'react';
import { RouterProvider } from "react-router/dom";
import router from './routes';
import { useCombineStore } from '@/store';
import { langChange } from './lang';


interface ChunkErrorBoundaryProps {
  children: any;
}

interface ChunkErrorBoundaryState {
  hasError: boolean;
}

class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  constructor(props: ChunkErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChunkErrorBoundaryState | null {
    if (error.message && (
      error.message.includes('Loading chunk') || 
      error.message.includes('Loading CSS chunk')
    )) {
      // Refresh the page
      window.location.reload();
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any): void {
    console.error('ChunkErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Loading...</div>;
    }
    return this.props.children;
  }
}

function App() {  
  const { langValue } = useCombineStore(); 
  localStorage.setItem("lang", langValue);
  langChange.setLanguage(langValue);

  return (
    <ChunkErrorBoundary>
      <RouterProvider router={router} />
    </ChunkErrorBoundary>
  )
}

export default App
