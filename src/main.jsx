import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BlogList from './components/Blog/BlogList.jsx';
import BlogArticle from './components/Blog/BlogArticle.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "posts",
        element: <BlogList />,
        children: [
          {
            path:":postID",
            element: <BlogArticle />
          }
        ]
      }/*,{
        path: "log-in",
        element: 
      }, {
        path: sign-up",
        element:
      }, {
        path:"log-out",
        element:
      }*/
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
