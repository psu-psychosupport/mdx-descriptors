import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import React from "react";

import Test, {ITestForm} from "~/components/Test";

interface TestDirectiveNode extends LeafDirective {
  name: "test";
  attributes: ITestForm;
}

interface RawTestForm {
  title: string;
  options: string;
  validOptionIndex: string;
  validTextInput: string;
  type: string;
}

const parseTest = (rawTest: RawTestForm): ITestForm => {
  return {
    title: rawTest.title,
    options: rawTest.options ? rawTest.options.split(",") : undefined,
    validOptionIndex: Number.parseInt(rawTest.validOptionIndex),
    validTextInput: rawTest.validTextInput,
    type: Number.parseInt(rawTest.type)
  }
}

const TestDirectiveDescriptor: DirectiveDescriptor<TestDirectiveNode> = {
  name: "test",
  type: "leafDirective",
  testNode(node) {
    return node.name === "test";
  },
  attributes: [],
  hasChildren: false,
  Editor: ({ mdastNode }) => {
    return <Test test={parseTest(mdastNode.attributes!)} />;
  },
};

export { TestDirectiveDescriptor };
