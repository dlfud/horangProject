import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = ({ method, id }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [detail, setDetail] = useState([]);

  let sort = "";
  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  useEffect(() => {
    const getData = async () => {
      const detail = await axios({
        url: `http://localhost:5000/${sort}DetailPage/${id}`,
        method: "GET",
      });
      setDetail(...detail.data);
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `http://localhost:3000/${sort}Update/${id}`,
              method: "POST",
              data: {
                title,
                content,
              },
            });

            if (data.data !== null) {
              nav(`/${sort}DetailPage/${id}`);
              console.log("성공");
            } else {
              console.log("오류");
            }
          }}
        >
          <div>
            <label>
              <strong>제목</strong>
            </label>
            <input
              type="text"
              placeholder={detail.title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label>
              <strong>내용</strong>
            </label>
            <input
              type="text"
              placeholder={detail.content}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <button type="submit">확인</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
