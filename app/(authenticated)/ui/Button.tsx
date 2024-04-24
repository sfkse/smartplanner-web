import MUIButton from "@mui/material/Button";

type ButtonProps = {
  text: string;
  startIcon?: React.ReactNode;
  color?: "primary" | "error";
  variant?: "text" | "outlined" | "contained";
  style?: React.CSSProperties;
  type?: "button" | "submit";
  handleClick: () => void;
};

function Button({
  text,
  startIcon,
  handleClick,
  variant = "outlined",
  color = "primary",
  style,
  type = "button",
}: ButtonProps) {
  return (
    <MUIButton
      variant={variant}
      size="small"
      color={color}
      startIcon={startIcon}
      onClick={handleClick}
      sx={style}
      type={type}
    >
      <span style={{ paddingTop: "3px" }}>{text}</span>
    </MUIButton>
  );
}

export default Button;

