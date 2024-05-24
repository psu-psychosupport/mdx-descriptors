import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
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
      <div dangerouslySetInnerHTML={{ __html: mdastNode.attributes.data }} />
    );
  },
};

export { DiagramDirectiveDescriptor };
