import React from "react";
import SkeletonCard from "../UI/SkeletonCard";
import ItemCard from "../UI/ItemCard";

const AuthorItems = ({ author }) => {
  const items = author.nftCollection;
  const authorImage = author.authorImage;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items ? (
            <>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <ItemCard item={item} authorImage={authorImage} />
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
