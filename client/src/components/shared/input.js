import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Input({
  half,
  type,
  name,
  label,
  autoFocusBool,
  handleChange,
  required = true,
}) {
  const [visibiltyOn, setvisibiltyOn] = useState(false);

  const handleShowPassword = () => {
    setvisibiltyOn(!visibiltyOn);
  };
  const getType = () => {

    if (type === "password") return visibiltyOn ? "text" : "password";
    return type;
  };

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required={required}
        fullWidth
        label={label}
        autoFocus={autoFocusBool}
        type={getType()}
        InputProps={
          name === "password" ? (
            {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {visibiltyOn ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          ) : (
            <></>
          )
        }
      />
    </Grid>
  );
}

export default Input;
