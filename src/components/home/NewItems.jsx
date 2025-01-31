import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import Slider from "react-slick";
import ItemCard from "../UI/ItemCard";
import SkeletonCard from "../UI/SkeletonCard";
import AOS from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  AOS.init();
  const [newItemsData, setNewItemsData] = useState([]);

  const slickSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItemsData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fadeIn">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fadeIn">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            {newItemsData.length ? (
              <Slider {...slickSettings}>
                {newItemsData.map((item, index) => (
                  <div className="col" key={index}>
                    <ItemCard item={item} />
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...slickSettings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="col" key={index}>
                    <SkeletonCard />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
