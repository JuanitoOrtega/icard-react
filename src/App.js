import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigation } from './routes';
import { AuthProvider } from './context';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}