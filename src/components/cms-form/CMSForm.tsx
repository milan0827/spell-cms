import { BLOG_AUTHOR, BLOG_CATEGORY } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import RichTextEditor from "../rich-text-editor/RichTextEditor";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { cmsSchema, cmsSchemaType } from "./schema/cmsSchema";

const CMSForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const [inputBlogsTags, setInputBlogTags] = useState("");
  const location = useLocation();
  const [blogTags, setBlogTags] = useState<string[]>(
    location?.state?.tags ?? []
  );

  const navigate = useNavigate();

  const form = useForm<cmsSchemaType>({
    resolver: zodResolver(cmsSchema),
    defaultValues: {
      coverImage:
        isEdit && location.state.coverImage
          ? location.state.coverImage.name
          : undefined,
      created_date: "",
      description:
        isEdit && location.state.description ? location.state.description : "",
      categories:
        isEdit && location.state.categories ? location.state.categories : "",
      title: isEdit && location.state.title ? location.state.title : "",
      author: isEdit && location.state.author ? location.state.author : "",
      tags: isEdit && location.state.tags ? location.state.tags : [""],
      status: isEdit && location.state.status ? location.state.status : "Draft",
      slug: isEdit && location.state.slug ? location.state.slug : "",
    },
  });

  const handlePreview = async () => {
    const previewData = form.getValues();

    const isValid = await form.trigger();

    if (!isValid) return;

    navigate("/blogs/preview", { state: previewData });
  };

  const { mutate: addBlogs, isPending: isAdding } = useMutation({
    mutationFn: async (data: cmsSchemaType) => {
      const res = await axios.post("http://localhost:3000/blogs", data);
      console.log("DATA", res);
    },
    onSuccess: () => {
      alert("Published successfully");
    },
    onError: (error) => {
      // alert("Error occurred");
      console.error("ERROR OCCURRED", error);
    },
  });

  const { mutate: editBlogs, isPending: isEditing } = useMutation({
    mutationFn: async (data: cmsSchemaType) => {
      const res = await axios.put(
        `http://localhost:3000/blogs/${location.state.id}`,
        data
      );
      console.log("DATA", res);
    },
    onSuccess: () => {
      alert("Edited Successfully");
      form.reset();
    },
    onError: (error) => {
      // alert("Error occurred");
      console.error("ERROR OCCURRED", error);
    },
  });

  const onSubmit = (data: cmsSchemaType) => {
    console.log("data", data);
    if (isEdit && location.state) {
      editBlogs({ ...data, tags: blogTags });
    } else {
      addBlogs({ ...data, tags: blogTags });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-end gap-2">
          <Button
            variant={"secondary"}
            className=""
            type="button"
            onClick={handlePreview}
            aria-label="Preview your content"
          >
            Preview
          </Button>
          {isEdit ? (
            <Button type="submit" aria-label="Edit your content">
              {isEditing ? "Editing" : "Edit"}
            </Button>
          ) : (
            <Button type="submit" aria-label="Publish or Draft the content">
              {isAdding ? "Publishing" : "Publish"}
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input
                  aria-required
                  aria-describedby="title-error"
                  placeholder="Enter Blog title"
                  {...field}
                />
              </FormControl>
              <FormMessage id="title-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Slug"
                  // value={data?.fname}
                  {...field}
                  aria-required
                  aria-describedby="slug-error"
                />
              </FormControl>
              <FormMessage id="slug-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="created_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  aria-required
                  aria-describedby="date-error"
                />
              </FormControl>
              <FormMessage id="date-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Cover Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter image url"
                  type="text"
                  {...field}
                  aria-required
                  aria-describedby="image-error"
                  // accept="image/*, application/pdf"
                  // onChange={(e) => onChange(e.target.files?.[0])}
                  // value={\}
                />
              </FormControl>
              <FormMessage id="image-error" />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel
            className={`${
              form.formState.errors.description ? "text-red-500" : ""
            }`}
          >
            Content
          </FormLabel>
          <FormControl>
            <RichTextEditor
              control={form.control}
              name="description"
              aria-required
              aria-describedby="content-error"
            />
          </FormControl>
          <p className="text-red-500 text-start text-sm" id="content-error">
            {form.formState.errors.description
              ? form.formState.errors.description.message
              : null}
          </p>
        </FormItem>

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-required
                      aria-describedby="author-error"
                    >
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_AUTHOR.map((author) => (
                        <SelectItem value={author.name} key={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage id="author-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-required
                      aria-describedby="category-error"
                    >
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {BLOG_CATEGORY.map((cat) => (
                        <SelectItem value={cat.name} key={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage id="category-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col ml-4 ">
                <div className=" flex items-center ">
                  <FormLabel className="text-base">Status </FormLabel>
                  <FormDescription aria-description="Toggle to publish this content">
                    {" "}
                    (Toggle on to publish)
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex gap-2 items-center ">
                    <Switch
                      checked={field.value === "Publish"}
                      onCheckedChange={(status) =>
                        field.onChange(status ? "Publish" : "Draft")
                      }
                      className="cursor-pointer"
                    />
                    <p>{field.value === "Publish" ? "Publish" : "Draft"}</p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div>
                  <ul className="flex items-start gap-2 mb-3">
                    {blogTags.length === 0
                      ? null
                      : blogTags.map((tag, i) => (
                          <li
                            key={i}
                            className="bg-gray-300 py-1 px-2 flex items-center gap-2"
                          >
                            <span>{tag}</span>
                            <button
                              className="text-2xl cursor-pointer"
                              type="button"
                              onClick={() =>
                                setBlogTags((blogs) =>
                                  blogs.filter((blog) => blog !== tag)
                                )
                              }
                            >
                              &times;
                            </button>
                          </li>
                        ))}
                  </ul>
                  <div className="relative">
                    <Input
                      placeholder="Enter Tags"
                      {...field}
                      value={inputBlogsTags}
                      onChange={(e) => setInputBlogTags(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (inputBlogsTags === "") {
                            form.setError("tags", {
                              message: "Tags can not be empty",
                            });

                            return;
                          }
                          setBlogTags((tag) => [...tag, inputBlogsTags]);
                          form.setValue("tags", [...blogTags, inputBlogsTags]);
                          setInputBlogTags("");
                        }
                      }}
                      aria-required
                      aria-describedby="tags-error"
                    />
                    <Button
                      type="button"
                      variant={"secondary"}
                      size={"lg"}
                      className="cursor-pointer absolute top-0 right-0"
                      onClick={() => {
                        if (inputBlogsTags === "") {
                          form.setError("tags", {
                            message: "Tags can not be empty",
                          });
                          return;
                        }
                        setBlogTags((tag) => [...tag, inputBlogsTags]);
                        form.setValue("tags", [...blogTags, inputBlogsTags]);
                        setInputBlogTags("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage id="tags-error" />
            </FormItem>
          )}
        />
      </form>{" "}
    </Form>
  );
};

export default CMSForm;
