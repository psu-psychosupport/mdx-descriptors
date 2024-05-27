import styles from "../../../styles/main.module.css";
import {
  editorRootElementRef$,
  readOnly$,
  TooltipWrap,
} from "@mdxeditor/editor";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import React, { useState, useEffect } from "react";
import { useCellValues } from "@mdxeditor/gurx";
import TestDialog from "../dialogs/TestDialog";
import { ITest } from "src/types/test";
import { Quiz as QuizIcon } from "@mui/icons-material";
import { useFetcher } from "@remix-run/react";
import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";

export default function InsertTest() {
  const [, readOnly] = useCellValues(editorRootElementRef$, readOnly$);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const insertDirective = usePublisher(insertDirective$);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data) return;

    insert(fetcher.data.media.id);
  }, [fetcher.data]);

  const insert = (id: number) => {
    insertDirective({
      name: "test",
      type: "leafDirective",
      children: [],
      attributes: { id: id.toString() },
    } as LeafDirective);

    setDialogOpen(false);
  };

  const submit = (test: ITest) => {
    fetcher.submit(
      { goal: "add-test", test },
      { method: "POST", encType: "application/json" }
    );
  };

  return (
    <>
      <RadixToolbar.Button
        className={styles.toolbarButton}
        disabled={readOnly}
        onClick={() => setDialogOpen(true)}
      >
        <TooltipWrap title={"Вставить тест"}><QuizIcon /></TooltipWrap>
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
