import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout() {

  return (
    <>
      <Navbar />
      <main className='flex-grow-1'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
