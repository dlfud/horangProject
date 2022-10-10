import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import Pagination from "./Pagination";



const HomeR = () => {
  const [activity, setActivity] = useState("false");
  const [secretPost, setSecretPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

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

const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = secretPost.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNum => setCurrentPage(pageNum);

  return(
    <>
   <div className="absolute inset-x-0 top-0">
        <strong>익명 게시물</strong>
      </div>
     <SecretPostListInput secretPost={currentPosts} setActivity={setActivity}/>
      <Link to="/create" > 생성  </Link>
      <Pagination 
      postPerPage={postPerPage}
      totalPosts={secretPost.length}
      paginate={paginate}      
      />
    </>
  );
}

export default HomeR;