import React, { useEffect, useState } from "react";
import { editJewel, postJewels } from "../../Services/ApiEndpoints";
import useCurrentUser from "../../Helpers/useCurrentUser";
import useUserJewels from "../../Helpers/useUserJewels";
import useMetals from "../../Helpers/useMetals";
import usePieces from "../../Helpers/usePieces";
import useStones from "../../Helpers/useStones";
import goldStandards from "../../Data/goldStandards.json";
import silverStandards from "../../Data/silverStandards.json";

import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  InputLabel,
} from "@material-ui/core";

import classes from "./styles.module.scss";

const ProductModal = ({
  modalType,
  product,
  productModalActive,
  productModalToggle,
}) => {
  const { existingJWT } = useCurrentUser();
  const { metals } = useMetals();
  const { pieces } = usePieces();
  const { stones } = useStones();
  const { setUserJewels } = useUserJewels();
  const [productObject, setProductObject] = useState({
    name: product?.name || "",
    piece: product?.piece._id || "",
    metal: product?.metal._id || "",
    standard: product?.standard || "",
    size: product?.size || "",
    weight: product?.weight || "",
    stone: product?.stone._id || "",
    price: product?.price || "",
    contactPerson: product?.contactPerson || "",
    contactNumber: product?.contactNumber || "",
    description: product?.description || "",
    productImage: {},
    existingImages: product?.productImage || null,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      name: productObject.name,
      piece: productObject.piece,
      metal: productObject.metal,
      standard: productObject.standard,
      size: productObject.size,
      weight: productObject.weight,
      stone: productObject.stone,
      price: productObject.price,
      contactPerson: productObject.contactPerson,
      contactNumber: productObject.contactNumber,
      productImage: "",
      existingImages: productObject.existingImages,
      description: productObject.description,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      return value;
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const objectToFormData = (obj) => {
    let fd = new FormData();
    for (let item in obj) {
      if (item === "productImage") {
        for (const key of Object.keys(obj[item])) {
          fd.append(item, obj[item][key]);
        }
      } else {
        fd.append(item, obj[item]);
      }
    }
    return fd;
  };

  const onSubmit = (productObject) => {
    try {
      let jewelFormData = objectToFormData(productObject);
      console.log(productObject, "productObject");
      switch (modalType) {
        case "add":
          postJewels(jewelFormData, existingJWT);
          setUserJewels();
          productModalToggle();
          break;
        case "edit":
          editJewel(jewelFormData, product._id, existingJWT);
          break;
      }
    } catch (ex) {}
  };

  const handleDeleteImage = (imgUrl, e) => {
    e.preventDefault();

    let test = productObject.existingImages.filter((image) => image !== imgUrl);
    setProductObject({ ...productObject, ["existingImages"]: test });
  };

  return (
    <Dialog open={productModalActive} onClose={productModalToggle}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        პროდუქტი:
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { required: true, maxLength: 50 })}
          required
          fullWidth
          autoFocus
          label="დასახელება"
          name="name"
          error={errors.name ? true : false}
          helperText={
            errors?.name ? (
              <span>გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 50 სიმბოლო)</span>
            ) : null
          }
          size="small"
        />

        <Controller
          control={control}
          name="piece"
          render={({ field }) => (
            <div className={classes.dropdown}>
              <InputLabel required>ნაკეთობა</InputLabel>
              <Select fullWidth {...field}>
                <MenuItem value=""> </MenuItem>
                {pieces?.map((piece) => (
                  <MenuItem key={piece._id} value={piece._id}>
                    {piece.name}
                  </MenuItem>
                ))}
                <MenuItem value="სხვა">სხვა</MenuItem>
              </Select>
            </div>
          )}
        />

        {watch("piece") === "618be157a4992a8f222f09bf" && (
          <TextField
            {...register("size")}
            required
            fullWidth
            label="ზომა"
            name="size"
            size="small"
          />
        )}
        <TextField
          {...register("weight")}
          required
          fullWidth
          label="წონა"
          name="weight"
          size="small"
        />

        <Controller
          control={control}
          name="metal"
          render={({ field }) => (
            <div className={classes.dropdown}>
              <InputLabel required>მეტალი</InputLabel>
              <Select fullWidth {...field}>
                <MenuItem value=""> </MenuItem>

                {metals?.map((metal) => (
                  <MenuItem key={metal._id} value={metal._id}>
                    {metal.name}
                  </MenuItem>
                ))}
                <MenuItem value="სხვა">სხვა</MenuItem>
              </Select>
            </div>
          )}
        />

        {watch("metal").length > 0 && (
          <Controller
            control={control}
            name="standard"
            render={({ field }) => (
              <div className={classes.dropdown}>
                <InputLabel required>სინჯი</InputLabel>
                <>
                  {watch("metal") === "618bd992a4992a8f222f09bc" ? (
                    <Select fullWidth {...field}>
                      {goldStandards.map((goldStandard) => (
                        <MenuItem
                          key={goldStandard.id}
                          value={goldStandard.name}
                        >
                          {goldStandard.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Select fullWidth {...field}>
                      {silverStandards.map((silverStandard) => (
                        <MenuItem
                          key={silverStandard.id}
                          value={silverStandard.name}
                        >
                          {silverStandard.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </>
              </div>
            )}
          />
        )}

        <Controller
          control={control}
          name="stone"
          render={({ field }) => (
            <div className={classes.dropdown}>
              <InputLabel required>შიგთავსი</InputLabel>
              <Select fullWidth {...field}>
                <MenuItem value=""> </MenuItem>

                {stones?.map((stone) => (
                  <MenuItem key={stone._id} value={stone._id}>
                    {stone.name}
                  </MenuItem>
                ))}
                <MenuItem value="სხვა">სხვა</MenuItem>
              </Select>
            </div>
          )}
        />

        <TextField
          {...register("price", { required: true, maxLength: 50 })}
          required
          fullWidth
          autoFocus
          label="ფასი"
          name="price"
          error={errors.name ? true : false}
          helperText={
            errors?.price ? (
              <span>გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 50 სიმბოლო)</span>
            ) : null
          }
          size="small"
        />

        <TextField
          {...register("contactPerson", {
            required: true,
            maxLength: 50,
          })}
          required
          fullWidth
          label="საკონტაქტო პირი:"
          name="contactPerson"
          error={errors.contactPerson ? true : false}
          helperText={
            errors?.contactPerson ? (
              <span>გთხოვთ შეავსოთ სავალდებულო ველი </span>
            ) : null
          }
          size="small"
        />

        <TextField
          {...register("contactNumber", {
            required: true,
            maxLength: 50,
          })}
          required
          fullWidth
          label="საკონტაქტო ნომერი:"
          name="contactNumber"
          error={errors.contactNumber ? true : false}
          helperText={
            errors?.contactNumber ? (
              <span>გთხოვთ შეავსოთ სავალდებულო ველი </span>
            ) : null
          }
          size="small"
        />

        <TextField
          {...register("description", { required: true, maxLength: 50 })}
          style={{ marginTop: "48px" }}
          required
          margin="normal"
          fullWidth
          multiline
          maxRows={4}
          label="ნივთის აღწერა"
          name="description"
          error={errors.description ? true : false}
          helperText={
            errors?.description ? (
              <span>
                გთხოვთ შეავსოთ სავალდებულო ველი (მაქსიმუმ 300 სიმბოლო){" "}
              </span>
            ) : null
          }
          size="small"
          variant="outlined"
          minRows={4}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div>
          <input
            {...register("productImage")}
            type="file"
            name="productImage"
            accept="image/*"
            multiple
          />
        </div>

        <div className={classes.images} style={{ overflowX: "auto" }}>
          {productObject?.existingImages?.map((image, index) => {
            return (
              <div className="existingImageItem" key={index}>
                <input
                  type="image"
                  width="200"
                  height="200"
                  alt="Product"
                  src={`https://ge-gold.herokuapp.com /${image}`}
                />
                <button
                  onClick={(e) => handleDeleteImage(image, e)}
                  className="existingItemDelete"
                >
                  X
                </button>
              </div>
            );
          })}
          {/* <input width="200" height="200" {...register("existingImages")} type='image' src={`http://localhost:3000/${productObject.existingImages[0]}`} className={classes.images_productImages} /> */}
        </div>

        <DialogActions>
          <Button type="submit">დამატება</Button>
          <Button onClick={productModalToggle}>გაუქმება</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductModal;
