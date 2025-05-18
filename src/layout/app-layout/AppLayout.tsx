import { Outlet } from "react-router-dom";
import AppSidebar from "../app-sidebar/AppSidebar";

const AppLayout = () => {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="w-full px-20 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
