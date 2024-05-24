import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

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
  Editor: ({ mdastNode }) => {
    return <embed src={mdastNode.attributes?.url} title="Embed"></embed>;
  },
};

export { PdfDirectiveDescriptor };
