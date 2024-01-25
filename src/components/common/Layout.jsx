import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout = () => (
  <>
    <Header />
    <main style={{height: '80vh', width: '100%'}}>
      <Outlet />
    </main>
    <Footer />
  </>    
);

export default Layout;