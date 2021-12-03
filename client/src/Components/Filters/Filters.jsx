import React from "react";
import useMetals from "../../Helpers/useMetals";
import usePieces from "../../Helpers/usePieces";
import useStones from "../../Helpers/useStones";
import useJewels from "../../Helpers/useJewels";
import Select from "../../ReusableComponents/Select/Select";

import { useForm } from "react-hook-form";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { DialogActions, Button } from "@material-ui/core";

import classes from "./styles.module.scss";

const Filters = ({ toggleFilters, setFilteredJewels }) => {
  const { register, handleSubmit } = useForm();
  const { jewels } = useJewels();
  const { metals } = useMetals();
  const { pieces } = usePieces();
  const { stones } = useStones();

  const onSubmit = (e) => {
    let filteredArr = [];
    let isFiltered = false;
    for (const type in e) {
      for (const id in e[type]) {
        if (e[type][id] === true) {
          isFiltered = true;
          jewels?.map((jewel) => {
            if (filteredArr.indexOf(jewel) === -1) {
              if (id === jewel[type]._id) {
                filteredArr.push(jewel);
              }
            }
          });
        }
      }
    }
    setFilteredJewels(isFiltered ? filteredArr : jewels);
  };

  return (
    <section className={classes.filter}>
      <div className={classes.filter_close}>
        <ClearSharpIcon
          onClick={toggleFilters}
          style={{ color: "#ffffff", cursor: "pointer" }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.filter_type}>მასალა</div>
        {metals && (
          <Select
            register={register}
            data={metals}
            type={"metal"}
            className="filter-select"
          />
        )}
        <div className={classes.filter_type_lower}>ნაკეთობა</div>
        {pieces && <Select register={register} data={pieces} type={"piece"} />}
        <div className={classes.filter_type_lower}>შიგთავსი</div>
        {stones && <Select register={register} data={stones} type={"stone"} />}
        <DialogActions>
          <Button type="submit" className="filter-btn">
            არჩევა
          </Button>
          <Button onClick={toggleFilters} className="filter-btn">
            გაუქმება
          </Button>
        </DialogActions>
      </form>
    </section>
  );
};

export default Filters;
