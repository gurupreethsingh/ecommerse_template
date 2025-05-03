// Footer.jsx
import React from "react";
// import SubscriptionForm from "./SubscriptionForm";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help-center" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:text-white transition"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaGithub />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Subscription Form */}
          {/* <div>
            <h3 className="text-white text-lg font-semibold mb-4">Subscribe</h3>
            <SubscriptionForm />
          </div> */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Address</h3>
            <div className=" space-x-4">
              <a href="#" className="hover:text-white transition">
                Ecoders, Hesaraghatta Road,
              </a>
              <a href="#" className="hover:text-white transition">
                Bagalagunte, Defence Colony
              </a>
              <a href="#" className="hover:text-white transition">
                Bangalore
              </a>
              <a href="#" className="hover:text-white transition">
                Pin Code - 560057
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; 2025 Ecoders, Inc. All rights reserved.
          </p>
          <p className="text-sm mt-4 md:mt-0">Made with ❤️ in Bengaluru</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
