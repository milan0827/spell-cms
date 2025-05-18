export interface BlogType {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  categories: string;
  status: "Draft" | "Publish";
  tags: string[];
  created_date: string;
}
