import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountDown from "../CountDown";
import Skeleton from "../UI/Skeleton";
import ItemCard from "../UI/ItemCard";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(items);
  const [visibleItemsCount, setVisibleItemsCount] = useState(8);

  const fetchItemsData = useCallback(async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
    // sets visible items shown to 8 on initial render
    setDisplayedItems(data.slice(8));
  }, []);

  const handleLoadMore = () => {
    // increases visible items by previous amount + 4
    setVisibleItemsCount((prevCount) => prevCount + 4);
    // updates the amount of visible items shown
    setDisplayedItems(items.slice(0, visibleItemsCount));
  };

  useEffect(() => {
    fetchItemsData();
    handleLoadMore();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {displayedItems.length ? (
        <>
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <ItemCard item={item} />
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <SkeletonCard />
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        <button
          onClick={handleLoadMore}
          id="loadmore"
          className="btn-main lead"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
