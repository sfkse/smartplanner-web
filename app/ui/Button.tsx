import MUIButton from "@mui/material/Button";

type ButtonProps = {
  text: string;
  startIcon: React.ReactNode;
  handleClick: () => void;
  color?: "primary" | "error";
  variant?: "text" | "outlined" | "contained";
};

function Button({
  text,
  startIcon,
  handleClick,
  variant = "outlined",
  color = "primary",
}: ButtonProps) {
  return (
    <MUIButton
      variant={variant}
      size="small"
      color={color}
      startIcon={startIcon}
      onClick={handleClick}
    >
      <span style={{ paddingTop: "3px" }}>{text}</span>
    </MUIButton>
  );
}

export default Button;

