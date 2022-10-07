import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";



const HomeR = () => {
  const [activity, setActivity] = useState("false");
  const [secretPost, setSecretPost] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: "http://localhost:5000",
        method: "GET",
      });
      setSecretPost(secretPost.data);
    };
    getData();
  },[activity]);

  return(
    <>
   <div className="absolute inset-x-0 top-0">
        <strong>익명 게시물</strong>
      </div>
      <div className="PageHeight overflow-auto ">
      <table>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </table>
            {secretPost&&secretPost.map((secretPost, index) => (
            <SecretPostListInput
            key = {index}
            secretPost = {secretPost}
            setSecretPost={setSecretPost}
            setActivity={setActivity}
            />
          ))}      
      </div>
      <Link to="/create" > 생성  </Link>
    </>
  );
}

export default HomeR;