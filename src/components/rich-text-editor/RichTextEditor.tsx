import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Control, Controller } from "react-hook-form";

const RichTextEditor = ({
  control,
  name,
}: {
  control: Control<any>;
  name: string;
}) => {
  const editorRef = useRef<Editor>(null);

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Editor
            value={field.value}
            onEditorChange={field.onChange}
            apiKey="kcv2k9mb3bpzpsgdxgfp667kmf2e8aze3tjmm91z853ddcvk"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              max_height: 400,
              min_height: 400,
              max_width: 500,
              min_width: 500,
              auto_resize: false,
              menubar: false,
              automatic_uploads: true,
              file_picker_types: "image",
              plugins: [
                // "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                // "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                // "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor image | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
