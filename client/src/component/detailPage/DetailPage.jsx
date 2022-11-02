import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../comment/Comment.jsx";
import {url} from "../../configIp";

const DetailPage = ({ method, id }) => {
  const [activity, setActivity] = useState(0);
  const [detail, setDetail] = useState({});
  const [onoff, setOnoff] = useState(false);
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
        url: `${url}/${sort}DetailPage/${id}`,
        method: "GET",
      });
      console.log(sort);
      setDetail(...detail.data);
    };

    getData1();

    const loginout = () => {
      console.log(window.sessionStorage.getItem("id"));
      if (window.sessionStorage.getItem("id") === null) {
        setOnoff(false);
      } else {
        setOnoff(true);
      }
    };

    loginout();
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
      <div className="flex">
        <div className="justify-items-end">조회수 : {detail.view}</div>
        <div className="mt-6 justify-end">
          <Link to={`/${sort}Update/${id}`}>수정</Link>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                url: `${url}/${sort}Delete/${id}`,
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
            onoff={onoff}
          />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
