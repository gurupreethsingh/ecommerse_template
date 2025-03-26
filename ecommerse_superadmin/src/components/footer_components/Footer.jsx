import React from 'react'
import CustomeLink from '../common_components/CustomeLink'

const Footer = () => {
  return (
    <div>

   <div className = "bg-gray-100 p-5 text-gray-900 text-center flex justify-evenly flex-wrap">
       <div className="one">
        <h1 className="text-xl  font-bold">Web Links</h1>
       <ul className="nav flex-column">
       <CustomeLink linkAddress="/home" linkName = "Home"  />
       <CustomeLink linkAddress="/about-us" linkName = "About Us"  />
       <CustomeLink linkAddress="/contact-us" linkName = "Contact Us"  />
</ul>
       </div>
       <div className="one">
        <h1 className="text-xl  font-bold">Web Links</h1>
       <ul className="nav flex-column">
  <li className="nav-item">
    <a className="nav-link text-gray-900" aria-current="page" href="/home" >Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href="/contact-us">Contact Us</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href = "/about-us">About Us</a>
  </li>
</ul>
       </div>
       <div className="one">
        <h1 className="text-xl  font-bold">Web Links</h1>
       <ul className="nav flex-column">
  <li className="nav-item">
    <a className="nav-link text-gray-900" aria-current="page" href="/home" >Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href="/contact-us">Contact Us</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href = "/about-us">About Us</a>
  </li>
</ul>
       </div>
       <div className="one">
        <h1 className="text-xl  font-bold">Web Links</h1>
       <ul className="nav flex-column">
  <li className="nav-item">
    <a className="nav-link text-gray-900" aria-current="page" href="/home" >Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href="/contact-us">Contact Us</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-gray-900" href = "/about-us">About Us</a>
  </li>
</ul>
       </div>
   </div>

      <p className='bg-gray-900 text-white text-center p-2'>copyright &copy; ecoders-Bangalore</p>
    </div>
  )
}

export default Footer
