"use client";

import MUIButton from "@mui/material/Button";

type ButtonProps = {
  text: string;
  startIcon?: React.ReactNode;
  color?: "primary" | "error";
  variant?: "text" | "outlined" | "contained";
  style?: React.CSSProperties;
  handleClick: () => void;
};

function Button({
  text,
  startIcon,
  handleClick,
  variant = "outlined",
  color = "primary",
  style,
}: ButtonProps) {
  return (
    <MUIButton
      variant={variant}
      size="small"
      color={color}
      startIcon={startIcon}
      onClick={handleClick}
      sx={style}
    >
      <span style={{ paddingTop: "3px" }}>{text}</span>
    </MUIButton>
  );
}

export default Button;

