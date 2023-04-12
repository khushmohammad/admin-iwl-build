import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ onChange, editorLoaded, name, value }) {
  return (
    <div>
      {
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onInit={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      }
    </div>
  );
}

export default Editor;
