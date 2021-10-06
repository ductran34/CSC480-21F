import * as React from "react";
import classNames from "classnames";
import Button from "@mui/material/Button";

import { secondaryColor, primaryColor, fontColor } from "../styles/Style";
import ButtonStyle from "../styles/ButtonStyle";


function Buttons({text}) {
  const button = ButtonStyle();
  const btnClasses = classNames({
    
  });
  return (
    <Button
      style={{
        backgroundColor: fontColor,
        color: secondaryColor,
        borderRadius: "25px",
      }}
      variant="contained"
    >
      {text}
    </Button>
  );
}

export default Buttons;