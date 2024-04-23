import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

interface EmbedDirectiveNode extends LeafDirective {
  name: "embed";
  attributes: { url: string };
}

const EmbedDirectiveDescriptor: DirectiveDescriptor<EmbedDirectiveNode> = {
  name: "embed",
  type: "leafDirective",
  testNode(node) {
    return node.name === "embed";
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
        <embed src={mdastNode.attributes?.url} title="Embed"></embed>
      </div>
    );
  },
};

export { EmbedDirectiveDescriptor };
