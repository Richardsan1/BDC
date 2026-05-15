import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, tipos }) {
  const { usuario, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-500">
        Carregando...
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/entrar" state={{ from: location }} replace />;
  }

  if (tipos && !tipos.includes(usuario.tipo)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
