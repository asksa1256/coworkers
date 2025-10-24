import Modal from '@/components/ui/Modal';
import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
      <Modal />
      <Toaster />
    </>
  );
}

export default App;
