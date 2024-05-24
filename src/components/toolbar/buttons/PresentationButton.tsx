import { usePublisher } from "@mdxeditor/gurx";
import { insertDirective$ } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";
import React, {useEffect} from "react";
import { CoPresent as CoPresentIcon } from "@mui/icons-material";
import { useFetcher } from "@remix-run/react";
import { FileOrUrlDialog } from "../dialogs/FileOrUrlDialog";

const InsertPresentation = () => {
  const fetcher = useFetcher<{
    goal: "insert-presentation";
    url: string;
  }>();
  const insertDirective = usePublisher(insertDirective$);

  const insert = (url: string) => {
    insertDirective({
      name: "presentation",
      type: "leafDirective",

      attributes: { url },
      children: [],
    } as LeafDirective);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.data.goal !== "insert-presentation") return;

    insert(fetcher.data.url as string);
  }, [fetcher.data]);

  return (
    <FileOrUrlDialog
      uploadFileTitle={"Загрузите презентацию с вашего устройства"}
      tooltipTitle="Вставить презентацию"
      submitButtonTitle="Загрузить"
      dialogInputLabel="Или вставьте прямую ссылку на презентацию"
      buttonContent={<CoPresentIcon />}
      acceptFileTypes={"pdf"}
      onSubmit={async ({ url, file: fileList }) => {
        if (fileList.length) {
          const formData = new FormData();
          formData.append("goal", "insert-presentation");
          formData.append("file", fileList.item(0)!);
          fetcher.submit(formData, { method: "POST", encType: "multipart/form-data" });
        }
        insert(url);
      }}
    />
  );
};

export default InsertPresentation;
