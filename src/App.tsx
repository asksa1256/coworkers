import Modal from '@/components/ui/Modal';
import routes from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
        <RouterProvider router={router} />
        <Modal />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
