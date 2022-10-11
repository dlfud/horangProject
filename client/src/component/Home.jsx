import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import Pagination from "./Pagination";



const HomeR = () => {
  const [activity, setActivity] = useState("false");
  const [secretPost, setSecretPost] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
 
 
  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000/`,
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
     <SecretPostListInput offset={offset} limit={limit} secretPost={secretPost} setActivity={setActivity}/>
      <Link to="/create" > 생성  </Link>
      <Pagination 
      total={secretPost.length}
      limit={limit}
      page={page}
      setPage={setPage}
      />
    </>
  );
}

export default HomeR;