"use client";

import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { IconButton } from "@mui/material";

function Options() {
  return (
    <OptionsWrapper>
      <IconButton size="small" aria-label="save" title="Save to schemas">
        <SaveOutlinedIcon />
      </IconButton>
      <IconButton size="small" aria-label="print" title="Print">
        <LocalPrintshopOutlinedIcon />
      </IconButton>
      <IconButton size="small" aria-label="download" title="Download">
        <FileDownloadOutlinedIcon />
      </IconButton>
    </OptionsWrapper>
  );
}

export default Options;

const OptionsWrapper = styled.div`
  display: flex;
`;

