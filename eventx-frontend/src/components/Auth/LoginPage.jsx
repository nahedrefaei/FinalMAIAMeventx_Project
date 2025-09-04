import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Demo account credentials
  const demoAccounts = {
    admin: {
      email: "nahedrefay8@gmail.com",
      password: "Na@123"
    },
    user: {
      email: "Asmaa@gmail.com", 
      password: "asmaa123"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      navigate(user.role === "admin" ? "/dashboard" : "/tickets");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const fillDemoAccount = (accountType) => {
    const account = demoAccounts[accountType];
    setEmail(account.email);
    setPassword(account.password);
    setError(""); // Clear any existing errors
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
          Login
        </button>

        {/* Demo Account Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center">Try Demo Accounts:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="flex-1 bg-orange-500 text-white py-2 px-3 rounded text-sm hover:bg-orange-600 transition-colors"
            >
              👨‍💼 Admin Demo
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('user')}
              className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600 transition-colors"
            >
              👤 User Demo
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click to auto-fill login credentials
          </p>
        </div>

        <p className="mt-3 text-sm">
          Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;