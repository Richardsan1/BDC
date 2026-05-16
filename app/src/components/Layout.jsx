import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ admin = false, hideFooter = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header admin={admin} />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
