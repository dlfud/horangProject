import { useParams } from "react-router-dom";
import React from "react";
import DetailPage from "./detailPage/DetailPage";

const SecretPostDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="px-4 py-5 bg-white mt-12 border">
      <DetailPage method="1" id={id} />
      </div>
    </>
  );
};

export default SecretPostDetailPage;
