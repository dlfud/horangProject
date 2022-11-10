import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DetailPage from "./detailPage/DetailPage";
import Nav from "./Nav";

const SecretPostDetailPage = () => {
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
            <DetailPage method="1" id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SecretPostDetailPage;
