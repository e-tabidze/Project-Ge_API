import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";



const Select = ({ register, data, type }) => {
  return (
    <FormGroup>
      {data.map((item) => {
        return (
          <FormControlLabel
            key={item._id}
            control={<Checkbox {...register(`${type}.${item._id}`)} />}
            label={item.name}
          />
        );
      })}
    </FormGroup>
  );
};

export default Select;
