import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Assuming your register function is in AuthContext
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  // Use a single state object to manage all form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role to 'user'
    birthDate: "",
    gender: "",
    location: "",
    interests: "", // Will be a comma-separated string from the input
  });
  const [error, setError] = useState("");
  
  // Assuming 'register' is a function from your AuthContext that calls the registerService
  const { register } = useAuth(); 
  const navigate = useNavigate();

  // A single handler for all input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload, converting interests string to an array
      const payload = {
        ...formData,
        interests: formData.interests.split(',').map(interest => interest.trim()).filter(Boolean),
      };
      
      const user = await register(payload); // Pass the complete payload
      navigate(user.role === "admin" ? "/dashboard" : "/tickets");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        {/* --- New Demographic Fields --- */}
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests (comma-separated, e.g., Music, Tech)"
          value={formData.interests}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />
        {/* End of new fields */}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>

        <p className="mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;