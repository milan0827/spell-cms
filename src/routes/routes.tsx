import LoginForm from "@/components/login-form/LoginForm";
import AddBlogs from "@/pages/add-blogs/AddBlogs";
import BlogsContent from "@/pages/blogs-content/BlogsContent";
import Blogs from "@/pages/blogs/Blogs";
import EditBlogs from "@/pages/edit-blogs/EditBlogs";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <AddBlogs />,
      },
      {
        path: "/blogs",
        children: [
          {
            index: true,
            element: <Blogs />,
          },
          {
            path: ":slug",
            element: <BlogsContent />,
          },
          {
            path: "edit/:slug",
            element: <EditBlogs />,
          },
          {
            path: "preview",
            element: <BlogsContent />,
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  useEffect(() => {
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        username: "Milan",
        password: "milan",
      })
    );
  }, []);

  return <RouterProvider router={router} />;
}
