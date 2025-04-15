"use client";

import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import globalBackendRoute from "../../config/Config";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message_text: "",
    agreeToLicense: false,
  });

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${globalBackendRoute}/api/add-contact-message`,
        formData
      );
      if (response.status === 201) {
        setSubmitted(true);
        toast.success(
          "Message successfully sent! You will be notified within 24 hours.",
          {
            position: "top-right",
          }
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message_text: "",
          agreeToLicense: false,
        });
        navigate("/contact-us");
      }
    } catch (error) {
      console.error("Error submitting contact message:", error);
      toast.error(
        "There was an issue submitting your message. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 mx-auto  gap-10">
        {/* Contact Form Section */}
        <div className="w-full md:w-1/2 p-5  rounded-lg">
          <h2 className="text-xl font-bold text-red-500 mb-3">Contact Us</h2>
          <p className="text-4xl text-gray-900 mb-4 font-bold ">Get In Touch</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-1"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-1"
              >
                Your Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                id="message_text"
                name="message_text"
                rows={4}
                value={formData.message_text}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-400 text-white font-medium py-2 px-6 rounded-pill transition-all duration-200"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Google Maps and Register Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-4xl font-bold text-gray-800">Visit Our Store</p>
          {/* Google Maps Section */}
          <div className="h-96 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.599258635925!2d77.57704956430813!3d12.99238005173825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c7b245a9%3A0x41bcb92d6e83e60!2sBangalore%20Palace!5e0!3m2!1sen!2sin!4v1698522816618!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="shipping_section p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* Card 1 */}
          <div className="flex justify-center items-center p-4 ">
            <MdOutlineAttachEmail className="w-8 h-8 text-red-500 mr-4" />
            <div className="flex items-center">
              <h5 className="text-lg font-bold">Email</h5>
              <p className="text-md text-gray-600 ms-2">info@ecoders.com</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex justify-center items-center p-4 ">
            <MdOutlineLocalPhone className="w-8 h-8 text-green-600 mt-1" />
            <div className="flex items-center">
              <h5 className="text-lg font-bold">Phone</h5>
              <p className="text-md text-gray-600 ms-2">+91 9538596766</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex justify-center items-center p-4 ">
            <CiLocationOn className="w-16 h-16 text-blue-600 mt-1" />
            <div className="flex items-center">
              <h5 className="text-lg font-bold"> </h5>
              <p className="text-md text-gray-600 ms-2">
                <span className="font-bold text-dark">Address :</span># 193,
                Hesaraghatta Raod, Bagalagunte, Bangalore. 560073
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
