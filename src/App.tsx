import Modal from '@/components/ui/Modal';
import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
      <Modal />
    </>
  );
}

export default App;
