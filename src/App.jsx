// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// layouts 
import MainLayout from "./layout/MainLayout"

import './index.css'
// pages
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <HomePage/> 
        },
        {
          path: '/quiz/:title',
          element: <QuizPage/>
        }
      ]
    },

  ])
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
