import { useNavigate } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-9xl text-white mb-4">404</h1>
        <p className="text-3xl text-slate-300 mb-8">Página não encontrada</p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 
            text-white px-6 py-3 rounded-lg transition-colors mx-auto"
        >
          <Home className="w-5 h-5" />
          Voltar para o início
        </button>
      </div>
    </div>
  );
}
