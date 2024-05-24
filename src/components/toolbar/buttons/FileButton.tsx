import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React, { useEffect } from "react";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { useFetcher } from "@remix-run/react";

import { FileDialog } from "../dialogs/FileDialog";

const FileButton = () => {
  const insertDirective = usePublisher(insertDirective$);
  const fetcher = useFetcher<{ goal: "insert-file"; name: string; url: string }>();

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-file") {
      return;
    }
    insert(fetcher.data!.name, fetcher.data!.url);

  }, [fetcher.data])

  const insert = (name: string, url: string) => {
    insertDirective({
      name: "file",
      type: "leafDirective",

      attributes: { name, url },
      children: [],
    } as LeafDirective);
  };

  return (
    <FileDialog
      uploadFileTitle={"Загрузите файл с вашего устройства"}
      tooltipTitle="Вставить файл"
      submitButtonTitle="Загрузить"
      buttonContent={<AttachFileIcon />}
      acceptFileTypes={"*"}
      onSubmit={async ({ file: fileList }) => {
        const formData = new FormData();
        formData.append("goal", "insert-file");
        formData.append("file", fileList.item(0)!);
        fetcher.submit(formData, {
          method: "POST",
          encType: "multipart/form-data",
        });
      }}
    />
  );
};

export default FileButton;
