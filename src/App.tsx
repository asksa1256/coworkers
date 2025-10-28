import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import routes from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Modal />
        <Toast />
      </QueryClientProvider>
    </>
  );
}

export default App;
