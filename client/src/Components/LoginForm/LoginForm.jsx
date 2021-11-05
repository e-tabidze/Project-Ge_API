import React, { useState } from "react";
import { loginUser } from "../../Services/ApiEndpoints";

import { useForm } from "react-hook-form";
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

const LoginForm = ({
  toggleAccountModal,
  toggleRegisterForm,
  getCurrentUser,
  toggleForgotPasswordForm,
  accountModalActive,
}) => {
  const [alert, setAlert] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const { data: jwt } = await loginUser(email, password);
      localStorage.setItem("token", jwt);
      getCurrentUser(jwt);
      toggleAccountModal();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setAlert("error");
      }
    }
  };

  return (
    <>
      {alert === "error" ? (
        <Alert variant="filled" severity="error">
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი და პაროლი
        </Alert>
      ) : (
        <Dialog open={accountModalActive} onClose={toggleAccountModal}>
          <DialogTitle id="form-dialog-title">შესვლა</DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.accountform}
            >
              <TextField
                {...register("email", { required: true, type: "email" })}
                placeholder="იმეილი"
                type="email"
                fullWidth
                margin="dense"
                name="email"
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
              />
              <DialogActions>
                <Button type="submit">შესვლა</Button>
                <Button onClick={toggleAccountModal}>გაუქმება</Button>
              </DialogActions>
              <div
                className={classes.accountform_forgotPasswordLink}
                onClick={toggleForgotPasswordForm}
              >
                დაგავიწყდათ პაროლი?
              </div>
              <div className={classes.accountform_registrationLink}>
                ჯერ არ ხართ ჩვენი მომხმარებელი?
                <span onClick={toggleRegisterForm}> რეგისტრაცია</span>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LoginForm;
