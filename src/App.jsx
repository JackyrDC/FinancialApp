import Login from './pages/Login';
import Register from './pages/Register';
import { HomePage,
  DashboardPage,
  HistoryPage,
  ReportsPage
} from './pages';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PocketBaseProvider from './pages/PocketBaseProvider';
import { PrivateRoute } from './pages/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<HomePage />} />,
    children: [
      {
          path: '/',
          element: <DashboardPage />,
      },
      {
          path: '/history',
          element: <HistoryPage />,
      },
      {
          path: '/reports',
          element: <ReportsPage />,
      },]
  },
  {
      path: '/login',
      element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);


function App() {
  return (
    <div className='bg-zinc-50 h-max min-h-screen w-full'>
    <PocketBaseProvider>
      <RouterProvider router={router} />
    </PocketBaseProvider>
    </div>
  );
}

export default App;