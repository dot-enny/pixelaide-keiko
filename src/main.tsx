import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { LocomotiveScroll } from './pages/LocomotiveScroll'
import App from './pages/Test'
import { MonolithStudio } from './pages/monolith-studio/Index'
import { Tabs } from './pages/tabs/Index'
import { RevealLinks } from './pages/tabs/RevealLinks'
import { LayoutAnimationTabs } from './pages/tabs/LayoutAnimationTabs'
import { DefaultLayout } from './layouts/Default'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/", element: <DefaultLayout />,
    children: [
      { path: "/test", element: <App /> },
      { path: "loco-scrollo", element: <LocomotiveScroll /> },
      { path: "/tabs", element: <Tabs /> },
      { path: "/tabs-with-layout-anim", element: <LayoutAnimationTabs /> },
      { path: "/reveal-links", element: <RevealLinks /> },
    ]
  },
  { path: "/monolith-studio", element: <MonolithStudio /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
