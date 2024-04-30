import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SelectBox() {
  const [age, setAge] = React.useState("");
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Klass</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Klass"
        onChange={(e) => console.log(e)}
        sx={{ width: "100px" }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectBox;

