import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
      <div className="bg-card rounded-lg p-8 shadow-md flex flex-col items-center justify-center gap-6">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="mb-2 mt-4 text-2xl font-bold">Página no encontrada</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <Home size={16} />
          Volver a la página de inicio
        </Button>
      </div>
    </div>
  );
}
