import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../configIp";

const Create = ({ method, onoff }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let memberId = "익명";
  let sort = "";

  if (method === "0") {
    sort = "post";
  } else {
    sort = "secretPost";
  }

  if (onoff) {
    memberId = window.sessionStorage.getItem("id");
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await axios({
              url: `${url}/${sort}Create`,
              method: "POST",
              data: {
                title,
                content,
                member_id: memberId,
              },
            });

            if (data.data !== null) {
              if (sort === "post") {
                nav("/home");
              } else {
                nav("/secrethome");
              }
              //navigate 기능을 활용하여 Access-Control-Allow-Origin 관련 오류를 막을 수 있음?
              // 그냥 보내면 server에서 create를 못읽음
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
              placeholder="제목"
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
              placeholder="내용"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <button type="submit"
            className="text-gray-400 Main text-sm rounded-lg py-1 px-64">확인</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
