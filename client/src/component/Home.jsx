import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import PostListInput from "./PostListInput";
import Pagination from "./Pagination";



const HomeR = () => {
  const [secretPost, setSecretPost] = useState([]);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  useEffect(() => {
    const getData1 = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000/secretPost`,
        method: "GET",
      });
      setSecretPost(secretPost.data);
    };

    const getData2 = async () => {
      const comment = await axios({
        url: `http://localhost:5000/secretPostCommentCount`,
        method: "GET",
      });
      setComment(comment.data);
    };

    const getData3 = async () => {
      const post = await axios({
        url: `http://localhost:5000/post`,
        method:"GET",
      });
      setPost(post.data);
    }
    getData1();
    getData2();
    getData3();
  },[]);

    const handleLogout = () => {
      console.log("로그아웃");
      window.sessionStorage.clear();
      console.log(
        "로그아웃 완료", window.sessionStorage.getItem("id")
      );
      navigate("/");
    }

  return(
    <div className="grid gap-4 place-content-center">

     <div>
        <p className="font-bold text-2xl">익명 게시물</p>
      </div>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      <input 
       onClick={handleLogout}
       value="로그아웃"
      type="button"
       ></input>

      <PostListInput offset={offset} limit={limit} post={post} comment={comment}/>
      <div>
        <p className="font-bold text-2xl">비밀 + 익명 게시물</p>
      </div>
      <SecretPostListInput offset={offset} limit={limit} secretPost={secretPost} post = {post} comment={comment}/>
      <div className=" text-center">
      <Pagination 
       total={secretPost.length}
       limit={limit}
       page={page}
       setPage={setPage}    
      />
      </div>
    </div>
  );
}

export default HomeR;