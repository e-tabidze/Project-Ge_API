import React, { useState } from "react";
import { registerUser } from "../../Services/ApiEndpoints";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import classes from "./styles.module.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterForm = ({
  toggleAccountModal,
  getCurrentUser,
  accountModalActive,
}) => {
  const [alert, setAlert] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (e) => {
    try {
      const response = await registerUser(e);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      getCurrentUser(response.headers["x-auth-token"]);
      toggleAccountModal();
    } catch (ex) {
      if (ex.response?.status === 400) {
        setAlert("error");
      }
    }
  };

  return (
    <>
      {alert === "error" ? (
        <Alert variant="filled" severity="error">
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი და პასვორდი
        </Alert>
      ) : (
        <Dialog open={accountModalActive} onClose={toggleAccountModal}>
          <DialogTitle id="form-dialog-title">რეგისტრაცია</DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.accountform}
            >
              <TextField
                {...register("name", { required: true, maxLength: 50 })}
                placeholder="თქვენი სახელი"
                autoFocus
                fullWidth
                margin="dense"
                name="name"
                error={errors.name ? true : false}
                helperText={
                  errors?.name ? (
                    <span>
                      გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 50 სიმბოლო)
                    </span>
                  ) : null
                }
              />

              <TextField
                {...register("email", { required: true, type: "email" })}
                placeholder="იმეილი"
                type="email"
                fullWidth
                margin="dense"
                name="email"
                error={errors?.email ? true : false}
                helperText={
                  errors?.email && <span>გთხოვთ შეიყვანოთ ვალიდური იმეილი</span>
                }
              />

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

              <div className={classes.accountform_termsLink}>
                გთხოვთ გაეცნოთ{" "}
                <NavLink to="/terms" target="_blank">
                  <span>საიტის წესებს</span>
                </NavLink>
              </div>
              <DialogActions>
                <Button type="submit" color="primary">
                  რეგისტრაცია
                </Button>
                <Button onClick={toggleAccountModal} color="primary">
                  გაუქმება
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RegisterForm;
