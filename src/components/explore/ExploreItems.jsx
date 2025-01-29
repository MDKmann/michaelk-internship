import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import SkeletonCard from "../UI/SkeletonCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [apiValue, setApiValue] = useState(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  );
  const [displayedItems, setDisplayedItems] = useState(items);
  const visibleItemsCount = useRef(8);

  const handleFilter = (event) => {
    let filter = event.target.value;
    setFilterValue(filter);
    setApiValue(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
  };

  const fetchItemsData = useCallback(async () => {
    const { data } = await axios.get(apiValue);
    setItems(data);
    // sets visible items shown from 0 to 8 range, (shorthand caused bug) on initial render
    setDisplayedItems(data.slice(0, visibleItemsCount.current));
  }, [apiValue]);

  const handleLoadMore = () => {
    // increases visible items by previous amount + 4
    visibleItemsCount.current = visibleItemsCount.current + 4;
    console.log(visibleItemsCount);
    // updates the amount of visible items shown
    setDisplayedItems(items.slice(0, visibleItemsCount.current));
  };

  useEffect(() => {
    fetchItemsData();
  }, [apiValue]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filterValue}
          onChange={(event) => handleFilter(event)}
        >
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
