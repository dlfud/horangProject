import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./detailPage/DetailPage.jsx";
import Nav from "./Nav.jsx";

const PostDetailPage = () => {
  const { id } = useParams();
  const [onoff, setOnoff] = useState(false);
  useEffect(() => {
    const loginout = () => {
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();
  });

  return (
    <>
      <div className="flex Main">
        <div className=" px-3 Side w-70">
          <div className="space-y-3">
            <div className="flex-1">
              <Nav onoff={onoff} />
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 ">
          <div className="px-4 py-5 bg-white mt-12 border">
            <DetailPage method="0" id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
