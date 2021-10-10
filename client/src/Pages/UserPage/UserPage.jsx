import React, { useState } from "react";
import useCurrentUser from "../../Helpers/useCurrentUser";
import useUserJewels from "../../Helpers/useUserJewels";
import UserInitial from "../../ReusableComponents/UserInitial/UserInitial";
import UserProductCard from "../../Components/UserProductCard/UserProductCard";
import ProductModal from "../../Components/ProductModal/ProductModal";
// import EditUserForm from "../../Components/EditUserForm/EditUserForm";

import AddSharpIcon from "@mui/icons-material/AddSharp";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import side from "../../Assets/side.jpeg";
import internal from "../../Assets/internal.jpeg";
import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/UserInitial/styles.module.scss";

const UserPage = () => {
  const [productModalActive, setProductModalActive] = useState(false);
  // const [editUser, setEditUser] = useState(null);
  const { currentUser, currentUserRef } = useCurrentUser();
  const { userJewels } = useUserJewels(currentUserRef);

  const productModalToggle = () => {
    setProductModalActive(!productModalActive);
  };

  // const toggleEditUser = () => {
  //   setEditUser(!editUser);
  // };

  return (
    <>
      <div className={classes.userpage}>
        <div className={classes.userpage_ads}>
          <img src={side} alt="ოქროს მარკეტი საქართველოში" />
          <img src={side} alt="ოქროს მარკეტი საქართველოში" />
          <img src={side} alt="ოქროს მარკეტი საქართველოში" />
          <img src={side} alt="ოქროს მარკეტი საქართველოში" />
        </div>
        <div className={classes.userpage_content}>
          <div className={classes.userpage_content_wrapper}>
            <div className={classes.userpage_content_wrapper_ad}>
              <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
            </div>
            <UserInitial
              classes={`${userClasses.initial} ${userClasses.initial_userpage} `}
              initial={currentUser && currentUser.name.toUpperCase().charAt(0)}
            />
            <div className={classes.userpage_content_wrapper_welcomeText}>
              მოგესალმებით {currentUser && currentUser.name}
            </div>
            {/* <div className={classes.userpage_content_wrapper_userDetails}>
              <div
                onClick={toggleEditUser}
                className={classes.userpage_content_wrapper_userDetails_edit}
              >
                მომხმარებლის მონაცემები
                <ModeEditOutlineOutlinedIcon fontSize="small" />
              </div>
              {editUser && <EditUserForm toggleEditUser={toggleEditUser} currentUser={currentUser} />}
            </div> */}
            <div
              className={classes.userpage_content_wrapper_cta}
              onClick={productModalToggle}
            >
              <AddSharpIcon style={{ color: "#001e42" }} />
              <span>ახალი განცხადების დამატება</span>
            </div>
          </div>
          <div>
            {userJewels?.map((userJewel) => (
              <UserProductCard key={userJewel._id} userJewel={userJewel} />
            ))}
          </div>
          <div className={classes.userpage_content_wrapper_ad}>
            <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
          </div>
        </div>
        <div></div>
      </div>
      {productModalActive && (
        <ProductModal
          modalType={"add"}
          product={null}
          productModalActive={productModalActive}
          productModalToggle={productModalToggle}
        />
      )}
    </>
  );
};

export default UserPage;
