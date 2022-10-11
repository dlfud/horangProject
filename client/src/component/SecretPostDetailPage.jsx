import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";


const SecretPostDetailPage = () => {
  const [activity, setActivity] = useState("false");
  const [secretPostDetail, setSecretPostDetail] = useState({});
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000/secretPostDetailPage/${id}`,
        method: "GET",
      });
      setSecretPostDetail(...secretPost.data);
      
      const commentData = await axios({
        url:`http://localhost:5000/comment/${id}`,
        method:"GET",
      });
      setComment(commentData.data);
    };
    getData();
  }, []);


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

      {comment.map((comment, index) => 
        <div key={index}>
          {comment.content}
        </div>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await axios({
            url: `http://localhost:3000/commentCreate/${id}`,
            method: "POST",
            data: {
              id,
              content
            }
          });

          if (data.data !== null) {
            setActivity("true" + id);
            console.log("성공");
          } else {
            console.log("오류");
          }
        }}>
        <div >
          <label>
            <strong >내용</strong>
          </label>
          <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          >
          </input>
        </div>
        <div>
          <button type="submit">확인</button>
        </div>
      </form>
    </>);
}

export default SecretPostDetailPage;