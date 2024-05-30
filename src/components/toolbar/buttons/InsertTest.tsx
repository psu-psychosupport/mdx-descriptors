import styles from "../../../styles/main.module.css";
import {
  editorRootElementRef$,
  readOnly$,
  TooltipWrap,
} from "@mdxeditor/editor";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import React, { useState } from "react";
import { useCellValues } from "@mdxeditor/gurx";
import TestDialog from "../dialogs/TestDialog";
import { Quiz as QuizIcon } from "@mui/icons-material";
import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";

export default function InsertTest() {
  const [, readOnly] = useCellValues(editorRootElementRef$, readOnly$);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const insertDirective = usePublisher(insertDirective$);

  const submit = (testId: number) => {
    insertDirective({
      name: "test",
      type: "leafDirective",
      children: [],
      attributes: { id: testId.toString() },
    } as LeafDirective);

    setDialogOpen(false);
  };

  return (
    <>
      <RadixToolbar.Button
        className={styles.toolbarButton}
        disabled={readOnly}
        onClick={() => setDialogOpen(true)}
      >
        <TooltipWrap title={"Вставить тест"}>
          <QuizIcon />
        </TooltipWrap>
      </RadixToolbar.Button>
      {isDialogOpen && (
        <>
          <TestDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmit={submit}
          />
        </>
      )}
    </>
  );
}
