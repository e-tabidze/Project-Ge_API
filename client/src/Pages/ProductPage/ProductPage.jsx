import React from "react";
import useJewel from "../../Helpers/useJewel";
import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import useSimilarJewels from "../../Helpers/useSimilarJewels";
import ProductCard from "../../Components/ProductCard/ProductCard";

import side from "../../Assets/side.jpeg";
import internal from "../../Assets/internal.jpeg";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const ProductPage = () => {
  const { jewel } = useJewel();
  const { similarJewels } = useSimilarJewels(jewel);

  return (
    <section className={classes.productpage}>
      <div className={classes.productpage_sideAds}></div>

      <div className={classes.productpage_products}>
        <div className={classes.productpage_products_ad}>
          <img src={internal} alt="ოქროს მარკეტი საქართველოში" />
        </div>
        <div className={classes.productpage_product}>
          <div className={classes.productpage_product_images}>
            <ImageSlider
              sliderData={jewel?.productImage}
              classes={`${userClasses.slider} ${userClasses.slider_adSlider} `}
            />
          </div>
          <div className={classes.productpage_product_info}>
            <div className={classes.productpage_product_info_specs}>
              <ul>
                <li>
                  <p className={classes.productpage_product_info_specs_title}>
                    {jewel?.name}
                  </p>
                </li>
                <li>
                  <p className={classes.productpage_product_info_specs_about}>
                    პროდუქტის შესახებ
                  </p>
                </li>
                <li>
                  <span>ნაკეთობა</span>
                  <p> {jewel?.piece.name} </p>
                </li>
                <li>
                  <span>ზომა</span>
                  <p> {jewel?.size} </p>
                </li>
                <li>
                  <span>წონა</span>
                  <p> {jewel?.size} </p>
                </li>
                <li>
                  <span>მასალა</span>
                  <p> {jewel?.metal.name} </p>
                </li>
                <li>
                  <span>სინჯი</span>
                  <p> {jewel?.standard} </p>
                </li>
                <li>
                  <span>შიგთავსი</span>
                  <p> {jewel?.stone.name} </p>
                </li>
                <li>
                  <span>ფასი</span>
                  <p> {jewel?.price} ლ</p>
                </li>
              </ul>

              <ul>
                <li>
                  <span></span>
                  <p> {jewel?.contactPerson} </p>
                </li>
                <li>
                  <span>საკონტაქტო ნომერი</span>
                  <p> {jewel?.contactNumber}</p>
                </li>
              </ul>
            </div>
            <div>
              <p className={classes.productpage_product_info_specs_about}>
                აღწერა
              </p>
              <p>{jewel?.description}</p>
            </div>
          </div>
        </div>

        <div className={classes.productpage_product_similarjewels}>
          <div className={classes.productpage_product_ads}>
            <img
              src={side}
              alt="ოქროს მარკეტი საქართველოში"
              className={classes.productpage_product_ads_ad}
            />
            <img
              src={side}
              alt="ოქროს მარკეტი საქართველოში"
              className={classes.productpage_product_ads_ad}
            />
            <img
              src={side}
              alt="ოქროს მარკეტი საქართველოში"
              className={classes.productpage_product_ads_ad}
            />
            <img
              src={side}
              alt="ოქროს მარკეტი საქართველოში"
              className={classes.productpage_product_ads_ad}
            />
          </div>
          <p className={classes.productpage_product_info_specs_title}>
            მსგავსი პროდუქტები
          </p>
          <div className={classes.productpage_product_similarjewels_products}>
            {similarJewels?.map((similarJewel) => (
              <ProductCard product={similarJewel} key={similarJewel._id} />
            ))}
          </div>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default ProductPage;
