import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  type: string;
  size?: "small";
  fullWidth?: boolean;
  placeholder?: string;
  toolTipText?: string | undefined;
  disabled?: boolean;
  required?: boolean;
  sx?: SxProps;
  // size?:"small" |"medium";
};

const CustomInput = ({
  name,
  label,
  type,
  size,
  fullWidth,
  placeholder,
  required,
  toolTipText = "",
  sx,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{...sx}}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder}
          id={name}
          required={required}
        />
      )}
    />
  );
};

export default CustomInput;
