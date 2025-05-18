import CMSForm from "@/components/cms-form/CMSForm";
import { Helmet } from "react-helmet-async";

const AddBlogs = () => {
  return (
    <>
      <Helmet>
        <title>Spell CMS | Add Blogs</title>
        <meta name="description" content="Add blogs for Spell CMS" />
      </Helmet>
      <CMSForm />
    </>
  );
};

export default AddBlogs;
