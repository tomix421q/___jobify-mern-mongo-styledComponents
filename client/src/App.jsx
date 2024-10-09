import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Landing,
  HomeLayout,
  Register,
  Login,
  Error,
  Stats,
  AllJobs,
  AddJob,
  EditJob,
  Profile,
  Admin,
  DashboardLayout,
} from './pages'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as addJobAction } from './pages/AddJob'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as editJobLoader } from './pages/EditJob'
import { action as editJobPageAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminLoader } from './pages/Admin'
import { action as profileAction } from './pages/Profile'
import { loader as statsLoader } from './pages/Stats'

export const checkDefaultTheme = () => {
  const isDarkTHeme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTHeme)
  return isDarkTHeme
}
checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      { path: 'login', element: <Login />, action: loginAction },
      {
        path: 'dashboard',
        loader: dashboardLoader,
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          { path: 'profile', element: <Profile />, action: profileAction },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobPageAction,
          },
          { path: 'delete-job/:id', action: deleteJobAction },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}
export default App
