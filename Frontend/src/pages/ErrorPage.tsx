import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
      <div className="bg-card rounded-lg p-8 shadow-md flex flex-col items-center justify-center gap-6">
        <div className="mb-4 rounded-full bg-destructive/10 p-4 text-destructive"></div>
        <AlertTriangle size={48} />
        <h1 className="mb-2 text-3xl font-bold">¡Ups! Algo salió mal</h1>
        <p className="mb-6 max-w-md text-muted-foreground">
          Ocurrió un error inesperado. Por favor, intenta volver a la página de
          inicio.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home size={16} />
            Volver a la página de inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
