import React, { useState } from "react";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const AccountModal = ({
  toggleAccountModal,
  getCurrentUser,
  accountModalActive,
}) => {
  const [registerForm, setRegisterForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);

  const toggleRegisterForm = () => {
    setRegisterForm(!registerForm);
  };

  const toggleForgotPasswordForm = () => {
    setForgotPasswordForm(!forgotPasswordForm);
  };
  return (
    <>
      {forgotPasswordForm ? (
        <ForgotPasswordForm
          forgotPasswordForm={forgotPasswordForm}
          toggleAccountModal={toggleAccountModal}
        />
      ) : (
        <>
          {registerForm ? (
            <RegisterForm
              toggleAccountModal={toggleAccountModal}
              getCurrentUser={getCurrentUser}
              accountModalActive={accountModalActive}
            />
          ) : (
            <LoginForm
              toggleAccountModal={toggleAccountModal}
              toggleRegisterForm={toggleRegisterForm}
              getCurrentUser={getCurrentUser}
              toggleForgotPasswordForm={toggleForgotPasswordForm}
              accountModalActive={accountModalActive}
            />
          )}
        </>
      )}
    </>
  );
};

export default AccountModal;
