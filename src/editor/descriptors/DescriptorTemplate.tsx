import React from "react";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const DescriptorTemplate = ({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children}
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DescriptorTemplate;
