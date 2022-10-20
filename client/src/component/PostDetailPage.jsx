import React from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./detailPage/DetailPage.jsx";

const PostDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <div className="w-10/12 px-4 py-5 bg-white mt-12 ">
        <strong className="text-2xl">익명 게시물 상세페이지</strong>
        <hr/>
        <DetailPage method="0" id={id} />
      </div>
    </>
  );
};

export default PostDetailPage;
