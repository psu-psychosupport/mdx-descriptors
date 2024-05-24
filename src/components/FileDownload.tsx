import React from "react";
import {
  Typography,
  Box,
  Stack,
  SvgIconOwnProps,
} from "@mui/material";
import {
  AudioFile,
  VideoFile,
  FileDownload as FileDownloadIcon,
  PictureAsPdf,
  InsertDriveFile,
  PermMedia,
  Description,
} from "@mui/icons-material";

const iconSize = 56;

const fileTypeToIcon = {
  doc: (color: SvgIconOwnProps["color"]) => (
    <Description sx={{ color, fontSize: iconSize }} />
  ),
  docx: (color: SvgIconOwnProps["color"]) => (
    <Description sx={{ color, fontSize: iconSize }} />
  ),
  pdf: (color: SvgIconOwnProps["color"]) => (
    <PictureAsPdf sx={{ color, fontSize: iconSize }} />
  ),
  mp3: (color: SvgIconOwnProps["color"]) => (
    <AudioFile sx={{ color, fontSize: iconSize }} />
  ),
  wav: (color: SvgIconOwnProps["color"]) => (
    <AudioFile sx={{ color, fontSize: iconSize }} />
  ),
  mp4: (color: SvgIconOwnProps["color"]) => (
    <VideoFile sx={{ color, fontSize: iconSize }} />
  ),
  png: (color: SvgIconOwnProps["color"]) => (
    <PermMedia sx={{ color, fontSize: iconSize }} />
  ),
  jpg: (color: SvgIconOwnProps["color"]) => (
    <PermMedia sx={{ color, fontSize: iconSize }} />
  ),
  jpeg: (color: SvgIconOwnProps["color"]) => (
    <PermMedia sx={{ color, fontSize: iconSize }} />
  ),
  _unknown: (color: SvgIconOwnProps["color"]) => (
    <InsertDriveFile sx={{ color, fontSize: iconSize }} />
  ),
};

const getFileIcon = (fileType: string) =>
  // @ts-ignore
  fileTypeToIcon[fileType] ?? fileTypeToIcon["_unknown"];

const getFileType = (fileName: string): string => fileName.split(".").at(-1)!;
const getFileName = (fileUrl: string): string => fileUrl.split("/").at(-1)!;

const FileDownload = ({ name, url }: { name: string; url: string }) => {
  const fileName = getFileName(url);
  const fileType = getFileType(fileName);
  const icon = getFileIcon(fileType);

  return (
    <a href={url} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          bgcolor: `primary.card`,
          boxShadow: "0px 0px 7px #638EFF",
          borderRadius: "4px",
          padding: 0.5,
          marginY: 1,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          {icon("primary.light")}

          <Stack>
            <Typography fontWeight={"500"}>{name}</Typography>
            <Typography color="primary.gray" variant={"body2"}>
              Файл {fileType.toUpperCase()}
            </Typography>
          </Stack>
          <FileDownloadIcon
            sx={{ color: "primary.light", fontSize: iconSize / 1.5 }}
          />
        </Stack>
      </Box>
    </a>
  );
};

export default FileDownload;
