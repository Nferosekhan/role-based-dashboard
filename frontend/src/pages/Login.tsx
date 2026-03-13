import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const auth: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      auth.login(res.data.token, res.data.role);

      navigate("/articles");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-8 rounded-lg shadow-md w-96">

      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Login
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>

  </div>
);
};

export default Login;