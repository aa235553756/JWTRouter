import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '/src/helpers/Context';

export function ProtectRoute() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to='/login' replace />;
}
