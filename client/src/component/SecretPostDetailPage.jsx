import { useParams } from "react-router-dom";
import React from "react";
import DetailPage from "./DetailPage";

const SecretPostDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1>비밀 게시물 상세페이지</h1>
      <DetailPage method="1" id={id} />
    </>
  );
};

export default SecretPostDetailPage;
