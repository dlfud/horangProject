import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


const SecretPostDetailPage = () => {
  const [secretPostDetail, setSecretPostDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000/secretPostDetailPage/${id}`,
        method: "GET",
      });
      setSecretPostDetail(...secretPost.data);

    };
    getData();
  }, [id]);


  return (
    <>
      <h1>비밀 게시물 상세페이지</h1>
      <Link to={`/update/${id}`}>수정</Link>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await axios({
          url: `http://localhost:3000/delete/${id}`,
          method: "POST",
        })
        navigate("/");
      }}><button>삭제</button></form>
      <Link to={`/`}>목록</Link>
      <div>
        제목 : {secretPostDetail.title}
      </div>
      <div>
        내용 : {secretPostDetail.content}
      </div>

      <form></form>
    </>);
}

export default SecretPostDetailPage;