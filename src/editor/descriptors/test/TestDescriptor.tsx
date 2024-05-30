import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React, { useEffect, useState } from "react";
import DescriptorTemplate from "../DescriptorTemplate";

import { useFetcher } from "@remix-run/react";
import Test from "../../../components/Test";

interface TestDirectiveNode extends LeafDirective {
  name: "test";
  attributes: { id: string };
}

const TestDirectiveDescriptor: DirectiveDescriptor<TestDirectiveNode> = {
  name: "test",
  type: "leafDirective",
  testNode(node) {
    return node.name === "test";
  },
  attributes: ["id"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    const testId = mdastNode.attributes!.id;
    const [data, setData] = useState();

    const fetcher = useFetcher();

    useEffect(() => {
      fetcher.submit({ goal: "get-test", testId: Number.parseInt(testId) }, {method: "POST", encType: "application/json"});
    }, []);

    useEffect(() => {
      if (fetcher.data && fetcher.data.goal === "get-test") {
        setData(fetcher.data.data);
      }
    }, [fetcher.data]);

    if (!data) return;

    return (
      <DescriptorTemplate
        onDelete={() => {
          parentEditor.update(() => {
            lexicalNode.selectNext();
            lexicalNode.remove();
          });
        }}
      >
        <Test test={data} />
      </DescriptorTemplate>
    );
  },
};

export { TestDirectiveDescriptor };
