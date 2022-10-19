import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DetailPage from "./DetailPage.jsx";


const postDetailPage = () => {
  return (
    <>
    <h1>익명 게시물 상세페이지</h1>
    <DetailPage method="0"/>
    </>
  )
}

export default postDetailPage;