import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Homepage from './pages/common_pages/Homepage';
import PageNotFound from './pages/common_pages/PageNotFound';
import ContactUs from './pages/common_pages/ContactUs';
import AboutUs from './pages/common_pages/AboutUs';
import TopHeader from './components/header_components/TopHeader';
import Header from './components/header_components/Header';
import Footer from './components/footer_components/Footer';
import Register from './pages/user_pages/Register';
import Login from './pages/user_pages/Login';
import Dashboard from './pages/user_pages/Dashboard';

function App() {

  return (
    <>
     <Router>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/"  element={ <Homepage /> } />
        <Route path="/home"  element={ <Homepage /> } />
           <Route path="/homepage"  element={ <Homepage /> } />
           <Route path="/contact-us"  element={ <ContactUs /> } />
           <Route path="/about-us"  element={ <AboutUs /> } />
           <Route path="/register" element = { <Register /> } />
           <Route path="/login" element = { <Login /> } />
           <Route path="/dashboard" element = { <Dashboard /> } />
           <Route path="/page-not-found" element = { <PageNotFound /> } />

           <Route path="/*" element = { <PageNotFound /> } />
      </Routes>

      <Footer />
     </Router>
    </>
  )
}

export default App
