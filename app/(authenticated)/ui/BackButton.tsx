import Link from "next/link";
import React from "react";
import styled from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

type BackButtonProps = {
  path: string;
};

function BackButton({ path }: BackButtonProps) {
  return (
    <BackLink href={path}>
      <KeyboardBackspaceIcon /> Back
    </BackLink>
  );
}

export default BackButton;

const BackLink = styled(Link)`
  color: var(--primary-light);
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

