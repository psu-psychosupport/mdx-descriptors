import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";

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
  Editor: ({ mdastNode }) => {
    return (
      <audio
        src={mdastNode.attributes?.url}
        title="Audio player"
        controls
      ></audio>
    );
  },
};

export { AudioDirectiveDescriptor };
