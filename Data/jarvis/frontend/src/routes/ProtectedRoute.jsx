import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FullPage } from '../components/common/Spinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPage />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
