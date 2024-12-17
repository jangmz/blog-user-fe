import { Outlet } from 'react-router-dom';
import Footer from './components/Layouts/Footer';
import Navbar from './components/Layouts/Navbar';

function Layout() {

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
