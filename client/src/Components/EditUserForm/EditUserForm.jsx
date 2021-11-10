import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { TextField, DialogActions, Button } from "@material-ui/core";

const EditUserForm = ({ toggleEditUser, currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      current_password: "",
      password: "",
    },
  });

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <span>გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 50 სიმბოლო)</span>
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
        {...register("current_password", {
          required: true,
          minLength: 8,
          maxLength: 1024,
        })}
        placeholder="არსებული პაროლი"
        type="password"
        fullWidth
        margin="dense"
        name="current_password"
        error={errors?.password ? true : false}
        helperText={
          errors?.password && (
            <span>გთხოვთ შეავსოთ სავალდებულო ველი (მინიმუმ 8 სიმბოლო)</span>
          )
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
            <span>გთხოვთ შეავსოთ სავალდებულო ველი (მინიმუმ 8 სიმბოლო)</span>
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
          რეგისტრაცია
        </Button>
        <Button onClick={toggleEditUser} color="primary">
          გაუქმება
        </Button>
      </DialogActions>
    </form>
  );
};

export default EditUserForm;
