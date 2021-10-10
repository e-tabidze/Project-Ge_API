import React from "react";
import useCurrentUser from "./Helpers/useCurrentUser";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import UserPage from "./Pages/UserPage/UserPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import Terms from "./Pages/Terms/Terms";
import Footer from "./Components/Footer/Footer";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const { currentUser } = useCurrentUser();
  return (
    <Switch>
      <>
        <ToastContainer />
        <Navbar />
        <Route exact path="/" component={() => <HomePage />} />
        <Route
          exact
          path="/user-page"
          render={() => {
            if (!currentUser) return null;
            return <UserPage />;
          }}
        />
        <Route exact path="/product/:id" component={() => <ProductPage />} />
        <Route
          exact
          path="/reset-password/:userId/:token"
          component={() => <ResetPasswordPage />}
        />
        <Route exact path="/terms-and-conditions" component={() => <Terms />} />
        <Footer />
      </>
    </Switch>
  );
}

export default App;
