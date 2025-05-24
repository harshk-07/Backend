import React, { useState } from "react";
import Navbar from "./Navbar";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      showNotification(
        "success",
        "Thank you for your message! We will get back to you soon."
      );
      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.message.includes("Failed to fetch")) {
        showNotification(
          "error",
          "Unable to connect to the server. Please check if the backend server is running."
        );
      } else {
        showNotification(
          "error",
          error.message || "Error submitting message. Please try again."
        );
      }
    }
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        {notification.show && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {notification.message}
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-indigo-100 mb-4">
              <span className="text-4xl">💌</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h1>
            <p className="text-lg text-gray-600">
              Your voice matters to us. Drop us a message!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div className="bg-indigo-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Our Location
                  </h3>
                  <p className="text-gray-600">
                    123 Health Street
                    <br />
                    Medical District, MD 12345
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-4">⏰</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 peer"
                    placeholder=" Your Email Address"
                  />
                  <label htmlFor="email"> </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 min-h-[150px] peer"
                    placeholder="Your Message"
                  />
                  <label htmlFor="message" > </label>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold 
                  transform transition-all duration-300 
                  ${isHovered ? "scale-105 shadow-lg" : "hover:bg-indigo-700"}
                  flex items-center justify-center space-x-2`}
                >
                  <span>Send Message</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  >
                    ➤
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
