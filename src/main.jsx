import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from "./components/Layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Posts from './pages/Posts.jsx';
import PostDetails from './pages/PostDetails.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import LogInForm from './components/Forms/LogInForm.jsx';
import SignUpForm from './components/Forms/SignUpForm.jsx';
import { BlogProvider } from './context/BlogContext.jsx';
import AuthProvider from './context/AuthContext.jsx';
import UserProfile from './components/UserProfile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewPost from './components/Dashboard/NewPost.jsx';
import EditPost from './components/Dashboard/EditPost.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // renders at "/"
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <PostDetails /> },
      { path: "posts/new", element: <NewPost /> },
      { path: "posts/edit/:postId", element: <EditPost /> },
      { path: "log-in", element: <LogInForm /> },
      { path: "sign-up", element: <SignUpForm /> },
      { path: "profile", element: <UserProfile /> },
      { path: "dashboard", element: <Dashboard /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  </StrictMode>
  
    
)
