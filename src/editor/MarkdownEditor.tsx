import { MDXEditor } from "../editor.client";
import React, { forwardRef } from "react";
import { plugins } from "./plugins";
import i18next from "i18next";
import translation from "../locales/ru/translation.json";
import { MDXEditorMethods } from "@mdxeditor/editor";
import "./inter.css"

i18next.init({
  lng: "ru",
  resources: {
    ru: {
      translation,
    },
  },
});

export interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (image: File) => Promise<string>;
}

const Editor = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content, onContentChange, onImageUpload }, ref) => {
    return (
      <MDXEditor
        ref={ref}
        markdown={content}
        plugins={plugins(onImageUpload)}
        onChange={onContentChange}
        contentEditableClassName={"inter"}
        translation={(key, defaultValue, interpolations) => {
          return i18next.t(key, defaultValue, interpolations) as string;
        }}
      />
    );
  }
);

export default Editor;
