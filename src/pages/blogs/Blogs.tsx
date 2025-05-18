import SearchIcon from "@/assets/icons/SearchIcon";
import BlogsList from "@/components/blogs-list/BlogsList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_CATEGORY } from "@/lib/constants";
import { BlogType } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchWord, setSearchWord] = useState("");

  //NOTE: Will be doing this later
  // const [limit, setLimit] = useState(2);
  // const [pageNo, setPageNo] = useState(2);

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs-infinite"],
    queryFn: async () => {
      return await axios.get(`http://localhost:3000/blogs`);
    },
  });

  console.log("DATA", blogs);

  if (isError) return <p>Error occurred while fetching data</p>;

  if (isLoading) return <p>Loading...</p>;

  const filteredBlogs = blogs?.data?.filter((blog: BlogType) => {
    const allSelected = selectedCategory === "all";
    const categoryBlog = allSelected
      ? true
      : blog.categories === selectedCategory;

    const searchedBlogs = blog.title
      .toLocaleLowerCase()
      .includes(searchWord.toLocaleLowerCase());

    const isPublished = blog.status?.trim().toLowerCase() === "publish";

    return categoryBlog && isPublished && searchedBlogs;
  });

  return (
    <>
      <Helmet>
        <title>Spell CMS | Blogs</title>
        <meta name="description" content="List of blogs for Spell CMS" />
      </Helmet>
      <div>
        <header className="flex justify-between mb-8">
          <h1 className="text-start text-2xl font-bold mb-8">Blog List</h1>
          <div className="flex items-end gap-4">
            <div className="relative self-end">
              <Input
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Search blogs by title"
                className=""
              />
              <SearchIcon className="stroke-2 w-6 h-6 absolute top-1.5 stroke-gray-400 right-2" />
            </div>
            <Select
              onValueChange={(val) => setSelectedCategory(val)}
              defaultValue={"all"}
            >
              <div>
                <Label className="mb-2 text-gray-600">Filter by Category</Label>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All</SelectItem>
                  {BLOG_CATEGORY.map((cat) => (
                    <SelectItem value={cat.name} key={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </div>
            </Select>
          </div>
        </header>
        {filteredBlogs.length === 0 ? (
          <p>No Results Found</p>
        ) : (
          <BlogsList blogs={filteredBlogs} />
        )}
      </div>
    </>
  );
};

export default Blogs;
