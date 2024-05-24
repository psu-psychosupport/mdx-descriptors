import { AdmonitionKind } from "lexical";
import React from "react";
import {
  EditorInFocus,
  DirectiveNode,
  ConditionalContents,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  InsertTable,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  CreateLink,
  CodeToggle,
  InsertAdmonition,
} from "@mdxeditor/editor";

import AudioButton from "./buttons/AudioButton";
import VideoButton from "./buttons/VideoButton";
import InsertPresentation from "./buttons/PresentationButton";
import FileButton from "./buttons/FileButton";
import InsertTest from "./buttons/TestButton";

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    (node as DirectiveNode).getMdastNode().name as AdmonitionKind,
  );
}

const EditorToolbar = () => {
  return (
    <>
      <ConditionalContents
        options={[
          {
            fallback: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />

                <ConditionalContents
                  options={[
                    {
                      when: whenInAdmonition,
                      contents: () => <ChangeAdmonitionType />,
                    },
                    { fallback: () => <BlockTypeSelect /> },
                  ]}
                />

                <Separator />

                <CreateLink />
                <InsertImage />
                <AudioButton />
                <VideoButton />
                <FileButton />
                <InsertPresentation />
                <InsertTest />

                <Separator />

                <InsertTable />
                <InsertThematicBreak />

                <ConditionalContents
                  options={[
                    {
                      when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                      contents: () => (
                        <>
                          <Separator />
                          <InsertAdmonition />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default EditorToolbar;
