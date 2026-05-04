import { useState } from "react";
import { loginRequest } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Mail, LockKeyhole, LogIn } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 rounded-xl shadow-md bg-background w-full max-w-md"
      >
        <PawPrint
          size={48}
          className="mx-auto bg-primary text-background p-2 rounded-full"
        />
        <h2 className="text-xl mb-4 text-primary  font-extrabold text-center">
          Sistema Agro Ganadero
        </h2>

        <Label
          htmlFor="email"
          className="text-sm font-medium text-label-primary"
        >
          Correo electrónico
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-label-secondary"
            size={18}
          />

          <Input
            type="email"
            id="email"
            placeholder="usuario@agroganadero.com"
            className="pl-10"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>
        <Label
          htmlFor="password"
          className="text-sm font-medium text-label-primary"
        >
          Contraseña
        </Label>
        <div className="relative">
          <LockKeyhole
            className="absolute left-3 top-1/2 -translate-y-1/2 text-label-secondary"
            size={18}
          />

          <Input
            type="password"
            id="password"
            placeholder="********"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? (
            "Ingresando..."
          ) : (
            <>
              {" "}
              <LogIn className="mr-2" />
              Ingresar
            </>
          )}
        </Button>
        {error && <p className="text-destructive mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
