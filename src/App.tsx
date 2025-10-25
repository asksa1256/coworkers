import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
      <Modal />
      <Toast />
    </>
  );
}

export default App;
