import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";

interface DiagramDirectiveNode extends LeafDirective {
  name: "diagram";
  attributes: { data: string };
}

const DiagramDirectiveDescriptor: DirectiveDescriptor<DiagramDirectiveNode> = {
  name: "diagram",
  type: "leafDirective",
  testNode(node) {
    return node.name === "diagram";
  },
  attributes: ["data"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <DescriptorTemplate
        onDelete={() => {
          parentEditor.update(() => {
            lexicalNode.selectNext();
            lexicalNode.remove();
          });
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: mdastNode.attributes.data }} />
      </DescriptorTemplate>
    );
  },
};

export { DiagramDirectiveDescriptor };
