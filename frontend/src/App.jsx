import { Outlet } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import { DiscountProvide, DiscountProvider } from './context/DiscountContext';

import Ai from './pages/home/Ai'; // ✅ Import Ai component

function App() {
  return (
    <>
      <AuthProvide>
        <DiscountProvider>
        <Navbar />
        <div className="h-20" aria-hidden="true" />
         <div className="w-full flex justify-center items-center mb-4">
          <Ai />
        </div>
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
        </main>

        <Footer />
        </DiscountProvider>
      </AuthProvide>
    </>
  );
}

export default App;

