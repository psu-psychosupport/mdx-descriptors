import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

interface AudioDirectiveNode extends LeafDirective {
  name: "audio";
  attributes: { url: string };
}

const AudioDirectiveDescriptor: DirectiveDescriptor<AudioDirectiveNode> = {
  name: "audio",
  type: "leafDirective",
  testNode(node) {
    return node.name === "audio";
  },
  attributes: ["url"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <button
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          delete
        </button>
        <audio
          src={mdastNode.attributes?.url}
          title="Audio player"
          controls
        ></audio>
      </div>
    );
  },
};

export {AudioDirectiveDescriptor};
