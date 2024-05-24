import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React from "react";
import SubmitButton from "./SubmitButton";
import { Quiz as QuizIcon } from "@mui/icons-material";

const InsertTest = () => {
  const insertDirective = usePublisher(insertDirective$);

  const insert = () => {
    insertDirective({
      name: "test",
      type: "leafDirective",
      children: [],
    } as LeafDirective);
  };

  return (
    <SubmitButton
      title={"Вставить тест"}
      buttonContent={<QuizIcon />}
      onSubmit={insert}
    />
  );
};

export default InsertTest;
