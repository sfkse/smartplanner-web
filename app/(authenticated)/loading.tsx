"use client";

import { Box, CircularProgress } from "@mui/material";
import styled from "styled-components";

type LoadingProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

export default function Loading({ children, isLoading }: LoadingProps) {
  return (
    <>
      <Wrapper isLoading={isLoading}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {children}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ isLoading: boolean }>`
  /* position: relative; */
  width: 100%;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
  pointer-events: ${(props) => (props.isLoading ? "none" : "all")};
`;

