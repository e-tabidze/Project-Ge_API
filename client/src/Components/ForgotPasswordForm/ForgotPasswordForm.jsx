import React, { useState } from "react";
import { forgotPassword } from "../../Services/ApiEndpoints";

import { useForm } from "react-hook-form";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPasswordForm = ({ toggleAccountModal, forgotPasswordForm }) => {
  const [alert, setAlert] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    try {
      await forgotPassword(e.email);
      setAlert("success");
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
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი
        </Alert>
      ) : (
        <>
          {alert === "success" ? (
            <Alert variant="filled" severity="success">
              ბმული წარმატებით გაიგზავნა მითითებულ იმეილზე
            </Alert>
          ) : (
            <Dialog open={forgotPasswordForm} onClose={toggleAccountModal}>
              <DialogTitle id="form-dialog-title">
                პასვორდის განახლება
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  გთხოვთ შეიყვანოთ იმეილი, რომლითაც ხართ დარეგისტრირებული ჩვენს
                  საიტზე
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    {...register("email")}
                    autoFocus
                    placeholder="იმეილი"
                    fullWidth
                    margin="dense"
                    name="email"
                    error={errors?.email ? true : false}
                    helperText={
                      errors?.email && (
                        <span>გთხოვთ შეიყვანოთ ვალიდური იმეილი</span>
                      )
                    }
                  />
                  <DialogActions>
                    <Button type="submit">გაგზავნა</Button>
                    <Button onClick={toggleAccountModal}>გაუქმება</Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
