import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React, { useEffect, useState } from "react";

import Test from "../../../components/Test";
import { useFetcher } from "@remix-run/react";

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
  Editor: ({ mdastNode }) => {
    const mediaId = mdastNode.attributes!.id;
    const [data, setData] = useState();

    const fetcher = useFetcher();

    useEffect(() => {
      fetcher.submit({ goal: "get-media", mediaId: Number.parseInt(mediaId) });
    }, []);

    useEffect(() => {
      if (fetcher.data && fetcher.data.goal === "get-media") {
        setData(JSON.parse(fetcher.data.data));
      }
    }, [fetcher.data]);

    if (!data) return;
    return <Test test={data} />;
  },
};

export { TestDirectiveDescriptor };
