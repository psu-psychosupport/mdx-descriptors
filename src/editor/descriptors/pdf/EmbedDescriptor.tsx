import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";

interface EmbedDirectiveNode extends LeafDirective {
  name: "pdf";
  attributes: { url: string };
}

const PdfDirectiveDescriptor: DirectiveDescriptor<EmbedDirectiveNode> = {
  name: "pdf",
  type: "leafDirective",
  testNode(node) {
    return node.name === "pdf";
  },
  attributes: ["url"],
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
        <embed src={mdastNode.attributes?.url} title="Embed"></embed>
      </DescriptorTemplate>
    );
  },
};

export { PdfDirectiveDescriptor };
