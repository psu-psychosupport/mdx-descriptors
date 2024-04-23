import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import { ReactFlow } from "reactflow";

interface FlowDirectiveNode extends LeafDirective {
  name: "embed";
  attributes: { url: string };
}

const FlowDirectiveDescriptor: DirectiveDescriptor<FlowDirectiveNode> = {
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
        <ReactFlow />
      </div>
    );
  },
};

export { FlowDirectiveDescriptor };
