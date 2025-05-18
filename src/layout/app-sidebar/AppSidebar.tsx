import { Button } from "@/components/ui/button";
import { SIDEBAR_LIST } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, NavLink } from "react-router-dom";

const AppSidebar = () => {
  const { logout } = useAuthStore();
  return (
    <div className=" w-80 p-4 sticky h-screen top-0 border-r border-gray-300 flex flex-col">
      <Link
        to="/"
        className="font-bold text-2xl text-center block text-gray-800 my-8"
      >
        Spell CMS
      </Link>
      <nav>
        <ul className="flex flex-col gap-2">
          {SIDEBAR_LIST.map((list) => (
            <li key={list.id}>
              <NavLink
                to={list.link}
                className={
                  " transition-colors duration-300 hover:text-white w-full block rounded-md p-4 hover:bg-gray-400 bg-gray-200"
                }
              >
                {list.label}{" "}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        className=" mt-auto "
        onClick={() => {
          if (window.confirm()) {
            logout();
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AppSidebar;
