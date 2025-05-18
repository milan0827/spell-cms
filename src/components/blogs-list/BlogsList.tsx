import { BlogType } from "@/lib/type";
import { lazy, Suspense } from "react";

const BlogListItems = lazy(() => import("../blog-list-items/BlogListItems"));

const BlogsList = ({ blogs }: { blogs: BlogType[] }) => {
  console.log("BLOGS", blogs);
  return (
    <ul className="grid grid-cols-2 gap-4 ">
      <Suspense fallback={<div>Loading...</div>}>
        {blogs?.map((blog) => (
          <BlogListItems key={blog.id} blog={blog} />
        ))}
      </Suspense>
    </ul>
  );
};

export default BlogsList;
