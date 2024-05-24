import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React, {useEffect} from "react";
import { PlayCircle as PlayCircleIcon } from "@mui/icons-material";
import { useFetcher } from "@remix-run/react";

import { FileOrUrlDialog } from "../dialogs/FileOrUrlDialog";

const VideoButton = () => {
  const fetcher = useFetcher<{
    goal: "insert-video";
    url: string;
  }>();
  const insertDirective = usePublisher(insertDirective$);

  const insert = (url: string) => {
    insertDirective({
      name: "video",
      type: "leafDirective",

      attributes: { url },
      children: [],
    } as LeafDirective);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-video") return;

    insert(fetcher.data.url as string);
  }, [fetcher.data]);

  return (
    <FileOrUrlDialog
      uploadFileTitle={"Загрузите видео с вашего устройства"}
      tooltipTitle="Видео"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте ссылку на видео файл"
      buttonContent={<PlayCircleIcon />}
      acceptFileTypes={"video/*"}
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const formData = new FormData();
          formData.append("goal", "insert-video");
          formData.append("file", fileList.item(0)!);
          fetcher.submit(formData, { method: "POST", encType: "multipart/form-data" });
          return;
        }
        insert(url);
      }}
    />
  );
};

export default VideoButton;
