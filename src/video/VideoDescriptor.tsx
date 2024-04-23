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
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          delete
        </button>

        <video
          width={mdastNode.attributes?.width || "560"}
          height={mdastNode.attributes?.height || "315"}
          src={mdastNode.attributes?.url}
          title="Video player"
          controls
        ></video>
      </div>
    );
  },
};

export {VideoDirectiveDescriptor};
