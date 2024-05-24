import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

import DescriptorTemplate from "../DescriptorTemplate";
import PresentationViewer from "./PresentationViewer";

interface PresentationDirectiveNode extends LeafDirective {
  name: "presentation";
  attributes: { url: string };
}

const PresentationDirectiveDescriptor: DirectiveDescriptor<PresentationDirectiveNode> = {
  name: "presentation",
  type: "leafDirective",
  testNode(node) {
    return node.name === "presentation";
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
        <PresentationViewer url={mdastNode.attributes?.url} />
      </DescriptorTemplate>
    );
  },
};

export { PresentationDirectiveDescriptor };
