import EditIcon from "@/assets/icons/EditIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import { BlogType } from "@/lib/type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagList from "../tag-list/TagList";
import { Button } from "../ui/button";

const BlogListItem = ({ blog }: { blog: BlogType }) => {
  const navigate = useNavigate();

  const { mutate: deleteBlogs } = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/blogs/${blog.id}`);
    },
    onSuccess: () => {
      alert("Deleted Successfully");
    },
    onError: (error) => {
      // alert("Error occurred");
      console.error("ERROR OCCURRED", error);
    },
  });

  return (
    <li
      key={blog.id}
      className="border-1 rounded-md p-4 flex flex-col  justify-between items-start border-purple-100 h-48 w-full "
    >
      <div className="flex flex-col w-full ">
        <div className="flex items-center justify-between w-full">
          <div className="mb-2">
            <h2 className="font-semibold text-2xl text-gray-600 ">
              {blog.title}
            </h2>
            <span className="text-gray-400">{blog.created_date}</span>
          </div>
          <div className="gap-2 flex items-center">
            {/* <button
             
              className="bg-green-400 rounded-sm cursor-pointer p-1"
            >
              <EyeIcon className="stroke-1 stroke-white w-5 h-5" />
            </button> */}
            <button
              className="bg-blue-400 rounded-sm cursor-pointer p-1"
              onClick={() => {
                navigate(`/blogs/edit/${blog.slug}-${blog.id}`, {
                  state: blog,
                });
              }}
            >
              <EditIcon className="stroke-1 stroke-white w-5 h-5" />
            </button>
            <button
              className="bg-red-400 rounded-sm cursor-pointer p-1"
              onClick={() => {
                if (window.confirm()) {
                  deleteBlogs();
                }
              }}
            >
              <TrashIcon className="stroke-1 stroke-white w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          className="line-clamp-2 text-start text-gray-500"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>

        <TagList tags={blog.tags} />
      </div>
      <Button
        onClick={() => {
          navigate(`/blogs/${blog.slug}-${blog.id}`, {
            state: blog,
          });
        }}
        className="mt-2 hover:underline"
        variant={"ghost"}
      >
        Read more
      </Button>
    </li>
  );
};

export default BlogListItem;
