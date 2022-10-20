import React from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./detailPage/DetailPage.jsx";

const postDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>익명 게시물 상세페이지</h1>
      <DetailPage method="0" id={id} />
    </>
  );
};

export default postDetailPage;
