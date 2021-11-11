import React, { useState } from "react";
import { deleteJewel } from "../../Services/ApiEndpoints";
import useCurrentUser from "../../Helpers/useCurrentUser";
import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import ConfirmModal from "../../ReusableComponents/ConfirmModal/ConfirmModal";
import ProductModal from "../ProductModal/ProductModal";

import { toast } from "react-toastify";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MuiAlert from "@material-ui/lab/Alert";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserProductCard = ({ userJewel }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [productModalActive, setProductModalActive] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const { jwt, existingJWT } = useCurrentUser();

  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const toggleProductModal = () => {
    setProductModalActive(!productModalActive);
  };

  const handleDelete = async () => {
    try {
      await deleteJewel(userJewel._id, existingJWT);
      toggleConfirmModal();
      setSuccessAlert(!successAlert);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("პროდუქტი უკვე წაშლილია");
    }
  };
  return (
    <>
      {confirmModal && (
        <ConfirmModal
          contentText={"ნამდვილად გსურთ პროდუქტის წაშლა?"}
          confirmText={"წაშლა"}
          open={confirmModal}
          setOpen={toggleConfirmModal}
          cancel={toggleConfirmModal}
          confirmClick={handleDelete}
        />
      )}
      {successAlert && (
        <Alert variant="filled" severity="success" className={classes.alert}>
          პროდუქტი წარმატებით წაიშალა
        </Alert>
      )}
      {productModalActive && (
        <ProductModal
          modalType="edit"
          product={userJewel}
          productModalActive={productModalActive}
          productModalToggle={toggleProductModal}
        />
      )}
      <section className={classes.userproductcard}>
        <div className={classes.userproductcard_slider}>
          <ImageSlider
            classes={`${userClasses.slider} ${userClasses.slider_productCard} `}
            sliderData={userJewel && userJewel.productImage}
          />
        </div>
        <div className={classes.userproductcard_content}>
          <div className={classes.userproductcard_content_table}>
            <div
              className={classes.userproductcard_content_table_specifications}
            >
              <ul>
                <li>
                  <span>დასახელება</span>
                  <p> {userJewel?.name} </p>
                </li>
                <li>
                  <span>ნაკეთობა</span>
                  <p> {userJewel?.piece.name} </p>
                </li>
                <li>
                  <span>მასალა</span>
                  <p> {userJewel?.metal.name} </p>
                </li>
                <li>
                  <span>სინჯი</span>
                  <p> {userJewel?.standard} </p>
                </li>
                <li>
                  <span>შიგთავსი</span>
                  <p> {userJewel?.stone.name} </p>
                </li>
                <li>
                  <span>ფასი</span>
                  <p> {userJewel?.price} ლ</p>
                </li>
              </ul>
              <ul>
                <li>
                  <span>ზომა</span>
                  <p> {userJewel?.size} </p>
                </li>
                <li>
                  <span>წონა</span>
                  <p> {userJewel?.weight} </p>
                </li>

                <li>
                  <span>საკონტაქტო პირი</span>
                  <p> {userJewel?.contactPerson} </p>
                </li>
                <li>
                  <span>საკონტაქტო ნომერი</span>
                  <p> {userJewel?.contactNumber} </p>
                </li>
              </ul>
            </div>
            <div className={classes.userproductcard_content_actions}>
              <ModeEditOutlineOutlinedIcon
                onClick={toggleProductModal}
                fontSize="small"
                style={{ cursor: "pointer", color: "#001e42" }}
              />
              <DeleteOutlinedIcon
                onClick={toggleConfirmModal}
                fontSize="small"
                style={{ cursor: "pointer", color: "#001e42" }}
              />
            </div>
          </div>
          <ul>
            <li className={classes.userproductcard_content_description}>
              <span>აღწერა:</span>
              <p>{userJewel?.description}</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProductCard;
