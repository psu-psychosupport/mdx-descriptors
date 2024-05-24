import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { plugins } from "./plugins";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { MDXEditor } from "../editor.client";
import "../styles/inter.css";

export interface EditorProps {
  content: string;
}

const MarkdownViewer = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content }, ref) => {
    // MDXEditor не обновляет внутреннее состояние текста при передаче нового, поэтому используем его методы для установки
    const innerRef = useRef<MDXEditorMethods>();

    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      innerRef.current?.setMarkdown(content);
    }, [content]);

    return (
      <MDXEditor
        ref={innerRef}
        markdown={content}
        plugins={plugins}
        contentEditableClassName={"inter"}
        readOnly
      />
    );
  }
);

export default MarkdownViewer;
