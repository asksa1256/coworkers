import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(routes);
  //test pr
  return <RouterProvider router={router} />;
}

export default App;
