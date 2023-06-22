import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import UserPage from './pages/userpage.jsx';
import Cities from './pages/cities.jsx';
import Details from './pages/details.jsx';
import Itinerary from './pages/itinerary.jsx';
import LogIn from './pages/login.jsx';
import SignUp from './pages/signupform.jsx';
import Index from './pages/index.jsx';
import NonPage from './pages/nonpage.jsx';
import Footer from './componentes/footer.jsx';
import NavBar from './componentes/navbar.jsx';

import './style/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
const user = false;
root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/user" element={<UserPage />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/cities/city/:id" element={<Details />} />
      <Route path="/cities/city/:id" element={<Itinerary />} />
      {<Route path="/login" element={user ? <UserPage /> : <LogIn />} />}
      {<Route path="/singup" element={user ? <UserPage /> : <SignUp />} />}
      <Route path="/" element={<Index />} />
      <Route path="/index" element={<Index />} />
      <Route path="*" element={<NonPage />} />
    </Routes>
    <Toaster
      position='bottom-center'
      autoClose={6000}
      hideProgressBar={true}
      newestOnTop={true}
      transition={'scale'}
    />
    <Footer />
  </BrowserRouter>
);
