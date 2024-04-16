import Original from './pages/Original'
import MainLayout from './layout/MainLayout'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Bonus from './pages/Bonus'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/original',
        Component: () => <Original />
      },
      {
        path: '/bonus',
        Component: () => <Bonus />
      },
      {
        path: '/',
        Component: () => <Navigate to="/original" />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
