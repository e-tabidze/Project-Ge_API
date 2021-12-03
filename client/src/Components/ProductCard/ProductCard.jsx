import React from "react";

import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";

import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const ProductCard = ({ product }) => {
  const handleAddToFavorites = () => {
    console.log("handleAddToFavorites");
  };
  return (
    <NavLink to={`product/${product._id}`}>
      <Card className={classes.productCard}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertSharpIcon />
            </IconButton>
          }
          title={product.name}
          subheader={`${product.price} ლარი`}
        />
        <CardContent>
          <ImageSlider
            classes={`${userClasses.slider} ${userClasses.slider_productCard} `}
            sliderData={product?.productImage}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </NavLink>
  );
};

export default ProductCard;
