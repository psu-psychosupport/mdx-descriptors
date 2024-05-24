import React, { useState } from "react";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { pdfjs, Document, Page } from "react-pdf";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const PresentationViewer = ({ url }: { url: string }) => {
  const [pagesCount, setPagesCount] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const toPrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prev) => prev - 1);
  };

  const toNextPage = () => {
    if (pageNumber === pagesCount) return;
    setPageNumber((prev) => prev + 1);
  };

  return (
    <Stack justifyContent={"center"}>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setPagesCount(numPages)}
      >
        <Page pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <IconButton onClick={toPrevPage}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>
          {pageNumber} / {pagesCount}
        </Typography>
        <IconButton onClick={toNextPage}>
          <NavigateNextIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default PresentationViewer;
