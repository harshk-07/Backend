import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [filters, setFilters] = useState({
    organ: "",
    bloodType: "",
    city: "",
    searchQuery: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/donors/verified"
        );
        setDonors(res.data);
        setFilteredDonors(res.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
        setError("Failed to fetch donors. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    let results = donors;

    if (filters.organ) {
      results = results.filter((d) =>
        d.organs
          .map((organ) => organ.toLowerCase())
          .includes(filters.organ.toLowerCase())
      );
    }

    if (filters.bloodType) {
      results = results.filter((d) => d.bloodType === filters.bloodType);
    }

    if (filters.city) {
      results = results.filter((d) =>
        d.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query)
      );
    }

    setFilteredDonors(results);
  }, [filters, donors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      organ: "",
      bloodType: "",
      city: "",
      searchQuery: "",
    });
  };

  if (isLoading) {
    return <div className="loading">Loading donors...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Hero Donors
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Meet our incredible donors who have successfully donated their organs
          and saved lives. Their selfless acts of kindness have made a profound
          impact on the lives of recipients and their families.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              name="searchQuery"
              placeholder="Search by name or city"
              value={filters.searchQuery}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

            <select
              name="organ"
              value={filters.organ}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
              <option value="">All Organs</option>
              <option value="Kidney">Kidney</option>
              <option value="Liver">Liver</option>
              <option value="Heart">Heart</option>
              <option value="Lungs">Lungs</option>
              <option value="Pancreas">Pancreas</option>
              <option value="Cornea">Cornea</option>
            </select>

            <select
              name="bloodType"
              value={filters.bloodType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
              <option value="">All Blood Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <div className="flex gap-2">
              <input
                type="text"
                name="city"
                placeholder="Filter by City"
                value={filters.city}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
                >
                Reset
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                  >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {donor.name}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {donor.bloodType}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {donor.location}
                      </p>

                      <p className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        Age: {donor.age}
                      </p>

                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Available Organs:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {donor.organs.map((organ, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                            >
                              {organ}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {donor.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  No donors found matching the filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DonorList;
