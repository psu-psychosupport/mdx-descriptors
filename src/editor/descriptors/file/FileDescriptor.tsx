import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";
import FileDownload from "../../../components/FileDownload";

interface FileDirectiveNode extends LeafDirective {
  name: "file";
  attributes: { name: string; url: string };
}

const FileDirectiveDescriptor: DirectiveDescriptor<FileDirectiveNode> = {
  name: "file",
  type: "leafDirective",
  testNode(node) {
    return node.name === "file";
  },
  attributes: ["name, url"],
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
        <FileDownload
          name={mdastNode.attributes!.name}
          url={mdastNode.attributes!.url}
        />
      </DescriptorTemplate>
    );
  },
};

export { FileDirectiveDescriptor };
