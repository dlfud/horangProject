import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../comment/Comment.jsx";

const DetailPage = ({ method, id }) => {
  const [activity, setActivity] = useState(0);
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();
  let sort = "";

  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  useEffect(() => {
    const getData1 = async () => {
      const detail = await axios({
        url: `http://localhost:5000/${sort}DetailPage/${id}`,
        method: "GET",
      });
      console.log(sort);
      setDetail(...detail.data);
    };

    getData1();
  }, [activity, id]);

  const loginout = () => {
    if (window.sessionStorage.getItem("id") === null) {
      navigate("/home");
    } else {
      navigate("/secrethome");
    }
  };

  return (
    <>
      <div>조회수 : {detail.view}</div>
      <Link to={`/${sort}Update/${id}`}>수정</Link>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios({
            url: `http://localhost:3000/${sort}Delete/${id}`,
            method: "POST",
          });
          navigate("/home");
        }}
      >
        <button>삭제</button>
      </form>
      <input onClick={loginout} value="목록" type="button"></input>
      <div>제목 : {detail.title}</div>
      <div>내용 : {detail.content}</div>

      <Comment
        sort={sort}
        activity={activity}
        setActivity={setActivity}
        id={id}
      />
    </>
  );
};

export default DetailPage;
