import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from "./components/Layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Posts from './pages/Posts.jsx';
import PostDetails from './pages/PostDetails.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // renders at "/"
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <PostDetails />},
      /*{ path: "log-in", element: },
      { path: "sign-up", element: },
      { path: "log-out", element: }*/
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
