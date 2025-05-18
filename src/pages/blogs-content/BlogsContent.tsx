import TagList from "@/components/tag-list/TagList";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BlogsContent = () => {
  const location = useLocation();

  if (!location.state) return <p>No data </p>;
  console.log("LOCATOIN", location.state);
  const blog = location.state;

  return (
    <>
      <Helmet>
        <title>Spell CMS | {blog.title}</title>
        <meta name="description" content={blog.title} />
      </Helmet>
      <article>
        <h1 className="text-gray-800 text-2xl font-semibold">{blog.title}</h1>
        <p className="flex items-center gap-4">
          <span>{blog.author}</span>
          <span className="text-gray-400">{blog.created_date}</span>
        </p>
        <TagList tags={blog.tags} />
        <div className="h-[40rem] overflow-hidden w-full rounded-sm mt-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="block w-full h-full object-cover object-center"
          />
        </div>
        <p className="italic text-sm text-center">
          Cover Image for {blog.title}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="mt-8"
        />
      </article>
    </>
  );
};

export default BlogsContent;
