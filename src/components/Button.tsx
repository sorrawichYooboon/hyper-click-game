import React from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  color:
    | "pink"
    | "blue"
    | "aqua"
    | "green"
    | "orange"
    | "black"
    | "white"
    | "warning"
    | "error"
    | "success";
  type: "outline" | "contained";
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  color,
  type,
  label,
  onClick,
  icon,
  className,
  ...props
}: ButtonProps) => {
  let contained = "";
  if (type === "contained") {
    switch (color) {
      case "pink":
        contained = "!bg-pink !text-white";
        break;
      case "blue":
        contained = "!bg-blue !text-white";
        break;
      case "aqua":
        contained = "!bg-aqua !text-white";
        break;
      case "green":
        contained = "!bg-green !text-white";
        break;
      case "orange":
        contained = "!bg-orange !text-white";
        break;
      case "black":
        contained = "!bg-black !text-white";
        break;
      case "white":
        contained = "!bg-white !text-black";
        break;
      case "warning":
        contained = "!bg-warning !text-white";
        break;
      case "error":
        contained = "!bg-error !text-white";
        break;
      case "success":
        contained = "!bg-success !text-white";
        break;
      default:
        break;
    }
  } else if (type === "outline") {
    switch (color) {
      case "pink":
        contained = "!text-pink !border-pink";
        break;
      case "blue":
        contained = "!text-blue !border-blue";
        break;
      case "aqua":
        contained = "!text-aqua !border-aqua";
        break;
      case "green":
        contained = "!text-green !border-green";
        break;
      case "orange":
        contained = "!text-orange !border-orange";
        break;
      case "black":
        contained = "!text-black !border-black";
        break;
      case "white":
        contained = "!text-white !border-white";
        break;
      case "warning":
        contained = "!text-warning !border-warning";
        break;
      case "error":
        contained = "!text-error !border-error";
        break;
      case "success":
        contained = "!text-success !border-success";
        break;
      default:
        break;
    }
  }

  let minClass = "";
  if ((label === undefined || label === "") && icon === undefined) {
    minClass = "!min-w-[100px] !min-h-[36.5px]";
  }

  return (
    <>
      <MuiButton
        className={`${contained} ${minClass} ${className}`}
        variant={type === "contained" ? "contained" : "outlined"}
        sx={{ textTransform: "none" }}
        onClick={onClick}
        {...props}
      >
        {/* {icon && <Box className="mr-1">{icon}</Box>} */}
        {label}
      </MuiButton>
    </>
  );
};

export { Button };
