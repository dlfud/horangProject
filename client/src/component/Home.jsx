import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SecretPostListInput from "./SecretPostListInput";
import Pagination from "./Pagination";



const HomeR = () => {
  const [secretPost, setSecretPost] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const getData = async () => {
      const secretPost = await axios({
        url: `http://localhost:5000`,
        method: "GET",
      });
      setSecretPost(secretPost.data);
    };
    getData();
  },[]);


  return(
    <div className="grid gap-4 place-content-center">

     <div >
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
      
      <SecretPostListInput offset={offset} limit={limit} secretPost={secretPost}/>
      <div className="text-right ">
        <Link to="/create" className=" p-2 MainColor2 text-sm font-bold"> 글쓰기  </Link>
      </div>
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