import CMSForm from "@/components/cms-form/CMSForm";
import { Helmet } from "react-helmet-async";

const EditBlogs = () => {
  return (
    <>
      <Helmet>
        <title>Spell CMS | Edit Blog</title>
        <meta name="description" content={"Edit Blogs"} />
      </Helmet>
      <CMSForm isEdit />;
    </>
  );
};

export default EditBlogs;
