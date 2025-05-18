import z from "zod";

export const cmsSchema = z.object({
  slug: z
    .string({ required_error: "Slug is required" })
    .min(2, "Slug is required"),
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Atleast 5 characters are required"),
  created_date: z
    .string({ required_error: "Date is required" })
    .min(4, "Date is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Atleast 10 characters are required"),
  author: z
    .string({ required_error: "Author is rquired" })
    .min(2, "Atleast two characters are required"),
  coverImage: z
    .string({ required_error: "Cover Image is required" })
    .min(4, "Cover Image is required"),
  // coverImage: z
  //   .custom<File>((file) => file instanceof File, {
  //     message: "Cover image is required",
  //   })
  //   .refine(
  //     (file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
  //     "File type must be png, jpg, jpeg"
  //   ),
  categories: z
    .string({ required_error: "Blog categoryis required" })
    .min(1, "Blog Category is required"),
  status: z.enum(["Draft", "Publish"]),
  tags: z
    .array(z.string({ required_error: "Tags is required" }))
    .min(2, "Atleast two tags are required"),
});

export type cmsSchemaType = z.infer<typeof cmsSchema>;
