import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { FileOrUrlDialog } from "../dialogs/FileOrUrlDialog";
import { LeafDirective } from "mdast-util-directive";
import React, { useEffect } from "react";
import { Audiotrack as AudiotrackIcon } from "@mui/icons-material";

import { useFetcher } from "@remix-run/react";

const AudioButton = () => {
  const insertDirective = usePublisher(insertDirective$);
  const fetcher = useFetcher<{ goal: "insert-audio"; url: string }>();

  const insert = (url: string) => {
    insertDirective({
      name: "audio",
      type: "leafDirective",

      attributes: { url },
      children: [],
    } as LeafDirective);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-audio") return;
    const url = fetcher.data.url;
    insert(url);
  }, [fetcher.data]);

  return (
    <FileOrUrlDialog
      uploadFileTitle={"Загрузите аудио с вашего устройства"}
      tooltipTitle="Аудио"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на аудио файл"
      buttonContent={<AudiotrackIcon />}
      acceptFileTypes={"audio/*"}
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          console.log(fileList.item(0))
          const formData = new FormData();
          formData.append("goal", "insert-audio");
          formData.append("file", fileList.item(0)!);
          fetcher.submit(formData, { method: "POST", encType: "multipart/form-data" });
          return;
        }
        insert(url);
      }}
    />
  );
};

export default AudioButton;
