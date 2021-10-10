import React, { useState, useEffect } from "react";
import { changePassword } from "../../Services/ApiEndpoints";

import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import { TextField, DialogActions, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import classes from "./styles.module.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPasswordPage = () => {
  const [alert, setAlert] = useState("");
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const userId = window.location.pathname.split("/")[2];
  const token = window.location.pathname.split("/")[3];

  const onSubmit = async (e) => {
    try {
      await changePassword(userId, token, e.password);
      setAlert("success");
      history.push("/");
    } catch (ex) {
      if (ex.response?.status === 400) {
        setAlert("error");
      }
    }
  };

  useEffect(() => {}, [location.pathname]);
  return (
    <>
      {alert === "error" ? (
        <Alert variant="filled" severity="error">
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი
        </Alert>
      ) : (
        <>
          {alert === "success" ? (
            <Alert variant="filled" severity="success">
              პაროლი წარმატებით შეიცალა
            </Alert>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.resetForm}
            >
              <h1 className={classes.resetForm_headline}>პაროლის განახლება</h1>
              <TextField
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 1024,
                })}
                placeholder="პაროლი"
                type="password"
                fullWidth
                margin="dense"
                name="password"
                error={errors?.password ? true : false}
                helperText={
                  errors?.password && (
                    <span>
                      გთხოვთ შეავსოთ სავალდებულო ველი (მინიმუმ 8 სიმბოლო)
                    </span>
                  )
                }
              />

              <TextField
                {...register("repeat_password", {
                  validate: (value) => value === watch("password"),
                  required: "რამე მესიჯი",
                })}
                name="repeat_password"
                type="password"
                placeholder="გაიმეორეთ პაროლი"
                fullWidth
                margin="dense"
                error={errors?.repeat_password ? true : false}
                helperText={
                  errors?.repeat_password ? (
                    <span>პაროლები არ ემთხვევა ერთმანეთს</span>
                  ) : null
                }
              />
              <DialogActions>
                <Button type="submit" color="primary">
                  განახლება
                </Button>
              </DialogActions>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ResetPasswordPage;
