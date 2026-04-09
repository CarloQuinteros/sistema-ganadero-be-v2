import { useState } from "react";
import { loginRequest } from "@/services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginRequest(email, password);

      // 👇 guardar token
      if (data.status === "success") {
        const token = data.data.token;
        localStorage.setItem("token", token);
        setError("");
        navigate("/dashboard");
      }

      console.log("LOGIN Response:", data);
    } catch (error: any) {
      console.error("Error login", error);

      const message = error?.message || "Email or password incorrect";
      setError(message);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 border rounded-lg"
      >
        <h2 className="text-xl mb-4 font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2 mt-2">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
