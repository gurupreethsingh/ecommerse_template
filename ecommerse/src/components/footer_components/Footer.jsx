import React from "react";
import { CiFacebook, FaGithub, CiTwitter, CiLinkedin } from "../../icons/Icons";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
  return (
    <div>
      {/* Top Footer */}
      <div className="bg-gray-50 px-4 py-6">
        <div className="footer_parent grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-center p-5">
          {/* Web Links */}
          <div>
            <p className="font-bold mb-2">Web Links</p>
            <nav className="flex flex-col gap-2">
              <a href="/home" className="text-gray-700 hover:text-black">
                Home
              </a>
              <a href="/about-us" className="text-gray-700 hover:text-black">
                About Us
              </a>
              <a href="/contact-us" className="text-gray-700 hover:text-black">
                Contact Us
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <p className="font-bold mb-2 text-lg">Social Links</p>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-gray-700 hover:text-black">
                Facebook
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                Twitter
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Policies */}
          <div>
            <p className="font-bold mb-2 text-lg">Policies</p>
            <nav className="flex flex-col gap-2">
              <a
                href="/privacy-policy"
                className="text-gray-700 hover:text-black"
              >
                Privacy Policy
              </a>
              <a
                href="/return-policy"
                className="text-gray-700 hover:text-black"
              >
                Return Policy
              </a>
            </nav>
          </div>

          {/* Address */}
          <div>
            <p className="font-bold mb-2 text-lg">Address</p>
            <nav className="flex flex-col gap-2">
              <span className="text-gray-700">HMS</span>
              <span className="text-gray-700">Bangalore</span>
              <span className="text-gray-700">560057</span>
            </nav>
          </div>
        </div>
        <SubscriptionForm />
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800 text-white px-4 py-4">
        <small className="text-sm text-center sm:text-left">
          &copy; 2025 ecoders, Inc. All rights reserved.
        </small>
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-blue-400">
            <CiFacebook />
          </a>
          <a href="#" className="hover:text-blue-400">
            <CiTwitter />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-blue-400">
            <CiLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
