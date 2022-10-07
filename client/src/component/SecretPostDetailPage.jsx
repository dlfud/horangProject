import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import React, {useState, useEffect, useParams} from "react";


const SecretPostDetailPage = () => {
  const [secretPostDetail, setSecretPostDetail] = useState({});
  const {id} = useParams();

  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000/secretPostDetailPage/${id}`,
        method: "GET",
      });
      setSecretPostDetail(...secretPost.data);
    };
    getData();
  },[]);


  return(
  <>
  <h1>비밀 게시물 상세페이지</h1>
  <div>
    제목 : {secretPostDetail.title}
  </div>
  <div>
    내용 : {secretPostDetail.content}
  </div>
  </>);
}

export default SecretPostDetailPage;