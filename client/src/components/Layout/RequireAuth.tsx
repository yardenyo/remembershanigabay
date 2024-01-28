import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <Navigate to="/auth/signin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
