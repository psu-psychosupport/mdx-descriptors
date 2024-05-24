import { LeafDirective } from "mdast-util-directive";
import { DirectiveDescriptor, useMdastNodeUpdater } from "@mdxeditor/editor";
import React from "react";
import DescriptorTemplate from "../DescriptorTemplate";

import { ITestForm } from "~/routes/tests.add";
import { TestForm } from "~/components/testForm/TestForm";

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
  // Тест на вход может прийти двумя путями
  // 1. Через строку контента. В этом случае необходимо парсить
  // 2. Через обновление в админ панели. В этом случае парсить не нужно.
  // Все значения уже имеют нужный для работы формат.
  if (typeof rawTest.type === "number") return rawTest as ITestForm;

  return {
    title: rawTest.title,
    options: rawTest.options ? rawTest.options.split(",") : undefined,
    validOptionIndex: Number.parseInt(rawTest.validOptionIndex),
    validTextInput: rawTest.validTextInput,
    type: Number.parseInt(rawTest.type),
  };
};

const TestDirectiveDescriptor: DirectiveDescriptor<TestDirectiveNode> = {
  name: "test",
  type: "leafDirective",
  testNode(node) {
    return node.name === "test";
  },
  attributes: [],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    const updater = useMdastNodeUpdater();
    const onSubmit = (data: ITestForm) => {
      parentEditor.update(() => {
        updater({ attributes: { ...data, fromUpdater: true } });
      });
    };

    return (
      <DescriptorTemplate
        onDelete={() => {
          parentEditor.update(() => {
            lexicalNode.selectNext();
            lexicalNode.remove();
          });
        }}
      >
        <TestForm
          onSubmit={onSubmit}
          test={
            mdastNode.attributes ? parseTest(mdastNode.attributes) : undefined
          }
        />
      </DescriptorTemplate>
    );
  },
};

export { TestDirectiveDescriptor };
