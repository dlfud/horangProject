import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import PostListInput from "./PostListInput";
import Pagination from "./Pagination";



const HomeR = () => {
  const [post, setPost] = useState([]);
  const [postComment, setPostComment] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const getData1 = async () => {
      const post = await axios({
        url: `http://localhost:5000/post`,
        method:"GET",
      });
      setPost(post.data);
    }

    const getData2 = async () => {
      const postComment = await axios({
        url:`http://localhost:5000/postCommentCount`,
        method:"GET",
      });
      setPostComment(postComment.data);
    }
    getData1();
    getData2();
  },[]);




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
        </select>
        <Link to="/">로그인</Link>
        <Link to="/join">회원가입</Link>
      </label>


      <PostListInput offset={offset} limit={limit} post={post} postComment={postComment}/>

      <div className=" text-center">
     <Pagination 
       total={post.length}
       limit={limit}
       page={page}
       setPage={setPage}    
      /> 
      </div>
    </div>
  );
}

export default HomeR;