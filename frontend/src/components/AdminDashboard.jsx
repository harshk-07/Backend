import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const donorStatuses = ["active", "inactive", "pending", "verified"];
  const patientStatuses = ["active", "matched", "transplanted", "inactive"];
  const urgencyLevels = ["low", "medium", "high", "critical"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [donorsRes, patientsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/donors"),
        axios.get("http://localhost:5000/api/patients"),
      ]);
      setDonors(Array.isArray(donorsRes.data) ? donorsRes.data : []);
      setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : []);
      setError("");
    } catch (err) {
      setError("Failed to fetch data");
      setDonors([]);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecord(null);
  };

  const handleUpdate = async () => {
    try {
      const endpoint =
        tabValue === 0
          ? "http://localhost:5000/api/donors/update"
          : "http://localhost:5000/api/patients/update";

      const response = await axios.patch(endpoint, selectedRecord, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setSuccess("Record updated successfully");
        fetchData();
        handleCloseDialog();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update record");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-gray-50 to-gray-100">
      <div className="container mx-auto mt-16 px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Admin Dashboard
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-md transform transition-all duration-300 hover:scale-[1.02]">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 shadow-md transform transition-all duration-300 hover:scale-[1.02]">
            <p className="font-medium">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
                tabValue === 0
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange(0)}
            >
              Donors
            </button>
            <button
              className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
                tabValue === 1
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange(1)}
            >
              Patients
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {tabValue === 0 ? "Organs" : "Needed Organs"}
                  </th>
                  {tabValue === 1 && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Urgency
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={tabValue === 0 ? 7 : 8}
                      className="px-6 py-8 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : (tabValue === 0 ? donors : patients).length === 0 ? (
                  <tr>
                    <td
                      colSpan={tabValue === 0 ? 7 : 8}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No {tabValue === 0 ? "donors" : "patients"} found
                    </td>
                  </tr>
                ) : (
                  (tabValue === 0 ? donors : patients).map((record) => (
                    <tr
                      key={record._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        {record.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {record.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                          {record.bloodType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {(tabValue === 0
                          ? record.organs
                          : record.neededOrgans
                        )?.join(", ")}
                      </td>
                      {tabValue === 1 && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${
                              record.urgency === "critical"
                                ? "bg-red-100 text-red-800"
                                : record.urgency === "high"
                                ? "bg-orange-100 text-orange-800"
                                : record.urgency === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {record.urgency}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {record.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            record.status === "active"
                              ? "bg-green-100 text-green-800"
                              : record.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : record.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openDialog && selectedRecord && (
        <div className="fixed inset-0 flex items-start justify-center pt-12 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl py-2 px-8 w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-100 animate-modal-in relative mx-4 my-8 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={handleCloseDialog}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Edit Record
            </h2>
            <div className="space-y-2">
              {Object.entries(selectedRecord).map(([key, value]) => {
                if (["_id", "createdAt", "updatedAt", "__v"].includes(key))
                  return null;
                // Dropdown for bloodType
                if (key === "bloodType") {
                  return (
                    <div key={key} className="space-y-0.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Blood Type
                      </label>
                      <select
                        name="bloodType"
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select Blood Type</option>
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                // Dropdown for status
                if (key === "status") {
                  const statusOptions =
                    tabValue === 0 ? donorStatuses : patientStatuses;
                  return (
                    <div key={key} className="space-y-0.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                // Dropdown for urgency (patients only)
                if (key === "urgency") {
                  return (
                    <div key={key} className="space-y-0.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Urgency
                      </label>
                      <select
                        name="urgency"
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select Urgency</option>
                        {urgencyLevels.map((urgency) => (
                          <option key={urgency} value={urgency}>
                            {urgency}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                // Default input
                return (
                  <div key={key} className="space-y-0.5">
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
