import React, { useState, useEffect } from "react";
import useJewels from "../../Helpers/useJewels";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Searchbar from "../../ReusableComponents/Searchbar/Searchbar";
import Filters from "../../Components/Filters/Filters";
import ImageSlider from "../../ReusableComponents/ImageSlider/ImageSlider";
import banner1 from "../../Assets/main.jpeg";
import banner2 from "../../Assets/main.jpeg";
import banner3 from "../../Assets/main.jpeg";
import banner4 from "../../Assets/main.jpeg";
import side from "../../Assets/side.jpeg";
import filterIcon from "../../Assets/filter-icon.png";

import classes from "./styles.module.scss";
import userClasses from "../../ReusableComponents/ImageSlider/styles.module.scss";

const HomePage = () => {
  const { jewels } = useJewels();
  const [filters, setFilters] = useState(false);
  const [filteredJewels, setFilteredJewels] = useState([]);

  useEffect(() => {
    jewels && setFilteredJewels(jewels);
  }, [jewels]);

  const sliderData = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
  ];

  const toggleFilters = () => {
    setFilters(!filters);
  };

  const handleSearch = (e) => {
    let jewelData = jewels;
    let filtered = jewelData.filter((item) => {
      return item.name.toLowerCase().includes(e.toLowerCase());
    });
    setFilteredJewels(filtered);
  };

  return (
    <div className={classes.homepage}>
      <>
        <div className={classes.homepage_filters} onClick={toggleFilters}>
          <span>ფილტრები</span>
          <img
            src={filterIcon}
            className={classes.homepage_filters_filterIcon}
          />
        </div>
        {filters && (
          <Filters
            toggleFilters={toggleFilters}
            setFilteredJewels={setFilteredJewels}
          />
        )}
      </>
      <div className={classes.homepage_content}>
        <Searchbar onChange={handleSearch} placeholder={"ძებნა"} />
        <div className={classes.homepage_content_slider}>
          <ImageSlider
            classes={`${userClasses.slider} ${userClasses.slider_adSlider} `}
            sliderData={sliderData}
          />
        </div>
        <div className={classes.homepage_content_products}>
          {filteredJewels?.map((jewel) => {
            return <ProductCard product={jewel} key={jewel._id} />;
          })}
        </div>
      </div>
      <div className={classes.homepage_ads}>
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.homepage_ads_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.homepage_ads_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.homepage_ads_ad}
        />
        <img
          src={side}
          alt="ოქროს მარკეტი საქართველოში"
          className={classes.homepage_ads_ad}
        />
      </div>
    </div>
  );
};

export default HomePage;
