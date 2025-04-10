import React, { useCallback, useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import FollowButton from "../components/UI/FollowButton";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  //Pass authorId from Link/Route to Author component to make fetchAuthorData dynamic
  const { id } = useParams();
  const [author, setAuthor] = useState([]);

  const fetchAuthorData = useCallback(async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {author ? (
                        <>
                          <img src={author.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </>
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <div className="profile_name">
                        <h4>
                          {author ? (
                            <>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          ) : (
                            <>
                              <Skeleton width="250px" height="50px" />
                              <span className="profile_username">
                                <Skeleton width="150px" height="20px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" height="20px" />
                              </span>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    {author ? (
                      <FollowButton followers={author.followers} />
                    ) : (
                      <div className="de-flex-col">
                        <Skeleton width="250px" height="50px" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
