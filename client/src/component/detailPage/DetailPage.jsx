import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../comment/Comment.jsx";
import { url } from "../../configIp";

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
      setDetail(...detail.data);
    };

    getData1();

    const loginout = () => {
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
      <div>
        <strong className="text-2xl inline-block">
          <div>{detail.title}</div>
        </strong>
        <div className="inline-block float-right">조회수 : {detail.view}</div>
        <hr />
        <div>
          <div className="p-9">{detail.content}</div>
          <hr />
          <div className="inline-block p-3 float-right">
            <button onClick={loginout} className="float-left border-2 mr-2">
              목록
            </button>

            {window.sessionStorage.getItem("id") === detail.member_id && onoff ? (
              <>
                <Link to={`/${sort}Update/${id}`} className="float-left border-2 mr-2">
                  수정
                </Link>
                <div
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await axios({
                      url: `${url}/${sort}Delete/${id}`,
                      method: "POST",
                    });
                    navigate("/home");
                  }}
                  className="float-left border-2"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("삭제 할거니?")) {
                        const checkDelete = async () => {
                          await axios({
                            url: `${url}/${sort}Delete/${id}`,
                            method: "POST",
                          });
                          navigate("/home");
                        };
                        checkDelete();
                      } else {
                        alert("취소");
                      }
                    }}
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-12">
            <div>댓글</div>
            <hr />
            <Comment sort={sort} activity={activity} setActivity={setActivity} id={id} onoff={onoff} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
