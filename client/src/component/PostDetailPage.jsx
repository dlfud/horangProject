import React from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./detailPage/DetailPage.jsx";

const PostDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <div className="px-4 py-5 bg-white mt-12 border">
        <DetailPage method="0" id={id} />
      </div>
    </>
  );
};

export default PostDetailPage;
