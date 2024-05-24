import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

interface VideoDirectiveNode extends LeafDirective {
  name: "video";
  attributes: { url: string; width: string; height: string };
}

const VideoDirectiveDescriptor: DirectiveDescriptor<VideoDirectiveNode> = {
  name: "video",
  type: "leafDirective",
  testNode(node) {
    return node.name === "video";
  },
  attributes: ["url", "width", "height"],
  hasChildren: false,
  Editor: ({ mdastNode }) => {
    return (
      <video
        width={mdastNode.attributes?.width || "560"}
        height={mdastNode.attributes?.height || "315"}
        src={mdastNode.attributes?.url}
        title="Video player"
        controls
      ></video>
    );
  },
};

export { VideoDirectiveDescriptor };
