import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="font-body">
      <Outlet />
    </main>
  );
};

export default Layout;
