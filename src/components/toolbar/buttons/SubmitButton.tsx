import styles from "../../../styles/main.module.css";
import {
  editorRootElementRef$,
  readOnly$,
  TooltipWrap,
} from "@mdxeditor/editor";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import React from "react";
import { useCellValues } from "@mdxeditor/gurx";

export default function SubmitButton({
  title,
  buttonContent,
  onSubmit,
}: {
  title: string;
  buttonContent: React.ReactNode;
  onSubmit: () => void;
}) {
  const [, readOnly] = useCellValues(editorRootElementRef$, readOnly$);

  return (
    <RadixToolbar.Button
      className={styles.toolbarButton}
      disabled={readOnly}
      onClick={onSubmit}
    >
      <TooltipWrap title={title}>{buttonContent}</TooltipWrap>
    </RadixToolbar.Button>
  );
}
