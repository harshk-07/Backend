import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

const RegisterForm = () => {
  const [role, setRole] = useState("donor");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodType: "",
    organs: "",
    neededOrgans: "",
    urgency: "",
    location: "",
    contact: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formData,
      organs:
        role === "donor"
          ? formData.organs.split(",").map((s) => s.trim())
          : undefined,
      neededOrgans:
        role === "patient"
          ? formData.neededOrgans.split(",").map((s) => s.trim())
          : undefined,
    };

    try {
      const endpoint =
        role === "donor" ? "http://localhost:5000/api/register/donor" : "http://localhost:5000/api/register/patient";
      const res = await axios.post(endpoint, payload);
      setMessage("Registration successful! We will contact you soon.");
      setFormData({
        name: "",
        age: "",
        bloodType: "",
        organs: "",
        neededOrgans: "",
        urgency: "",
        location: "",
        contact: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-3xl font-bold text-white text-center">
            Life-Saving Registration
          </h2>
          <p className="mt-2 text-blue-100 text-center">
            Join our mission to save lives through organ donation
          </p>
        </div>

        <div className="p-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                role === "donor"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setRole("donor")}
              >
              <span className="mr-2">❤️</span>
              Donor
            </button>
            <button
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                role === "patient"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setRole("patient")}
            >
              <span className="mr-2">🏥</span>
              Patient
            </button>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
                }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your full name"
                required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your age"
                  required
                  />
              </div>

              <div>
                <label
                  htmlFor="bloodType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  >
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {role === "donor" ? (
              <div>
                <label
                  htmlFor="organs"
                  className="block text-sm font-medium text-gray-700 mb-1"
                  >
                  Organs for Donation
                </label>
                <input
                  type="text"
                  id="organs"
                  name="organs"
                  value={formData.organs}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., kidney, liver, heart (comma separated)"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="neededOrgans"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organs Needed
                  </label>
                  <input
                    type="text"
                    id="neededOrgans"
                    name="neededOrgans"
                    value={formData.neededOrgans}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., kidney, liver, heart (comma separated)"
                    required
                    />
                </div>
                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Urgency</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your city and state"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Contact Information
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Phone number or email"
                required
                />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Register as ${role === "donor" ? "Donor" : "Patient"}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default RegisterForm;
