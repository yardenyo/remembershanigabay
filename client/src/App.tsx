import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/Layout/RequireAuth";
import { selectCurrentUser } from "@/features/auth/authSlice";
import AdminDashboard from "@/views/AdminDashboard";
import Home from "@/views/Home";
import Candles from "@/views/Candles";
import SignIn from "@/views/SignIn";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [cookies] = useCookies(["isAuthenticated"]);
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = cookies.isAuthenticated || user;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="memorial-candles" element={<Candles />} />
        {!isAuthenticated && <Route path="auth/signin" element={<SignIn />} />}
        <Route element={<RequireAuth />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
